import { Clock, MapPin, Users } from "lucide-react";

const services = [
  {
    day: "Sunday",
    name: "Morning Worship",
    time: "10:30 AM",
    description: "Join us for our main worship service with music, prayer, and biblical teaching.",
    icon: Users,
  },
  {
    day: "Sunday",
    name: "Sunday School",
    time: "9:00 AM",
    description: "Classes for all ages to grow in faith and community.",
    icon: Clock,
  },
  {
    day: "Wednesday",
    name: "Bible Study",
    time: "7:00 PM",
    description: "Midweek gathering for deeper study and fellowship.",
    icon: MapPin,
  },
];

export const ServiceTimes = () => {
  return (
    <section id="services" className="py-20 md:py-28 bg-gradient-cream">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <p className="text-accent font-body text-sm tracking-[0.2em] uppercase mb-3">Join Us</p>
          <h2 className="font-display text-3xl md:text-5xl text-foreground font-bold mb-4">
            Service Times
          </h2>
          <p className="text-muted-foreground font-body max-w-xl mx-auto">
            We'd love to have you worship with us. Here's when you can find us gathering together.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-card p-8 rounded-xl shadow-card hover:shadow-lg transition-all duration-300 group"
            >
              <div className="w-14 h-14 rounded-full bg-secondary flex items-center justify-center mb-6 group-hover:bg-accent/10 transition-colors">
                <service.icon className="w-6 h-6 text-primary" />
              </div>
              <p className="text-accent font-body text-sm font-semibold uppercase tracking-wider mb-1">
                {service.day}
              </p>
              <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                {service.name}
              </h3>
              <p className="text-2xl font-display font-bold text-primary mb-3">
                {service.time}
              </p>
              <p className="text-muted-foreground font-body text-sm">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
