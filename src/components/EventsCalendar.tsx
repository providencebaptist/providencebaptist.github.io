import { useState, useMemo } from "react";
import { ChevronLeft, ChevronRight, Clock, Video, MapPin, Download } from "lucide-react";
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
import { useToast } from "@/hooks/use-toast";

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

const CHURCH_ADDRESS = "505 W. University Ave, Ste. #109, Georgetown, TX 78626";

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

// Generate iCal format for multiple events
const generateMonthlyICalEvents = (events: EventData[], monthName: string): string => {
  const formatDate = (d: Date) => {
    return d.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
  };
  
  const escapeText = (text: string) => {
    return text.replace(/[,;\\]/g, (match) => "\\" + match).replace(/\n/g, "\\n");
  };

  const eventStrings = events.map((event) => {
    const startDate = parseEventDateTime(event.date, event.time);
    const endDate = new Date(startDate.getTime() + 60 * 60 * 1000);
    
    return [
      "BEGIN:VEVENT",
      `DTSTART:${formatDate(startDate)}`,
      `DTEND:${formatDate(endDate)}`,
      `SUMMARY:${escapeText(event.name)}`,
      `DESCRIPTION:${escapeText(event.description)}`,
      `LOCATION:${escapeText(event.location || CHURCH_ADDRESS)}`,
      `UID:${startDate.getTime()}-${event.name.replace(/\s/g, "")}@pbcatx.org`,
      "END:VEVENT"
    ].join("\r\n");
  });
  
  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    `X-WR-CALNAME:Providence Baptist Church - ${monthName}`,
    "PRODID:-//Providence Baptist Church//Events//EN",
    ...eventStrings,
    "END:VCALENDAR"
  ].join("\r\n");
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
  const { toast } = useToast();

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
    // Sort events within each day by time
    Object.keys(groups).forEach((dateKey) => {
      groups[dateKey].sort((a, b) => {
        const timeA = parseEventDateTime(a.date, a.time).getTime();
        const timeB = parseEventDateTime(b.date, b.time).getTime();
        return timeA - timeB;
      });
    });
    return groups;
  }, [filteredEvents]);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);
  const startingDayOfWeek = firstDayOfMonth.getDay();
  const daysInMonth = lastDayOfMonth.getDate();

  // Get events for current month
  const monthEvents = useMemo(() => {
    return filteredEvents.filter((event) => {
      const eventDate = new Date(event.date);
      return eventDate.getMonth() === month && eventDate.getFullYear() === year;
    });
  }, [filteredEvents, month, year]);

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

  const downloadMonthlyIcal = () => {
    if (monthEvents.length === 0) {
      toast({
        title: "No events to export",
        description: `There are no events in ${monthName} matching the current filter.`,
        variant: "destructive",
      });
      return;
    }
    
    const icalContent = generateMonthlyICalEvents(monthEvents, monthName);
    const blob = new Blob([icalContent], { type: "text/calendar;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `pbc-events-${currentDate.toLocaleDateString("en-US", { month: "long", year: "numeric" }).replace(/\s/g, "-").toLowerCase()}.ics`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Calendar exported!",
      description: `${monthEvents.length} events for ${monthName} have been downloaded.`,
    });
  };

  // Generate calendar grid
  const calendarDays = useMemo(() => {
    const days: (Date | null)[] = [];
    
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
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
    <div className="max-w-5xl mx-auto">
      <Card>
        <CardHeader className="pb-2">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon" onClick={prevMonth}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <CardTitle className="font-display text-xl md:text-2xl min-w-[180px] text-center">{monthName}</CardTitle>
              <Button variant="outline" size="icon" onClick={nextMonth}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" onClick={goToToday} className="text-xs">
                Today
              </Button>
              <Button variant="outline" size="sm" onClick={downloadMonthlyIcal} className="gap-1.5">
                <Download className="w-4 h-4" />
                <span className="hidden sm:inline">Export {monthName.split(" ")[0]}</span>
                <span className="sm:hidden">Export</span>
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Day headers */}
          <div className="grid grid-cols-7 mb-2">
            {DAYS_OF_WEEK.map((day) => (
              <div key={day} className="text-center text-sm font-medium text-muted-foreground py-2 border-b">
                {day}
              </div>
            ))}
          </div>
          
          {/* Calendar grid */}
          <div className="grid grid-cols-7">
            {calendarDays.map((date, index) => {
              if (!date) {
                return <div key={`empty-${index}`} className="min-h-[100px] border-b border-r border-border/30" />;
              }
              
              const dateKey = date.toDateString();
              const dayEvents = eventsByDate[dateKey] || [];
              const hasEvents = dayEvents.length > 0;
              const isToday = date.toDateString() === today.toDateString();
              const isPast = date < today;
              
              return (
                <button
                  key={dateKey}
                  onClick={() => handleDayClick(date)}
                  disabled={!hasEvents}
                  className={cn(
                    "min-h-[100px] p-1 border-b border-r border-border/30 transition-all flex flex-col text-left",
                    hasEvents && "cursor-pointer hover:bg-accent/30",
                    !hasEvents && "cursor-default",
                    isToday && "bg-primary/5",
                    isPast && !hasEvents && "opacity-50"
                  )}
                >
                  <span className={cn(
                    "text-sm font-medium w-6 h-6 flex items-center justify-center rounded-full mb-1",
                    isToday && "bg-primary text-primary-foreground",
                    isPast && !isToday && "text-muted-foreground"
                  )}>
                    {date.getDate()}
                  </span>
                  
                  {hasEvents && (
                    <div className="flex flex-col gap-0.5 overflow-hidden flex-1">
                      {dayEvents.slice(0, 3).map((event, i) => {
                        const category = getEventCategories(event.name)[0];
                        return (
                          <div
                            key={i}
                            className={cn(
                              "text-[10px] leading-tight px-1 py-0.5 rounded truncate",
                              CATEGORY_COLORS[category]
                            )}
                            title={`${event.time ? event.time + " - " : ""}${event.name}`}
                          >
                            <span className="font-medium">{event.time?.replace(":00", "") || ""}</span>
                            {event.time && " "}
                            <span className="hidden lg:inline">{event.name.length > 15 ? event.name.slice(0, 15) + "..." : event.name}</span>
                            <span className="lg:hidden">{event.name.length > 8 ? event.name.slice(0, 8) + "..." : event.name}</span>
                          </div>
                        );
                      })}
                      {dayEvents.length > 3 && (
                        <div className="text-[10px] text-muted-foreground px-1">
                          +{dayEvents.length - 3} more
                        </div>
                      )}
                    </div>
                  )}
                </button>
              );
            })}
          </div>
          
          {/* Legend */}
          <div className="mt-4 pt-4 border-t flex flex-wrap items-center justify-between gap-2">
            <p className="text-xs text-muted-foreground">
              Click on a date to view all events • {monthEvents.length} events this month
            </p>
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