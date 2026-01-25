import { Calendar, MapPin, Clock } from "lucide-react";
import { useChurchData } from "@/hooks/useChurchData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import SEO from "@/components/SEO";
import { useState, useEffect, useRef, useCallback } from "react";

const EVENTS_PER_PAGE = 12;

const Events = () => {
  const { events, loading } = useChurchData();
  const [visibleCount, setVisibleCount] = useState(EVENTS_PER_PAGE);
  const loadMoreRef = useRef<HTMLDivElement>(null);

  const loadMore = useCallback(() => {
    setVisibleCount((prev) => Math.min(prev + EVENTS_PER_PAGE, events.length));
  }, [events.length]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && visibleCount < events.length) {
          loadMore();
        }
      },
      { threshold: 0.1 }
    );

    const currentRef = loadMoreRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [visibleCount, events.length, loadMore]);

  const visibleEvents = events.slice(0, visibleCount);

  return (
    <>
      <SEO
        title="Upcoming Events | Providence Baptist Church"
        description="View upcoming events at Providence Baptist Church in Georgetown, Texas. Join us for special gatherings, meetings, and fellowship opportunities."
      />

      {/* Hero Section */}
      <section className="bg-primary text-primary-foreground py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <p className="text-primary-foreground/70 font-body text-sm tracking-[0.2em] uppercase mb-3">
            What's Happening
          </p>
          <h1 className="font-display text-4xl md:text-6xl font-bold mb-4">
            Upcoming Events
          </h1>
          <p className="text-primary-foreground/80 font-body max-w-2xl mx-auto text-lg">
            Join us for special gatherings, celebrations, and opportunities to grow together as a church family.
          </p>
        </div>
      </section>

      {/* Events List */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="text-center text-muted-foreground">Loading events...</div>
          ) : events.length === 0 ? (
            <div className="text-center">
              <p className="text-muted-foreground text-lg">No upcoming events at this time.</p>
              <p className="text-muted-foreground mt-2">Check back soon for updates!</p>
            </div>
          ) : (
            <>
              <p className="text-center text-muted-foreground mb-8">
                Showing {visibleCount} of {events.length} events
              </p>
              <div className="grid gap-6 max-w-3xl mx-auto">
                {visibleEvents.map((event, index) => {
                  const dateObj = new Date(event.date);
                  const dayName = dateObj.toLocaleDateString("en-US", { weekday: "long" });
                  const monthName = dateObj.toLocaleDateString("en-US", { month: "long" });
                  const dayNum = dateObj.getDate();
                  const year = dateObj.getFullYear();

                  return (
                    <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
                      <div className="flex flex-col sm:flex-row">
                        {/* Date Badge */}
                        <div className="bg-accent text-accent-foreground p-6 flex flex-col items-center justify-center min-w-[120px]">
                          <span className="text-sm uppercase font-medium">{monthName.slice(0, 3)}</span>
                          <span className="font-display text-4xl font-bold">{dayNum}</span>
                          <span className="text-sm">{year}</span>
                        </div>

                        {/* Event Details */}
                        <div className="flex-1">
                          <CardHeader>
                            <CardTitle className="font-display text-xl md:text-2xl text-foreground">
                              {event.name}
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-3">
                            <p className="text-muted-foreground">{event.description}</p>
                            
                            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                              <div className="flex items-center gap-1.5">
                                <Calendar className="w-4 h-4" />
                                <span>{dayName}, {monthName} {dayNum}, {year}</span>
                              </div>
                              {event.time && (
                                <div className="flex items-center gap-1.5">
                                  <Clock className="w-4 h-4" />
                                  <span>{event.time}</span>
                                </div>
                              )}
                              {event.location && (
                                <div className="flex items-center gap-1.5">
                                  <MapPin className="w-4 h-4" />
                                  <span>{event.location}</span>
                                </div>
                              )}
                            </div>
                          </CardContent>
                        </div>
                      </div>
                    </Card>
                  );
                })}
              </div>

              {/* Load more trigger */}
              {visibleCount < events.length && (
                <div ref={loadMoreRef} className="flex justify-center py-8">
                  <div className="text-muted-foreground animate-pulse">Loading more events...</div>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </>
  );
};

export default Events;
