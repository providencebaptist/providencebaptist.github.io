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
const getEventCategory = (eventName: string): "sunday" | "wednesday" | "bible-study" | "special" => {
  const name = eventName.toLowerCase();
  if (name.includes("sunday morning") || name.includes("sunday am") || name.includes("sunday evening") || name.includes("sunday pm")) {
    return "sunday";
  }
  if (name.includes("wednesday") || name.includes("prayer & bible study") || name.includes("midweek")) {
    return "wednesday";
  }
  if (name.includes("ladies bible study") || name.includes("teen bible study") || name.includes("adult bible study")) {
    return "bible-study";
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
    fetch("/church-data.json")
      .then((res) => res.json())
      .then((data: ChurchData) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Start of today

        // Get all upcoming events and filter out past ones
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
            eventDate.setHours(0, 0, 0, 0);
            return eventDate >= today;
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
