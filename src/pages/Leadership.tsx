import { Card, CardContent } from "@/components/ui/card";
import { Heart, Users, Church } from "lucide-react";
import SEO from "@/components/SEO";
import pastorImage from "@/assets/pastor-kyle-celeste.png";

const Leadership = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title="Meet Our Pastor - Kyle Pope"
        description="Meet Pastor Kyle Pope and learn about the leadership at Providence Baptist Church Georgetown TX. Serving God's calling since 2015."
        url="https://pbcatx.org/leadership"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "Person",
          "@id": "https://pbcatx.org/leadership#pastor",
          "name": "Kyle Pope",
          "givenName": "Kyle",
          "familyName": "Pope",
          "jobTitle": "Pastor and Founder",
          "honorificPrefix": "Pastor",
          "description": "Pastor Kyle Pope founded Providence Baptist Church in Georgetown, Texas in July 2015. He previously served for nine years at Gospel Light Baptist Church in Rio Rancho, New Mexico.",
          "knowsAbout": ["Biblical Theology", "Church Leadership", "Expository Preaching", "Christian Ministry"],
          "alumniOf": {
            "@type": "EducationalOrganization",
            "name": "Bible College",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Colorado Springs",
              "addressRegion": "CO"
            }
          },
          "worksFor": {
            "@type": "Church",
            "@id": "https://pbcatx.org/#church",
            "name": "Providence Baptist Church",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "505 W. University Ave, Ste. #109",
              "addressLocality": "Georgetown",
              "addressRegion": "TX",
              "postalCode": "78626"
            }
          },
          "spouse": {
            "@type": "Person",
            "name": "Celeste Pope"
          }
        }}
      />
      <div className="bg-primary text-primary-foreground py-12 sm:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-3 sm:mb-4">
            Meet Our Pastor
          </h1>
          <p className="text-lg sm:text-xl text-center text-primary-foreground/90 max-w-3xl mx-auto px-4">
            Getting to know Pastor Kyle Pope and his family
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Pastor Photo */}
          <div className="flex justify-center">
            <img 
              src={pastorImage} 
              alt="Pastor Kyle Pope and his wife Celeste" 
              className="rounded-2xl shadow-2xl max-w-md w-full object-cover"
              loading="lazy"
              decoding="async"
            />
          </div>

          {/* Main Introduction */}
          <Card className="shadow-2xl">
            <CardContent className="p-8">
              <div className="flex items-start gap-4 mb-6">
                <div className="p-3 bg-accent/10 rounded-lg">
                  <Church className="h-10 w-10 text-accent" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-foreground mb-2">Pastor Kyle Pope</h2>
                  <p className="text-xl text-accent font-semibold mb-4">
                    Founder and Pastor of Providence Baptist Church
                  </p>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    Pastor Kyle Pope moved to Texas in July 2015 to establish Providence Baptist Church 
                    in Williamson County. His journey to this point has been marked by God's clear calling 
                    and faithful preparation.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Ministry Journey */}
          <div>
            <h2 className="text-3xl font-bold mb-6 text-foreground">Ministry Journey</h2>
            <div className="space-y-6">
              <Card className="shadow-lg">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-3 text-foreground">The Call to Ministry</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Pastor Pope felt called into ministry as a teenager after attending church camp. 
                    This early calling led him to Bible college in Colorado Springs, where he received 
                    training for ministry and met his wife, Celeste.
                  </p>
                </CardContent>
              </Card>

              <Card className="shadow-lg">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-3 text-foreground">Years of Service in New Mexico</h3>
                  <p className="text-muted-foreground leading-relaxed mb-3">
                    For nine years before moving to Texas, Pastor Pope and his family served at Gospel Light 
                    Baptist Church in Rio Rancho, New Mexico. During this time, they:
                  </p>
                  <ul className="space-y-2 text-muted-foreground ml-6">
                    <li className="flex items-start gap-2">
                      <span className="text-accent mt-1">•</span>
                      <span>Led various ministries and events</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-accent mt-1">•</span>
                      <span>Gained experience ministering to people from varied backgrounds</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-accent mt-1">•</span>
                      <span>Developed skills in church leadership and pastoral care</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="shadow-lg border-2 border-accent">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <Heart className="h-8 w-8 text-accent flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-xl font-bold mb-3 text-foreground">The Call to Church Planting</h3>
                      <p className="text-muted-foreground leading-relaxed mb-3">
                        In late 2013, through a series of "divine appointments," God confirmed His call for 
                        the Popes to plant a church. The Austin/Round Rock area repeatedly came to their 
                        attention, and through answered prayers, they became convinced that God wanted them 
                        in central Texas.
                      </p>
                      <p className="text-muted-foreground leading-relaxed">
                        The family prepared for a year before moving, with support from family, their home 
                        church, and other like-minded ministries. They settled in Round Rock with a commitment 
                        to stay and serve long-term.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Family */}
          <Card className="shadow-2xl bg-gradient-to-br from-accent/10 to-secondary/10">
            <CardContent className="p-8">
              <div className="flex items-start gap-4 mb-6">
                <div className="p-3 bg-accent/10 rounded-lg">
                  <Users className="h-10 w-10 text-accent" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-foreground mb-4">The Pope Family</h2>
                  
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-xl font-semibold text-foreground mb-2">Kyle & Celeste</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        Pastor Kyle and Celeste have been married since May 2006. Celeste serves as the 
                        church pianist and is a notary who runs her own business that she started in 2017. 
                        Pastor Kyle also referees basketball in local public schools during the winter.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold text-foreground mb-2">Their Children</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        The Popes have two children: <span className="font-semibold text-foreground">Maddax</span> and{" "}
                        <span className="font-semibold text-foreground">Caitlin</span>. The family is actively 
                        involved in the life and ministry of the church.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Commitment */}
          <Card className="shadow-lg">
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl font-bold mb-4 text-foreground">
                A Long-Term Commitment
              </h3>
              <p className="text-lg text-muted-foreground leading-relaxed">
                The Pope family has made a long-term commitment to the Round Rock/Georgetown area. 
                They believe God has called them to serve this community and are dedicated to building 
                a strong, Bible-believing church that will impact this region for generations to come.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Leadership;
