import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Church, BookOpen, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import SEO from "@/components/SEO";

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title="About Us"
        description="Learn about Providence Baptist Church Georgetown TX - An Independent Baptist Church celebrating 10 years of ministry. Our mission: Glorify God, Lift up Christ, Walk in the Spirit."
        url="https://pbcatx.org/about"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "Church",
          "@id": "https://pbcatx.org/#church",
          "name": "Providence Baptist Church",
          "alternateName": "PBC Georgetown",
          "description": "An Independent Baptist Church that believes the Bible, celebrating over 10 years of ministry in Georgetown, Texas",
          "foundingDate": "2015-11",
          "founder": {
            "@type": "Person",
            "name": "Kyle Pope",
            "jobTitle": "Pastor"
          },
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "505 W. University Ave, Ste. #109",
            "addressLocality": "Georgetown",
            "addressRegion": "TX",
            "postalCode": "78626",
            "addressCountry": "US"
          },
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": "30.6327",
            "longitude": "-97.6778"
          },
          "url": "https://pbcatx.org",
          "email": "Pastor@pbcatx.org",
          "slogan": "Glorify God, Lift up Christ, Walk in the Spirit",
          "knowsAbout": ["Biblical Christianity", "Baptist Theology", "Christian Ministry", "Bible Teaching"],
          "memberOf": {
            "@type": "Organization",
            "name": "Independent Baptist Churches"
          },
          "areaServed": {
            "@type": "City",
            "name": "Georgetown",
            "containedInPlace": {
              "@type": "State",
              "name": "Texas"
            }
          }
        }}
      />
      <div className="bg-gradient-to-r from-accent to-secondary text-accent-foreground py-12 sm:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center gap-3 sm:gap-4 mb-3 sm:mb-4">
            <Church className="h-10 w-10 sm:h-12 sm:w-12" />
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center">
              About PBC
            </h1>
          </div>
          <p className="text-lg sm:text-xl text-center max-w-3xl mx-auto px-4">
            An Independent Baptist Church that believes the Bible
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Main Identity */}
          <Card className="shadow-2xl">
            <CardContent className="p-8">
              <div className="flex items-start gap-4 mb-6">
                <div className="p-3 bg-accent/10 rounded-lg">
                  <Church className="h-10 w-10 text-accent" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-foreground mb-4">Who We Are</h2>
                  <p className="text-lg text-muted-foreground leading-relaxed mb-4">
                    Providence Baptist Church is an <span className="font-semibold text-foreground">Independent Baptist Church</span> that 
                    believes the Bible. We stand on the authority of God's Word and are committed to preaching and 
                    teaching the truth found in Scripture.
                  </p>
                  <p className="text-lg text-muted-foreground leading-relaxed mb-4">
                    In 2025, we celebrated our <span className="font-semibold text-foreground">10 year anniversary</span> as a church family, 
                    thankful for God's faithfulness and the privilege of serving this community for a decade.
                  </p>
                  <div className="bg-accent/10 rounded-lg p-6 border-l-4 border-accent">
                    <h3 className="text-2xl font-bold text-foreground mb-2">Our Purpose</h3>
                    <p className="text-xl text-accent font-semibold">
                      "Glorify God, Lift up Christ, Walk in the Spirit"
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Three Pillars */}
          <div>
            <h2 className="text-3xl font-bold mb-6 text-foreground text-center">
              Our Mission
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="shadow-lg">
                <CardContent className="p-6">
                  <div className="p-3 bg-accent/10 rounded-lg w-fit mb-4">
                    <Heart className="h-8 w-8 text-accent" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-foreground">Glorify God</h3>
                  <p className="text-muted-foreground">
                    In all we do—from worship to service—we seek to bring honor and glory to our Creator.
                  </p>
                </CardContent>
              </Card>

              <Card className="shadow-lg">
                <CardContent className="p-6">
                  <div className="p-3 bg-accent/10 rounded-lg w-fit mb-4">
                    <Church className="h-8 w-8 text-accent" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-foreground">Lift up Christ</h3>
                  <p className="text-muted-foreground">
                    Jesus Christ is the center of our teaching, preaching, music, and fellowship.
                  </p>
                </CardContent>
              </Card>

              <Card className="shadow-lg">
                <CardContent className="p-6">
                  <div className="p-3 bg-accent/10 rounded-lg w-fit mb-4">
                    <BookOpen className="h-8 w-8 text-accent" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-foreground">Walk in the Spirit</h3>
                  <p className="text-muted-foreground">
                    We are led by the Holy Spirit in our services, homes, and individual lives.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Learn More Sections */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <h3 className="text-2xl font-bold mb-3 text-foreground">Our Beliefs</h3>
                <p className="text-muted-foreground mb-4">
                  Discover what we believe about God, salvation, the church, and more. Read our complete 
                  Articles of Faith.
                </p>
                <Button asChild variant="outline">
                  <Link to="/beliefs">Read Our Beliefs</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <h3 className="text-2xl font-bold mb-3 text-foreground">Purpose & Vision</h3>
                <p className="text-muted-foreground mb-4">
                  Learn more about our vision to impact eternity, community, nation, and the world through 
                  the Gospel.
                </p>
                <Button asChild variant="outline">
                  <Link to="/purpose">Read Purpose & Vision</Link>
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Call to Action */}
          <Card className="shadow-2xl bg-gradient-to-r from-accent/10 to-secondary/10 border-2 border-accent">
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl md:text-3xl font-bold mb-4 text-foreground">
                Come Visit Us
              </h3>
              <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
                We'd love to meet you! Join us for any of our services and experience what God is doing 
                at Providence Baptist Church.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild variant="hero" size="lg">
                  <Link to="/">Service Times</Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link to="/contact">Contact Us</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default About;
