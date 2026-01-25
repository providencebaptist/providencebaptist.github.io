import { Calendar, MapPin, Clock, Filter, Video, Navigation } from "lucide-react";
import { useChurchData } from "@/hooks/useChurchData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import SEO from "@/components/SEO";
import { useState, useEffect, useRef, useCallback, useMemo } from "react";

const EVENTS_PER_PAGE = 12;

type FilterType = "all" | "sunday" | "wednesday" | "sunday-school" | "bible-study" | "special";

const FILTERS: { value: FilterType; label: string }[] = [
  { value: "all", label: "All Events" },
  { value: "sunday", label: "Sunday" },
  { value: "wednesday", label: "Wednesday" },
  { value: "sunday-school", label: "Sunday School" },
  { value: "bible-study", label: "Bible Studies" },
  { value: "special", label: "Special Events" },
];

const CATEGORY_LABELS: Record<FilterType, string> = {
  "all": "All",
  "sunday": "Sunday Service",
  "wednesday": "Wednesday",
  "sunday-school": "Sunday School",
  "bible-study": "Bible Study",
  "special": "Special Event",
};

const CATEGORY_COLORS: Record<FilterType, string> = {
  "all": "bg-muted text-muted-foreground",
  "sunday": "bg-primary/10 text-primary",
  "wednesday": "bg-secondary/80 text-secondary-foreground",
  "sunday-school": "bg-accent/20 text-accent-foreground",
  "bible-study": "bg-muted text-foreground",
  "special": "bg-destructive/10 text-destructive",
};

const getEventCategories = (eventName: string): FilterType[] => {
  const name = eventName.toLowerCase();
  const categories: FilterType[] = [];
  
  if (name.includes("sunday morning") || name.includes("sunday am") || name.includes("sunday evening") || name.includes("sunday pm")) {
    categories.push("sunday");
  }
  if (name.includes("wednesday") || name.includes("midweek")) {
    categories.push("wednesday");
  }
  if (name.includes("prayer & bible study")) {
    categories.push("wednesday", "bible-study");
  }
  if (name.includes("sunday school")) {
    categories.push("sunday-school");
  }
  if (name.includes("ladies bible study")) {
    categories.push("bible-study");
  }
  
  // Remove duplicates and return
  const uniqueCategories = [...new Set(categories)];
  return uniqueCategories.length > 0 ? uniqueCategories : ["special"];
};

const isLivestreamed = (eventName: string): boolean => {
  const name = eventName.toLowerCase();
  return (
    name.includes("sunday morning worship") ||
    name.includes("sunday evening service") ||
    name.includes("wednesday prayer & bible study") ||
    name.includes("prayer & bible study")
  );
};

const CHURCH_ADDRESS = "505 W. University Ave, Ste. #109, Georgetown, TX 78626";
const GOOGLE_MAPS_URL = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(CHURCH_ADDRESS)}`;

const Events = () => {
  const { events, loading } = useChurchData();
  const [activeFilter, setActiveFilter] = useState<FilterType>("all");
  const [visibleCount, setVisibleCount] = useState(EVENTS_PER_PAGE);
  const loadMoreRef = useRef<HTMLDivElement>(null);

  const filteredEvents = useMemo(() => {
    if (activeFilter === "all") return events;
    return events.filter((event) => getEventCategories(event.name).includes(activeFilter));
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
                    const categories = getEventCategories(event.name);
                    const hasLivestream = isLivestreamed(event.name);

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
                              <div className="flex flex-col gap-2">
                                <div className="flex flex-wrap items-center gap-2">
                                  {categories.map((cat) => (
                                    <Badge key={cat} variant="secondary" className={`text-xs ${CATEGORY_COLORS[cat]}`}>
                                      {CATEGORY_LABELS[cat]}
                                    </Badge>
                                  ))}
                                  {hasLivestream && (
                                    <Badge variant="outline" className="text-xs border-primary/30 text-primary bg-primary/5">
                                      <Video className="w-3 h-3 mr-1" />
                                      Livestream
                                    </Badge>
                                  )}
                                </div>
                                <CardTitle className="font-display text-xl md:text-2xl text-foreground">
                                  {event.name}
                                </CardTitle>
                              </div>
                            </CardHeader>
                            <CardContent className="space-y-3">
                              <p className="text-muted-foreground">{event.description}</p>
                              
                              <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-muted-foreground">
                                <div className="flex items-center gap-1.5">
                                  <Calendar className="w-4 h-4 flex-shrink-0" />
                                  <span>{dayName}, {monthName} {dayNum}, {year}</span>
                                </div>
                                {event.time && (
                                  <div className="flex items-center gap-1.5">
                                    <Clock className="w-4 h-4 flex-shrink-0" />
                                    <span>{event.time}</span>
                                  </div>
                                )}
                                {event.location && (
                                  <div className="flex items-center gap-1.5">
                                    <MapPin className="w-4 h-4 flex-shrink-0" />
                                    <span>{event.location}</span>
                                  </div>
                                )}
                              </div>
                              
                              <div className="pt-3 mt-3 border-t border-border">
                                <Button
                                  asChild
                                  variant="outline"
                                  size="sm"
                                  className="w-full sm:w-auto"
                                >
                                  <a
                                    href={GOOGLE_MAPS_URL}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                  >
                                    <Navigation className="w-4 h-4" />
                                    Get Directions
                                  </a>
                                </Button>
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
