import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-church.jpg";

export const HeroSection = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Providence Baptist Church interior"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-hero" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <p className="text-gold-light font-body text-sm md:text-base tracking-[0.3em] uppercase mb-4 opacity-0 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            Welcome to
          </p>
          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl text-cream font-bold mb-6 opacity-0 animate-fade-in" style={{ animationDelay: "0.4s" }}>
            Providence Baptist Church
          </h1>
          <p className="text-cream/90 font-body text-lg md:text-xl max-w-xl mx-auto mb-10 opacity-0 animate-fade-in" style={{ animationDelay: "0.6s" }}>
            A place where faith grows, community thrives, and everyone is welcome to experience God's love.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center opacity-0 animate-fade-in" style={{ animationDelay: "0.8s" }}>
            <Button variant="hero" size="xl">
              Plan Your Visit
            </Button>
            <Button variant="heroOutline" size="xl">
              Watch Online
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 opacity-0 animate-fade-in" style={{ animationDelay: "1.2s" }}>
        <div className="w-6 h-10 border-2 border-cream/50 rounded-full flex justify-center pt-2">
          <div className="w-1 h-3 bg-cream/70 rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
};
