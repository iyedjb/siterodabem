import { motion } from 'framer-motion';
import { Users, Award, Globe, Heart } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import AIChatbot from '@/components/AIChatbot';

const values = [
  {
    icon: Users,
    title: 'Equipe Especializada',
    description: 'Profissionais experientes dedicados a criar sua viagem perfeita',
  },
  {
    icon: Award,
    title: 'Excelência',
    description: 'Comprometidos com os mais altos padrões de qualidade e serviço',
  },
  {
    icon: Globe,
    title: 'Destinos Únicos',
    description: 'Acesso exclusivo aos lugares mais incríveis do mundo',
  },
  {
    icon: Heart,
    title: 'Paixão por Viajar',
    description: 'Amor genuíno por criar experiências inesquecíveis',
  },
];

export default function About() {
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
            <h1 className="font-serif text-4xl md:text-6xl font-bold mb-6" data-testid="text-about-title">
              Sobre a Roda Bem Turismo
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed" data-testid="text-about-intro">
              Há mais de uma década, transformamos sonhos de viagem em realidade. 
              Somos uma agência especializada em criar experiências autênticas e memoráveis, 
              conectando viajantes apaixonados aos destinos mais extraordinários do planeta.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-20"
          >
            <div className="bg-card border border-card-border rounded-md p-8 md:p-12">
              <h2 className="font-serif text-2xl md:text-3xl font-bold mb-6" data-testid="text-mission-title">
                Nossa Missão
              </h2>
              <p className="text-muted-foreground leading-relaxed text-lg" data-testid="text-mission-description">
                Proporcionar viagens que vão além do turismo convencional. Buscamos criar 
                conexões autênticas com culturas locais, preservar o meio ambiente e 
                oferecer experiências que transformam a perspectiva de nossos clientes sobre o mundo.
              </p>
            </div>
          </motion.div>

          <div className="mb-20">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="font-serif text-3xl md:text-4xl font-bold text-center mb-12"
              data-testid="text-values-title"
            >
              Nossos Valores
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className="p-6 rounded-md border border-border text-center"
                  data-testid={`card-value-${index}`}
                >
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                    <value.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2" data-testid={`text-value-title-${index}`}>
                    {value.title}
                  </h3>
                  <p className="text-sm text-muted-foreground" data-testid={`text-value-description-${index}`}>
                    {value.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="text-center bg-primary/5 rounded-md p-12"
          >
            <h2 className="font-serif text-2xl md:text-3xl font-bold mb-4" data-testid="text-cta-title">
              Pronto para sua próxima aventura?
            </h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto" data-testid="text-cta-description">
              Entre em contato conosco e descubra como podemos transformar seus sonhos de viagem em realidade
            </p>
          </motion.div>
        </div>
      </div>

      <Footer />
      <WhatsAppButton />
      <AIChatbot />
    </div>
  );
}
