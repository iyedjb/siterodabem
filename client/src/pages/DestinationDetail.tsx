import { useRoute } from 'wouter';
import { motion } from 'framer-motion';
import { MapPin, Calendar, Clock, Bus, Users, ArrowLeft, Church, Waves, Mountain, Star, Home, MapPinned } from 'lucide-react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import AIChatbot from '@/components/AIChatbot';
import ImageGallery from '@/components/ImageGallery';

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

import amalfiImg from '@assets/generated_images/Amalfi_sunset_beach_5d756ab6.png';
import boraBoraImg from '@assets/generated_images/Bora_Bora_lagoon_dream_e3ed4d4f.png';
import caribbeanImg from '@assets/generated_images/Caribbean_coral_bay_vista_c7919f1e.png';
import costaRicaImg from '@assets/generated_images/Costa_Rica_golden_cove_8bd83b7e.png';
import hawaiiImg from '@assets/generated_images/Hawaii_Oahu_moonlight_bay_d42365fd.png';
import maldivesImg from '@assets/generated_images/Maldives_overwater_bungalows_paradise_78a8e3cb.png';
import seychellesImg from '@assets/generated_images/Seychelles_paradise_island_key_21453fd6.png';
import tropicalImg from '@assets/generated_images/Tropical_beach_paradise_aerial_34c124d8.png';
import azureImg from '@assets/generated_images/Azure_French_Riviera_coast_54dd19b6.png';

