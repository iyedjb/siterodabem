import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';
import { ChevronLeft, ChevronRight, X, Images, ZoomIn, Pause, Play } from 'lucide-react';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';

interface ImageGalleryProps {
  images: string[];
  name: string;
  autoPlayInterval?: number;
}

export default function ImageGallery({ images, name, autoPlayInterval = 5000 }: ImageGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [direction, setDirection] = useState(0);

  const goToNext = useCallback(() => {
    setDirection(1);
    setSelectedIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const goToPrev = useCallback(() => {
    setDirection(-1);
    setSelectedIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  const goToIndex = (index: number) => {
    setDirection(index > selectedIndex ? 1 : -1);
    setSelectedIndex(index);
  };

  useEffect(() => {
    if (!isAutoPlaying || images.length <= 1 || isLightboxOpen) return;

    const interval = setInterval(() => {
      goToNext();
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [isAutoPlaying, images.length, isLightboxOpen, autoPlayInterval, goToNext]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') {
      setIsAutoPlaying(false);
      goToNext();
    }
    if (e.key === 'ArrowLeft') {
      setIsAutoPlaying(false);
      goToPrev();
    }
    if (e.key === 'Escape') setIsLightboxOpen(false);
  };

  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const threshold = 50;
    if (info.offset.x > threshold) {
      setIsAutoPlaying(false);
      goToPrev();
    } else if (info.offset.x < -threshold) {
      setIsAutoPlaying(false);
      goToNext();
    }
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0,
    }),
  };

  if (images.length === 0) return null;

  return (
    <div 
      className="relative" 
      onKeyDown={handleKeyDown}
      tabIndex={0}
      aria-label={`Galeria de fotos de ${name}. Use as setas do teclado para navegar.`}
    >
      <div className="relative h-[50vh] md:h-[60vh] overflow-hidden touch-pan-y">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.img
            key={selectedIndex}
            src={images[selectedIndex]}
            alt={`${name} - Foto ${selectedIndex + 1}`}
            className="absolute inset-0 w-full h-full object-cover"
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ 
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 }
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={handleDragEnd}
          />
        </AnimatePresence>
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent pointer-events-none" />

        {images.length > 1 && (
          <>
            <Button
              size="icon"
              variant="ghost"
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white backdrop-blur-sm z-10 hidden md:flex"
              onClick={() => {
                setIsAutoPlaying(false);
                goToPrev();
              }}
              data-testid="button-gallery-prev"
              aria-label="Foto anterior"
            >
              <ChevronLeft className="w-6 h-6" />
            </Button>
            
            <Button
              size="icon"
              variant="ghost"
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white backdrop-blur-sm z-10 hidden md:flex"
              onClick={() => {
                setIsAutoPlaying(false);
                goToNext();
              }}
              data-testid="button-gallery-next"
              aria-label="Próxima foto"
            >
              <ChevronRight className="w-6 h-6" />
            </Button>

            <Button
              size="icon"
              variant="ghost"
              className="absolute left-4 top-24 bg-black/40 hover:bg-black/60 text-white backdrop-blur-sm z-10"
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              data-testid="button-autoplay-toggle"
              aria-label={isAutoPlaying ? "Pausar apresentação" : "Iniciar apresentação"}
            >
              {isAutoPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </Button>
          </>
        )}

        <div className="absolute bottom-24 left-1/2 -translate-x-1/2 flex items-center gap-2 z-10">
          <Button
            size="sm"
            variant="ghost"
            className="bg-black/40 hover:bg-black/60 text-white backdrop-blur-sm gap-2"
            onClick={() => setIsLightboxOpen(true)}
            data-testid="button-view-gallery"
          >
            <ZoomIn className="w-4 h-4" />
            <span className="hidden sm:inline">Ver Galeria</span>
            <span className="flex items-center gap-1">
              <Images className="w-4 h-4" />
              {images.length}
            </span>
          </Button>
        </div>

        {images.length > 1 && (
          <>
            <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex gap-2 z-10" role="tablist" aria-label="Navegação de fotos">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setIsAutoPlaying(false);
                    goToIndex(index);
                  }}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === selectedIndex 
                      ? 'bg-white w-6' 
                      : 'bg-white/50 hover:bg-white/75'
                  }`}
                  data-testid={`button-gallery-dot-${index}`}
                  role="tab"
                  aria-selected={index === selectedIndex}
                  aria-label={`Ver foto ${index + 1} de ${images.length}`}
                />
              ))}
            </div>

            {isAutoPlaying && (
              <div className="absolute bottom-16 left-1/2 -translate-x-1/2 w-24 z-10 mt-4">
                <motion.div 
                  className="h-0.5 bg-white/30 rounded-full overflow-hidden"
                >
                  <motion.div
                    className="h-full bg-primary"
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: autoPlayInterval / 1000, ease: "linear" }}
                    key={selectedIndex}
                  />
                </motion.div>
              </div>
            )}

            <div className="md:hidden absolute bottom-2 left-1/2 -translate-x-1/2 text-white/60 text-xs z-10">
              Deslize para ver mais fotos
            </div>
          </>
        )}
      </div>

      {images.length > 1 && (
        <div className="absolute bottom-4 left-4 right-4 z-10 hidden md:block">
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide" role="listbox" aria-label="Miniaturas das fotos">
            {images.map((img, index) => (
              <motion.button
                key={index}
                onClick={() => {
                  setIsAutoPlaying(false);
                  goToIndex(index);
                }}
                className={`flex-shrink-0 w-16 h-12 md:w-20 md:h-14 rounded-md overflow-hidden border-2 transition-all duration-300 ${
                  index === selectedIndex 
                    ? 'border-primary ring-2 ring-primary/50' 
                    : 'border-white/30 hover:border-white/60'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                data-testid={`button-thumbnail-${index}`}
                role="option"
                aria-selected={index === selectedIndex}
                aria-label={`Ver foto ${index + 1} de ${images.length}`}
              >
                <img 
                  src={img} 
                  alt={`${name} - Miniatura ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </motion.button>
            ))}
          </div>
        </div>
      )}

      <Dialog open={isLightboxOpen} onOpenChange={setIsLightboxOpen}>
        <DialogContent className="max-w-[95vw] max-h-[95vh] p-0 bg-black/95 border-none">
          <VisuallyHidden>
            <DialogTitle>Galeria de fotos - {name}</DialogTitle>
          </VisuallyHidden>
          <div className="relative w-full h-[90vh] flex items-center justify-center" onKeyDown={handleKeyDown} tabIndex={0}>
            <Button
              size="icon"
              variant="ghost"
              className="absolute right-4 top-4 text-white hover:bg-white/20 z-20"
              onClick={() => setIsLightboxOpen(false)}
              data-testid="button-lightbox-close"
            >
              <X className="w-6 h-6" />
            </Button>

            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.img
                key={selectedIndex}
                src={images[selectedIndex]}
                alt={`${name} - Foto ${selectedIndex + 1}`}
                className="max-w-full max-h-[80vh] object-contain"
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ 
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 }
                }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.2}
                onDragEnd={handleDragEnd}
              />
            </AnimatePresence>

            {images.length > 1 && (
              <>
                <Button
                  size="icon"
                  variant="ghost"
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20"
                  onClick={goToPrev}
                  data-testid="button-lightbox-prev"
                >
                  <ChevronLeft className="w-8 h-8" />
                </Button>
                
                <Button
                  size="icon"
                  variant="ghost"
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20"
                  onClick={goToNext}
                  data-testid="button-lightbox-next"
                >
                  <ChevronRight className="w-8 h-8" />
                </Button>
              </>
            )}

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-sm bg-black/50 px-4 py-2 rounded-full backdrop-blur-sm">
              {selectedIndex + 1} / {images.length}
            </div>

            <div className="absolute bottom-16 left-4 right-4 flex justify-center gap-2 overflow-x-auto pb-2">
              {images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => goToIndex(index)}
                  className={`flex-shrink-0 w-16 h-12 rounded-md overflow-hidden border-2 transition-all duration-300 ${
                    index === selectedIndex 
                      ? 'border-primary ring-2 ring-primary/50' 
                      : 'border-white/30 hover:border-white/60'
                  }`}
                  data-testid={`button-lightbox-thumb-${index}`}
                >
                  <img 
                    src={img} 
                    alt={`${name} - Miniatura ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
