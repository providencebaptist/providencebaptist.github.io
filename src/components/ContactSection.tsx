import { Button } from "@/components/ui/button";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

const contactInfo = [
  {
    icon: MapPin,
    label: "Address",
    value: "123 Faith Street\nProvidence, RI 02903",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "(401) 555-0123",
  },
  {
    icon: Mail,
    label: "Email",
    value: "info@providencebaptist.org",
  },
  {
    icon: Clock,
    label: "Office Hours",
    value: "Mon-Fri: 9AM - 4PM",
  },
];

export const ContactSection = () => {
  return (
    <section id="contact" className="py-20 md:py-28 bg-gradient-cream">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left - Contact Info */}
          <div>
            <p className="text-accent font-body text-sm tracking-[0.2em] uppercase mb-3">
              Get In Touch
            </p>
            <h2 className="font-display text-3xl md:text-5xl text-foreground font-bold mb-6">
              We'd Love to Hear From You
            </h2>
            <p className="text-muted-foreground font-body text-lg mb-10">
              Have questions? Want to learn more about our church family? 
              Reach out to us anytime – we're here to help.
            </p>

            <div className="grid sm:grid-cols-2 gap-6">
              {contactInfo.map((item, index) => (
                <div key={index} className="flex gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-muted-foreground font-body text-sm mb-1">{item.label}</p>
                    <p className="text-foreground font-body font-medium whitespace-pre-line">
                      {item.value}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right - Contact Form */}
          <div className="bg-card p-8 md:p-10 rounded-2xl shadow-card">
            <h3 className="font-display text-2xl font-semibold text-foreground mb-6">
              Send Us a Message
            </h3>
            <form className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-body font-medium text-foreground mb-2">
                    First Name
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground font-body focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                    placeholder="John"
                  />
                </div>
                <div>
                  <label className="block text-sm font-body font-medium text-foreground mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground font-body focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                    placeholder="Doe"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-body font-medium text-foreground mb-2">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground font-body focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                  placeholder="john@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-body font-medium text-foreground mb-2">
                  Message
                </label>
                <textarea
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground font-body focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none"
                  placeholder="How can we help you?"
                />
              </div>
              <Button variant="gold" size="lg" className="w-full">
                Send Message
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
