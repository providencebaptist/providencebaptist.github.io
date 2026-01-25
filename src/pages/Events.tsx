import { Calendar, MapPin, Clock, Filter } from "lucide-react";
import { useChurchData } from "@/hooks/useChurchData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import SEO from "@/components/SEO";
import { useState, useEffect, useRef, useCallback, useMemo } from "react";

const EVENTS_PER_PAGE = 12;

type FilterType = "all" | "sunday-am" | "sunday-pm" | "wednesday" | "special";

const FILTERS: { value: FilterType; label: string }[] = [
  { value: "all", label: "All Events" },
  { value: "sunday-am", label: "Sunday AM" },
  { value: "sunday-pm", label: "Sunday PM" },
  { value: "wednesday", label: "Wednesday" },
  { value: "special", label: "Special Events" },
];

const getEventCategory = (eventName: string): FilterType => {
  const name = eventName.toLowerCase();
  if (name.includes("sunday morning") || name.includes("sunday am")) {
    return "sunday-am";
  }
  if (name.includes("sunday evening") || name.includes("sunday pm")) {
    return "sunday-pm";
  }
  if (name.includes("wednesday") || name.includes("prayer & bible study") || name.includes("midweek")) {
    return "wednesday";
  }
  return "special";
};

const Events = () => {
  const { events, loading } = useChurchData();
  const [activeFilter, setActiveFilter] = useState<FilterType>("all");
  const [visibleCount, setVisibleCount] = useState(EVENTS_PER_PAGE);
  const loadMoreRef = useRef<HTMLDivElement>(null);

  const filteredEvents = useMemo(() => {
    if (activeFilter === "all") return events;
    return events.filter((event) => getEventCategory(event.name) === activeFilter);
  }, [events, activeFilter]);

  const loadMore = useCallback(() => {
    setVisibleCount((prev) => Math.min(prev + EVENTS_PER_PAGE, filteredEvents.length));
  }, [filteredEvents.length]);

  // Reset visible count when filter changes
  useEffect(() => {
    setVisibleCount(EVENTS_PER_PAGE);
  }, [activeFilter]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && visibleCount < filteredEvents.length) {
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
  }, [visibleCount, filteredEvents.length, loadMore]);

  const visibleEvents = filteredEvents.slice(0, visibleCount);

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
              {/* Filter Buttons */}
              <div className="mb-8 max-w-3xl mx-auto">
                <div className="flex items-center gap-2 mb-4">
                  <Filter className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm font-medium text-muted-foreground">Filter by type:</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {FILTERS.map((filter) => (
                    <Button
                      key={filter.value}
                      variant={activeFilter === filter.value ? "default" : "outline"}
                      size="sm"
                      onClick={() => setActiveFilter(filter.value)}
                      className="transition-all"
                    >
                      {filter.label}
                    </Button>
                  ))}
                </div>
              </div>

              <p className="text-center text-muted-foreground mb-8">
                Showing {Math.min(visibleCount, filteredEvents.length)} of {filteredEvents.length} events
              </p>

              {filteredEvents.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-muted-foreground text-lg">No events found for this filter.</p>
                  <Button
                    variant="link"
                    onClick={() => setActiveFilter("all")}
                    className="mt-2"
                  >
                    View all events
                  </Button>
                </div>
              ) : (
                <div className="grid gap-6 max-w-3xl mx-auto">
                  {visibleEvents.map((event, index) => {
                    const dateObj = new Date(event.date);
                    const dayName = dateObj.toLocaleDateString("en-US", { weekday: "long" });
                    const monthName = dateObj.toLocaleDateString("en-US", { month: "long" });
                    const dayNum = dateObj.getDate();
                    const year = dateObj.getFullYear();
                    const category = getEventCategory(event.name);

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
                            <CardHeader className="pb-2">
                              <div className="flex items-start justify-between gap-2">
                                <CardTitle className="font-display text-xl md:text-2xl text-foreground">
                                  {event.name}
                                </CardTitle>
                                {category === "special" && (
                                  <span className="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded-full font-medium whitespace-nowrap">
                                    Special Event
                                  </span>
                                )}
                              </div>
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
              )}

              {/* Load more trigger */}
              {visibleCount < filteredEvents.length && (
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
