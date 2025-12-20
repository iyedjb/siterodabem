import { motion } from 'framer-motion';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useState } from 'react';

const testimonials = [
  { id: 1, name: "Maria Adriana", city: "Macaé", rating: 5, quote: "Agradecemos por tudo. Já fazia tempo que não saíamos. Só temos a agradecer!" },
  { id: 2, name: "Nayara A.", city: "Divinópolis", rating: 5, quote: "Foi tudo perfeito, Daniel! Passeio maravilhoso. Que Deus abençoe." },
  { id: 3, name: "Carla", city: "Porto Seguro", rating: 5, quote: "Proporcionaram momentos que ficarão registrados pra sempre em nossos corações." },
  { id: 4, name: "Rosa P.", city: "Campos do Jordão", rating: 5, quote: "Agradeço pela atenção e receptividade. Parabéns pelo excelente trabalho!" },
  { id: 5, name: "Shirlei F.", city: "Tiradentes", rating: 5, quote: "Muitíssimo obrigada! Parabéns pela organização e carinho conosco." },
  { id: 6, name: "Luciana C.", city: "Campos do Jordão", rating: 5, quote: "A viagem foi espetacular. Obrigada por dias maravilhosos!" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 }
  }
};

export default function FeedbackSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="py-32 md:py-48 bg-gradient-to-b from-background to-muted/10 relative overflow-hidden" data-testid="section-feedback">
      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-accent" />
            <span className="text-sm font-semibold text-accent uppercase tracking-wide">Depoimentos</span>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-accent" />
          </div>

          <h2 className="text-5xl md:text-7xl font-serif font-bold mb-6 leading-tight" data-testid="text-feedback-title">
            O que Nossos Clientes <br />
            <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">Dizem</span>
          </h2>

          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed" data-testid="text-feedback-subtitle">
            Histórias reais de clientes satisfeitos que vivenciaram experiências inesquecíveis conosco
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              variants={itemVariants}
              whileHover={{ y: -8 }}
              data-testid={`card-testimonial-${testimonial.id}`}
            >
              <Card className="p-8 h-full bg-card/60 backdrop-blur-md border border-border/50 hover:border-primary/30 transition-all duration-300 group hover-elevate">
                {/* Quote Icon */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 0.1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 + 0.2 }}
                  className="absolute top-6 right-6"
                >
                  <Quote className="w-12 h-12 text-accent" />
                </motion.div>

                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {Array(5).fill(0).map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 + 0.3 + i * 0.05 }}
                    >
                      <Star className="w-4 h-4 fill-accent text-accent" />
                    </motion.div>
                  ))}
                </div>

                {/* Quote */}
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 + 0.3 }}
                  className="text-base leading-relaxed mb-6 text-foreground/90 relative z-10"
                  data-testid={`text-quote-${testimonial.id}`}
                >
                  "{testimonial.quote}"
                </motion.p>

                {/* Author */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 + 0.4 }}
                  className="flex items-center gap-3 pt-6 border-t border-border/30 relative z-10"
                >
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="bg-primary/20 text-primary font-semibold">
                      {testimonial.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold text-sm group-hover:text-primary transition-colors">{testimonial.name}</p>
                    <p className="text-xs text-muted-foreground">{testimonial.city}</p>
                  </div>
                </motion.div>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center py-12 rounded-2xl bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20"
        >
          <h3 className="text-3xl font-serif font-bold mb-3">Pronto para sua próxima aventura?</h3>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
            Junte-se a milhares de clientes satisfeitos e crie memórias inesquecíveis
          </p>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
            <a href="/contact" className="inline-flex items-center gap-2 px-8 py-3 bg-primary text-white rounded-full font-semibold hover:bg-primary/90 transition-all shadow-lg">
              Começar Agora
              <ChevronRight className="w-4 h-4" />
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
