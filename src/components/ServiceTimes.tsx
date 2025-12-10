import { Clock } from "lucide-react";
import { Card, CardContent } from "./ui/card";

const ServiceTimes = () => {
  const services = [
    {
      day: "Sunday Morning",
      events: [
        { name: "Bible Study Classes", time: "10:00 AM" },
        { name: "Worship Service", time: "11:00 AM" },
      ],
    },
    {
      day: "Sunday Evening",
      events: [{ name: "Family Worship Service", time: "5:30 PM" }],
    },
    {
      day: "Wednesday",
      events: [{ name: "Prayer & Bible Study", time: "7:00 PM" }],
    },
  ];

  return (
    <section className="py-12 sm:py-16 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 sm:mb-12 text-foreground">
          Service Times
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 max-w-5xl mx-auto">
          {services.map((service) => (
            <Card key={service.day} className="shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-accent/10 rounded-lg">
                    <Clock className="h-6 w-6 text-accent" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground">{service.day}</h3>
                </div>
                <div className="space-y-2">
                  {service.events.map((event) => (
                    <div key={event.name} className="flex flex-col">
                      <span className="font-semibold text-foreground">{event.name}</span>
                      <span className="text-muted-foreground">{event.time}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        <p className="text-center mt-4 sm:mt-6 text-sm sm:text-base text-muted-foreground px-4">All times are Central Time (CT)</p>
      </div>
    </section>
  );
};

export default ServiceTimes;
