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
import heroMensPrayerBreakfast from "@/assets/hero-mens-prayer-breakfast.jpg";
import heroGarageSale from "@/assets/hero-garage-sale.jpg";
import heroYouthConference from "@/assets/hero-youth-conference.jpg";
import galleryBibleStudy from "@/assets/gallery-biblestudy.jpg";
import galleryWorship from "@/assets/gallery-worship.jpg";
import galleryFellowship from "@/assets/gallery-fellowship.jpg";
import galleryOutreach from "@/assets/gallery-outreach.jpg";
import galleryChildren from "@/assets/gallery-children.jpg";
import heroCommunity from "@/assets/hero-community.jpg";

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

  if (name.includes("youth conference") || name.includes("basic training")) {
    return {
      image: heroYouthConference,
      alt: "Teens worshiping with raised hands at a youth conference",
      overlay: "bg-gradient-to-b from-black/55 via-black/30 to-black/80",
    };
  }
  if (name.includes("garage sale")) {
    return {
      image: heroGarageSale,
      alt: "Church parking lot garage sale with volunteers and tables of items",
      overlay: "bg-gradient-to-b from-black/35 via-black/20 to-black/60",
    };
  }
  if (name.includes("men's prayer breakfast") || name.includes("mens prayer breakfast")) {
    return {
      image: heroMensPrayerBreakfast,
      alt: "Men gathered around a breakfast table with hands folded in prayer",
      overlay: "bg-gradient-to-b from-black/40 via-black/25 to-black/65",
    };
  }
  if (name.includes("fellowship")) {
    return {
      image: galleryFellowship,
      alt: "Church family enjoying a meal together at a fellowship dinner",
      overlay: "bg-gradient-to-b from-black/40 via-black/25 to-black/65",
    };
  }
  if (name.includes("outreach") || name.includes("door knocking") || name.includes("tract")) {
    return {
      image: galleryOutreach,
      alt: "Church members going door-to-door for community outreach",
      overlay: "bg-gradient-to-b from-black/40 via-black/25 to-black/65",
    };
  }
  if (name.includes("kid's sunday school") || name.includes("kids sunday school") || name.includes("kid's choir") || name.includes("kids choir")) {
    return {
      image: galleryChildren,
      alt: "Children learning and singing together at church",
      overlay: "bg-gradient-to-b from-black/35 via-black/20 to-black/60",
    };
  }
  if (
    name.includes("bible study") ||
    name.includes("sunday school")
  ) {
    return {
      image: galleryBibleStudy,
      alt: "Open Bible on a table with study notes during a small-group Bible study",
      overlay: "bg-gradient-to-b from-black/45 via-black/25 to-black/65",
    };
  }
  if (
    name.includes("sunday morning worship") ||
    name.includes("sunday evening service") ||
    name.includes("choir practice") ||
    name.includes("church choir")
  ) {
    return {
      image: galleryWorship,
      alt: "Congregation worshiping together at Providence Baptist Church",
      overlay: "bg-gradient-to-b from-black/45 via-black/25 to-black/70",
    };
  }
  if (name.includes("business meeting")) {
    return {
      image: heroCommunity,
      alt: "Members of Providence Baptist Church gathered together",
      overlay: "bg-gradient-to-b from-black/55 via-black/35 to-black/75",
    };
  }

  // Generic default — every event page gets a header image.
  return {
    image: heroCommunity,
    alt: "Providence Baptist Church community",
    overlay: "bg-gradient-to-b from-black/50 via-black/30 to-black/70",
  };
}
