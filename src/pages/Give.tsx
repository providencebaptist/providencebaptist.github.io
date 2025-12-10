import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, DollarSign, Gift } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import SEO from "@/components/SEO";

const Give = () => {
  const [isDonateModalOpen, setIsDonateModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title="Give - Support Our Ministry"
        description="Support Providence Baptist Church Georgetown TX through online giving, in-person offerings, or by mail. Your gifts help spread the Gospel and serve our community."
        url="https://pbcatx.org/give"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          "mainEntity": {
            "@type": "Church",
            "@id": "https://pbcatx.org/#church",
            "name": "Providence Baptist Church",
            "potentialAction": {
              "@type": "DonateAction",
              "recipient": {
                "@type": "Church",
                "name": "Providence Baptist Church"
              },
              "description": "Support Providence Baptist Church through online giving, in-person offerings, or by mail",
              "target": {
                "@type": "EntryPoint",
                "urlTemplate": "https://pbcatx.org/give",
                "actionPlatform": [
                  "http://schema.org/DesktopWebPlatform",
                  "http://schema.org/MobileWebPlatform"
                ]
              }
            }
          },
          "about": {
            "@type": "Thing",
            "name": "Church Giving and Donations",
            "description": "Biblical stewardship and supporting God's work through tithes and offerings"
          }
        }}
      />
      <div className="bg-gradient-to-r from-accent to-secondary text-accent-foreground py-12 sm:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center gap-3 sm:gap-4 mb-3 sm:mb-4">
            <Heart className="h-10 w-10 sm:h-12 sm:w-12" />
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center">
              Give
            </h1>
          </div>
          <p className="text-lg sm:text-xl text-center max-w-3xl mx-auto px-4">
            Supporting God's work at Providence Baptist Church
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Main Giving Info */}
          <Card className="shadow-2xl">
            <CardContent className="p-8">
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center p-4 bg-accent/10 rounded-full mb-4">
                  <Gift className="h-12 w-12 text-accent" />
                </div>
                <h2 className="text-3xl font-bold text-foreground mb-4">Thank You for Your Generosity</h2>
                <p className="text-lg text-muted-foreground">
                  Your gifts help us fulfill our mission to spread the Gospel, strengthen families, 
                  and serve our community.
                </p>
              </div>

              <div className="bg-muted/50 rounded-lg p-6 mb-6">
                <h3 className="text-xl font-bold text-foreground mb-3">Ways to Give</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <DollarSign className="h-6 w-6 text-accent flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold text-foreground">Online Giving</p>
                      <p className="text-muted-foreground">
                        Give securely online through our giving platform
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <DollarSign className="h-6 w-6 text-accent flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold text-foreground">In-Person</p>
                      <p className="text-muted-foreground">
                        Give during any of our services—offering boxes are available
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <DollarSign className="h-6 w-6 text-accent flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold text-foreground">Mail</p>
                      <p className="text-muted-foreground">
                        Send checks to: 505 W. University Ave, Ste. #109, Georgetown, TX 78626
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <Button 
                  variant="hero" 
                  size="lg" 
                  className="text-base sm:text-lg px-6 sm:px-8 min-h-[44px]"
                  onClick={() => setIsDonateModalOpen(true)}
                >
                  Give Online
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Biblical Foundation */}
          <div>
            <h2 className="text-3xl font-bold mb-6 text-foreground text-center">
              Our Belief About Giving
            </h2>
            <Card className="shadow-lg">
              <CardContent className="p-8">
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    We believe that <span className="font-semibold text-foreground">believers are stewards of God's resources</span>. 
                    Everything we have comes from Him, and He calls us to use it wisely for His glory.
                  </p>
                  
                  <div className="bg-accent/10 border-l-4 border-accent rounded-lg p-6 my-6">
                    <h3 className="text-xl font-bold text-foreground mb-3">The Tithe and Offerings</h3>
                    <p className="mb-3">
                      The <span className="font-semibold text-foreground">tithe (ten percent)</span> is the basic unit of giving 
                      in Scripture. However, we also encourage sacrificial offerings above the tithe as God leads and blesses.
                    </p>
                  </div>

                  <p>
                    Your tithes and offerings support:
                  </p>
                  <ul className="space-y-2 ml-6">
                    <li className="flex items-start gap-2">
                      <span className="text-accent mt-1">•</span>
                      <span>The church's day-to-day operations and ministries</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-accent mt-1">•</span>
                      <span>Helping those in need within our church and community</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-accent mt-1">•</span>
                      <span>Spreading the Gospel locally and around the world</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-accent mt-1">•</span>
                      <span>Supporting missionaries and church planting efforts</span>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Gratitude */}
          <Card className="shadow-lg bg-gradient-to-br from-primary/10 to-accent/10 border-2 border-accent">
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl md:text-3xl font-bold mb-4 text-foreground">
                Thank You for Your Partnership
              </h3>
              <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                We are grateful for your faithful giving. Your generosity enables us to continue the work 
                God has called us to do. Together, we are making an eternal impact for the Kingdom of God.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Donation Modal */}
      <Dialog open={isDonateModalOpen} onOpenChange={setIsDonateModalOpen}>
        <DialogContent className="max-w-4xl w-[95vw] sm:w-[90vw] h-[90vh] p-0 gap-0 flex flex-col">
          <DialogHeader className="px-4 sm:px-6 pt-4 sm:pt-6 pb-2 flex-shrink-0">
            <DialogTitle className="text-lg sm:text-xl">Give Online</DialogTitle>
          </DialogHeader>
          <div className="flex-1 overflow-hidden px-4 sm:px-6 pb-4 sm:pb-6">
            <iframe 
              src="https://secure.anedot.com/providence-baptist-church-adcd4df3-f08b-4275-9bb3-db67bff9c43f/donate"
              width="100%" 
              height="100%"
              frameBorder="0"
              className="rounded-lg"
              title="Online Giving"
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Give;
