// Map an event name to its themed hero image (and overlay tone),
// mirroring the special-event mapping used by the homepage carousel.
import heroFathersDay from "@/assets/hero-fathers-day.jpg";
import heroMothersDay from "@/assets/hero-mothers-day.jpg";
import heroEaster from "@/assets/hero-easter.jpg";
import heroChristmasCandlelight from "@/assets/hero-christmas-candlelight.jpg";
import heroAnniversary from "@/assets/hero-anniversary.jpg";
import heroTeenCamp from "@/assets/hero-teen-camp.jpg";
import heroKidsCamp from "@/assets/hero-kids-camp.jpg";
import vbsForest from "@/assets/vbs-forest.jpg";

export interface EventHeroImage {
  image: string;
  alt: string;
  overlay?: string;
}

export function getEventHeroImage(eventName: string): EventHeroImage | null {
  const name = eventName.toLowerCase();

  if (name.includes("easter")) {
    return {
      image: heroEaster,
      alt: "Empty tomb at sunrise with Easter lilies and a distant cross",
      overlay: "bg-gradient-to-b from-black/40 via-black/30 to-black/70",
    };
  }
  if (name.includes("mother")) {
    return {
      image: heroMothersDay,
      alt: "Mother and child walking through a field of soft flowers at sunset",
      overlay: "bg-gradient-to-b from-black/30 via-black/20 to-black/60",
    };
  }
  if (name.includes("father")) {
    return {
      image: heroFathersDay,
      alt: "Father walking with his children at sunset by a country church",
      overlay: "bg-gradient-to-r from-black/70 via-black/40 to-black/70",
    };
  }
  if (name.includes("vacation bible") || name.includes("vbs")) {
    return {
      image: vbsForest,
      alt: "Forest and mountains, Vacation Bible School 2026 Into the Great Outdoors",
      overlay: "bg-gradient-to-b from-[#0d1a14]/70 via-[#0d1a14]/40 to-[#0d1a14]/80",
    };
  }
  if (name.includes("christmas") || name.includes("candlelight")) {
    return {
      image: heroChristmasCandlelight,
      alt: "Christmas candlelight service in a glowing sanctuary",
      overlay: "bg-gradient-to-b from-black/50 via-black/30 to-black/70",
    };
  }
  if (name.includes("anniversary")) {
    return {
      image: heroAnniversary,
      alt: "Country church at golden hour decorated for an anniversary celebration",
      overlay: "bg-gradient-to-b from-black/40 via-black/25 to-black/70",
    };
  }
  if (name.includes("teen") && name.includes("camp")) {
    return {
      image: heroTeenCamp,
      alt: "Teens playing paintball in the woods at church camp",
      overlay: "bg-gradient-to-b from-black/50 via-black/30 to-black/80",
    };
  }
  if (name.includes("kid") && name.includes("camp")) {
    return {
      image: heroKidsCamp,
      alt: "Children sitting together on a bench by a lake at kids church camp",
      overlay: "bg-gradient-to-b from-black/40 via-black/20 to-black/70",
    };
  }
  return null;
}
