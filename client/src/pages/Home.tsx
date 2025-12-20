import Hero from '@/components/Hero';
import DestinationsGallery from '@/components/DestinationsGallery';
import MobileAppShowcase from '@/components/MobileAppShowcase';
import ServicesSection from '@/components/ServicesSection';
import FeedbackSection from '@/components/FeedbackSection';
import Footer from '@/components/Footer';
import Navigation from '@/components/Navigation';
import AIChatbot from '@/components/AIChatbot';

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <Hero />
      <DestinationsGallery />
      <MobileAppShowcase />
      <ServicesSection />
      <FeedbackSection />
      <Footer />
      <AIChatbot />
    </div>
  );
}
