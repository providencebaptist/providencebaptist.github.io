import { Button } from "@/components/ui/button";
import { Heart, BookOpen, Users2 } from "lucide-react";

const values = [
  {
    icon: BookOpen,
    title: "Biblical Teaching",
    description: "Rooted in Scripture, we seek to understand and apply God's Word to our daily lives.",
  },
  {
    icon: Heart,
    title: "Loving Community",
    description: "We're a family that cares for one another, celebrating joys and supporting through challenges.",
  },
  {
    icon: Users2,
    title: "Welcoming All",
    description: "No matter where you are in your faith journey, you have a place here.",
  },
];

export const AboutSection = () => {
  return (
    <section id="about" className="py-20 md:py-28 bg-card">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Content */}
          <div>
            <p className="text-accent font-body text-sm tracking-[0.2em] uppercase mb-3">
              About Us
            </p>
            <h2 className="font-display text-3xl md:text-5xl text-foreground font-bold mb-6">
              A Community of Faith Since 1952
            </h2>
            <p className="text-muted-foreground font-body text-lg mb-6 leading-relaxed">
              For over 70 years, Providence Baptist Church has been a beacon of hope in our community. 
              We're a congregation committed to sharing the love of Christ through worship, fellowship, 
              and service to others.
            </p>
            <p className="text-muted-foreground font-body text-lg mb-8 leading-relaxed">
              Whether you're seeking answers to life's big questions, looking for a community to belong to, 
              or wanting to deepen your relationship with God, we invite you to journey with us.
            </p>
            <Button variant="gold" size="lg">
              Learn More About Us
            </Button>
          </div>

          {/* Right - Values Grid */}
          <div className="space-y-6">
            {values.map((value, index) => (
              <div
                key={index}
                className="flex gap-5 p-6 bg-background rounded-xl shadow-soft hover:shadow-card transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <value.icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                    {value.title}
                  </h3>
                  <p className="text-muted-foreground font-body text-sm">
                    {value.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
