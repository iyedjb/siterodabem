import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Send, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { useLocation } from 'wouter';
import barbaraAvatar from '@assets/barbara-avatar.png';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function ChatPage() {
  const [, navigate] = useLocation();
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: 'Olá! Sou a Barbara, sua consultora de viagens da Roda Bem Turismo! 😊 Procurando por uma aventura incrível? Como posso te ajudar?'
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userMessage,
          history: messages.map(m => ({ role: m.role, content: m.content }))
        })
      });

      const data = await response.json();
      
      if (data.message) {
        setMessages(prev => [...prev, { role: 'assistant', content: data.message }]);
      } else {
        throw new Error(data.error || 'Erro desconhecido');
      }
    } catch (error) {
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: 'Desculpe, ocorreu um erro. Por favor, tente novamente ou entre em contato pelo WhatsApp: (31) 99085-8868' 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border/20 bg-gradient-to-r from-primary/10 to-accent/10">
        <div className="flex items-center gap-3">
          <Button
            size="icon"
            variant="ghost"
            className="rounded-full"
            onClick={() => navigate('/')}
            data-testid="button-back-chat"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="relative">
            <Avatar className="w-12 h-12 border-2 border-primary/30">
              <AvatarImage src={barbaraAvatar} alt="Barbara" />
              <AvatarFallback>BA</AvatarFallback>
            </Avatar>
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-primary rounded-full border-2 border-card" />
          </div>
          <div>
            <h3 className="font-bold text-lg" data-testid="text-chatbot-title">Barbara</h3>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              Online agora
            </p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-background/50">
        {messages.map((msg, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            data-testid={`message-${msg.role}-${idx}`}
          >
            {msg.role === 'assistant' && (
              <Avatar className="w-8 h-8 mr-2 flex-shrink-0">
                <AvatarImage src={barbaraAvatar} alt="Barbara" />
                <AvatarFallback>BA</AvatarFallback>
              </Avatar>
            )}
            <div className={`max-w-[75%] rounded-2xl px-4 py-3 ${
              msg.role === 'user' 
                ? 'bg-primary text-primary-foreground rounded-br-sm' 
                : 'bg-card border border-border rounded-bl-sm'
            }`}>
              <p className="text-sm leading-relaxed">{msg.content}</p>
            </div>
          </motion.div>
        ))}
        {isLoading && (
          <div className="flex justify-start items-center gap-2">
            <Avatar className="w-8 h-8 flex-shrink-0">
              <AvatarImage src={barbaraAvatar} alt="Barbara" />
              <AvatarFallback>BA</AvatarFallback>
            </Avatar>
            <div className="bg-card border border-border rounded-2xl rounded-bl-sm px-4 py-3">
              <div className="flex gap-1">
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                  className="w-2 h-2 bg-muted-foreground rounded-full"
                />
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                  className="w-2 h-2 bg-muted-foreground rounded-full"
                />
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                  className="w-2 h-2 bg-muted-foreground rounded-full"
                />
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t border-border/20 bg-card/50">
        <form 
          onSubmit={(e) => { e.preventDefault(); handleSend(); }}
          className="flex gap-2"
        >
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Digite sua mensagem..."
            disabled={isLoading}
            className="rounded-full border-2 px-4"
            data-testid="input-chat-message"
          />
          <Button 
            type="submit" 
            size="icon"
            disabled={isLoading || !input.trim()}
            className="rounded-full w-12 h-12 flex-shrink-0"
            data-testid="button-send-message"
          >
            <Send className="w-5 h-5" />
          </Button>
        </form>
      </div>
    </div>
  );
}
