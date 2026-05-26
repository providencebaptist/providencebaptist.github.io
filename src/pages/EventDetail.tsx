import { useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { Calendar, Clock, MapPin, Navigation, Download, CalendarPlus, Video, ArrowLeft } from "lucide-react";
import { useChurchData } from "@/hooks/useChurchData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import SEO from "@/components/SEO";
import { getEventGroupName, slugifyEvent } from "@/lib/eventSlug";
import { getEventHeroImage } from "@/lib/eventHeroImage";

const CHURCH_ADDRESS = "505 W. University Ave, Ste. #109, Georgetown, TX 78626";
const GOOGLE_MAPS_URL = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(CHURCH_ADDRESS)}`;

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

const formatDateLong = (dateStr: string) => {
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
};

const isLivestreamed = (eventName: string): boolean => {
  const name = eventName.toLowerCase();
  return (
    name.includes("sunday morning worship") ||
    name.includes("easter sunday") ||
    name.includes("sunday evening service") ||
    name.includes("prayer & bible study")
  );
};

const downloadICal = (event: { name: string; date: string; description: string; time?: string; location?: string }) => {
  const start = parseEventDateTime(event.date, event.time);
  const end = new Date(start.getTime() + 60 * 60 * 1000);
  const fmt = (d: Date) => d.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
  const esc = (t: string) => t.replace(/[,;\\]/g, (m) => "\\" + m).replace(/\n/g, "\\n");
  const ical = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Providence Baptist Church//Events//EN",
    "BEGIN:VEVENT",
    `DTSTART:${fmt(start)}`,
    `DTEND:${fmt(end)}`,
    `SUMMARY:${esc(event.name)}`,
    `DESCRIPTION:${esc(event.description)}`,
    `LOCATION:${esc(event.location || CHURCH_ADDRESS)}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
  const blob = new Blob([ical], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${event.name.replace(/[^a-z0-9]/gi, "-").toLowerCase()}.ics`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

const googleCalendarUrl = (event: { name: string; date: string; description: string; time?: string; location?: string }) => {
  const start = parseEventDateTime(event.date, event.time);
  const end = new Date(start.getTime() + 60 * 60 * 1000);
  const fmt = (d: Date) => d.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: event.name,
    dates: `${fmt(start)}/${fmt(end)}`,
    details: event.description,
    location: event.location || CHURCH_ADDRESS,
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
};

const EventDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const { events, loading } = useChurchData();

  const occurrences = useMemo(() => {
    if (!slug) return [];
    return events
      .filter((e) => slugifyEvent(e.name) === slug)
      .sort((a, b) => parseEventDateTime(a.date, a.time).getTime() - parseEventDateTime(b.date, b.time).getTime());
  }, [events, slug]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-24 text-center text-muted-foreground">
        Loading event...
      </div>
    );
  }

  if (occurrences.length === 0) {
    return (
      <>
        <SEO title="Event Not Found" description="The event you are looking for could not be found." url={`https://pbcatx.org/events/${slug || ""}`} />
        <div className="container mx-auto px-4 py-24 text-center">
          <h1 className="font-display text-3xl font-bold text-foreground mb-4">Event Not Found</h1>
          <p className="text-muted-foreground mb-6">
            We couldn't find an upcoming event by that name. It may have already passed.
          </p>
          <Button asChild>
            <Link to="/events">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to all events
            </Link>
          </Button>
        </div>
      </>
    );
  }

  const next = occurrences[0];
  const groupName = getEventGroupName(next.name);
  const remaining = occurrences.slice(1);
  const hasLivestream = isLivestreamed(next.name);
  const isMultiPart = occurrences.some((o) => o.name !== groupName);
  const heroImage = getEventHeroImage(groupName);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: groupName,
    description: next.description,
    startDate: parseEventDateTime(next.date, next.time).toISOString(),
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    location: {
      "@type": "Place",
      name: "Providence Baptist Church",
      address: {
        "@type": "PostalAddress",
        streetAddress: "505 W. University Ave, Ste. #109",
        addressLocality: "Georgetown",
        addressRegion: "TX",
        postalCode: "78626",
        addressCountry: "US",
      },
    },
    organizer: {
      "@type": "Organization",
      name: "Providence Baptist Church",
      url: "https://pbcatx.org",
    },
  };

  return (
    <>
      <SEO
        title={`${groupName} | Providence Baptist Church`}
        description={next.description}
        url={`https://pbcatx.org/events/${slug}`}
        type="article"
        structuredData={structuredData}
      />

      {/* Hero */}
      {heroImage ? (
        <section className="relative overflow-hidden">
          <img
            src={heroImage.image}
            alt={heroImage.alt}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className={`absolute inset-0 ${heroImage.overlay ?? "bg-gradient-to-b from-black/50 via-black/30 to-black/70"}`} />
          <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 md:py-32">
            <div className="flex items-center justify-center gap-3 sm:gap-4 mb-3 sm:mb-4">
              <Calendar className="h-10 w-10 sm:h-12 sm:w-12 text-white drop-shadow-lg" />
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center text-white drop-shadow-lg">
                {groupName}
              </h1>
            </div>
            <p className="text-lg sm:text-xl text-center max-w-3xl mx-auto px-4 text-white/95 drop-shadow">
              {occurrences.length > 1
                ? `${occurrences.length} upcoming ${isMultiPart ? "sessions" : "occurrences"}`
                : "Upcoming event"}
            </p>
          </div>
        </section>
      ) : (
        <section className="bg-gradient-to-r from-accent to-secondary text-accent-foreground py-12 sm:py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-center gap-3 sm:gap-4 mb-3 sm:mb-4">
              <Calendar className="h-10 w-10 sm:h-12 sm:w-12" />
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center">
                {groupName}
              </h1>
            </div>
            <p className="text-lg sm:text-xl text-center max-w-3xl mx-auto px-4">
              {occurrences.length > 1
                ? `${occurrences.length} upcoming ${isMultiPart ? "sessions" : "occurrences"}`
                : "Upcoming event"}
            </p>
          </div>
        </section>
      )}

      <section className="py-12 md:py-16 bg-background">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="mb-6">
            <Button asChild variant="ghost" size="sm">
              <Link to="/events">
                <ArrowLeft className="w-4 h-4 mr-1" />
                All events
              </Link>
            </Button>
          </div>

          {/* Next occurrence */}
          <Card className="border-l-4 border-l-primary shadow-md">
            <CardHeader>
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <Badge variant="default">Next up</Badge>
                {next.time && (
                  <Badge variant="outline" className="font-semibold">
                    <Clock className="w-3 h-3 mr-1" />
                    {next.time}
                  </Badge>
                )}
                {hasLivestream && (
                  <Link to="/livestream">
                    <Badge variant="outline" className="border-primary/30 text-primary bg-primary/5 hover:bg-primary/10 cursor-pointer">
                      <Video className="w-3 h-3 mr-1" />
                      Livestream
                    </Badge>
                  </Link>
                )}
              </div>
              <CardTitle className="font-display text-2xl md:text-3xl">
                {formatDateLong(next.date)}
              </CardTitle>
              {next.name !== groupName && (
                <p className="text-sm font-medium text-muted-foreground mt-1">{next.name}</p>
              )}
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-foreground leading-relaxed">{next.description}</p>

              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4 flex-shrink-0" />
                <span>{next.location || CHURCH_ADDRESS}</span>
              </div>

              <div className="flex flex-wrap gap-2 pt-2">
                <Button asChild variant="outline" size="sm">
                  <a href={GOOGLE_MAPS_URL} target="_blank" rel="noopener noreferrer">
                    <Navigation className="w-3 h-3" />
                    Directions
                  </a>
                </Button>
                <Button variant="outline" size="sm" onClick={() => downloadICal(next)}>
                  <Download className="w-3 h-3" />
                  iCal
                </Button>
                <Button asChild variant="outline" size="sm">
                  <a href={googleCalendarUrl(next)} target="_blank" rel="noopener noreferrer">
                    <CalendarPlus className="w-3 h-3" />
                    Add to Calendar
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Remaining occurrences */}
          {remaining.length > 0 && (
            <div className="mt-10">
              <h2 className="font-display text-2xl font-semibold text-foreground mb-4">
                {isMultiPart ? "All sessions" : "Upcoming dates"}
              </h2>
              <p className="text-sm text-muted-foreground mb-6">
                {isMultiPart
                  ? `This event runs across ${occurrences.length} sessions through the end of the calendar.`
                  : `${remaining.length} additional ${remaining.length === 1 ? "date" : "dates"} on the calendar.`}
              </p>
              <div className="space-y-3">
                {remaining.map((occ, i) => (
                  <Card key={`${occ.date}-${i}`} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6">
                      <div className="bg-accent/40 text-accent-foreground rounded-lg p-3 text-center min-w-[80px]">
                        <div className="text-xs uppercase font-medium">
                          {new Date(occ.date).toLocaleDateString("en-US", { month: "short" })}
                        </div>
                        <div className="font-display text-2xl font-bold">
                          {new Date(occ.date).getDate()}
                        </div>
                        <div className="text-xs">
                          {new Date(occ.date).toLocaleDateString("en-US", { weekday: "short" })}
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          {occ.time && (
                            <Badge variant="outline" className="text-xs font-semibold">
                              <Clock className="w-3 h-3 mr-1" />
                              {occ.time}
                            </Badge>
                          )}
                          {occ.name !== groupName && (
                            <span className="text-xs font-medium text-muted-foreground">
                              {occ.name}
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-foreground/90">{occ.description}</p>
                      </div>
                      <div className="flex sm:flex-col gap-2 sm:items-end">
                        <Button variant="ghost" size="sm" onClick={() => downloadICal(occ)} className="h-8 text-xs">
                          <Download className="w-3 h-3" />
                          iCal
                        </Button>
                        <Button asChild variant="ghost" size="sm" className="h-8 text-xs">
                          <a href={googleCalendarUrl(occ)} target="_blank" rel="noopener noreferrer">
                            <CalendarPlus className="w-3 h-3" />
                            Add
                          </a>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default EventDetail;
