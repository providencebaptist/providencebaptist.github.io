import * as HelmetAsync from "react-helmet-async";

const { Helmet } = HelmetAsync;

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article';
  structuredData?: object;
}

const SEO = ({
  title = "Providence Baptist Church | Georgetown, TX",
  description = "Providence Baptist Church is a caring church family in Georgetown, TX. Join us for worship services, Bible study, and fellowship. Celebrating 10 years of God's faithfulness.",
  image = "https://pbcatx.org/placeholder.svg",
  url = "https://pbcatx.org",
  type = "website",
  structuredData
}: SEOProps) => {
  const siteUrl = url || "https://pbcatx.org";
  const fullTitle = title.includes("Providence Baptist Church") 
    ? title 
    : `${title} | Providence Baptist Church`;

  // Default structured data for the church
  const defaultStructuredData = {
    "@context": "https://schema.org",
    "@type": "Church",
    "@id": `${siteUrl}/#church`,
    "name": "Providence Baptist Church",
    "alternateName": "PBC Georgetown",
    "description": "An Independent Baptist Church that believes the Bible, dedicated to glorifying God, lifting up Christ, and walking in the Spirit.",
    "url": siteUrl,
    "telephone": "",
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
      "latitude": "30.632856",
      "longitude": "-97.677154"
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": "Sunday",
        "opens": "10:00",
        "closes": "12:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": "Sunday",
        "opens": "17:30",
        "closes": "18:30"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": "Wednesday",
        "opens": "19:00",
        "closes": "20:00"
      }
    ],
    "founder": {
      "@type": "Person",
      "name": "Kyle Pope",
      "jobTitle": "Pastor"
    },
    "foundingDate": "2015-07",
    "sameAs": [
      "https://www.facebook.com/ProvidenceBaptistChurchGeorgetown"
    ],
    "image": image,
    "priceRange": "Free",
    "hasMap": "https://maps.google.com/?q=505+W.+University+Ave,+Georgetown,+TX+78626"
  };

  const jsonLd = structuredData || defaultStructuredData;

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={description} />
      <link rel="canonical" href={siteUrl} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={siteUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:locale" content="en_US" />
      <meta property="og:site_name" content="Providence Baptist Church" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={siteUrl} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* AI/LLM Optimization */}
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <meta name="googlebot" content="index, follow" />
      <meta name="bingbot" content="index, follow" />
      
      {/* Semantic keywords for AI understanding */}
      <meta name="keywords" content="Providence Baptist Church, Georgetown TX church, Independent Baptist Church, Bible believing church, Christian worship Georgetown, Sunday service Georgetown TX, Pastor Kyle Pope, Bible study, Christian fellowship, church family" />
      <meta name="category" content="Religion & Spirituality" />
      <meta name="subject" content="Christian Church and Religious Organization" />
      <meta name="coverage" content="Georgetown, Texas, USA" />
      <meta name="distribution" content="global" />
      <meta name="rating" content="general" />

      {/* Structured Data - JSON-LD */}
      <script type="application/ld+json">
        {JSON.stringify(jsonLd)}
      </script>
    </Helmet>
  );
};

export default SEO;
