import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Video, Clock, Smartphone, Facebook } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import SEO from "@/components/SEO";

const Livestream = () => {
  const [isLiveStreamOpen, setIsLiveStreamOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title="Watch Live - Online Church Services"
        description="Watch Providence Baptist Church services live online. Sunday morning at 11AM, Sunday evening at 5:30PM, and Wednesday at 7PM Central Time. Stream on SermonAudio and Facebook."
        url="https://pbcatx.org/livestream"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "BroadcastService",
          "@id": "https://pbcatx.org/livestream#broadcast",
          "name": "Providence Baptist Church Live Stream",
          "broadcastDisplayName": "PBC Live Services",
          "description": "Live streaming of worship services and Bible studies from Providence Baptist Church",
          "broadcastTimezone": "America/Chicago",
          "inLanguage": "en",
          "provider": {
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
          "broadcastOfEvent": [
            {
              "@type": "Event",
              "name": "Sunday Morning Worship Service",
              "startDate": "2025-01-01T11:00:00-06:00",
              "eventSchedule": {
                "@type": "Schedule",
                "repeatFrequency": "P1W",
                "byDay": "Sunday"
              },
              "eventAttendanceMode": "https://schema.org/OnlineEventAttendanceMode",
              "location": {
                "@type": "VirtualLocation",
                "url": "https://pbcatx.org/livestream"
              }
            },
            {
              "@type": "Event",
              "name": "Sunday Evening Service",
              "startDate": "2025-01-01T17:30:00-06:00",
              "eventSchedule": {
                "@type": "Schedule",
                "repeatFrequency": "P1W",
                "byDay": "Sunday"
              },
              "eventAttendanceMode": "https://schema.org/OnlineEventAttendanceMode",
              "location": {
                "@type": "VirtualLocation",
                "url": "https://pbcatx.org/livestream"
              }
            },
            {
              "@type": "Event",
              "name": "Wednesday Bible Study",
              "startDate": "2025-01-01T19:00:00-06:00",
              "eventSchedule": {
                "@type": "Schedule",
                "repeatFrequency": "P1W",
                "byDay": "Wednesday"
              },
              "eventAttendanceMode": "https://schema.org/OnlineEventAttendanceMode",
              "location": {
                "@type": "VirtualLocation",
                "url": "https://pbcatx.org/livestream"
              }
            }
          ]
        }}
      />
      <div className="bg-primary text-primary-foreground py-12 sm:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-3 sm:mb-4">
            Watch Live
          </h1>
          <p className="text-lg sm:text-xl text-center text-primary-foreground/90 max-w-3xl mx-auto px-4">
            Join us online for all our public services
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Main Livestream Info */}
          <Card className="shadow-2xl">
            <CardContent className="p-8">
              <div className="flex items-start gap-4 mb-6">
                <div className="p-3 bg-accent/10 rounded-lg">
                  <Video className="h-10 w-10 text-accent" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-foreground mb-2">Live Services</h2>
                  <p className="text-muted-foreground text-lg">
                    All public services are livestreamed on our website and other platforms
                  </p>
                </div>
              </div>

              <div className="bg-muted/50 rounded-lg p-6 mb-6">
                <div className="flex items-center gap-3 mb-4">
                  <Clock className="h-6 w-6 text-accent" />
                  <h3 className="text-xl font-bold text-foreground">Service Times (Central Time)</h3>
                </div>
                <div className="space-y-3 text-muted-foreground">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
                    <span className="font-semibold text-foreground min-w-[180px]">Sunday Morning Worship:</span>
                    <span>11:00 AM</span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
                    <span className="font-semibold text-foreground min-w-[180px]">Sunday Evening Service:</span>
                    <span>5:30 PM</span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
                    <span className="font-semibold text-foreground min-w-[180px]">Wednesday Prayer & Bible Study:</span>
                    <span>7:00 PM (Broadcast begins around 7:30 PM)</span>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <Button 
                  variant="hero" 
                  size="lg" 
                  className="min-h-[44px]"
                  onClick={() => setIsLiveStreamOpen(true)}
                >
                  Watch Live Now
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Access Options */}
          <div>
            <h2 className="text-3xl font-bold mb-6 text-foreground text-center">
              Where to Watch
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-accent/10 rounded-lg">
                      <Video className="h-8 w-8 text-accent" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-3 text-foreground">SermonAudio</h3>
                      <p className="text-muted-foreground mb-4">
                        Access past livestreams and audio/video content on our SermonAudio page
                      </p>
                      <Button asChild variant="outline">
                        <a 
                          href="https://www.sermonaudio.com/solo/pbcatx/sermons/" 
                          target="_blank" 
                          rel="noopener noreferrer"
                        >
                          Visit SermonAudio
                        </a>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-accent/10 rounded-lg">
                      <Smartphone className="h-8 w-8 text-accent" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-3 text-foreground">ChurchOne App</h3>
                      <p className="text-muted-foreground mb-4">
                        Stream services and download content on the go with the ChurchOne mobile app
                      </p>
                      <div className="flex flex-col sm:flex-row gap-3">
                        <Button asChild variant="outline">
                          <a 
                            href="https://apps.apple.com/us/app/churchone-by-sermonaudio/id1488623753" 
                            target="_blank" 
                            rel="noopener noreferrer"
                          >
                            iOS App
                          </a>
                        </Button>
                        <Button asChild variant="outline">
                          <a 
                            href="https://play.google.com/store/apps/details?id=com.sermonaudio.MyChurch&hl=en_US&pli=1" 
                            target="_blank" 
                            rel="noopener noreferrer"
                          >
                            Android App
                          </a>
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-lg md:col-span-2">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-accent/10 rounded-lg">
                      <Facebook className="h-8 w-8 text-accent" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-3 text-foreground">Facebook</h3>
                      <p className="text-muted-foreground mb-4">
                        Watch our services live on our Facebook page
                      </p>
                      <Button asChild variant="outline">
                        <a 
                          href="https://www.facebook.com/PBCatx/" 
                          target="_blank" 
                          rel="noopener noreferrer"
                        >
                          Visit Facebook Page
                        </a>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Additional Info */}
          <Card className="shadow-lg bg-muted/30">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4 text-foreground">Can't Make It Live?</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                No problem! All of our services are archived and available to watch anytime. You can access 
                past sermons, Bible studies, and special services through SermonAudio or the ChurchOne app.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                We understand that life gets busy, and we want to make it easy for you to stay connected 
                with the teaching and fellowship of our church family, no matter where you are.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Livestream Modal */}
      <Dialog open={isLiveStreamOpen} onOpenChange={setIsLiveStreamOpen}>
        <DialogContent className="max-w-6xl w-[95vw] sm:w-[90vw] p-0 gap-0">
          <DialogHeader className="px-4 sm:px-6 pt-4 sm:pt-6 pb-2">
            <DialogTitle className="text-lg sm:text-xl">Live Stream</DialogTitle>
          </DialogHeader>
          <div className="relative w-full aspect-video px-4 sm:px-6 pb-4 sm:pb-6">
            <iframe 
              allow="autoplay" 
              scrolling="no" 
              allowFullScreen
              src="https://embed.sermonaudio.com/player/l/pbcatx/?autoplay=true&wmode=opaque" 
              tabIndex={-1} 
              width="100%" 
              style={{ position: 'absolute', left: 0, top: 0 }} 
              frameBorder="0" 
              height="100%"
              className="rounded-b-lg px-4 sm:px-6"
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Livestream;
