import * as HelmetAsync from "react-helmet-async";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const { Helmet } = (HelmetAsync as any).default || HelmetAsync;

export interface FAQItem {
  question: string;
  answer: string;
}

export const DEFAULT_FAQS: FAQItem[] = [
  {
    question: "Where is Providence Baptist Church located?",
    answer:
      "Providence Baptist Church meets at 505 W. University Ave, Ste. #109, Georgetown, TX 78626. We are an Independent Baptist Church serving Georgetown and the surrounding Williamson County, Texas.",
  },
  {
    question: "What are the service times at Providence Baptist Church?",
    answer:
      "Sundays: Sunday School (Teen & Adult) at 10:00 AM, Sunday Morning Worship at 11:00 AM (with Kid's Sunday School during service), and Sunday Evening Service at 5:30 PM. Wednesdays: Ladies Bible Study at 10:00 AM and Prayer & Bible Study at 7:00 PM. All times are Central Time.",
  },
  {
    question: "Are services livestreamed online?",
    answer:
      "Yes. Sunday Morning Worship, Sunday Evening Service, and the Wednesday Prayer & Bible Study are streamed live on SermonAudio and Facebook. Visit our Livestream page to watch live or catch the replay.",
  },
  {
    question: "What does Providence Baptist Church believe?",
    answer:
      "We are an Independent Baptist Church. We believe the Bible (King James Version) is the verbally inspired, inerrant Word of God, that salvation is by grace through faith in the Lord Jesus Christ alone, in the Trinity, in the eternal security of the believer, and in the pre-tribulation rapture and premillennial return of Christ.",
  },
  {
    question: "Who is the pastor of Providence Baptist Church?",
    answer:
      "Pastor Kyle Pope founded Providence Baptist Church in July 2015 and serves as pastor. He felt called to ministry as a teenager, attended Bible college in Colorado Springs, and served 9 years at Gospel Light Baptist Church in Rio Rancho, New Mexico before planting Providence Baptist Church in Georgetown.",
  },
  {
    question: "Do you have programs for children and teens?",
    answer:
      "Yes. Kid's Sunday School meets during the Sunday Morning Worship service, Teen Sunday School meets at 10:00 AM Sunday, and we host a Kid's Choir, Vacation Bible School, a Kids Camp, and a Teen Camp each year. Parents are warmly invited to bring their families.",
  },
  {
    question: "How can I give to Providence Baptist Church?",
    answer:
      "You can give online through our secure giving page, which links to Anedot for processing. We also receive offerings in person during our regular services.",
  },
  {
    question: "How can I contact the church or pastor?",
    answer:
      "Email Pastor Kyle Pope at Pastor@pbcatx.org, or visit the Contact page on our website. You are also welcome to visit us in person any service.",
  },
];

interface SiteFAQProps {
  items?: FAQItem[];
  title?: string;
  description?: string;
  /** Emit FAQPage JSON-LD. Set false if another FAQ on the same page already does. */
  includeSchema?: boolean;
  className?: string;
}

const SiteFAQ = ({
  items = DEFAULT_FAQS,
  title = "Frequently Asked Questions",
  description,
  includeSchema = true,
  className,
}: SiteFAQProps) => {
  if (!items || items.length === 0) return null;

  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((it) => ({
      "@type": "Question",
      name: it.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: it.answer,
      },
    })),
  };

  return (
    <section
      className={
        className ??
        "py-12 md:py-16 bg-muted/30 border-t border-border"
      }
      aria-labelledby="site-faq-heading"
    >
      <div className="container mx-auto px-4 max-w-3xl">
        <h2
          id="site-faq-heading"
          className="font-display text-2xl md:text-3xl font-bold text-foreground mb-2 text-center"
        >
          {title}
        </h2>
        {description && (
          <p className="text-center text-muted-foreground mb-6">{description}</p>
        )}
        <Accordion type="single" collapsible className="w-full mt-4">
          {items.map((it, i) => (
            <AccordionItem key={`${i}-${it.question}`} value={`faq-${i}`}>
              <AccordionTrigger className="text-left font-medium">
                {it.question}
              </AccordionTrigger>
              <AccordionContent className="text-foreground/85 leading-relaxed">
                {it.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        {includeSchema && (
          <Helmet>
            <script type="application/ld+json">
              {JSON.stringify(schema)}
            </script>
          </Helmet>
        )}
      </div>
    </section>
  );
};

export default SiteFAQ;