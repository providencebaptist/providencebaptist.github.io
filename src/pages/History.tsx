import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Heart, Church } from "lucide-react";
import SEO from "@/components/SEO";

const History = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title="Our History - God's Providence"
        description="Discover the history of Providence Baptist Church Georgetown TX, founded in 2015 by Pastor Kyle Pope. A decade of God's faithfulness and grace."
        url="https://pbcatx.org/history"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "Article",
          "headline": "The History of Providence Baptist Church",
          "description": "The story of God's providence in establishing Providence Baptist Church in Georgetown, Texas",
          "datePublished": "2015-11-01",
          "dateModified": "2025-01-01",
          "author": {
            "@type": "Church",
            "name": "Providence Baptist Church"
          },
          "publisher": {
            "@type": "Church",
            "name": "Providence Baptist Church",
            "logo": {
              "@type": "ImageObject",
              "url": "https://pbcatx.org/logo.png"
            }
          },
          "about": {
            "@type": "Thing",
            "name": "Church History",
            "description": "The founding and growth of Providence Baptist Church from 2015 to present"
          },
          "mainEntity": {
            "@type": "Church",
            "name": "Providence Baptist Church",
            "foundingDate": "2015-11",
            "foundingLocation": {
              "@type": "Place",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Georgetown",
                "addressRegion": "TX"
              }
            },
            "founder": {
              "@type": "Person",
              "name": "Kyle Pope"
            }
          }
        }}
      />
      <div className="bg-primary text-primary-foreground py-12 sm:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-3 sm:mb-4">
            Our History
          </h1>
          <p className="text-lg sm:text-xl text-center text-primary-foreground/90 max-w-3xl mx-auto px-4">
            The story of God's providence in establishing Providence Baptist Church
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Providence Name */}
          <Card className="shadow-lg">
            <CardContent className="p-8">
              <div className="flex items-start gap-4 mb-4">
                <div className="p-3 bg-accent/10 rounded-lg">
                  <Church className="h-8 w-8 text-accent" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-2">The Name "Providence"</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    The name "Providence" reflects our belief that God was working behind the scenes long before 
                    our first service in November 2015. Providence means God's divine guidance and care, and we've 
                    seen His hand at work every step of the way.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Pastor's Journey */}
          <div>
            <h2 className="text-3xl font-bold mb-6 text-foreground">Pastor Kyle Pope's Journey</h2>
            <div className="space-y-6">
              <Card className="shadow-lg">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-3 text-foreground">The Call to Ministry</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Pastor Kyle Pope felt called into ministry as a teenager after attending church camp. 
                    He later attended Bible college in Colorado Springs, where he met and married his wife, Celeste. 
                    Together, they dedicated their lives to serving God and ministering to others.
                  </p>
                </CardContent>
              </Card>

              <Card className="shadow-lg">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-3 text-foreground">Years of Preparation</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    For nine years, the Popes served at Gospel Light Baptist Church in Rio Rancho, New Mexico. 
                    During this time, they gained valuable experience ministering to people from varied backgrounds 
                    and leading various ministries and events. These years prepared them for the work God had planned 
                    for them in Texas.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* The Call to Texas */}
          <Card className="shadow-lg border-accent border-2">
            <CardContent className="p-8">
              <div className="flex items-start gap-4 mb-4">
                <div className="p-3 bg-accent/10 rounded-lg">
                  <Heart className="h-8 w-8 text-accent" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-3">The Call to Church Planting</h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    After Pastor Pope's father passed away in late 2013, the family sensed God calling them to 
                    church planting in the Austin metro area. Through a series of "divine appointments," the 
                    Austin/Round Rock area repeatedly came to their attention. Through answered prayers, they 
                    became convinced that God wanted them in central Texas.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    The Popes spent a year preparing for this transition, with support from family, their home 
                    church, and other like-minded ministries. They moved to Round Rock in July 2015 to begin 
                    this new chapter, committing to stay and serve long-term.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Milestones */}
          <div>
            <h2 className="text-3xl font-bold mb-6 text-foreground">Church Milestones</h2>
            <div className="space-y-6">
              <Card className="shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <Calendar className="h-6 w-6 text-accent flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-xl font-bold mb-2 text-foreground">November 1, 2015</h3>
                      <p className="text-muted-foreground">
                        <span className="font-semibold">First Service:</span> Providence Baptist Church held 
                        its inaugural service. From this beginning, the congregation has grown in number, 
                        spirit, and strength.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <Calendar className="h-6 w-6 text-accent flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-xl font-bold mb-2 text-foreground">March 20, 2016</h3>
                      <p className="text-muted-foreground">
                        <span className="font-semibold">Charter Service:</span> The church officially 
                        established itself with twelve families joining as charter members. The church 
                        organized legally in Texas and launched an active missions program.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <Calendar className="h-6 w-6 text-accent flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-xl font-bold mb-2 text-foreground">November 2, 2025</h3>
                      <p className="text-muted-foreground">
                        <span className="font-semibold">10-Year Celebration:</span> Join us for our 
                        Open House Sunday as we celebrate a decade of God's faithfulness!
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Legacy */}
          <Card className="shadow-lg bg-muted/30">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-4 text-foreground">A Daughter Church</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Providence Baptist Church is a daughter ministry of Gospel Light Baptist Church in Rio Rancho, 
                New Mexico. We are also endorsed by other like-minded churches who share our vision for spreading 
                the Gospel and building strong church families.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                We believe God has opened the door for us to reach our area with the Gospel. Our history is still 
                being written, and we look forward to seeing what God will do in the years to come.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default History;
