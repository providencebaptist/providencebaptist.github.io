import { useState, useMemo } from "react";
import { ChevronLeft, ChevronRight, Clock, Video, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface EventData {
  name: string;
  date: string;
  description: string;
  time?: string;
  location?: string;
}

type FilterType = "all" | "sunday" | "wednesday" | "sunday-school" | "bible-study" | "choir" | "outreach" | "special";

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
  if (name.includes("outreach") || name.includes("door knocking") || name.includes("tract")) {
    categories.push("outreach");
  }
  if (name.includes("choir practice") || name.includes("church choir") || name.includes("kid's choir")) {
    categories.push("choir");
  }
  
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

interface EventsCalendarProps {
  events: EventData[];
  activeFilter: FilterType;
}

const DAYS_OF_WEEK = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export function EventsCalendar({ events, activeFilter }: EventsCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  // Filter events based on active filter
  const filteredEvents = useMemo(() => {
    if (activeFilter === "all") return events;
    return events.filter((event) => getEventCategories(event.name).includes(activeFilter));
  }, [events, activeFilter]);

  // Group events by date string
  const eventsByDate = useMemo(() => {
    const groups: Record<string, EventData[]> = {};
    filteredEvents.forEach((event) => {
      const dateKey = new Date(event.date).toDateString();
      if (!groups[dateKey]) {
        groups[dateKey] = [];
      }
      groups[dateKey].push(event);
    });
    return groups;
  }, [filteredEvents]);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);
  const startingDayOfWeek = firstDayOfMonth.getDay();
  const daysInMonth = lastDayOfMonth.getDate();

  const prevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  const monthName = currentDate.toLocaleDateString("en-US", { month: "long", year: "numeric" });

  // Generate calendar grid
  const calendarDays = useMemo(() => {
    const days: (Date | null)[] = [];
    
    // Add empty cells for days before the first day of month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }
    
    return days;
  }, [year, month, startingDayOfWeek, daysInMonth]);

  const handleDayClick = (date: Date) => {
    const dateKey = date.toDateString();
    if (eventsByDate[dateKey] && eventsByDate[dateKey].length > 0) {
      setSelectedDate(date);
      setDialogOpen(true);
    }
  };

  const selectedDateEvents = selectedDate ? eventsByDate[selectedDate.toDateString()] || [] : [];

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return (
    <div className="max-w-4xl mx-auto">
      <Card>
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <Button variant="outline" size="icon" onClick={prevMonth}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <div className="flex items-center gap-3">
              <CardTitle className="font-display text-xl md:text-2xl">{monthName}</CardTitle>
              <Button variant="ghost" size="sm" onClick={goToToday} className="text-xs">
                Today
              </Button>
            </div>
            <Button variant="outline" size="icon" onClick={nextMonth}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {/* Day headers */}
          <div className="grid grid-cols-7 mb-2">
            {DAYS_OF_WEEK.map((day) => (
              <div key={day} className="text-center text-sm font-medium text-muted-foreground py-2">
                {day}
              </div>
            ))}
          </div>
          
          {/* Calendar grid */}
          <div className="grid grid-cols-7 gap-1">
            {calendarDays.map((date, index) => {
              if (!date) {
                return <div key={`empty-${index}`} className="aspect-square" />;
              }
              
              const dateKey = date.toDateString();
              const dayEvents = eventsByDate[dateKey] || [];
              const hasEvents = dayEvents.length > 0;
              const isToday = date.toDateString() === today.toDateString();
              const isPast = date < today;
              
              // Get unique categories for this day
              const dayCategories = new Set<FilterType>();
              dayEvents.forEach((event) => {
                getEventCategories(event.name).forEach((cat) => dayCategories.add(cat));
              });
              
              return (
                <button
                  key={dateKey}
                  onClick={() => handleDayClick(date)}
                  disabled={!hasEvents}
                  className={cn(
                    "aspect-square p-1 rounded-lg border transition-all flex flex-col items-center relative",
                    hasEvents && "cursor-pointer hover:border-primary hover:shadow-md",
                    !hasEvents && "cursor-default",
                    isToday && "ring-2 ring-primary ring-offset-2",
                    isPast && !hasEvents && "opacity-50"
                  )}
                >
                  <span className={cn(
                    "text-sm font-medium",
                    isToday && "text-primary font-bold",
                    isPast && "text-muted-foreground"
                  )}>
                    {date.getDate()}
                  </span>
                  
                  {hasEvents && (
                    <div className="flex flex-wrap gap-0.5 justify-center mt-1">
                      {dayEvents.length <= 3 ? (
                        dayEvents.slice(0, 3).map((_, i) => (
                          <div
                            key={i}
                            className="w-1.5 h-1.5 rounded-full bg-primary"
                          />
                        ))
                      ) : (
                        <>
                          <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                          <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                          <span className="text-[10px] text-muted-foreground">+{dayEvents.length - 2}</span>
                        </>
                      )}
                    </div>
                  )}
                </button>
              );
            })}
          </div>
          
          {/* Legend */}
          <div className="mt-4 pt-4 border-t">
            <p className="text-xs text-muted-foreground mb-2">Click on a date with events to view details</p>
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-primary" />
                <span>Has events</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-4 h-4 rounded border-2 border-primary" />
                <span>Today</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Event details dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-lg max-h-[80vh] bg-background">
          <DialogHeader>
            <DialogTitle className="font-display">
              {selectedDate?.toLocaleDateString("en-US", { 
                weekday: "long", 
                month: "long", 
                day: "numeric", 
                year: "numeric" 
              })}
            </DialogTitle>
          </DialogHeader>
          <ScrollArea className="max-h-[60vh]">
            <div className="space-y-3 pr-4">
              {selectedDateEvents.map((event, index) => {
                const categories = getEventCategories(event.name);
                const hasLivestream = isLivestreamed(event.name);
                
                return (
                  <div key={index} className="p-3 border rounded-lg bg-card">
                    <div className="flex flex-wrap items-center gap-1.5 mb-2">
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
                    <h4 className="font-display font-semibold text-foreground">{event.name}</h4>
                    <p className="text-sm text-muted-foreground mt-1">{event.description}</p>
                    {event.location && (
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground mt-2">
                        <MapPin className="w-3 h-3" />
                        <span>{event.location}</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </div>
  );
}