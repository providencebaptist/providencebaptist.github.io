import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Mail, MapPin, Send, CheckCircle } from "lucide-react";
import { useForm, ValidationError } from "@formspree/react";
import { useState, useEffect } from "react";
import SEO from "@/components/SEO";

const Contact = () => {
  const [state, handleSubmit] = useForm("mqanqeld");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [formKey, setFormKey] = useState(0);

  useEffect(() => {
    if (state.succeeded) {
      setShowSuccessModal(true);
    }
  }, [state.succeeded]);

  const handleCloseModal = () => {
    setShowSuccessModal(false);
    setFormKey(prev => prev + 1); // Reset form by remounting
  };

  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title="Contact Us"
        description="Contact Providence Baptist Church in Georgetown, TX. Visit us at 505 W. University Ave or email Pastor@pbcatx.org. We'd love to hear from you!"
        url="https://pbcatx.org/contact"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "ContactPage",
          "mainEntity": {
            "@type": "Church",
            "@id": "https://pbcatx.org/#church",
            "name": "Providence Baptist Church",
            "alternateName": "PBC Georgetown",
            "description": "An Independent Baptist Church in Georgetown, Texas",
            "email": "Pastor@pbcatx.org",
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
            "contactPoint": [
              {
                "@type": "ContactPoint",
                "telephone": "+1-512-555-0100",
                "contactType": "customer service",
                "email": "Pastor@pbcatx.org",
                "areaServed": "US",
                "availableLanguage": "English"
              }
            ],
            "openingHoursSpecification": [
              {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": "Sunday",
                "opens": "10:00",
                "closes": "10:45",
                "description": "Sunday School"
              },
              {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": "Sunday",
                "opens": "11:00",
                "closes": "12:00",
                "description": "Sunday Morning Worship"
              },
              {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": "Sunday",
                "opens": "17:30",
                "closes": "18:30",
                "description": "Sunday Evening Service"
              },
              {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": "Wednesday",
                "opens": "10:00",
                "closes": "11:00",
                "description": "Ladies Bible Study"
              },
              {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": "Wednesday",
                "opens": "19:00",
                "closes": "20:00",
                "description": "Prayer & Bible Study"
              }
            ]
          }
        }}
      />
      <div className="bg-gradient-to-r from-accent to-secondary text-accent-foreground py-12 sm:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center gap-3 sm:gap-4 mb-3 sm:mb-4">
            <Mail className="h-10 w-10 sm:h-12 sm:w-12" />
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center">
              Contact Us
            </h1>
          </div>
          <p className="text-lg sm:text-xl text-center max-w-3xl mx-auto px-4">
            Questions, Comments, or Prayer Requests
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            <Card className="shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <MapPin className="h-6 w-6 text-accent flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl font-bold mb-2 text-foreground">Visit Us</h3>
                    <p className="text-muted-foreground mb-3">
                      505 W. University Ave, Ste. #109<br />
                      Georgetown, TX 78626
                    </p>
                    <Button asChild variant="outline" size="sm">
                      <a 
                        href="https://maps.google.com/?q=505+W.+University+Ave,+Ste.+%23109,+Georgetown,+TX+78626" 
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
                    <h3 className="text-xl font-bold mb-2 text-foreground">Email Us</h3>
                    <p className="text-muted-foreground mb-3">
                      We'd love to hear from you!
                    </p>
                    <Button asChild variant="outline" size="sm">
                      <a href="mailto:Pastor@pbcatx.org">
                        Pastor@pbcatx.org
                      </a>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="shadow-2xl">
            <CardContent className="p-8">
              <div className="mb-6">
                <h2 className="text-3xl font-bold text-foreground mb-2">Send Us a Message</h2>
                <p className="text-muted-foreground">
                  Fill out the form below and we'll get back to you as soon as possible.
                </p>
              </div>

              <form key={formKey} onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name *</Label>
                      <Input
                        id="firstName"
                        name="firstName"
                        required
                      />
                      <ValidationError 
                        prefix="First Name" 
                        field="firstName"
                        errors={state.errors}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        name="lastName"
                      />
                      <ValidationError 
                        prefix="Last Name" 
                        field="lastName"
                        errors={state.errors}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                      />
                      <ValidationError 
                        prefix="Phone" 
                        field="phone"
                        errors={state.errors}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        required
                      />
                      <ValidationError 
                        prefix="Email" 
                        field="email"
                        errors={state.errors}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject *</Label>
                    <Select name="subject" required>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a subject" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="general">General Inquiry</SelectItem>
                        <SelectItem value="prayer">Prayer Request</SelectItem>
                        <SelectItem value="visit">Planning to Visit</SelectItem>
                        <SelectItem value="membership">Membership Information</SelectItem>
                        <SelectItem value="ministry">Ministry Opportunities</SelectItem>
                        <SelectItem value="pastoral">Pastoral Care</SelectItem>
                        <SelectItem value="event">Event Information</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <ValidationError 
                      prefix="Subject" 
                      field="subject"
                      errors={state.errors}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      name="message"
                      rows={6}
                      required
                      placeholder="Your message, question, or prayer request..."
                    />
                    <ValidationError 
                      prefix="Message" 
                      field="message"
                      errors={state.errors}
                    />
                  </div>

                  <Button 
                    type="submit" 
                    variant="hero" 
                    size="lg" 
                    className="w-full md:w-auto min-h-[44px]"
                    disabled={state.submitting}
                  >
                    <Send className="mr-2 h-5 w-5" />
                    {state.submitting ? "Sending..." : "Send Message"}
                  </Button>

                  <p className="text-sm text-muted-foreground">
                    * Required fields. We'll be in touch as soon as possible!
                  </p>
                </form>
            </CardContent>
          </Card>
        </div>
      </div>

      <Dialog open={showSuccessModal} onOpenChange={handleCloseModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="flex justify-center mb-4">
              <CheckCircle className="h-16 w-16 text-green-600" />
            </div>
            <DialogTitle className="text-center text-2xl">Message Sent Successfully!</DialogTitle>
            <DialogDescription className="text-center text-base pt-2">
              Thanks for reaching out! We've received your message and will get back to you as soon as possible.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-center pt-4">
            <Button onClick={handleCloseModal} variant="default">
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Contact;