const destinationsData: Record<string, any> = {
  'aparecida-bate-volta': {
    name: 'Aparecida do Norte',
    subtitle: 'Bate e Volta',
    location: 'Brasil',
    image: aparecidaBateVoltaImg,
    images: [aparecidaBateVoltaImg, aparecidaMaioImg, trindadeImg],
    price: 'R$ 350,00',
    period: '03/01/2026 até 04/01/2026',
    busType: 'DD64 (64 assentos)',
    seats: '26 lugares disponíveis',
    embarque: {
      local: 'Esmeraldas',
      horario: '19:00'
    },
    retorno: {
      local: 'Mesmo local',
      horario: '15:00'
    },
    description: 'Viagem bate e volta para Aparecida do Norte - 03/01/2026. Visite o maior santuário mariano do mundo em uma viagem especial de ida e volta no mesmo dia.',
    highlights: ['Segunda maior basílica do mundo', 'Sala das Promessas', 'Torre com vista panorâmica', 'Passarela da Fé', 'Museu Nossa Senhora Aparecida'],
    icon: Church,
  },
  'caldas-novas-janeiro': {
    name: 'Caldas Novas',
    subtitle: 'Janeiro 2026',
    location: 'Brasil',
    image: caldasNovasJanImg,
    images: [caldasNovasJanImg, caldasNovasBronzeImg, caldasNovasOuroImg, caldasNovasPrataImg],
    price: 'R$ 1.613,00',
    period: '21/01/2026 até 25/01/2026',
    busType: 'LD44 (44 assentos)',
    seats: '40 lugares disponíveis',
    embarque: {
      local: 'Caracois de Baixo',
      horario: '17:30'
    },
    retorno: {
      horario: '14:00'
    },
    transporte: 'Transporte confortável com ar-condicionado',
    hospedagem: 'Hotel Morada Do Sol',
    description: 'FÉRIAS DE JANEIRO - Preparamos uma viagem especial para o Hotel Morada do Sol, com pensão completa – café da manhã, almoço e jantar já incluídos – além de todo o conforto e lazer que sua família merece nas férias. Assim que chegarmos ao hotel, vocês serão recebidos com um café extra especial, perfeito para começar a viagem com energia. Aproveite toda a estrutura do hotel: piscinas, áreas de descanso, recreação e muito mais!',
    highlights: ['Pensão completa inclusa', 'Café extra especial na chegada', 'Piscinas termais', 'Recreação para família', 'Águas termais naturais 34-57°C'],
    icon: Waves,
  },
  'sao-thome-letras': {
    name: 'São Thomé das Letras',
    subtitle: 'Março 2026',
    location: 'Brasil',
    image: saoThomeImg,
    images: [saoThomeImg, monteVerdeImg, azureImg],
    price: 'R$ 1.090,00',
    period: '19/03/2026 até 22/03/2026',
    busType: 'LD44 (44 assentos)',
    seats: '40 lugares disponíveis',
    embarque: {
      local: 'Esmeraldas',
      horario: '23:00'
    },
    retorno: {
      horario: '14:00'
    },
    description: 'Viagem de 4 dias para São Thomé das Letras - 19/03 a 22/03/2026. Conhecida como a "Capital Mística do Brasil", é uma cidade encantadora construída sobre pedras de quartzito a 1.140 metros de altitude.',
    highlights: ['Cidade mística a 1.140m de altitude', 'Gruta do Carimbado', 'Ladeira do Amendoim', 'Vale das Borboletas', 'Cachoeiras cristalinas'],
    icon: Star,
  },
  'caldas-novas-bronze': {
    name: 'Caldas Novas Bronze',
    subtitle: 'Março 2026',
    location: 'Brasil',
    image: caldasNovasBronzeImg,
    images: [caldasNovasBronzeImg, caldasNovasJanImg, caldasNovasJulhoImg, tropicalImg],
    price: 'R$ 1.819,00',
    period: '28/03/2026 até 01/04/2026',
    busType: 'DD64 (64 assentos)',
    seats: '64 lugares disponíveis',
    embarque: {
      horario: '17:30'
    },
    retorno: {
      horario: '22:30'
    },
    description: 'Viagem de 5 dias para Caldas Novas - Pacote Bronze - 28/03 a 01/04/2026. Aproveite toda a magia das águas termais com nosso pacote Bronze - a opção mais acessível para curtir os parques aquáticos.',
    highlights: ['Hospedagem com piscina termal', 'Acesso aos parques aquáticos', 'Águas termais naturais', 'Opções de lazer para família', '5 dias de diversão'],
    icon: Waves,
  },
  'caldas-novas-ouro': {
    name: 'Caldas Novas Ouro',
    subtitle: 'Março 2026',
    location: 'Brasil',
    image: caldasNovasOuroImg,
    images: [caldasNovasOuroImg, caldasNovasPrataImg, maldivesImg, boraBoraImg],
    price: 'R$ 2.390,00',
    period: '28/03/2026 até 01/04/2026',
    busType: 'DD64 (64 assentos)',
    seats: '64 lugares disponíveis',
    embarque: {
      horario: '17:30'
    },
    retorno: {
      horario: '22:30'
    },
    description: 'Viagem de 5 dias para Caldas Novas - Pacote Ouro - 28/03 a 01/04/2026. Nosso pacote premium com as melhores acomodações e experiências exclusivas nas águas termais.',
    highlights: ['Hospedagem premium', 'Piscinas termais exclusivas', 'Pensão completa', 'Parques aquáticos inclusos', 'Experiência VIP'],
    icon: Waves,
  },
  'caldas-novas-prata': {
    name: 'Caldas Novas Prata',
    subtitle: 'Março 2026',
    location: 'Brasil',
    image: caldasNovasPrataImg,
    images: [caldasNovasPrataImg, caldasNovasOuroImg, caldasNovasBronzeImg, seychellesImg],
    price: 'R$ 2.119,00',
    period: '28/03/2026 até 01/04/2026',
    busType: 'DD64 (64 assentos)',
    seats: '59 lugares disponíveis',
    embarque: {
      horario: '17:30'
    },
    retorno: {
      horario: '22:30'
    },
    description: 'Viagem de 5 dias para Caldas Novas - Pacote Prata - 28/03 a 01/04/2026. Excelente custo-benefício com ótimas acomodações e acesso aos principais atrativos.',
    highlights: ['Hospedagem de qualidade', 'Piscinas termais', 'Café da manhã incluso', 'Acesso aos parques', 'Ótimo custo-benefício'],
    icon: Waves,
  },
  'guarapari': {
    name: 'Guarapari',
    subtitle: 'Espírito Santo',
    location: 'Brasil',
    image: guarapariImg,
    images: [guarapariImg, caribbeanImg, amalfiImg, costaRicaImg],
    price: 'R$ 1.290,00',
    period: '02/04/2026 até 05/04/2026',
    busType: 'LD44 (44 assentos)',
    seats: '42 lugares disponíveis',
    childPolicy: 'Crianças 5 anos ou menos sem assento próprio',
    embarque: {
      local: 'Esmeraldas',
      horario: '21:00'
    },
    retorno: {
      horario: '14:00'
    },
    transporte: 'Água durante todo o percurso, Lanche + brinde (ida)',
    hospedagem: 'Hotel 4 Estações – Frente para o mar (Piscina, Wi-Fi, ar-condicionado, café da manhã incluso)',
    description: 'Conhecida como a "Cidade Saúde" por suas areias monazíticas com propriedades terapêuticas, Guarapari oferece praias paradisíacas e águas cristalinas.',
    highlights: ['Hotel frente para o mar', 'Piscina e Wi-Fi', 'Café da manhã incluso', 'Areias monazíticas terapêuticas', 'Praias paradisíacas'],
    icon: Waves,
  },
  'trindade': {
    name: 'Trindade',
    subtitle: 'Abril 2026',
    location: 'Brasil',
    image: trindadeImg,
    images: [trindadeImg, aparecidaBateVoltaImg, aparecidaMaioImg],
    price: 'R$ 1.390,00',
    period: '02/04/2026 até 05/04/2026',
    busType: 'LD44 (44 assentos)',
    seats: '42 lugares disponíveis',
    embarque: {
      local: 'Esmeraldas',
      horario: '16:30'
    },
    retorno: {
      horario: '11:00'
    },
    description: 'Terceiro maior centro de peregrinação do Brasil, Trindade é conhecida como a "Capital da Fé". A Basílica do Divino Pai Eterno e a Via Sacra são experiências espirituais únicas.',
    highlights: ['Basílica do Divino Pai Eterno', 'Via Sacra iluminada', 'Igreja Matriz histórica', 'Centro de peregrinação', 'Experiência espiritual'],
    icon: Church,
  },
  'aparecida-maio': {
    name: 'Aparecida do Norte',
    subtitle: 'Maio 2026',
    location: 'Brasil',
    image: aparecidaMaioImg,
    images: [aparecidaMaioImg, aparecidaBateVoltaImg, trindadeImg],
    price: 'R$ 1.250,00',
    period: '21/05/2026 até 24/05/2026',
    busType: 'DD64 (64 assentos)',
    seats: '60 lugares disponíveis',
    embarque: {
      local: 'Esmeraldas',
      horario: '19:00'
    },
    retorno: {
      horario: '14:00'
    },
    description: 'Viagem de 4 dias para Aparecida do Norte - 21/05 a 24/05/2026. Maio é o mês de Maria, tornando esta peregrinação ainda mais especial.',
    highlights: ['Mês de Maria', 'Passarela da Fé', 'Missa solene na Basílica', 'Capela das Velas', 'Porto Itaguassu'],
    icon: Church,
  },
  'caldas-novas-julho': {
    name: 'Caldas Novas',
    subtitle: 'Julho 2026',
    location: 'Brasil',
    image: caldasNovasJulhoImg,
    images: [caldasNovasJulhoImg, caldasNovasJanImg, caldasNovasBronzeImg, hawaiiImg],
    price: 'R$ 1.599,00',
    period: '29/07/2026 até 02/08/2026',
    busType: 'DD64 (64 assentos)',
    seats: '55 lugares disponíveis',
    embarque: {
      local: 'Esmeraldas',
      horario: '17:30'
    },
    retorno: {
      horario: '14:00'
    },
    description: 'Férias de julho perfeitas nas águas quentes de Caldas Novas! Enquanto o Brasil enfrenta temperaturas mais baixas, você estará relaxando em piscinas naturalmente aquecidas.',
    highlights: ['Férias de julho', 'Águas termais 34-57°C', 'Período seco - céu limpo', 'Piscinas termais 24h', 'Programação especial de férias'],
    icon: Waves,
  },
  'monte-verde': {
    name: 'Monte Verde',
    subtitle: 'Agosto 2026',
    location: 'Brasil',
    image: monteVerdeImg,
    images: [monteVerdeImg, saoThomeImg, azureImg],
    price: 'R$ 999,00',
    period: '28/08/2026 até 30/08/2026',
    busType: 'LD44 (44 assentos)',
    seats: '44 lugares disponíveis',
    embarque: {
      local: 'Esmeraldas',
      horario: '23:00'
    },
    retorno: {
      horario: '13:00'
    },
    transporte: 'Transporte ônibus semi-leito turismo, Água mineral + lanche especial na ida, Café extra na chegada',
    hospedagem: 'Pousada Boa Montanha',
    description: 'Um pedacinho da Europa nas montanhas de Minas Gerais! A 1.551 metros de altitude, Monte Verde oferece clima ameno, chalés aconchegantes e paisagens de tirar o fôlego.',
    highlights: ['Pousada Boa Montanha', 'Altitude de 1.551 metros', 'Lanche especial na ida', 'Café extra na chegada', 'Clima europeu'],
    icon: Mountain,
  },
};

