import { Calendar, MapPin, Clock, Filter, Video, Navigation, CalendarPlus, Download, List, CalendarDays, Search, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useChurchData } from "@/hooks/useChurchData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import SEO from "@/components/SEO";
import { EventsCalendar } from "@/components/EventsCalendar";
import { useState, useEffect, useRef, useCallback, useMemo } from "react";

const EVENTS_PER_PAGE = 12;

type FilterType = "all" | "sunday" | "wednesday" | "sunday-school" | "bible-study" | "choir" | "outreach" | "special";

const FILTERS: { value: FilterType; label: string }[] = [
  { value: "all", label: "All Events" },
  { value: "sunday", label: "Sunday" },
  { value: "wednesday", label: "Wednesday" },
  { value: "sunday-school", label: "Sunday School" },
  { value: "bible-study", label: "Bible Studies" },
  { value: "choir", label: "Choir" },
  { value: "outreach", label: "Outreach" },
  { value: "special", label: "Special Events" },
];

const CATEGORY_LABELS: Record<FilterType, string> = {
  "all": "All",
  "sunday": "Sunday Service",
  "wednesday": "Wednesday",
  "sunday-school": "Sunday School",
  "bible-study": "Bible Study",
  "choir": "Choir",
  "outreach": "Outreach",
  "special": "Special Event",
};

const CATEGORY_COLORS: Record<FilterType, string> = {
  "all": "bg-muted text-muted-foreground",
  "sunday": "bg-primary/10 text-primary",
  "wednesday": "bg-secondary/80 text-secondary-foreground",
  "sunday-school": "bg-accent/20 text-accent-foreground",
  "bible-study": "bg-muted text-foreground",
  "choir": "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300",
  "outreach": "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
  "special": "bg-destructive/10 text-destructive",
};

