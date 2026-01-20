import { Button } from "@/components/ui/button";
import { Calendar, ArrowRight } from "lucide-react";

const events = [
  {
    date: "Jan 26",
    title: "Church Business Meeting",
    time: "Following the Sunday evening service",
    description:
      "Yearly business meeting featuring the Deacon's Report and presentation of the proposed Church Budget for 2026.",
  },
];

export const EventsSection = () => {
  return (
    <section id="events" className="py-20 md:py-28 bg-primary">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <p className="text-gold-light font-body text-sm tracking-[0.2em] uppercase mb-3">
            What's Happening
          </p>
          <h2 className="font-display text-3xl md:text-5xl text-cream font-bold mb-4">
            Upcoming Events
          </h2>
          <p className="text-cream/80 font-body max-w-xl mx-auto">
            Join us for special gatherings, celebrations, and opportunities to grow together.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-12">
          {events.map((event, index) => (
            <div
              key={index}
              className="bg-forest-light/30 backdrop-blur-sm border border-cream/10 p-6 rounded-xl hover:bg-forest-light/40 transition-all duration-300 group"
            >
              <div className="flex items-start gap-4">
                <div className="bg-accent text-accent-foreground px-3 py-2 rounded-lg text-center min-w-[60px]">
                  <span className="font-display font-bold text-lg block leading-tight">
                    {event.date.split(" ")[1]}
                  </span>
                  <span className="text-xs uppercase">
                    {event.date.split(" ")[0]}
                  </span>
                </div>
                <div className="flex-1">
                  <h3 className="font-display text-lg font-semibold text-cream mb-1 group-hover:text-gold-light transition-colors">
                    {event.title}
                  </h3>
                  <p className="text-cream/60 font-body text-sm flex items-center gap-1 mb-2">
                    <Calendar className="w-3 h-3" />
                    {event.time}
                  </p>
                  <p className="text-cream/80 font-body text-sm">
                    {event.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Button variant="hero" size="lg" className="group">
            View All Events
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </section>
  );
};
