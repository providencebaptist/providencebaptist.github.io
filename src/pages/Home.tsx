import { useRef } from "react";
import Autoplay from "embla-carousel-autoplay";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Heart, Users, MapPin, Mail, BookOpen, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import ServiceTimes from "@/components/ServiceTimes";
import SEO from "@/components/SEO";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import heroImage from "@/assets/hero-community.jpg";
import galleryWorship from "@/assets/gallery-worship.jpg";
import galleryChildren from "@/assets/gallery-children.jpg";
import galleryFellowship from "@/assets/gallery-fellowship.jpg";
import galleryOutreach from "@/assets/gallery-outreach.jpg";
import galleryBiblestudy from "@/assets/gallery-biblestudy.jpg";
import heroFathersDay from "@/assets/hero-fathers-day.jpg";
import heroMothersDay from "@/assets/hero-mothers-day.jpg";
import heroEaster from "@/assets/hero-easter.jpg";
import heroChristmasCandlelight from "@/assets/hero-christmas-candlelight.jpg";
import heroAnniversary from "@/assets/hero-anniversary.jpg";
import heroTeenCamp from "@/assets/hero-teen-camp.jpg";
import heroKidsCamp from "@/assets/hero-kids-camp.jpg";
import vbsForest from "@/assets/vbs-forest.jpg";
import { useChurchData, type EventData } from "@/hooks/useChurchData";

// Map a special event name → themed hero artwork + CTA configuration.
// Falls back to a tasteful default for any unmapped special event so every
// special on the calendar always has a matching carousel slide.
type SpecialHeroConfig = {
  image: string;
  alt: string;
  eyebrow?: (e: EventData) => string;
  title: string;
  subtitle: string;
  ctaLabel: string;
  ctaHref: string;
  overlay: string;
  titleClass: string;
  subtitleClass: string;
  eyebrowClass: string;
  ctaClass?: string;
};

const formatDate = (date: string) => {
  const d = new Date(date);
  return d.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
};

