import { useState, useEffect } from "react";

interface UpcomingEvent {
  name: string;
  date: string;
  description: string;
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

export function useChurchData() {
  const [businessMeeting, setBusinessMeeting] = useState<BusinessMeetingData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/church-data.json")
      .then((res) => res.json())
      .then((data: ChurchData) => {
        const event = data.organization.events.upcoming.find(
          (e) => e.name === "Church Business Meeting"
        );
        if (event) {
          // Parse "following the Sunday evening service" from description
          const hasFollowingEvening = event.description.toLowerCase().includes("following the sunday evening service");
          const timeInfo = hasFollowingEvening 
            ? "Following the Sunday evening service" 
            : "";
          
          // Format date for display (e.g., "Sunday, January 26, 2026")
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

  return { businessMeeting, loading };
}
