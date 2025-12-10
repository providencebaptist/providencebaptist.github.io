import { Card, CardContent } from "@/components/ui/card";
import { BookOpen } from "lucide-react";
import SEO from "@/components/SEO";

const Beliefs = () => {
  const beliefs = [
    {
      title: "The Scriptures",
      content: "We believe the Old and New Testament Scriptures are verbally inspired, inerrant, infallible and perfectly preserved. The King James Version is used exclusively in our ministries."
    },
    {
      title: "The True God / Trinity",
      content: "We believe in one true God existing in three persons: Father, Son, and Holy Ghost. They are distinct yet unified in essence, purpose, and glory."
    },
    {
      title: "God the Father",
      content: "We believe God the Father is the Creator and master of the universe. He abides in heaven and orchestrates human history according to His divine plan."
    },
    {
      title: "Jesus Christ",
      content: "We believe Jesus Christ is eternal, fully God and fully man, miraculously conceived, sinless, and the sacrificial Lamb of God. We affirm His miracles, substitutionary death, bodily resurrection, ascension, intercession, and future return."
    },
    {
      title: "The Holy Ghost",
      content: "We believe the Holy Spirit convicts sinners, regenerates converts, indwells believers, guides, comforts, seals, and sanctifies. Sign gifts ceased when Scripture was completed."
    },
    {
      title: "Creation",
      content: "We believe in a literal six-day creation with each organism reproducing 'after its kind.' Humanity is created in God's image. We reject theories that modify the biblical account."
    },
    {
      title: "Satan",
      content: "We believe Satan is a fallen heavenly being (formerly Lucifer) who led a rebellion in heaven, became the 'god of this world,' deceives through false religions, and will be judged eternally."
    },
    {
      title: "Eternity",
      content: "We believe human souls are eternal and will go either to heaven or hell after physical death. These are literal, eternal destinations."
    },
    {
      title: "Salvation",
      content: "We believe all people are born sinners and condemned, but God desires that every soul live with Him in heaven. Salvation is by grace through faith in Jesus' death, burial, and resurrection. The Holy Spirit uses the Gospel to bring conviction, repentance, and faith. Believers are eternally secure."
    },
    {
      title: "Ordinances of the Church",
      content: "We recognize two ordinances: Baptism (by immersion, symbolizing Christ's death, burial, and resurrection, required for church membership) and the Lord's Supper (unleavened bread and unfermented grape juice, symbolizing Christ's body and blood)."
    },
    {
      title: "Sanctification",
      content: "We believe sanctification is a lifelong spiritual process in which the Holy Spirit prepares Christians to serve God. It requires separation from sin and devotion to righteousness."
    },
    {
      title: "The Church",
      content: "We believe the church is a local assembly of baptized believers with Christ as head, the Holy Spirit as guide, and the Bible as authority. Its purpose is to carry the Gospel, baptize converts, and teach believers. We recognize two ordinances (baptism and the Lord's Supper) and two offices (pastors and deacons, held by men)."
    },
    {
      title: "Giving",
      content: "We believe believers are stewards of God's resources. The tithe (ten percent) is the basic unit of giving, but sacrificial offerings above the tithe are encouraged. Tithes and offerings support the church's operations, help those in need, and spread the Gospel."
    },
    {
      title: "The End Times",
      content: "We believe in the imminent rapture of the saved, followed by a seven-year tribulation, the Judgment Seat of Christ and Marriage Supper of the Lamb, Christ's return to defeat the Antichrist at Armageddon, a 1,000-year millennial kingdom, and final judgment of unbelievers before the Great White Throne, after which God will make all things new."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title="Our Beliefs - Articles of Faith"
        description="Read the doctrinal statement and articles of faith of Providence Baptist Church Georgetown TX. We believe in the inerrant Word of God, salvation by grace through faith, and the Trinity."
        url="https://pbcatx.org/beliefs"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "What does Providence Baptist Church believe about the Scriptures?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "We believe the Old and New Testament Scriptures are verbally inspired, inerrant, infallible and perfectly preserved. The King James Version is used exclusively in our ministries."
              }
            },
            {
              "@type": "Question",
              "name": "What does Providence Baptist Church believe about the Trinity?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "We believe in one true God existing in three persons: Father, Son, and Holy Ghost. They are distinct yet unified in essence, purpose, and glory."
              }
            },
            {
              "@type": "Question",
              "name": "What does Providence Baptist Church believe about Jesus Christ?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "We believe Jesus Christ is eternal, fully God and fully man, miraculously conceived, sinless, and the sacrificial Lamb of God. We affirm His miracles, substitutionary death, bodily resurrection, ascension, intercession, and future return."
              }
            },
            {
              "@type": "Question",
              "name": "What does Providence Baptist Church believe about salvation?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "We believe all people are born sinners and condemned, but God desires that every soul live with Him in heaven. Salvation is by grace through faith in Jesus' death, burial, and resurrection. The Holy Spirit uses the Gospel to bring conviction, repentance, and faith. Believers are eternally secure."
              }
            },
            {
              "@type": "Question",
              "name": "What does Providence Baptist Church believe about baptism and communion?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "We recognize two ordinances: Baptism by immersion, symbolizing Christ's death, burial, and resurrection, required for church membership, and the Lord's Supper with unleavened bread and unfermented grape juice, symbolizing Christ's body and blood."
              }
            },
            {
              "@type": "Question",
              "name": "What does Providence Baptist Church believe about eternity?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "We believe human souls are eternal and will go either to heaven or hell after physical death. These are literal, eternal destinations."
              }
            }
          ]
        }}
      />
      <div className="bg-primary text-primary-foreground py-12 sm:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center gap-3 sm:gap-4 mb-3 sm:mb-4">
            <BookOpen className="h-10 w-10 sm:h-12 sm:w-12" />
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center">
              Our Beliefs
            </h1>
          </div>
          <p className="text-lg sm:text-xl text-center text-primary-foreground/90 max-w-3xl mx-auto px-4">
            Articles of Faith - What We Believe and Teach
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="max-w-5xl mx-auto">
          <Card className="shadow-lg mb-12">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-4 text-foreground">Foundation of Our Faith</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                These doctrinal statements represent the core beliefs of Providence Baptist Church. 
                They are based entirely on the Word of God and guide our teaching, preaching, and 
                ministry. We stand firmly on these truths and invite you to study them carefully.
              </p>
            </CardContent>
          </Card>

          <div className="space-y-6">
            {beliefs.map((belief, index) => (
              <Card key={index} className="shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                      <BookOpen className="h-6 w-6 text-accent" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-3 text-foreground">{belief.title}</h3>
                      <p className="text-muted-foreground leading-relaxed">{belief.content}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="shadow-lg mt-12 bg-muted/30">
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl font-bold mb-4 text-foreground">Questions About Our Beliefs?</h3>
              <p className="text-muted-foreground mb-6">
                We would be happy to discuss any of these doctrines with you in more detail. 
                Please feel free to reach out with your questions.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Beliefs;
