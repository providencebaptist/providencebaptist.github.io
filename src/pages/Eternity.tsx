import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, BookOpen, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import SEO from "@/components/SEO";

const Eternity = () => {
  const truths = [
    {
      number: 1,
      title: "You are a sinner",
      verses: ["Romans 3:10", "Romans 3:23"],
      description: "Everyone has sinned and fallen short of God's glory."
    },
    {
      number: 2,
      title: "As a sinner, you owe the penalty of sin",
      verses: ["Romans 6:23a", "Revelation 20:14"],
      description: "The wages of sin is death—a 'second death' in the lake of fire."
    },
    {
      number: 3,
      title: "Good works cannot pay that penalty",
      verses: ["Ephesians 2:8-9"],
      description: "Salvation is by grace through faith and not of works."
    },
    {
      number: 4,
      title: "Jesus loves you and died to pay the penalty",
      verses: ["John 3:16", "Romans 5:8", "Romans 6:23b"],
      description: "God loves you and offers the gift of eternal life through Jesus Christ."
    },
    {
      number: 5,
      title: "To receive the gift, you must place your faith in Jesus Christ",
      verses: ["Romans 10:9-13"],
      description: "Confess Christ and believe in His resurrection to be saved."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title="Eternity - The Most Important Decision"
        description="Are you sure you will go to heaven? Learn the five biblical truths about salvation and eternal life. Discover how to be saved by grace through faith in Jesus Christ."
        url="https://pbcatx.org/eternity"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "Article",
          "headline": "Eternity - The Most Important Decision You Will Ever Make",
          "description": "Biblical teaching on salvation, eternal life, and the Gospel of Jesus Christ according to Scripture",
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
          "about": [
            {
              "@type": "Thing",
              "name": "Christian Salvation",
              "description": "How to be saved and receive eternal life through Jesus Christ"
            },
            {
              "@type": "Thing",
              "name": "Gospel of Jesus Christ",
              "description": "The good news of salvation by grace through faith"
            }
          ],
          "teaches": [
            "All people are sinners (Romans 3:23)",
            "The penalty of sin is death (Romans 6:23)",
            "Good works cannot save (Ephesians 2:8-9)",
            "Jesus died to pay the penalty (John 3:16)",
            "Salvation is by faith in Christ (Romans 10:9-13)"
          ],
          "educationalUse": "Religious Education",
          "learningResourceType": "Gospel Presentation"
        }}
      />
      <div className="bg-gradient-to-r from-accent to-secondary text-accent-foreground py-12 sm:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center gap-3 sm:gap-4 mb-3 sm:mb-4">
            <Heart className="h-10 w-10 sm:h-12 sm:w-12" />
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center">
              Eternity
            </h1>
          </div>
          <p className="text-lg sm:text-xl text-center max-w-3xl mx-auto px-4">
            The most important decision you will ever make
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Opening Question */}
          <Card className="shadow-2xl border-2 border-accent">
            <CardContent className="p-8 text-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-foreground">
                Are you absolutely sure you will go to heaven?
              </h2>
              <div className="bg-muted/50 rounded-lg p-6 mb-4">
                <div className="flex items-start gap-3 justify-center">
                  <BookOpen className="h-6 w-6 text-accent flex-shrink-0 mt-1" />
                  <div className="text-left">
                    <p className="font-semibold text-foreground mb-2">1 John 5:13</p>
                    <p className="text-muted-foreground italic">
                      "These things have I written unto you that believe on the name of the Son of God; 
                      that ye may <span className="font-semibold text-foreground">know that ye have eternal life</span>."
                    </p>
                  </div>
                </div>
              </div>
              <p className="text-lg text-muted-foreground">
                God's purpose in giving us the Bible is that we may <span className="font-semibold text-foreground">know</span> we 
                have eternal life. Not hope, not wish, but <span className="font-semibold text-foreground">know</span> with certainty.
              </p>
            </CardContent>
          </Card>

          {/* Five Truths */}
          <div>
            <h2 className="text-3xl font-bold mb-6 text-foreground text-center">
              Five Truths You Must Believe
            </h2>
            <div className="space-y-6">
              {truths.map((truth) => (
                <Card key={truth.number} className="shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 rounded-full bg-accent text-accent-foreground flex items-center justify-center text-xl font-bold">
                          {truth.number}
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold mb-3 text-foreground">{truth.title}</h3>
                        <p className="text-muted-foreground mb-3">{truth.description}</p>
                        <div className="flex flex-wrap gap-2">
                          {truth.verses.map((verse) => (
                            <span 
                              key={verse} 
                              className="px-3 py-1 bg-accent/10 text-accent text-sm font-semibold rounded-full"
                            >
                              {verse}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* How to Be Saved */}
          <Card className="shadow-2xl bg-gradient-to-br from-accent/10 to-secondary/10 border-2 border-accent">
            <CardContent className="p-8">
              <div className="text-center mb-6">
                <CheckCircle className="h-16 w-16 text-accent mx-auto mb-4" />
                <h2 className="text-3xl font-bold text-foreground mb-4">
                  How to Receive This Gift
                </h2>
              </div>
              
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  The Bible makes it clear: salvation is a <span className="font-semibold text-foreground">gift from God</span>. 
                  You cannot earn it through good works or religious activity. You must simply place your faith 
                  in Jesus Christ and what He did for you on the cross.
                </p>
                
                <div className="bg-background rounded-lg p-6 my-6">
                  <h3 className="text-xl font-bold text-foreground mb-3">What to Do Right Now:</h3>
                  <ol className="space-y-2 list-decimal list-inside text-muted-foreground">
                    <li>Admit you are a sinner and cannot save yourself</li>
                    <li>Believe that Jesus died for your sins and rose again</li>
                    <li>Confess Jesus as your Lord and trust Him alone for salvation</li>
                  </ol>
                </div>

                <p className="text-lg">
                  You can pray to God right now, in your own words, and tell Him you believe in Jesus Christ. 
                  Ask Him to save you and forgive your sins. The Bible promises that whoever calls on the name 
                  of the Lord will be saved.
                </p>

                <div className="bg-primary/10 border-l-4 border-primary rounded-lg p-6 my-6">
                  <p className="text-foreground font-semibold text-lg mb-2">
                    This is the most important decision you will ever make.
                  </p>
                  <p>
                    If you have accepted Jesus Christ as your Savior, or if you have questions about salvation, 
                    please let us know. We would love to help you grow in your new faith or answer any questions 
                    you may have.
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
                <Button asChild variant="hero" size="lg">
                  <Link to="/contact">I Have Questions</Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link to="/contact">I Accepted Christ</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Eternity;
