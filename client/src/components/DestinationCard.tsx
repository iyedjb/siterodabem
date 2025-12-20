import { motion } from 'framer-motion';
import { useLocation } from 'wouter';
import { ArrowUpRight } from 'lucide-react';

interface DestinationCardProps {
  id: string;
  name: string;
  location: string;
  image: string;
  price?: string;
  index: number;
}

export default function DestinationCard({ id, name, location, image, price, index }: DestinationCardProps) {
  const [, setLocation] = useLocation();

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.12 }}
      viewport={{ once: true, margin: "-100px" }}
      className="flex-shrink-0 w-[85vw] md:w-full"
      data-testid={`card-destination-${id}`}
      whileHover={{ y: -8 }}
    >
      <motion.div 
        className="relative h-[380px] rounded-md overflow-hidden cursor-pointer group shadow-lg"
        onClick={() => setLocation(`/destination/${id}`)}
        whileHover={{ boxShadow: "0 20px 60px rgba(20, 184, 166, 0.3)" }}
      >
        <motion.img 
          src={image} 
          alt={name}
          className="w-full h-full object-cover"
          initial={{ scale: 1 }}
          whileHover={{ scale: 1.15 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        />
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent group-hover:from-black/80 transition-all duration-300" />
        
        {price && (
          <div className="absolute top-4 right-4 bg-primary text-primary-foreground px-3 py-1.5 rounded-full font-bold text-sm shadow-lg">
            {price}
          </div>
        )}
        
        <div className="absolute inset-0 flex flex-col justify-end p-5 text-white overflow-hidden">
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            whileHover={{ opacity: 0.1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="absolute top-0 right-0 w-32 h-32 bg-accent blur-3xl"
          />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.12 + 0.2 }}
            className="relative z-10"
          >
            <div className="flex items-start justify-between mb-2">
              <div>
                <h3 
                  className="font-serif text-2xl md:text-3xl font-semibold mb-1 group-hover:text-accent transition-colors duration-300"
                  data-testid={`text-destination-name-${id}`}
                >
                  {name}
                </h3>
                <motion.p 
                  className="text-sm opacity-90 flex items-center gap-2"
                  data-testid={`text-destination-location-${id}`}
                >
                  <span className="w-1 h-1 bg-accent rounded-full" />
                  {location}
                </motion.p>
              </div>
              <motion.div
                initial={{ opacity: 0, x: 10 }}
                whileHover={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                className="flex-shrink-0"
              >
                <ArrowUpRight className="w-5 h-5 text-accent" />
              </motion.div>
            </div>
          </motion.div>
        </div>
        
        <motion.div 
          className="absolute inset-0 rounded-md border-2 border-accent/0 group-hover:border-accent/50 transition-all duration-300 pointer-events-none"
        />
      </motion.div>
    </motion.div>
  );
}
