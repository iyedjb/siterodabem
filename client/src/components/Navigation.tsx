import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, MapPin, MessageCircle, Phone, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const navItems = [
  { path: '/', label: 'Início', icon: Home },
  { path: '/destinations', label: 'Destinos', icon: MapPin },
  { path: '/testimonials', label: 'Depoimentos', icon: MessageCircle },
  { path: '/contact', label: 'Contato', icon: Phone },
];

export default function Navigation() {
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Desktop Navigation - Floating Pill */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        className="hidden md:flex fixed top-4 inset-x-0 z-50 justify-center"
      >
        <div className="glass rounded-full px-6 py-3 shadow-xl">
          <div className="flex items-center justify-center gap-2">
            {navItems.map((item) => (
              <Link key={item.path} href={item.path}>
                <Button
                  variant={location === item.path ? "default" : "ghost"}
                  size="sm"
                  className="rounded-full px-4"
                  data-testid={`link-nav-${item.label.toLowerCase()}`}
                >
                  {item.label}
                </Button>
              </Link>
            ))}
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden fixed inset-0 bg-black/60 z-40 backdrop-blur-sm"
              onClick={() => setIsOpen(false)}
              data-testid="overlay-mobile-menu"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2 }}
              className="md:hidden fixed bottom-24 left-4 right-4 z-50"
              data-testid="menu-mobile"
            >
              <div className="glass rounded-3xl p-6 shadow-2xl">
                <div className="space-y-2">
                  {navItems.map((item, index) => (
                    <motion.div
                      key={item.path}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Link href={item.path}>
                        <Button
                          variant={location === item.path ? "default" : "ghost"}
                          className="w-full justify-start gap-3 rounded-2xl h-14 text-base"
                          onClick={() => setIsOpen(false)}
                          data-testid={`link-mobile-${item.label.toLowerCase()}`}
                        >
                          <item.icon className="w-5 h-5" />
                          <span>{item.label}</span>
                        </Button>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Mobile Bottom Navigation Bar - Single Fixed Layer */}
      <motion.nav
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
        className="md:hidden fixed bottom-0 left-0 right-0 z-40 safe-area-bottom"
      >
        <div className="glass border-t border-border/20 px-2 pb-2 pt-2">
          <div className="flex items-center justify-around">
            {navItems.map((item) => (
              <Link key={item.path} href={item.path}>
                <button
                  className={`flex flex-col items-center gap-1 px-3 py-2 rounded-2xl transition-all min-w-[70px] ${
                    location === item.path
                      ? 'text-primary'
                      : 'text-muted-foreground hover-elevate'
                  }`}
                  data-testid={`link-bottom-nav-${item.label.toLowerCase()}`}
                >
                  <item.icon className={`w-6 h-6 ${location === item.path ? 'fill-primary/20' : ''}`} />
                  <span className="text-xs font-medium">{item.label}</span>
                </button>
              </Link>
            ))}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="flex flex-col items-center gap-1 px-3 py-2 rounded-2xl text-muted-foreground hover-elevate transition-all min-w-[70px]"
              data-testid="button-nav-menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              <span className="text-xs font-medium">Menu</span>
            </button>
          </div>
        </div>
      </motion.nav>
    </>
  );
}
