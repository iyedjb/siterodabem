import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Loader2, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { useLocation } from 'wouter';
import barbaraAvatar from '@assets/barbara-avatar.png';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function AIChatbot() {
  const [, navigate] = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: 'Olá! Sou a Barbara, sua consultora de viagens da Roda Bem Turismo! 😊 Procurando por uma aventura incrível? Como posso te ajudar?'
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleChatClick = () => {
    if (isMobile) {
      navigate('/chat');
    } else {
      setIsOpen(!isOpen);
    }
  };

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
    <>
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 z-40 backdrop-blur-sm md:bg-transparent"
              onClick={() => setIsOpen(false)}
              data-testid="overlay-chatbot"
            />

            <motion.div
              initial={{ opacity: 0, y: 100, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 100, scale: 0.95 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="fixed bottom-24 right-4 md:bottom-8 md:right-8 glass border-2 border-border/20 rounded-3xl shadow-2xl z-50 w-[calc(100vw-2rem)] md:w-96 flex flex-col overflow-hidden"
              style={{ height: 'min(600px, calc(100vh - 200px))' }}
              data-testid="chatbot-window"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-border/20 bg-gradient-to-r from-primary/10 to-accent/10">
                <div className="flex items-center gap-4">
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
                <Button 
                  size="icon" 
                  variant="ghost"
                  className="rounded-full"
                  onClick={() => setIsOpen(false)}
                  data-testid="button-close-chatbot"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-background/50">
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
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Floating Button */}
      <motion.button
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleChatClick}
        className="fixed bottom-20 right-4 md:bottom-8 md:right-8 glass border-2 border-primary/30 rounded-full shadow-2xl z-50 overflow-hidden group"
        data-testid="button-chatbot-toggle"
      >
        <div className="relative w-16 h-16 md:w-20 md:h-20 flex items-center justify-center">
          {/* Gradient Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 group-hover:from-primary/30 group-hover:to-accent/30 transition-all" />
          
          {/* Avatar */}
          <div className="relative">
            <Avatar className="w-12 h-12 md:w-14 md:h-14 border-2 border-white/20">
              <AvatarImage src={barbaraAvatar} alt="Chat com Barbara" />
              <AvatarFallback>BA</AvatarFallback>
            </Avatar>
            
            {/* Online Badge */}
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-primary rounded-full border-2 border-card flex items-center justify-center">
              <Sparkles className="w-2 h-2 text-white" />
            </div>
          </div>
        </div>
      </motion.button>
    </>
  );
}
