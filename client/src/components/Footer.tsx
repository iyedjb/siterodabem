import { motion } from 'framer-motion';
import { Instagram, Facebook, Mail, Phone, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-card/50 to-card border-t border-card-border pt-16 pb-8 safe-area-bottom" data-testid="footer">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="font-serif text-3xl font-bold mb-4 gradient-text" data-testid="text-footer-brand">
              Rodabem Turismo
            </h3>
            <p className="text-muted-foreground leading-relaxed mb-6" data-testid="text-footer-tagline">
              Transformando sonhos em experiências inesquecíveis desde 2020.
            </p>
            <p className="text-sm text-muted-foreground mb-4">CNPJ: 27.643.750/0019-0</p>
            <div className="flex gap-3">
              <a 
                href="https://instagram.com/rodabemturismo" 
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center hover-elevate active-elevate-2 transition-all"
                data-testid="link-footer-instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a 
                href="https://facebook.com/rodabemturismo" 
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center hover-elevate active-elevate-2 transition-all"
                data-testid="link-footer-facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a 
                href="mailto:contato@rodabemturismo.com" 
                className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center hover-elevate active-elevate-2 transition-all"
                data-testid="link-footer-email"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h4 className="font-bold text-lg mb-6" data-testid="text-footer-quick-links">Navegação</h4>
            <ul className="space-y-3">
              <li><a href="/" className="text-muted-foreground hover:text-primary transition-colors" data-testid="link-footer-home">Início</a></li>
              <li><a href="/destinations" className="text-muted-foreground hover:text-primary transition-colors" data-testid="link-footer-destinations">Destinos</a></li>
              <li><a href="/testimonials" className="text-muted-foreground hover:text-primary transition-colors" data-testid="link-footer-testimonials">Depoimentos</a></li>
              <li><a href="/contact" className="text-muted-foreground hover:text-primary transition-colors" data-testid="link-footer-contact">Contato</a></li>
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h4 className="font-bold text-lg mb-6">Serviços</h4>
            <ul className="space-y-3 text-muted-foreground">
              <li>Pacotes de Viagem</li>
              <li>Reservas de Hotel</li>
              <li>Passagens Aéreas</li>
              <li>Roteiros Personalizados</li>
              <li>Assessoria Completa</li>
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <h4 className="font-bold text-lg mb-6">Contato</h4>
            <div className="space-y-4 text-muted-foreground">
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-foreground">WhatsApp</p>
                  <p className="text-sm">(31) 99085-8868</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-foreground">Email</p>
                  <p className="text-sm">contato@rodabemturismo.com</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-foreground">Endereço</p>
                  <p className="text-sm">Esmeraldas, MG - Brasil</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground text-center md:text-left" data-testid="text-footer-copyright">
            © 2024 Rodabem Turismo. Todos os direitos reservados.
          </p>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <a href="#" className="hover:text-primary transition-colors">Política de Privacidade</a>
            <a href="#" className="hover:text-primary transition-colors">Termos de Uso</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

