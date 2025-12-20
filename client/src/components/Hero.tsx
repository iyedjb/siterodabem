import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronDown, MapPin, Users, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'wouter';

export default function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '40%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section ref={ref} className="relative h-screen w-full overflow-hidden flex items-center">
      {/* Animated Background Image */}
      <motion.div 
        style={{ y }}
        className="absolute inset-0 -z-10"
      >
        <div 
          className="w-full h-full bg-cover bg-center"
          style={{ 
            backgroundImage: `url(/images/world_travel_landmarks_collage.png)`,
          }}
        />
      </motion.div>
      {/* Premium Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-black/60 z-10" />
      {/* Animated Content */}
      <div className="relative w-full max-w-7xl mx-auto px-4 md:px-8 text-white z-20 h-full flex flex-col justify-center">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
        >
          {/* Accent Badge */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex items-center gap-2 mb-8"
          >
            <motion.div 
              animate={{ scaleX: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-12 h-0.5 bg-gradient-to-r from-transparent to-accent" 
            />
            <span className="text-sm font-semibold tracking-widest text-accent uppercase">9 Anos de Excelência</span>
          </motion.div>

          {/* Main Heading with Stagger */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold mb-8 leading-tight max-w-4xl" data-testid="text-hero-title">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Viagens que
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-pulse">
                Transformam Vidas
              </span>
            </motion.div>
          </h1>

          {/* Subtitle */}
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="text-lg md:text-2xl text-white/90 mb-10 max-w-2xl leading-relaxed font-light" 
            data-testid="text-hero-subtitle"
          >
            Experiências personalizadas em destinos extraordinários com conforto, segurança e atenção ao detalhe.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 mb-16"
          >
            <Link href="/destinations">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                <Button 
                  size="lg" 
                  className="rounded-lg px-8 py-7 text-base font-semibold bg-primary hover:bg-primary/90 shadow-xl"
                  data-testid="button-hero-primary"
                >
                  Explorar Destinos
                </Button>
              </motion.div>
            </Link>
            <Link href="/contact">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                <Button 
                  size="lg" 
                  className="rounded-lg px-8 py-7 text-base font-semibold border-2 border-white/40 hover:border-white/60 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white"
                  data-testid="button-hero-secondary"
                >
                  Fale Conosco
                </Button>
              </motion.div>
            </Link>
          </motion.div>

          {/* Stats Row with Professional Design */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="grid grid-cols-3 gap-8 pt-8 border-t border-white/20 max-w-2xl"
          >
            {[
              { icon: Award, label: 'Clientes Felizes', value: '10K+' },
              { icon: Users, label: 'Viagens Realizadas', value: '500+' },
              { icon: MapPin, label: 'Destinos', value: '100+' }
            ].map((stat, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.0 + idx * 0.1 }}
                className="flex items-center gap-3"
              >
                <stat.icon className="w-6 h-6 text-accent" />
                <div>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-sm text-white/70">{stat.label}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 12, 0] }}
          transition={{ duration: 2.5, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div whileHover={{ scale: 1.2 }}>
            <ChevronDown className="w-6 h-6 text-white/60 cursor-pointer" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
