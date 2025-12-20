import { motion } from 'framer-motion';
import { Search, TrendingUp, Target, BarChart3, Users, Globe2 } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import AIChatbot from '@/components/AIChatbot';

const seoFeatures = [
  {
    icon: Search,
    title: 'Otimização para Buscadores',
    description: 'Presença estratégica no Google e outros mecanismos de busca para alcançar mais viajantes.',
  },
  {
    icon: Target,
    title: 'Palavras-Chave Estratégicas',
    description: 'Agência de viagens de luxo, destinos exclusivos, viagens personalizadas, turismo premium.',
  },
  {
    icon: TrendingUp,
    title: 'Crescimento Orgânico',
    description: 'Estratégias de conteúdo que atraem naturalmente viajantes em busca de experiências únicas.',
  },
  {
    icon: BarChart3,
    title: 'Performance Mensurada',
    description: 'Acompanhamento constante de métricas para otimizar sua experiência de descoberta.',
  },
  {
    icon: Users,
    title: 'Experiência do Usuário',
    description: 'Site rápido, responsivo e intuitivo para facilitar seu planejamento de viagem.',
  },
  {
    icon: Globe2,
    title: 'Alcance Global',
    description: 'Conectando viajantes brasileiros aos destinos mais incríveis ao redor do mundo.',
  },
];

const keywords = [
  'Agência de viagens de luxo',
  'Destinos exclusivos',
  'Viagens personalizadas',
  'Maldivas',
  'Bora Bora',
  'Costa Amalfitana',
  'Pacotes premium',
  'Lua de mel',
  'Viagem dos sonhos',
  'Turismo de luxo',
  'Resorts exclusivos',
  'Experiências únicas',
];

export default function SEO() {
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
            <h1 className="font-serif text-4xl md:text-6xl font-bold mb-6 gradient-text" data-testid="text-seo-title">
              Encontre Sua Viagem dos Sonhos
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed" data-testid="text-seo-subtitle">
              A Roda Bem Turismo é especializada em criar experiências de viagem exclusivas e personalizadas. 
              Descubra destinos paradisíacos, resorts de luxo e momentos inesquecíveis.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
            {seoFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-6 rounded-md border border-border bg-card hover-elevate"
                data-testid={`card-seo-feature-${index}`}
              >
                <div className="w-12 h-12 rounded-md bg-primary/10 flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2" data-testid={`text-seo-feature-title-${index}`}>
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground" data-testid={`text-seo-feature-description-${index}`}>
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-md p-12 mb-20"
          >
            <h2 className="font-serif text-3xl font-bold text-center mb-8" data-testid="text-keywords-title">
              Por que escolher a Roda Bem?
            </h2>
            <div className="prose prose-lg max-w-4xl mx-auto text-muted-foreground">
              <p className="leading-relaxed mb-4" data-testid="text-seo-content-1">
                Somos uma <strong>agência de viagens especializada em experiências de luxo</strong> e 
                destinos exclusivos. Nossa expertise abrange desde <strong>viagens de lua de mel</strong> em 
                paraísos tropicais como <strong>Maldivas e Bora Bora</strong>, até roteiros culturais pela 
                <strong>Costa Amalfitana</strong> e <strong>Riviera Francesa</strong>.
              </p>
              <p className="leading-relaxed mb-4" data-testid="text-seo-content-2">
                Cada viagem é cuidadosamente planejada por nossos consultores especializados, garantindo 
                <strong> atendimento personalizado, reservas em resorts exclusivos</strong> e experiências 
                autênticas que transformam sonhos em realidade.
              </p>
              <p className="leading-relaxed" data-testid="text-seo-content-3">
                Com mais de uma década de experiência, milhares de clientes satisfeitos e parcerias com os 
                melhores destinos ao redor do mundo, a Roda Bem é sua porta de entrada para 
                <strong> viagens inesquecíveis</strong>.
              </p>
            </div>
          </motion.div>

          <div>
            <h3 className="font-serif text-2xl font-bold text-center mb-8" data-testid="text-popular-searches">
              Buscas Populares
            </h3>
            <div className="flex flex-wrap gap-3 justify-center">
              {keywords.map((keyword, index) => (
                <motion.div
                  key={keyword}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="px-4 py-2 rounded-full bg-primary/10 text-primary font-medium text-sm hover-elevate cursor-pointer"
                  data-testid={`badge-keyword-${index}`}
                >
                  {keyword}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Footer />
      <WhatsAppButton />
      <AIChatbot />
    </div>
  );
}
