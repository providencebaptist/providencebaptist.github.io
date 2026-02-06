import { useState, useEffect } from "react";

interface UpcomingEvent {
  name: string;
  date: string;
  description: string;
  time?: string;
  location?: string;
}

interface ChurchData {
  organization: {
    name: string;
    events: {
      upcoming: UpcomingEvent[];
    };
  };
}

export interface BusinessMeetingData {
  name: string;
  date: string;
  description: string;
  formattedDate: string;
  timeInfo: string;
}

export interface EventData {
  name: string;
  date: string;
  description: string;
  time?: string;
  location?: string;
}

// Helper to categorize events
const getEventCategory = (eventName: string): "sunday" | "wednesday" | "sunday-school" | "bible-study" | "choir" | "outreach" | "special" | "regular" => {
  const name = eventName.toLowerCase();
  if (name.includes("sunday morning") || name.includes("sunday am") || name.includes("sunday evening") || name.includes("sunday pm")) {
    return "sunday";
  }
  if (name.includes("wednesday") || name.includes("prayer & bible study") || name.includes("midweek")) {
    return "wednesday";
  }
  if (name.includes("sunday school")) {
    return "sunday-school";
  }
  if (name.includes("ladies bible study")) {
    return "bible-study";
  }
  if (name.includes("choir practice") || name.includes("church choir") || name.includes("kid's choir")) {
    return "choir";
  }
  if (name.includes("outreach") || name.includes("door knocking") || name.includes("tract")) {
    return "outreach";
  }
  if (name.includes("men's prayer breakfast")) {
    return "regular";
  }
  return "special";
};

export function useChurchData() {
  const [businessMeeting, setBusinessMeeting] = useState<BusinessMeetingData | null>(null);
  const [nextEvent, setNextEvent] = useState<EventData | null>(null);
  const [nextSpecialEvent, setNextSpecialEvent] = useState<EventData | null>(null);
  const [events, setEvents] = useState<EventData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Helper to parse time string like "10:00 AM" or "5:30 PM" into hours and minutes
    const parseTime = (timeStr: string | undefined): { hours: number; minutes: number } | null => {
      if (!timeStr) return null;
      const match = timeStr.match(/(\d{1,2}):(\d{2})\s*(AM|PM)/i);
      if (!match) return null;
      let hours = parseInt(match[1], 10);
      const minutes = parseInt(match[2], 10);
      const period = match[3].toUpperCase();
      if (period === "PM" && hours !== 12) hours += 12;
      if (period === "AM" && hours === 12) hours = 0;
      return { hours, minutes };
    };

    fetch("/church-data.json")
      .then((res) => res.json())
      .then((data: ChurchData) => {
        const now = new Date();
        const cutoffTime = new Date(now.getTime() - 30 * 60 * 1000); // 30 minutes ago

        // Get all upcoming events and filter out past ones (accounting for time)
        const upcomingEvents = data.organization.events.upcoming
          .map((e) => ({
            name: e.name,
            date: e.date,
            description: e.description,
            time: e.time,
            location: e.location,
          }))
          .filter((e) => {
            const eventDate = new Date(e.date);
            const parsedTime = parseTime(e.time);
            
            if (parsedTime) {
              // Set the event's actual start time
              eventDate.setHours(parsedTime.hours, parsedTime.minutes, 0, 0);
            } else {
              // If no time, assume start of day
              eventDate.setHours(0, 0, 0, 0);
            }
            
            // Event is valid if it starts after the cutoff (now - 30 minutes)
            return eventDate > cutoffTime;
          });
        setEvents(upcomingEvents);

        // Set the next upcoming regular service (Sunday or Wednesday only)
        const regularServiceCategories = ["sunday", "wednesday"];
        const nextRegularService = upcomingEvents.find(
          (e) => regularServiceCategories.includes(getEventCategory(e.name))
        );
        if (nextRegularService) {
          setNextEvent(nextRegularService);
        }

        // Set the next upcoming special event
        const nextSpecial = upcomingEvents.find(
          (e) => getEventCategory(e.name) === "special"
        );
        if (nextSpecial) {
          setNextSpecialEvent(nextSpecial);
        }

        // Get business meeting specifically (for backward compatibility)
        const event = upcomingEvents.find(
          (e) => e.name === "Church Business Meeting"
        );
        if (event) {
          const hasFollowingEvening = event.description.toLowerCase().includes("following the sunday evening service");
          const timeInfo = hasFollowingEvening 
            ? "Following the Sunday evening service" 
            : event.time || "";
          
          const dateObj = new Date(event.date);
          const dayName = dateObj.toLocaleDateString("en-US", { weekday: "long" });
          const formattedDate = `${dayName}, ${event.date}`;

          setBusinessMeeting({
            name: event.name,
            date: event.date,
            description: event.description,
            formattedDate,
            timeInfo,
          });
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return { businessMeeting, nextEvent, nextSpecialEvent, events, loading };
}