const getSpecialHeroConfig = (event: EventData): SpecialHeroConfig => {
  const name = event.name.toLowerCase();

  if (name.includes("easter")) {
    return {
      image: heroEaster,
      alt: "Empty tomb at sunrise with Easter lilies and a distant cross",
      title: "He Is Risen!",
      subtitle:
        "Celebrate the resurrection of our Lord with inspiring music, powerful preaching, and the joy of the empty tomb.",
      eyebrow: (e) => `${formatDate(e.date)}${e.time ? ` • ${e.time}` : ""}`,
      ctaLabel: "See Service Details",
      ctaHref: "/events",
      overlay: "bg-gradient-to-b from-black/40 via-black/30 to-black/70",
      titleClass: "text-white drop-shadow-lg",
      subtitleClass: "text-white/95 drop-shadow",
      eyebrowClass:
        "bg-black/60 backdrop-blur-sm text-white border border-white/20",
    };
  }

  if (name.includes("mother")) {
    return {
      image: heroMothersDay,
      alt: "Mother and child walking through a field of soft flowers at sunset",
      title: "Celebrating Mothers",
      subtitle:
        "Join us as we honor the godly women who shape our families and our faith.",
      eyebrow: (e) => `${formatDate(e.date)}${e.time ? ` • ${e.time}` : ""}`,
      ctaLabel: "See Service Details",
      ctaHref: "/events",
      overlay: "bg-gradient-to-b from-black/30 via-black/20 to-black/60",
      titleClass: "text-white drop-shadow-lg",
      subtitleClass: "text-white/95 drop-shadow",
      eyebrowClass:
        "bg-black/60 backdrop-blur-sm text-white border border-white/20",
    };
  }

  if (name.includes("father")) {
    return {
      image: heroFathersDay,
      alt: "Father walking with his children at sunset by a country church",
      title: "Celebrating Fathers",
      subtitle:
        "Join us as we honor the dads, granddads, and father figures who lead with faith.",
      eyebrow: (e) => `${formatDate(e.date)}${e.time ? ` • ${e.time}` : ""}`,
      ctaLabel: "See Service Details",
      ctaHref: "/events",
      overlay: "bg-gradient-to-r from-black/70 via-black/40 to-black/70",
      titleClass: "text-white drop-shadow-lg",
      subtitleClass: "text-white/95 drop-shadow",
      eyebrowClass:
        "bg-black/60 backdrop-blur-sm text-white border border-white/20",
    };
  }

  if (name.includes("vacation bible") || name.includes("vbs")) {
    return {
      image: vbsForest,
      alt: "Forest and mountains — Vacation Bible School 2026 Into the Great Outdoors",
      title: "Vacation Bible School",
      subtitle:
        "Into the Great Outdoors — a week of faith, fun & adventure for your kids.",
      eyebrow: () => "July 20–24, 2026 • 6PM–8PM",
      ctaLabel: "Register Your Camper",
      ctaHref: "/vacation-bible-school-2026",
      overlay: "bg-gradient-to-b from-[#0d1a14]/70 via-[#0d1a14]/40 to-[#0d1a14]/80",
      titleClass: "text-[#f5e9c9] drop-shadow-lg",
      subtitleClass: "text-[#f5e9c9]/95 drop-shadow",
      eyebrowClass:
        "bg-[#0d1a14]/70 backdrop-blur-sm text-[#d4a24a] border border-[#d4a24a]/40",
      ctaClass: "bg-[#d4a24a] text-[#1b2a1f] hover:bg-[#e8b85a]",
    };
  }

  if (name.includes("christmas") || name.includes("candlelight")) {
    return {
      image: heroChristmasCandlelight,
      alt: "Christmas candlelight service in a glowing sanctuary",
      title: "Christmas Candlelight",
      subtitle:
        "An evening of carols, candlelight, and Scripture as we celebrate the birth of our Savior.",
      eyebrow: (e) => `${formatDate(e.date)}${e.time ? ` • ${e.time}` : ""}`,
      ctaLabel: "See Service Details",
      ctaHref: "/events",
      overlay: "bg-gradient-to-b from-black/50 via-black/30 to-black/70",
      titleClass: "text-amber-50 drop-shadow-lg",
      subtitleClass: "text-amber-50/95 drop-shadow",
      eyebrowClass:
        "bg-black/60 backdrop-blur-sm text-amber-200 border border-amber-200/30",
    };
  }

  if (name.includes("anniversary")) {
    return {
      image: heroAnniversary,
      alt: "Country church at golden hour decorated for an anniversary celebration",
      title: "11 Years of God's Faithfulness",
      subtitle:
        "Celebrate eleven years of grace, growth, and gospel ministry with our church family — worship, testimonies, and a fellowship meal to follow.",
      eyebrow: (e) => `${formatDate(e.date)}${e.time ? ` • ${e.time}` : ""}`,
      ctaLabel: "See Service Details",
      ctaHref: "/events",
      overlay: "bg-gradient-to-b from-black/40 via-black/25 to-black/70",
      titleClass: "text-amber-50 drop-shadow-lg",
      subtitleClass: "text-amber-50/95 drop-shadow",
      eyebrowClass:
        "bg-black/60 backdrop-blur-sm text-amber-200 border border-amber-200/40",
    };
  }

  if (name.includes("teen") && name.includes("camp")) {
    return {
      image: heroTeenCamp,
      alt: "Teens playing paintball in the woods at church camp",
      title: "Teen Church Camp",
      subtitle:
        "An unforgettable week of adventure, friendship, and faith — paintball in the pines, late-night worship, and lifelong memories.",
      eyebrow: (e) => `${formatDate(e.date)}${e.time ? ` • ${e.time}` : ""} • Southland Camp, LA`,
      ctaLabel: "See Camp Details",
      ctaHref: "/events",
      overlay: "bg-gradient-to-b from-black/50 via-black/30 to-black/80",
      titleClass: "text-[#f5e9c9] drop-shadow-lg",
      subtitleClass: "text-[#f5e9c9]/95 drop-shadow",
      eyebrowClass:
        "bg-[#0d1a14]/70 backdrop-blur-sm text-[#7fd06e] border border-[#7fd06e]/40",
    };
  }

  if (name.includes("kid") && name.includes("camp")) {
    return {
      image: heroKidsCamp,
      alt: "Children sitting together on a bench by a lake at kids church camp",
      title: "Kids Church Camp",
      subtitle:
        "A joy-filled week by the lake — new friends, big adventures, and little hearts growing closer to Jesus.",
      eyebrow: (e) => `${formatDate(e.date)}${e.time ? ` • ${e.time}` : ""}`,
      ctaLabel: "See Camp Details",
      ctaHref: "/events",
      overlay: "bg-gradient-to-b from-black/40 via-black/20 to-black/70",
      titleClass: "text-[#fdf6ec] drop-shadow-lg",
      subtitleClass: "text-[#fdf6ec]/95 drop-shadow",
      eyebrowClass:
        "bg-black/55 backdrop-blur-sm text-[#ffd6a8] border border-[#ffd6a8]/40",
    };
  }

  // Default: any other special event still gets a slide using the community image.
  return {
    image: heroImage,
    alt: event.name,
    title: event.name,
    subtitle: event.description,
    eyebrow: (e) => `${formatDate(e.date)}${e.time ? ` • ${e.time}` : ""}`,
    ctaLabel: "View All Events",
    ctaHref: "/events",
    overlay: "bg-gradient-to-r from-primary/90 to-primary/60",
    titleClass: "text-primary-foreground drop-shadow-lg",
    subtitleClass: "text-primary-foreground/95 drop-shadow",
    eyebrowClass:
      "bg-black/50 backdrop-blur-sm text-white border border-white/20",
  };
};

