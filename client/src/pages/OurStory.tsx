import { motion } from 'framer-motion';
import { Award, Users, Globe, Heart, TrendingUp, Star, Sparkles, Handshake, Target } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import AIChatbot from '@/components/AIChatbot';

const timeline = [
  {
    year: '2010',
    title: 'O Início da Roda Bem',
    description: 'Fundada em Minas Gerais por apaixonados por viagens, a Roda Bem Turismo nasce com a missão de transformar sonhos em realidade e levar alegria através de experiências inesquecíveis.',
  },
  {
    year: '2013',
    title: 'Crescimento Regional',
    description: 'Expandimos nossa atuação em Minas Gerais e estados vizinhos, criando pacotes exclusivos para destinos nacionais como Caldas Novas, Monte Verde e São Thomé das Letras.',
  },
  {
    year: '2016',
    title: 'Destinos Premium',
    description: 'Firmamos parcerias estratégicas com resorts e hotéis de alto padrão, oferecendo experiências completas com tudo incluído.',
  },
  {
    year: '2020',
    title: 'Digitalização',
    description: 'Adaptação ao novo mundo digital, implementando atendimento via WhatsApp e plataforma online para facilitar reservas e consultas.',
  },
  {
    year: '2025',
    title: 'Inovação com IA',
    description: 'Lançamento da Barbara, nossa consultora virtual com inteligência artificial, oferecendo atendimento 24/7 e recomendações personalizadas.',
  },
];

const achievements = [
  { icon: Users, number: '10,000+', label: 'Clientes Felizes' },
  { icon: Globe, number: '150+', label: 'Destinos' },
  { icon: Award, number: '25+', label: 'Prêmios' },
  { icon: Star, number: '4.9', label: 'Avaliação' },
];

export default function OurStory() {
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
            <div className="mb-4">
              <h2 className="font-serif text-2xl md:text-3xl font-bold tracking-wider text-muted-foreground">
                RODA BEM TURISMO
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mt-2" />
            </div>
            <h1 className="font-serif text-4xl md:text-6xl font-bold mb-6 gradient-text" data-testid="text-story-title">
              Nossa História
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed" data-testid="text-story-intro">
              Mais de 15 anos conectando pessoas aos destinos mais incríveis do Brasil e do mundo, 
              com experiências que ficam na memória para sempre
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
            {achievements.map((achievement, index) => (
              <motion.div
                key={achievement.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="text-center p-6 rounded-md border border-border bg-card"
                data-testid={`card-achievement-${index}`}
              >
                <achievement.icon className="w-10 h-10 mx-auto mb-3 text-primary" />
                <div className="font-bold text-3xl mb-1 gradient-text" data-testid={`text-achievement-number-${index}`}>
                  {achievement.number}
                </div>
                <div className="text-sm text-muted-foreground" data-testid={`text-achievement-label-${index}`}>
                  {achievement.label}
                </div>
              </motion.div>
            ))}
          </div>

          <div className="relative">
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-primary to-transparent" />
            
            <div className="space-y-12">
              {timeline.map((item, index) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className={`relative grid md:grid-cols-2 gap-8 items-center ${
                    index % 2 === 0 ? '' : 'md:flex-row-reverse'
                  }`}
                  data-testid={`timeline-item-${index}`}
                >
                  <div className={index % 2 === 0 ? 'md:text-right' : 'md:col-start-2'}>
                    <div className="inline-block">
                      <div className="text-4xl md:text-5xl font-bold text-primary mb-2 float-animation" data-testid={`text-timeline-year-${index}`}>
                        {item.year}
                      </div>
                      <h3 className="font-serif text-2xl md:text-3xl font-bold mb-3" data-testid={`text-timeline-title-${index}`}>
                        {item.title}
                      </h3>
                      <p className="text-muted-foreground" data-testid={`text-timeline-description-${index}`}>
                        {item.description}
                      </p>
                    </div>
                  </div>
                  
                  <div className="absolute left-8 md:left-1/2 w-4 h-4 rounded-full bg-primary transform -translate-x-1/2 pulse-glow" />
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-20 bg-gradient-to-br from-primary/10 to-primary/5 rounded-md p-12 text-center"
          >
            <Heart className="w-16 h-16 mx-auto mb-6 text-primary" />
            <h2 className="font-serif text-2xl md:text-3xl font-bold mb-4" data-testid="text-mission-title">
              Nossa Missão
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed" data-testid="text-mission-description">
              Na Roda Bem Turismo, acreditamos que viajar é mais do que visitar lugares - é criar memórias inesquecíveis. 
              Nossa missão é proporcionar experiências únicas e personalizadas, com atendimento caloroso e preços acessíveis, 
              fazendo com que cada cliente se sinta especial e bem cuidado em toda jornada.
            </p>
            <div className="mt-8 grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <Sparkles className="w-12 h-12 mx-auto mb-3 text-primary" />
                <h3 className="font-semibold mb-1">Paixão por Viajar</h3>
                <p className="text-sm text-muted-foreground">Amamos o que fazemos</p>
              </div>
              <div className="text-center">
                <Handshake className="w-12 h-12 mx-auto mb-3 text-primary" />
                <h3 className="font-semibold mb-1">Atendimento Humano</h3>
                <p className="text-sm text-muted-foreground">Você é único para nós</p>
              </div>
              <div className="text-center">
                <Target className="w-12 h-12 mx-auto mb-3 text-primary" />
                <h3 className="font-semibold mb-1">Excelência</h3>
                <p className="text-sm text-muted-foreground">Qualidade em cada detalhe</p>
              </div>
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
