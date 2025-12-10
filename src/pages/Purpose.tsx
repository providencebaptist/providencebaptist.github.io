import { Card, CardContent } from "@/components/ui/card";
import { Target, Globe, Users, Flag, Heart } from "lucide-react";
import SEO from "@/components/SEO";

const Purpose = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title="Purpose & Vision"
        description="Learn about the mission and vision of Providence Baptist Church Georgetown TX. Our purpose: Glorify God, Lift up Christ, Walk in the Spirit. Our vision: Impacting Georgetown and beyond with the Gospel."
        url="https://pbcatx.org/purpose"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "AboutPage",
          "mainEntity": {
            "@type": "Church",
            "@id": "https://pbcatx.org/#church",
            "name": "Providence Baptist Church",
            "slogan": "Glorify God, Lift up Christ, Walk in the Spirit",
            "mission": "To glorify God through souls being saved, lives changed by God's power, families strengthened, the Bible taught and obeyed, and faithful witness",
            "knowsAbout": [
              "Evangelism",
              "Discipleship",
              "Christian Ministry",
              "Church Planting",
              "Biblical Teaching"
            ],
            "seeks": [
              {
                "@type": "Thing",
                "name": "Global Gospel Impact",
                "description": "Making disciples and planting churches worldwide"
              },
              {
                "@type": "Thing",
                "name": "Community Transformation",
                "description": "Serving and impacting Georgetown and surrounding areas"
              },
              {
                "@type": "Thing",
                "name": "Generational Faithfulness",
                "description": "Training the next generation in biblical truth"
              }
            ]
          }
        }}
      />
      <div className="bg-gradient-to-r from-accent to-secondary text-accent-foreground py-12 sm:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-3 sm:mb-4">
            Purpose & Vision
          </h1>
          <p className="text-lg sm:text-xl text-center max-w-3xl mx-auto px-4">
            Our mission and vision for impacting the world with the Gospel
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="max-w-5xl mx-auto space-y-16">
          {/* Purpose Section */}
          <div>
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-3 mb-4">
                <Target className="h-12 w-12 text-accent" />
                <h2 className="text-4xl font-bold text-foreground">Our Purpose</h2>
              </div>
              <p className="text-xl text-accent font-semibold">
                "Glorify God, Lift up Christ, Walk in the Spirit"
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="shadow-lg">
                <CardContent className="p-6">
                  <div className="p-3 bg-accent/10 rounded-lg w-fit mb-4">
                    <Heart className="h-8 w-8 text-accent" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-foreground">Glorify God</h3>
                  <p className="text-muted-foreground leading-relaxed mb-3">
                    We strive to glorify God in everything we do:
                  </p>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="text-accent mt-1">•</span>
                      <span>Souls being saved</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-accent mt-1">•</span>
                      <span>Lives changed by God's power</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-accent mt-1">•</span>
                      <span>Families strengthened</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-accent mt-1">•</span>
                      <span>Bible taught, preached, and obeyed</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-accent mt-1">•</span>
                      <span>Faithful witness and righteous testimonies</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="shadow-lg">
                <CardContent className="p-6">
                  <div className="p-3 bg-accent/10 rounded-lg w-fit mb-4">
                    <Heart className="h-8 w-8 text-accent" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-foreground">Lift up Christ</h3>
                  <p className="text-muted-foreground leading-relaxed mb-3">
                    Jesus Christ is exalted in all aspects of our church:
                  </p>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="text-accent mt-1">•</span>
                      <span>Biblical teaching and preaching</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-accent mt-1">•</span>
                      <span>Worship through music</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-accent mt-1">•</span>
                      <span>Fellowship and community</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-accent mt-1">•</span>
                      <span>Every ministry and activity</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="shadow-lg">
                <CardContent className="p-6">
                  <div className="p-3 bg-accent/10 rounded-lg w-fit mb-4">
                    <Heart className="h-8 w-8 text-accent" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-foreground">Walk in the Spirit</h3>
                  <p className="text-muted-foreground leading-relaxed mb-3">
                    We seek to be led by the Holy Spirit:
                  </p>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="text-accent mt-1">•</span>
                      <span>In our church services</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-accent mt-1">•</span>
                      <span>In our homes and families</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-accent mt-1">•</span>
                      <span>In our individual lives</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-accent mt-1">•</span>
                      <span>In every decision we make</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Vision Section */}
          <div>
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-3 mb-4">
                <Globe className="h-12 w-12 text-accent" />
                <h2 className="text-4xl font-bold text-foreground">Our Vision</h2>
              </div>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                We aim to make a lasting impact at every level—from individual lives to the world stage
              </p>
            </div>

            <div className="space-y-6">
              <Card className="shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-8">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-accent/10 rounded-lg">
                      <Heart className="h-10 w-10 text-accent" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold mb-3 text-foreground">Impact Eternity</h3>
                      <p className="text-lg text-muted-foreground leading-relaxed">
                        By preaching the Gospel and winning souls, we seek to impact where people spend 
                        eternity. There is no greater calling than helping people find salvation in Jesus Christ.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-8">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-accent/10 rounded-lg">
                      <Users className="h-10 w-10 text-accent" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold mb-3 text-foreground">Impact the Community</h3>
                      <p className="text-lg text-muted-foreground leading-relaxed">
                        By helping individuals and families reach their God-given potential, we strengthen 
                        our local community. We want to be a lighthouse of hope and truth in Williamson County.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-8">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-accent/10 rounded-lg">
                      <Flag className="h-10 w-10 text-accent" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold mb-3 text-foreground">Impact the Nation</h3>
                      <p className="text-lg text-muted-foreground leading-relaxed">
                        By praying for our leaders and being a voice for righteousness, we seek to influence 
                        our nation for God. We believe in standing for biblical principles in the public square.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-8">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-accent/10 rounded-lg">
                      <Globe className="h-10 w-10 text-accent" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold mb-3 text-foreground">Impact the World</h3>
                      <p className="text-lg text-muted-foreground leading-relaxed">
                        By investing time, money, and energy to send the Gospel globally, we fulfill Christ's 
                        Great Commission. We support missionaries and ministries around the world who are 
                        spreading the Good News.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Closing Statement */}
          <Card className="shadow-2xl bg-gradient-to-br from-primary/10 to-accent/10 border-2 border-primary">
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl md:text-3xl font-bold mb-4 text-foreground">
                Join Us in This Vision
              </h3>
              <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl mx-auto">
                We believe God has great plans for Providence Baptist Church. We invite you to be part 
                of this vision—to see lives changed, families strengthened, and the Gospel spread to 
                the ends of the earth. Together, we can make an eternal impact.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Purpose;
