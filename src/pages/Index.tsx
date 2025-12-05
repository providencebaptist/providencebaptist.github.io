import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { ServiceTimes } from "@/components/ServiceTimes";
import { AboutSection } from "@/components/AboutSection";
import { EventsSection } from "@/components/EventsSection";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <ServiceTimes />
        <AboutSection />
        <EventsSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
