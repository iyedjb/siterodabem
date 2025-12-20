import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import AIChatbot from '@/components/AIChatbot';
import FeedbackSection from '@/components/FeedbackSection';
import type { Feedback } from '@shared/schema';

// Real customer testimonials
const featuredTestimonials = [
  {
    name: 'Maria Adriana',
    destination: 'Macaé',
    rating: 5,
    message: 'Agradecemos também por tudo. Já fazia tempo que não saíamos, só trabalhando. Só temos a agradecer, primeiramente a Deus e a todos da viagem, que de uma forma ou outra estivemos todos juntos. Tudo de bom, muuuuito obrigada!',
    image: '👩',
  },
  {
    name: 'Carla',
    destination: 'Porto Seguro',
    rating: 5,
    message: 'Passeio maravilhoso e com os cuidados de sempre que a Roda Bem proporciona. Obrigada Daniel pela atenção e a ótima prestação de serviços. Vocês proporcionaram para nossa família momentos que ficarão registrados pra sempre em nossos corações.',
    image: '👩',
  },
  {
    name: 'Rosa Pacheco',
    destination: 'Campos do Jordão',
    rating: 5,
    message: 'Agradeço pela atenção, pela receptividade e sem contar com a satisfação de ser bem acolhida. Parabéns pelo excelente trabalho, Daniel! Como sempre tudo muito perfeito. Gratidão.',
    image: '👩',
  },
  {
    name: 'Luciana Caldas',
    destination: 'Campos do Jordão',
    rating: 5,
    message: 'Obrigada por ter nos proporcionado dias maravilhosos, a viagem foi espetacular. Um agradecimento especial a todos os companheiros de viagem que a fizeram ainda mais especial.',
    image: '👩',
  },
];

export default function Testimonials() {
  const { data: userFeedback = [] } = useQuery<Feedback[]>({
    queryKey: ['/api/feedback'],
  });

  const renderStars = (rating: number) => (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`w-4 h-4 ${
            star <= rating ? 'fill-primary text-primary' : 'text-muted-foreground'
          }`}
        />
      ))}
    </div>
  );

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
            <h1 className="font-serif text-4xl md:text-6xl font-bold mb-6 gradient-text" data-testid="text-testimonials-title">
              Depoimentos
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto" data-testid="text-testimonials-subtitle">
              O que nossos clientes dizem sobre suas experiências inesquecíveis
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20">
            {featuredTestimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative p-8 rounded-md border border-border bg-card hover-elevate"
                data-testid={`card-testimonial-${index}`}
              >
                <Quote className="absolute top-6 right-6 w-8 h-8 text-primary/20" />
                
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-3xl">
                    {testimonial.image}
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg" data-testid={`text-testimonial-name-${index}`}>
                      {testimonial.name}
                    </h3>
                    <p className="text-sm text-muted-foreground" data-testid={`text-testimonial-destination-${index}`}>
                      Viagem para {testimonial.destination}
                    </p>
                  </div>
                </div>

                <div className="mb-3">
                  {renderStars(testimonial.rating)}
                </div>

                <p className="text-muted-foreground leading-relaxed" data-testid={`text-testimonial-message-${index}`}>
                  "{testimonial.message}"
                </p>
              </motion.div>
            ))}
          </div>

          {userFeedback.length > 0 && (
            <div className="mb-20">
              <h2 className="font-serif text-3xl font-bold text-center mb-12" data-testid="text-user-feedback-title">
                Feedback Recente dos Clientes
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {userFeedback.slice(0, 6).map((feedback, index) => (
                  <motion.div
                    key={feedback.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="p-6 rounded-md border border-border bg-card"
                    data-testid={`card-user-feedback-${index}`}
                  >
                    <div className="mb-3">
                      {renderStars(feedback.rating)}
                    </div>
                    <h4 className="font-semibold mb-2" data-testid={`text-user-feedback-name-${index}`}>
                      {feedback.name}
                    </h4>
                    <p className="text-sm text-muted-foreground" data-testid={`text-user-feedback-message-${index}`}>
                      {feedback.message}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <FeedbackSection />
      <Footer />
      <WhatsAppButton />
      <AIChatbot />
    </div>
  );
}