export default function DestinationDetail() {
  const [, params] = useRoute('/destination/:id');
  const destination = params?.id ? destinationsData[params.id] : null;

  if (!destination) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Destino não encontrado</h1>
          <Link href="/">
            <Button>Voltar para Início</Button>
          </Link>
        </div>
      </div>
    );
  }

  const IconComponent = destination.icon;

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="pt-16">
        <div className="relative">
          <ImageGallery 
            images={destination.images || [destination.image]} 
            name={destination.name} 
          />
          
          <div className="absolute top-24 right-8 bg-primary text-primary-foreground px-4 py-2 rounded-full font-bold text-lg z-20">
            {destination.price}
          </div>
          
          <div className="absolute bottom-0 left-0 right-0 p-8 text-white z-20 pointer-events-none">
            <div className="max-w-7xl mx-auto">
              <Link href="/destinations" className="pointer-events-auto inline-block">
                <Button variant="outline" className="mb-4 bg-white/10 backdrop-blur-sm border-white/20" data-testid="button-back">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Voltar
                </Button>
              </Link>
              
              <div className="flex items-center gap-3 mb-2">
                <IconComponent className="w-6 h-6 text-accent" />
                <span className="text-accent font-medium">{destination.subtitle}</span>
              </div>
              
              <motion.h1 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="font-serif text-4xl md:text-6xl font-bold mb-2"
                data-testid="text-destination-name"
              >
                {destination.name}
              </motion.h1>
              
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="flex items-center gap-2 text-lg"
                data-testid="text-destination-location"
              >
                <MapPin className="w-5 h-5" />
                {destination.location}
              </motion.div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <h2 className="font-serif text-2xl md:text-3xl font-bold mb-4" data-testid="text-about-title">
                  Sobre a Viagem
                </h2>
                <p className="text-muted-foreground leading-relaxed" data-testid="text-about-description">
                  {destination.description}
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <h3 className="font-serif text-xl md:text-2xl font-bold mb-4" data-testid="text-highlights-title">
                  Destaques
                </h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {destination.highlights.map((highlight: string, index: number) => (
                    <li 
                      key={index}
                      className="flex items-start gap-2"
                      data-testid={`text-highlight-${index}`}
                    >
                      <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                      <span className="text-muted-foreground">{highlight}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {destination.transporte && (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.45 }}
                >
                  <h3 className="font-serif text-xl font-bold mb-3">Transporte</h3>
                  <p className="text-muted-foreground">{destination.transporte}</p>
                </motion.div>
              )}

              {destination.hospedagem && (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <h3 className="font-serif text-xl font-bold mb-3">Hospedagem</h3>
                  <p className="text-muted-foreground">{destination.hospedagem}</p>
                </motion.div>
              )}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="space-y-6"
            >
              <div className="p-6 rounded-md border border-border bg-card">
                <div className="text-center mb-6">
                  <div className="text-3xl font-bold text-primary mb-1">{destination.price}</div>
                  <div className="text-sm text-muted-foreground">por pessoa</div>
                </div>

                <h3 className="font-semibold text-lg mb-4" data-testid="text-info-title">Informações da Viagem</h3>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Calendar className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-medium text-sm mb-1">Período</div>
                      <div className="text-sm text-muted-foreground" data-testid="text-period">
                        {destination.period}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Bus className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-medium text-sm mb-1">Tipo de Ônibus</div>
                      <div className="text-sm text-muted-foreground" data-testid="text-bus">
                        {destination.busType}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Users className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-medium text-sm mb-1">Disponibilidade</div>
                      <div className="text-sm text-muted-foreground" data-testid="text-seats">
                        {destination.seats}
                      </div>
                    </div>
                  </div>

                  {destination.embarque && (
                    <div className="flex items-start gap-3">
                      <MapPinned className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <div>
                        <div className="font-medium text-sm mb-1">Embarque</div>
                        <div className="text-sm text-muted-foreground">
                          {destination.embarque.local && <div>Local: {destination.embarque.local}</div>}
                          <div>Horário: {destination.embarque.horario}</div>
                        </div>
                      </div>
                    </div>
                  )}

                  {destination.retorno && (
                    <div className="flex items-start gap-3">
                      <Clock className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <div>
                        <div className="font-medium text-sm mb-1">Retorno</div>
                        <div className="text-sm text-muted-foreground">
                          {destination.retorno.local && <div>Local: {destination.retorno.local}</div>}
                          <div>Horário: {destination.retorno.horario}</div>
                        </div>
                      </div>
                    </div>
                  )}

                  {destination.childPolicy && (
                    <div className="flex items-start gap-3">
                      <Users className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <div>
                        <div className="font-medium text-sm mb-1">Política de Crianças</div>
                        <div className="text-sm text-muted-foreground">
                          {destination.childPolicy}
                        </div>
                      </div>
                    </div>
                  )}

                  {destination.hospedagem && (
                    <div className="flex items-start gap-3">
                      <Home className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <div>
                        <div className="font-medium text-sm mb-1">Hospedagem</div>
                        <div className="text-sm text-muted-foreground">
                          {destination.hospedagem}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <Button 
                  className="w-full mt-6" 
                  size="lg"
                  onClick={() => {
                    const element = document.querySelector('[data-testid="button-whatsapp-toggle"]') as HTMLElement;
                    if (element) element.click();
                  }}
                  data-testid="button-book-now"
                >
                  Reservar Agora
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <Footer />
      <WhatsAppButton />
      <AIChatbot />
    </div>
  );
}
