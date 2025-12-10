import * as HelmetAsync from "react-helmet-async";
import { useLocation } from 'react-router-dom';

const { Helmet } = (HelmetAsync as any).default || HelmetAsync;

const BreadcrumbSchema = () => {
  const location = useLocation();
  const pathSegments = location.pathname.split('/').filter(Boolean);

  // Don't show breadcrumbs on homepage
  if (pathSegments.length === 0) return null;

  const breadcrumbItems = [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://pbcatx.org"
    }
  ];

  // Page title mapping
  const pageTitles: Record<string, string> = {
    about: "About Us",
    beliefs: "Our Beliefs",
    history: "Our History",
    leadership: "Leadership",
    purpose: "Purpose & Vision",
    eternity: "Eternity",
    contact: "Contact Us",
    give: "Give",
    livestream: "Watch Live",
    sermons: "Sermons & Messages"
  };

  // Handle dynamic sermon detail pages
  const getPageTitle = (segment: string, index: number) => {
    if (pathSegments[index - 1] === 'sermons' && index > 0) {
      return 'Sermon';
    }
    return pageTitles[segment] || segment.charAt(0).toUpperCase() + segment.slice(1);
  };

  pathSegments.forEach((segment, index) => {
    breadcrumbItems.push({
      "@type": "ListItem",
      "position": index + 2,
      "name": getPageTitle(segment, index),
      "item": `https://pbcatx.org/${pathSegments.slice(0, index + 1).join('/')}`
    });
  });

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbItems
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(breadcrumbSchema)}
      </script>
    </Helmet>
  );
};

export default BreadcrumbSchema;