const Home = () => {
  const { nextEvent, nextSpecialEvent, specialEvents } = useChurchData();
  const heroAutoplay = useRef(
    Autoplay({ delay: 10000, stopOnInteraction: false, stopOnMouseEnter: true })
  );
  return (
    <div className="min-h-screen">
      <SEO 
        title="Welcome Home | Providence Baptist Church Georgetown TX"
        description="Providence Baptist Church is a caring church family in Georgetown, Texas. Join us for worship, Bible study, and fellowship. Sunday services at 10AM & 5:30PM. Celebrating 10 years of God's faithfulness."
        url="https://pbcatx.org"
      />
      {/* Hero Carousel */}
      <section className="relative">
        <Carousel
          opts={{ loop: true, align: "start" }}
          plugins={[heroAutoplay.current]}
          className="w-full"
        >
          <CarouselContent>
            {/* Slide 1: Welcome Home */}
            <CarouselItem>
              <div className="relative h-[500px] sm:h-[600px] md:h-[700px] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                  <img
                    src={heroImage}
                    alt="Providence Baptist Church community"
                    className="w-full h-full object-cover object-[center_25%]"
                    loading="eager"
                    fetchPriority="high"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary/70" />
                </div>
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 z-10 text-center">
                  <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-primary-foreground mb-4 sm:mb-6">
                    Welcome Home
                  </h1>
                  <p className="text-lg sm:text-xl md:text-2xl text-primary-foreground/90 mb-6 sm:mb-8 max-w-3xl mx-auto px-4">
                    A caring church family in Georgetown, Texas
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4">
                    <Button asChild variant="secondary" size="lg" className="min-h-[44px]">
                      <Link to="/about">Learn More About Us</Link>
                    </Button>
                    <Button asChild variant="outline" size="lg" className="border-2 border-primary-foreground bg-transparent text-primary-foreground hover:bg-primary-foreground hover:text-primary min-h-[44px]">
                      <Link to="/contact">Get In Touch</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </CarouselItem>

            {/* Dynamic special-event slides — auto-hide once an event has passed (handled in useChurchData) */}
            {specialEvents.map((event) => {
              const cfg = getSpecialHeroConfig(event);
              return (
                <CarouselItem key={`${event.name}-${event.date}`}>
                  <div className="relative h-[500px] sm:h-[600px] md:h-[700px] flex items-center justify-center overflow-hidden">
                    <div className="absolute inset-0 z-0">
                      <img
                        src={cfg.image}
                        alt={cfg.alt}
                        className="w-full h-full object-cover object-center"
                        loading="lazy"
                        decoding="async"
                      />
                      <div className={`absolute inset-0 ${cfg.overlay}`} />
                    </div>
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 z-10 text-center">
                      {cfg.eyebrow && (
                        <p
                          className={`inline-block rounded-full px-4 py-1.5 text-xs sm:text-sm uppercase tracking-[0.25em] mb-4 sm:mb-5 font-bold ${cfg.eyebrowClass}`}
                        >
                          {cfg.eyebrow(event)}
                        </p>
                      )}
                      <h2
                        className={`text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6 ${cfg.titleClass}`}
                      >
                        {cfg.title}
                      </h2>
                      <p
                        className={`text-lg sm:text-xl md:text-2xl mb-6 sm:mb-8 max-w-3xl mx-auto px-4 ${cfg.subtitleClass}`}
                      >
                        {cfg.subtitle}
                      </p>
                      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4">
                        <Button
                          asChild
                          size="lg"
                          className={`min-h-[44px] ${cfg.ctaClass ?? ""}`}
                          variant={cfg.ctaClass ? "default" : "secondary"}
                        >
                          <Link to={cfg.ctaHref}>{cfg.ctaLabel}</Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              );
            })}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex left-4 z-20 bg-white/20 border-white/40 text-white hover:bg-white/40" />
          <CarouselNext className="hidden md:flex right-4 z-20 bg-white/20 border-white/40 text-white hover:bg-white/40" />
        </Carousel>
      </section>


      {/* Next Event Banner */}
      {nextEvent && (
        <section className="bg-gradient-to-r from-secondary to-accent text-accent-foreground py-6 sm:py-8">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6">
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3 sm:gap-4 text-center sm:text-left">
                <Calendar className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 flex-shrink-0" />
                <div>
                  <p className="text-xs sm:text-sm uppercase tracking-wider opacity-80 mb-1">Next Event</p>
                  <h2 className="text-lg sm:text-xl md:text-2xl font-bold">{nextEvent.name}</h2>
                  <p className="text-sm sm:text-base md:text-lg">
                    {nextEvent.date}{nextEvent.time ? ` • ${nextEvent.time}` : ""}
                  </p>
                </div>
              </div>
              <Button asChild variant="default" size="lg" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 min-h-[44px] w-full sm:w-auto">
                <Link to="/events">View All Events</Link>
              </Button>
            </div>
          </div>
        </section>
      )}

      {/* Photo Gallery Section */}
      <section className="py-12 sm:py-16 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-3 sm:mb-4 text-foreground">
            Our Church Community
          </h2>
          <p className="text-center text-muted-foreground mb-8 sm:mb-12 max-w-2xl mx-auto px-4">
            Experience the warmth and fellowship of our church family through these moments.
          </p>
          
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full max-w-6xl mx-auto"
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              <CarouselItem className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                <Card className="overflow-hidden shadow-lg hover:shadow-2xl transition-shadow">
                  <CardContent className="p-0">
                    <img
                      src={galleryWorship}
                      alt="Pastor preaching from the pulpit"
                      className="w-full h-64 md:h-80 object-cover"
                      loading="lazy"
                      decoding="async"
                      fetchPriority="low"
                    />
                    <div className="p-4 bg-card">
                      <h3 className="text-lg font-semibold text-foreground">Biblical Preaching</h3>
                      <p className="text-sm text-muted-foreground">Verse by verse teaching</p>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>

              <CarouselItem className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                <Card className="overflow-hidden shadow-lg hover:shadow-2xl transition-shadow">
                  <CardContent className="p-0">
                    <img
                      src={galleryChildren}
                      alt="Children's ministry with kids learning and playing"
                      className="w-full h-64 md:h-80 object-cover"
                      loading="lazy"
                      decoding="async"
                      fetchPriority="low"
                    />
                    <div className="p-4 bg-card">
                      <h3 className="text-lg font-semibold text-foreground">Children's Ministry</h3>
                      <p className="text-sm text-muted-foreground">Nurturing young hearts</p>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>

              <CarouselItem className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                <Card className="overflow-hidden shadow-lg hover:shadow-2xl transition-shadow">
                  <CardContent className="p-0">
                    <img
                      src={galleryFellowship}
                      alt="Fellowship meal with families sharing together"
                      className="w-full h-64 md:h-80 object-cover"
                      loading="lazy"
                      decoding="async"
                      fetchPriority="low"
                    />
                    <div className="p-4 bg-card">
                      <h3 className="text-lg font-semibold text-foreground">Fellowship Meals</h3>
                      <p className="text-sm text-muted-foreground">Building relationships</p>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>

              <CarouselItem className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                <Card className="overflow-hidden shadow-lg hover:shadow-2xl transition-shadow">
                  <CardContent className="p-0">
                    <img
                      src={galleryOutreach}
                      alt="Community service and outreach volunteers helping"
                      className="w-full h-64 md:h-80 object-cover"
                      loading="lazy"
                      decoding="async"
                      fetchPriority="low"
                    />
                    <div className="p-4 bg-card">
                      <h3 className="text-lg font-semibold text-foreground">Community Outreach</h3>
                      <p className="text-sm text-muted-foreground">Serving our neighbors</p>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
              
              <CarouselItem className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                <Card className="overflow-hidden shadow-lg hover:shadow-2xl transition-shadow">
                  <CardContent className="p-0">
                    <img
                      src={galleryBiblestudy}
                      alt="Small group Bible study discussion"
                      className="w-full h-64 md:h-80 object-cover"
                      loading="lazy"
                      decoding="async"
                      fetchPriority="low"
                    />
                    <div className="p-4 bg-card">
                      <h3 className="text-lg font-semibold text-foreground">Bible Study</h3>
                      <p className="text-sm text-muted-foreground">Growing in the Word</p>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex" />
            <CarouselNext className="hidden md:flex" />
          </Carousel>
        </div>
      </section>

      {/* What to Expect Section */}
      <section className="py-12 sm:py-16 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-3 sm:mb-4 text-foreground">
            What to Expect
          </h2>
          <p className="text-center text-muted-foreground mb-8 sm:mb-12 max-w-2xl mx-auto px-4">
            We're a caring church family that welcomes everyone. Here's what you'll find when you visit.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
            <Card className="shadow-lg">
              <CardContent className="p-6">
                <div className="p-3 bg-accent/10 rounded-lg w-fit mb-4">
                  <Users className="h-8 w-8 text-accent" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-foreground">Warm Welcome</h3>
                <p className="text-muted-foreground">
                  Friendly greeters will welcome you and answer any questions you may have. We're here to make you feel at home.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-lg">
              <CardContent className="p-6">
                <div className="p-3 bg-accent/10 rounded-lg w-fit mb-4">
                  <Heart className="h-8 w-8 text-accent" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-foreground">Children's Ministry</h3>
                <p className="text-muted-foreground">
                  A clean, safe environment staffed by caring ladies for ages 0-3. Children aged 4-12 have dedicated programs during services.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-lg">
              <CardContent className="p-6">
                <div className="p-3 bg-accent/10 rounded-lg w-fit mb-4">
                  <Users className="h-8 w-8 text-accent" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-foreground">Traditional Service</h3>
                <p className="text-muted-foreground">
                  Congregational music, special songs, Bible messages, and prayer. Services conclude with an invitation for prayer and decisions.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Service Times */}
      <ServiceTimes />

      {/* Latest Sermons CTA */}
      <section className="py-12 sm:py-16 bg-gradient-to-r from-accent/10 to-secondary/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center justify-center p-3 sm:p-4 bg-accent/10 rounded-full mb-4 sm:mb-6">
              <BookOpen className="h-8 w-8 sm:h-10 sm:w-10 text-accent" />
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 text-foreground">
              Biblical Preaching & Teaching
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground mb-6 sm:mb-8 max-w-2xl mx-auto px-4">
              Explore our collection of sermon messages that teach through God's Word verse by verse. 
              Listen to past messages or watch our live services online.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <Button asChild variant="hero" size="lg" className="min-h-[44px]">
                <Link to="/sermons">Browse Sermons</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="min-h-[44px]">
                <Link to="/livestream">Watch Live</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Special Event Details */}
      {nextSpecialEvent && (
        <section id="special-event" className="py-12 sm:py-16 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <Card className="shadow-2xl overflow-hidden">
                <div className="bg-gradient-to-r from-accent to-secondary p-4 sm:p-6 md:p-8 text-accent-foreground">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
                    <Calendar className="h-10 w-10 sm:h-12 sm:w-12 md:h-16 md:w-16 flex-shrink-0" />
                    <div>
                      <p className="text-xs sm:text-sm uppercase tracking-wider opacity-80 mb-1">Upcoming Special Event</p>
                      <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold">{nextSpecialEvent.name}</h2>
                    </div>
                  </div>
                </div>
                <CardContent className="p-4 sm:p-6 md:p-8">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl md:text-2xl font-bold mb-2 text-foreground">
                        {new Date(nextSpecialEvent.date).toLocaleDateString("en-US", { weekday: "long" })}, {nextSpecialEvent.date}
                      </h3>
                      {nextSpecialEvent.time && (
                        <p className="text-base md:text-lg text-muted-foreground flex items-center gap-2">
                          <Clock className="w-5 h-5" />
                          {nextSpecialEvent.time}
                        </p>
                      )}
                    </div>
                    
                    <p className="text-muted-foreground text-base md:text-lg">
                      {nextSpecialEvent.description}
                    </p>

                    <div className="flex flex-col sm:flex-row gap-3">
                      <Button asChild variant="hero" size="lg" className="min-h-[44px]">
                        <Link to="/events">View All Events</Link>
                      </Button>
                      <Button asChild variant="outline" size="lg" className="min-h-[44px]">
                        <Link to="/contact">Contact Us</Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      )}

      {/* Contact Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-foreground">
            Visit Us
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <MapPin className="h-6 w-6 text-accent flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl font-bold mb-2 text-foreground">Location</h3>
                    <p className="text-muted-foreground mb-3">
                      505 W. University Ave, Ste. #109<br />
                      Georgetown, TX 78626
                    </p>
                    <Button asChild variant="outline" size="sm">
                      <a 
                        href="https://maps.google.com/?q=505+W.+University+Ave,+Georgetown,+TX+78626" 
                        target="_blank" 
                        rel="noopener noreferrer"
                      >
                        Get Directions
                      </a>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <Mail className="h-6 w-6 text-accent flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl font-bold mb-2 text-foreground">Contact</h3>
                    <p className="text-muted-foreground mb-3">
                      Have questions? We'd love to hear from you!
                    </p>
                    <div className="space-y-2">
                      <Button asChild variant="outline" size="sm" className="w-full">
                        <a href="mailto:Pastor@pbcatx.org">Email Us</a>
                      </Button>
                      <Button asChild variant="outline" size="sm" className="w-full">
                        <Link to="/contact">Send a Message</Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
