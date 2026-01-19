import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Heart, Users, MapPin, Mail, BookOpen } from "lucide-react";
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

const Home = () => {
  return (
    <div className="min-h-screen">
      <SEO 
        title="Welcome Home | Providence Baptist Church Georgetown TX"
        description="Providence Baptist Church is a caring church family in Georgetown, Texas. Join us for worship, Bible study, and fellowship. Sunday services at 10AM & 5:30PM. Celebrating 10 years of God's faithfulness."
        url="https://pbcatx.org"
      />
      {/* Hero Section */}
      <section className="relative h-[500px] sm:h-[600px] md:h-[700px] flex items-center justify-center overflow-hidden">
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
      </section>

      {/* Special Event Banner */}
      <section className="bg-gradient-to-r from-secondary to-accent text-accent-foreground py-6 sm:py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6">
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3 sm:gap-4 text-center sm:text-left">
                <Calendar className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 flex-shrink-0" />
                <div>
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold">Christmas Sunday Service</h3>
                  <p className="text-sm sm:text-base md:text-lg">December 21, 2025 • Join Us in Celebrating Christ's Birth</p>
                </div>
              </div>
            <Button asChild variant="default" size="lg" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 min-h-[44px] w-full sm:w-auto">
              <Link to="/contact">Plan Your Visit</Link>
            </Button>
          </div>
        </div>
      </section>

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

      {/* Christmas Service Details */}
      <section id="christmas-service" className="py-12 sm:py-16 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <Card className="shadow-2xl overflow-hidden">
              <div className="bg-gradient-to-r from-accent to-secondary p-4 sm:p-6 md:p-8 text-accent-foreground">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
                  <Calendar className="h-10 w-10 sm:h-12 sm:w-12 md:h-16 md:w-16 flex-shrink-0" />
                  <div>
                    <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold">Christmas Sunday Service</h2>
                    <p className="text-base sm:text-lg md:text-xl">Celebrating the Birth of Our Savior</p>
                  </div>
                </div>
              </div>
              <CardContent className="p-4 sm:p-6 md:p-8">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl md:text-2xl font-bold mb-2 text-foreground">December 21, 2025</h3>
                    <p className="text-base md:text-lg text-muted-foreground">Join us for a special Christmas celebration!</p>
                  </div>
                  
                  <div className="space-y-3">
                    <h4 className="text-lg md:text-xl font-semibold text-foreground">Service Details:</h4>
                    <ul className="space-y-3 text-sm md:text-base text-muted-foreground">
                      <li className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-2">
                        <span className="font-semibold text-foreground sm:w-32 flex-shrink-0">Time:</span>
                        <span>Regular service times (check Service Times section above)</span>
                      </li>
                      <li className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-2">
                        <span className="font-semibold text-foreground sm:w-32 flex-shrink-0">Message:</span>
                        <span>Special Christmas sermon celebrating the birth of Jesus Christ</span>
                      </li>
                      <li className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-2">
                        <span className="font-semibold text-foreground sm:w-32 flex-shrink-0">Music:</span>
                        <span>Traditional Christmas hymns and special songs of worship</span>
                      </li>
                    </ul>
                  </div>

                  <p className="text-muted-foreground">
                    We invite you to join us as we celebrate the greatest gift ever given - Jesus Christ, our Savior. 
                    Come worship with us and experience the true meaning of Christmas with our church family!
                  </p>

                  <Button asChild variant="hero" size="lg" className="w-full sm:w-auto min-h-[44px]">
                    <Link to="/contact">Plan Your Visit</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

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
