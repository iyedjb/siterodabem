import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import AIChatbot from '@/components/AIChatbot';

const contactMethods = [
  {
    icon: Phone,
    title: 'WhatsApp',
    details: [
      '+55 31 99085-8868',
      '+55 31 99932-5441',
      '+55 31 99808-3540',
    ],
  },
  {
    icon: Mail,
    title: 'Email',
    details: ['contato@rodabemturismo.com'],
  },
  {
    icon: Clock,
    title: 'Horário de Atendimento',
    details: ['Seg - Sex: 9h às 18h', 'Sáb: 9h às 13h'],
  },
  {
    icon: MapPin,
    title: 'Localização',
    details: ['Esmeraldas', 'Minas Gerais, Brasil'],
  },
];

export default function Contact() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="pt-24 pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1 className="font-serif text-4xl md:text-6xl font-bold mb-6" data-testid="text-contact-title">
              Entre em Contato
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto" data-testid="text-contact-subtitle">
              Estamos prontos para ajudar a planejar sua próxima aventura. 
              Entre em contato conosco através de qualquer um dos canais abaixo.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {contactMethods.map((method, index) => (
              <motion.div
                key={method.title}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-6 rounded-md border border-border bg-card text-center"
                data-testid={`card-contact-${index}`}
              >
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                  <method.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-3" data-testid={`text-contact-method-${index}`}>
                  {method.title}
                </h3>
                <div className="space-y-1">
                  {method.details.map((detail, idx) => (
                    <p key={idx} className="text-sm text-muted-foreground" data-testid={`text-contact-detail-${index}-${idx}`}>
                      {detail}
                    </p>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-md p-12 text-center"
          >
            <h2 className="font-serif text-2xl md:text-3xl font-bold mb-4" data-testid="text-whatsapp-cta">
              Prefere conversar pelo WhatsApp?
            </h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto" data-testid="text-whatsapp-description">
              Clique no botão flutuante no canto da tela para iniciar uma conversa 
              diretamente com um de nossos consultores de viagem.
            </p>
            <div className="flex items-center justify-center gap-2 text-primary">
              <Phone className="w-5 h-5" />
              <span className="font-medium">Atendimento imediato via WhatsApp</span>
            </div>
          </motion.div>
        </div>
      </div>

      <Footer />
      <WhatsAppButton />
      <AIChatbot />
    </div>
  );
}