const getEventCategories = (eventName: string): FilterType[] => {
  const name = eventName.toLowerCase();
  const categories: FilterType[] = [];

  // Special holiday events (also tagged as sunday)
  if (name.includes("easter") || name.includes("mother's day") || name.includes("father's day") || name.includes("christmas candlelight")) {
    categories.push("special", "sunday");
  }
  
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
  if (name.includes("choir practice") || name.includes("church choir") || name.includes("kid's choir")) {
    categories.push("choir");
  }
  if (name.includes("sunday school")) {
    categories.push("sunday-school");
  }
  if (name.includes("outreach") || name.includes("door knocking") || name.includes("tract")) {
    categories.push("outreach");
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

// Helper to parse time and create a Date object
const parseEventDateTime = (dateStr: string, timeStr?: string): Date => {
  const date = new Date(dateStr);
  if (timeStr) {
    const match = timeStr.match(/(\d{1,2}):(\d{2})\s*(AM|PM)/i);
    if (match) {
      let hours = parseInt(match[1], 10);
      const minutes = parseInt(match[2], 10);
      const period = match[3].toUpperCase();
      if (period === "PM" && hours !== 12) hours += 12;
      if (period === "AM" && hours === 12) hours = 0;
      date.setHours(hours, minutes, 0, 0);
    }
  }
  return date;
};

// Generate iCal format string
const generateICalEvent = (event: { name: string; date: string; description: string; time?: string; location?: string }): string => {
  const startDate = parseEventDateTime(event.date, event.time);
  const endDate = new Date(startDate.getTime() + 60 * 60 * 1000); // Default 1 hour duration
  
  const formatDate = (d: Date) => {
    return d.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
  };
  
  const escapeText = (text: string) => {
    return text.replace(/[,;\\]/g, (match) => "\\" + match).replace(/\n/g, "\\n");
  };
  
  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Providence Baptist Church//Events//EN",
    "BEGIN:VEVENT",
    `DTSTART:${formatDate(startDate)}`,
    `DTEND:${formatDate(endDate)}`,
    `SUMMARY:${escapeText(event.name)}`,
    `DESCRIPTION:${escapeText(event.description)}`,
    `LOCATION:${escapeText(event.location || CHURCH_ADDRESS)}`,
    "END:VEVENT",
    "END:VCALENDAR"
  ].join("\r\n");
};

// Download iCal file
const downloadICalFile = (event: { name: string; date: string; description: string; time?: string; location?: string }) => {
  const icalContent = generateICalEvent(event);
  const blob = new Blob([icalContent], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${event.name.replace(/[^a-z0-9]/gi, "-").toLowerCase()}.ics`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

// Generate Google Calendar URL
const generateGoogleCalendarUrl = (event: { name: string; date: string; description: string; time?: string; location?: string }): string => {
  const startDate = parseEventDateTime(event.date, event.time);
  const endDate = new Date(startDate.getTime() + 60 * 60 * 1000);
  
  const formatGoogleDate = (d: Date) => {
    return d.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
  };
  
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: event.name,
    dates: `${formatGoogleDate(startDate)}/${formatGoogleDate(endDate)}`,
    details: event.description,
    location: event.location || CHURCH_ADDRESS,
  });
  
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
};

type ViewMode = "list" | "calendar";

const Events = () => {
  const { events, loading } = useChurchData();
  const [activeFilter, setActiveFilter] = useState<FilterType>("all");
  const [viewMode, setViewMode] = useState<ViewMode>("list");
  const [searchQuery, setSearchQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(EVENTS_PER_PAGE);
  const loadMoreRef = useRef<HTMLDivElement>(null);

  // Search and filter events
  const filteredEvents = useMemo(() => {
    let result = events;
    
    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      result = result.filter((event) => 
        event.name.toLowerCase().includes(query) || 
        event.description.toLowerCase().includes(query)
      );
    }
    
    // Apply category filter
    if (activeFilter !== "all") {
      result = result.filter((event) => getEventCategories(event.name).includes(activeFilter));
    }
    
    return result;
  }, [events, activeFilter, searchQuery]);

  // Group filtered events by date
  const groupedEvents = useMemo(() => {
    const groups: Record<string, typeof filteredEvents> = {};
    filteredEvents.forEach((event) => {
      if (!groups[event.date]) {
        groups[event.date] = [];
      }
      groups[event.date].push(event);
    });
    return groups;
  }, [filteredEvents]);

  // Get sorted date keys for display
  const sortedDates = useMemo(() => {
    return Object.keys(groupedEvents).sort((a, b) => new Date(a).getTime() - new Date(b).getTime());
  }, [groupedEvents]);

  // Paginate by date groups
  const visibleDates = sortedDates.slice(0, visibleCount);
  const totalEventCount = filteredEvents.length;

  const loadMore = useCallback(() => {
    setVisibleCount((prev) => Math.min(prev + EVENTS_PER_PAGE, sortedDates.length));
  }, [sortedDates.length]);

  // Reset visible count when filter or search changes
  useEffect(() => {
    setVisibleCount(EVENTS_PER_PAGE);
  }, [activeFilter, searchQuery]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && visibleCount < sortedDates.length) {
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
  }, [visibleCount, sortedDates.length, loadMore]);

  return (
    <>
      <SEO
        title="Upcoming Events | Providence Baptist Church"
        description="View upcoming events at Providence Baptist Church in Georgetown, Texas. Join us for special gatherings, meetings, and fellowship opportunities."
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-accent to-secondary text-accent-foreground py-12 sm:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center gap-3 sm:gap-4 mb-3 sm:mb-4">
            <Calendar className="h-10 w-10 sm:h-12 sm:w-12" />
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center">
              Upcoming Events
            </h1>
          </div>
          <p className="text-lg sm:text-xl text-center max-w-3xl mx-auto px-4">
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
              {/* Search and Controls */}
              <div className="mb-8 max-w-4xl mx-auto space-y-4">
                {/* Search Input */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Search events by name or description..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 pr-10"
                    maxLength={100}
                  />
                  {searchQuery && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7"
                      onClick={() => setSearchQuery("")}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  )}
                </div>

                {/* Filter and View Toggle */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div className="flex items-center gap-2">
                    <Filter className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm font-medium text-muted-foreground">Filter by type:</span>
                  </div>
                  <ToggleGroup type="single" value={viewMode} onValueChange={(value) => value && setViewMode(value as ViewMode)}>
                    <ToggleGroupItem value="list" aria-label="List view" className="gap-1.5">
                      <List className="w-4 h-4" />
                      <span className="hidden sm:inline">List</span>
                    </ToggleGroupItem>
                    <ToggleGroupItem value="calendar" aria-label="Calendar view" className="gap-1.5">
                      <CalendarDays className="w-4 h-4" />
                      <span className="hidden sm:inline">Calendar</span>
                    </ToggleGroupItem>
                  </ToggleGroup>
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

              {totalEventCount === 0 ? (
                <div className="text-center py-12">
                  <p className="text-muted-foreground text-lg">
                    {searchQuery ? `No events found matching "${searchQuery}"` : "No events found for this filter."}
                  </p>
                  <Button
                    variant="link"
                    onClick={() => {
                      setSearchQuery("");
                      setActiveFilter("all");
                    }}
                    className="mt-2"
                  >
                    Clear filters
                  </Button>
                </div>
              ) : viewMode === "calendar" ? (
                <EventsCalendar events={events} activeFilter={activeFilter} searchQuery={searchQuery} />
              ) : (
                <>
                  <p className="text-center text-muted-foreground mb-8">
                    Showing {visibleDates.reduce((acc, date) => acc + groupedEvents[date].length, 0)} of {totalEventCount} events across {visibleDates.length} of {sortedDates.length} dates
                  </p>
                  <div className="space-y-8 max-w-4xl mx-auto">
                    {visibleDates.map((date) => {
                      const dateEvents = groupedEvents[date];
                      const dateObj = new Date(date);
                      const dayName = dateObj.toLocaleDateString("en-US", { weekday: "long" });
                      const monthName = dateObj.toLocaleDateString("en-US", { month: "long" });
                      const dayNum = dateObj.getDate();
                      const year = dateObj.getFullYear();

                    return (
                      <div key={date} className="relative">
                        {/* Date Header */}
                        <div className="flex items-start gap-4 mb-4">
                          <div className="bg-accent text-accent-foreground rounded-lg p-4 text-center min-w-[100px] shadow-md">
                            <span className="text-xs uppercase font-medium tracking-wide">{monthName.slice(0, 3)}</span>
                            <div className="font-display text-3xl font-bold">{dayNum}</div>
                            <span className="text-xs">{dayName}</span>
                          </div>
                          <div className="flex-1 pt-2">
                            <h3 className="font-display text-lg font-semibold text-foreground">
                              {dayName}, {monthName} {dayNum}, {year}
                            </h3>
                            <p className="text-sm text-muted-foreground">
                              {dateEvents.length} event{dateEvents.length > 1 ? "s" : ""} scheduled
                            </p>
                          </div>
                        </div>

                        {/* Events for this date */}
                        <div className="ml-0 sm:ml-[116px] space-y-3">
                          {dateEvents.map((event, eventIndex) => {
                            const categories = getEventCategories(event.name);
                            const hasLivestream = isLivestreamed(event.name);

                            return (
                              <Card key={eventIndex} className="overflow-hidden hover:shadow-md transition-shadow border-l-4 border-l-primary/30">
                                <CardHeader className="pb-2 pt-4">
                                  <div className="flex flex-col gap-2">
                                    <div className="flex flex-wrap items-center gap-2">
                                      {event.time && (
                                        <Badge variant="outline" className="text-xs font-semibold">
                                          <Clock className="w-3 h-3 mr-1" />
                                          {event.time}
                                        </Badge>
                                      )}
                                      {categories.map((cat) => (
                                        <Badge key={cat} variant="secondary" className={`text-xs ${CATEGORY_COLORS[cat]}`}>
                                          {CATEGORY_LABELS[cat]}
                                        </Badge>
                                      ))}
                                      {hasLivestream && (
                                        <Link to="/livestream">
                                          <Badge variant="outline" className="text-xs border-primary/30 text-primary bg-primary/5 hover:bg-primary/10 cursor-pointer transition-colors">
                                            <Video className="w-3 h-3 mr-1" />
                                            Livestream
                                          </Badge>
                                        </Link>
                                      )}
                                    </div>
                                    <CardTitle className="font-display text-lg md:text-xl text-foreground">
                                      {event.name}
                                    </CardTitle>
                                  </div>
                                </CardHeader>
                                <CardContent className="space-y-3 pt-0">
                                  <p className="text-muted-foreground text-sm">{event.description}</p>
                                  
                                  {event.location && (
                                    <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                                      <MapPin className="w-4 h-4 flex-shrink-0" />
                                      <span>{event.location}</span>
                                    </div>
                                  )}
                                  
                                  <div className="pt-2 flex flex-wrap gap-2">
                                    <Button
                                      asChild
                                      variant="ghost"
                                      size="sm"
                                      className="h-8 text-xs"
                                    >
                                      <a
                                        href={GOOGLE_MAPS_URL}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                      >
                                        <Navigation className="w-3 h-3" />
                                        Directions
                                      </a>
                                    </Button>
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      className="h-8 text-xs"
                                      onClick={() => downloadICalFile(event)}
                                    >
                                      <Download className="w-3 h-3" />
                                      iCal
                                    </Button>
                                    <Button
                                      asChild
                                      variant="ghost"
                                      size="sm"
                                      className="h-8 text-xs"
                                    >
                                      <a
                                        href={generateGoogleCalendarUrl(event)}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                      >
                                        <CalendarPlus className="w-3 h-3" />
                                        Add to Calendar
                                      </a>
                                    </Button>
                                  </div>
                                </CardContent>
                              </Card>
                            );
                          })}
                        </div>

                        {/* Separator between dates */}
                        <div className="border-b border-border/50 mt-8" />
                      </div>
                    );
                  })}
                </div>

                {/* Load more trigger */}
                {visibleCount < sortedDates.length && (
                  <div ref={loadMoreRef} className="flex justify-center py-8">
                    <div className="text-muted-foreground animate-pulse">Loading more events...</div>
                  </div>
                )}
              </>
              )}
            </>
          )}
        </div>
      </section>
    </>
  );
};

export default Events;
