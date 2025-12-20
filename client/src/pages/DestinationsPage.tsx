import { motion } from 'framer-motion';
import { useLocation } from 'wouter';
import { Calendar, Users } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import AIChatbot from '@/components/AIChatbot';

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
  { 
    id: 'aparecida-bate-volta', 
    name: 'Aparecida do Norte', 
    subtitle: 'Bate e Volta',
    location: 'Brasil', 
    image: aparecidaBateVoltaImg,
    price: 'R$ 350,00',
    period: '03/01/2026 até 04/01/2026',
    seats: '26 lugares disponíveis',
    month: 'Janeiro'
  },
  { 
    id: 'caldas-novas-janeiro', 
    name: 'Caldas Novas', 
    subtitle: 'Janeiro 2026',
    location: 'Brasil', 
    image: caldasNovasJanImg,
    price: 'R$ 1.613,00',
    period: '21/01/2026 até 25/01/2026',
    seats: '40 lugares disponíveis',
    month: 'Janeiro'
  },
  { 
    id: 'sao-thome-letras', 
    name: 'São Thomé das Letras', 
    subtitle: 'Março 2026',
    location: 'Brasil', 
    image: saoThomeImg,
    price: 'R$ 1.090,00',
    period: '19/03/2026 até 22/03/2026',
    seats: '40 lugares disponíveis',
    month: 'Março'
  },
  { 
    id: 'caldas-novas-bronze', 
    name: 'Caldas Novas Bronze', 
    subtitle: 'Março 2026',
    location: 'Brasil', 
    image: caldasNovasBronzeImg,
    price: 'R$ 1.819,00',
    period: '28/03/2026 até 01/04/2026',
    seats: '64 lugares disponíveis',
    month: 'Março'
  },
  { 
    id: 'caldas-novas-ouro', 
    name: 'Caldas Novas Ouro', 
    subtitle: 'Março 2026',
    location: 'Brasil', 
    image: caldasNovasOuroImg,
    price: 'R$ 2.390,00',
    period: '28/03/2026 até 01/04/2026',
    seats: '64 lugares disponíveis',
    month: 'Março'
  },
  { 
    id: 'caldas-novas-prata', 
    name: 'Caldas Novas Prata', 
    subtitle: 'Março 2026',
    location: 'Brasil', 
    image: caldasNovasPrataImg,
    price: 'R$ 2.119,00',
    period: '28/03/2026 até 01/04/2026',
    seats: '59 lugares disponíveis',
    month: 'Março'
  },
  { 
    id: 'guarapari', 
    name: 'Guarapari', 
    subtitle: 'Espírito Santo',
    location: 'Brasil', 
    image: guarapariImg,
    price: 'R$ 1.290,00',
    period: '02/04/2026 até 05/04/2026',
    seats: '42 lugares disponíveis',
    month: 'Abril'
  },
  { 
    id: 'trindade', 
    name: 'Trindade', 
    subtitle: 'Abril 2026',
    location: 'Brasil', 
    image: trindadeImg,
    price: 'R$ 1.390,00',
    period: '02/04/2026 até 05/04/2026',
    seats: '42 lugares disponíveis',
    month: 'Abril'
  },
  { 
    id: 'aparecida-maio', 
    name: 'Aparecida do Norte', 
    subtitle: 'Maio 2026',
    location: 'Brasil', 
    image: aparecidaMaioImg,
    price: 'R$ 1.250,00',
    period: '21/05/2026 até 24/05/2026',
    seats: '60 lugares disponíveis',
    month: 'Maio'
  },
  { 
    id: 'caldas-novas-julho', 
    name: 'Caldas Novas', 
    subtitle: 'Julho 2026',
    location: 'Brasil', 
    image: caldasNovasJulhoImg,
    price: 'R$ 1.599,00',
    period: '29/07/2026 até 02/08/2026',
    seats: '55 lugares disponíveis',
    month: 'Julho'
  },
  { 
    id: 'monte-verde', 
    name: 'Monte Verde', 
    subtitle: 'Agosto 2026',
    location: 'Brasil', 
    image: monteVerdeImg,
    price: 'R$ 999,00',
    period: '28/08/2026 até 30/08/2026',
    seats: '44 lugares disponíveis',
    month: 'Agosto'
  },
];

export default function DestinationsPage() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="pt-24 pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="font-serif text-4xl md:text-6xl font-bold mb-4" data-testid="text-page-title">
              Todos os Destinos
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto" data-testid="text-page-subtitle">
              Explore nossa coleção de viagens programadas para 2026
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {destinations.map((dest, index) => (
              <motion.div
                key={dest.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group cursor-pointer"
                onClick={() => setLocation(`/destination/${dest.id}`)}
                data-testid={`card-destination-${dest.id}`}
              >
                <div className="relative h-80 rounded-md overflow-hidden">
                  <img 
                    src={dest.image} 
                    alt={dest.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                  
                  <div className="absolute top-4 left-4 bg-accent text-accent-foreground px-3 py-1 rounded-full text-sm font-semibold">
                    {dest.month}
                  </div>
                  
                  <div className="absolute top-4 right-4 bg-primary text-primary-foreground px-3 py-1.5 rounded-full font-bold text-sm">
                    {dest.price}
                  </div>
                  
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="font-serif text-2xl font-semibold mb-1" data-testid={`text-name-${dest.id}`}>
                      {dest.name}
                    </h3>
                    <p className="text-sm opacity-90 mb-2" data-testid={`text-subtitle-${dest.id}`}>
                      {dest.subtitle}
                    </p>
                    
                    <div className="flex items-center gap-4 text-xs opacity-80">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        <span>{dest.period}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-1 text-xs opacity-80 mt-1">
                      <Users className="w-3 h-3" />
                      <span>{dest.seats}</span>
                    </div>
                  </div>
                  
                  <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-colors duration-300" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
      <WhatsAppButton />
      <AIChatbot />
    </div>
  );
}
