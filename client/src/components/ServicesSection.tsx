import { motion } from 'framer-motion';
import { MapPin, Calendar, Shield, Headphones } from 'lucide-react';
import { Card } from '@/components/ui/card';

const services = [
  {
    icon: MapPin,
    title: 'Destinos Exclusivos',
    description: 'Acesso a lugares únicos, selecionados fora do comum para experiências memoráveis.',
    color: 'from-primary/20 to-primary/5',
  },
  {
    icon: Calendar,
    title: 'Planejamento Personalizado',
    description: 'Itinerários sob medida que combinam com seu estilo, orçamento e preferências.',
    color: 'from-accent/20 to-accent/5',
  },
  {
    icon: Shield,
    title: 'Reserva Segura',
    description: 'Passagens, hotéis, passeios e transfers com processo simples e confiável.',
    color: 'from-chart-2/20 to-chart-2/5',
  },
  {
    icon: Headphones,
    title: 'Suporte 24/7',
    description: 'Consultores dedicados para ajudar antes, durante e depois da sua viagem.',
    color: 'from-chart-3/20 to-chart-3/5',
  },
];

export default function ServicesSection() {
  return (
    <section className="py-16 md:py-28 bg-gradient-to-b from-primary/5 to-background" data-testid="section-services">
      <div className="max-w-7xl mx-auto px-4">
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="uppercase-label text-primary text-center mb-4"
          data-testid="text-services-label"
        >
          O que oferecemos
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="display-text text-4xl md:text-6xl text-center mb-6"
          data-testid="text-services-title"
        >
          Experiências <span className="gradient-text">Incomparáveis</span>
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-center text-muted-foreground text-lg max-w-2xl mx-auto mb-16"
          data-testid="text-services-subtitle"
        >
          Cada detalhe planejado para tornar sua viagem perfeita
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className={`p-8 h-full border-2 hover-elevate transition-all duration-300 bg-gradient-to-br ${service.color}`} data-testid={`card-service-${index}`}>
                <div className="w-16 h-16 rounded-3xl bg-card flex items-center justify-center mb-6 shadow-md">
                  <service.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-bold text-xl mb-3" data-testid={`text-service-title-${index}`}>
                  {service.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed" data-testid={`text-service-description-${index}`}>
                  {service.description}
                </p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
