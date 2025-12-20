import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'wouter';
import DestinationCard from './DestinationCard';
import aparecidaBateVoltaImg from '@assets/generated_images/aparecida_basilica_brazil_pilgrimage.png';
import caldasNovasJanImg from '@assets/generated_images/caldas_novas_hot_springs.png';
import saoThomeImg from '@assets/generated_images/sao_thome_das_letras_mystic.png';
import caldasNovasBronzeImg from '@assets/generated_images/caldas_novas_water_park.png';
import caldasNovasOuroImg from '@assets/generated_images/caldas_novas_luxury_gold_package.png';
import caldasNovasPrataImg from '@assets/generated_images/caldas_novas_silver_package_resort.png';
import guarapariImg from '@assets/generated_images/guarapari_beach_paradise.png';
import trindadeImg from '@assets/generated_images/trindade_religious_pilgrimage.png';
import aparecidaMaioImg from '@assets/generated_images/aparecida_pilgrimage_walkway.png';
import caldasNovasJulhoImg from '@assets/generated_images/caldas_novas_evening_resort.png';
import monteVerdeImg from '@assets/generated_images/monte_verde_mountain_charm.png';

const destinations = [
  { id: 'aparecida-bate-volta', name: 'Aparecida do Norte', location: 'Bate e Volta - Janeiro', price: 'R$ 350,00', image: aparecidaBateVoltaImg },
  { id: 'caldas-novas-janeiro', name: 'Caldas Novas', location: 'Janeiro 2026', price: 'R$ 1.613,00', image: caldasNovasJanImg },
  { id: 'sao-thome-letras', name: 'São Thomé das Letras', location: 'Março 2026', price: 'R$ 1.090,00', image: saoThomeImg },
  { id: 'caldas-novas-bronze', name: 'Caldas Novas Bronze', location: 'Março 2026', price: 'R$ 1.819,00', image: caldasNovasBronzeImg },
  { id: 'caldas-novas-ouro', name: 'Caldas Novas Ouro', location: 'Março 2026', price: 'R$ 2.390,00', image: caldasNovasOuroImg },
  { id: 'caldas-novas-prata', name: 'Caldas Novas Prata', location: 'Março 2026', price: 'R$ 2.119,00', image: caldasNovasPrataImg },
  { id: 'guarapari', name: 'Guarapari', location: 'Abril 2026 - Espírito Santo', price: 'R$ 1.290,00', image: guarapariImg },
  { id: 'trindade', name: 'Trindade', location: 'Abril 2026 - Goiás', price: 'R$ 1.390,00', image: trindadeImg },
  { id: 'aparecida-maio', name: 'Aparecida do Norte', location: 'Maio 2026', price: 'R$ 1.250,00', image: aparecidaMaioImg },
  { id: 'caldas-novas-julho', name: 'Caldas Novas', location: 'Julho 2026', price: 'R$ 1.599,00', image: caldasNovasJulhoImg },
  { id: 'monte-verde', name: 'Monte Verde', location: 'Agosto 2026', price: 'R$ 999,00', image: monteVerdeImg },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

export default function DestinationsGallery() {
  return (
    <section className="py-32 md:py-48 bg-background overflow-hidden relative" data-testid="section-destinations">
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto px-4 md:px-8 mb-20">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="flex items-center gap-3 mb-8">
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Sparkles className="w-5 h-5 text-accent" />
            </motion.div>
            <span className="text-sm font-semibold text-accent uppercase tracking-wider">Nossos Destinos</span>
          </div>

          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-7xl font-serif font-bold mb-6 leading-tight"
            data-testid="text-destinations-title"
          >
            Explore Lugares <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">Incríveis</span>
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-muted-foreground max-w-2xl leading-relaxed"
            data-testid="text-destinations-subtitle"
          >
            Cuidadosamente selecionados para oferecer as melhores experiências, conforto e segurança em cada canto do Brasil.
          </motion.p>
        </motion.div>
      </div>
      
      <div className="flex gap-4 md:gap-6 px-4 md:px-8 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-4 md:hidden">
        {destinations.map((dest, index) => (
          <DestinationCard 
            key={dest.id}
            {...dest}
            index={index}
          />
        ))}
      </div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 px-8 max-w-7xl mx-auto mb-16"
      >
        {destinations.map((dest, index) => (
          <DestinationCard 
            key={dest.id}
            {...dest}
            index={index}
          />
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="flex justify-center"
      >
        <Link href="/destinations">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
            <Button 
              size="lg" 
              className="rounded-full gap-2 shadow-xl px-8 py-6 text-base font-semibold group"
              data-testid="button-view-all-destinations"
            >
              Ver Todos os Destinos
              <motion.div
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <ArrowRight className="w-4 h-4 group-hover:text-accent transition-colors" />
              </motion.div>
            </Button>
          </motion.div>
        </Link>
      </motion.div>
    </section>
  );
}
