import React from "react";
import { Helmet } from "react-helmet-async";
import { useLocation } from "wouter";

type SchemaType = "website" | "article" | "organization";

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  schema?: {
    type: SchemaType;
    data?: any;
  };
  isHomePage?: boolean;
}

// UZUPEŁNIJ TE WARTOŚCI!
const siteUrl = "https://twoja-domena.com"; // <-- WAŻNE: Wpisz tutaj adres URL Twojej strony
const authorName = "Twoje Imię i Nazwisko"; // <-- Wpisz swoje imię i nazwisko
const twitterHandle = "@TwojLoginTwitter"; // <-- Wpisz swój login na Twitterze (opcjonalnie)

const siteName = "Interaktywna Akademia";
const defaultDescription = "Ucz się nauki w nowoczesny sposób";
const defaultImage = `${siteUrl}/og-image.png`;

export default function SEO({
  title,
  description,
  image = defaultImage,
  schema,
  isHomePage = false,
}: SEOProps) {
  const [location] = useLocation();

  const pageTitle = title
    ? isHomePage
      ? `${siteName}: ${title}`
      : `${title} - ${siteName}`
    : `${siteName}: ${defaultDescription}`;

  const pageDescription = description || defaultDescription;
  const canonicalUrl = `${siteUrl}${location === "/" ? "" : location}`;
  const fullImageUrl = image.startsWith("http") ? image : `${siteUrl}${image}`;

  const generateSchemaJSON = () => {
    const schemas: any[] = [];

    if (isHomePage || !schema) {
      schemas.push({
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: siteName,
        url: siteUrl,
        description: defaultDescription,
        potentialAction: {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: `${siteUrl}/?q={search_term_string}`,
          },
          "query-input": "required name=search_term_string",
        },
      });
    }

    schemas.push({
      "@context": "https://schema.org",
      "@type": "Organization",
      name: siteName,
      url: siteUrl,
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}/logo-192.png`,
      },
      description: defaultDescription,
    });

    if (schema) {
      const { type, data = {} } = schema;
      let specificSchema: any = null;

      if (type === "article") {
        specificSchema = {
          "@context": "https://schema.org",
          "@type": "Article",
          headline: data.title || pageTitle,
          description: data.description || pageDescription,
          image: fullImageUrl,
          datePublished: data.date || new Date().toISOString(),
          author: {
            "@type": "Person",
            name: authorName,
          },
          publisher: {
            "@type": "Organization",
            name: siteName,
            logo: {
              "@type": "ImageObject",
              url: `${siteUrl}/logo-192.png`,
            },
          },
          mainEntityOfPage: {
            "@type": "WebPage",
            "@id": canonicalUrl,
          },
        };
        schemas.push(specificSchema);
      }
    }

    return JSON.stringify(schemas);
  };

  const schemaJson = generateSchemaJSON();

  return (
    <Helmet>
      <html lang="pl" />
      <title>{pageTitle}</title>
      <meta name="description" content={pageDescription} />
      <meta name="author" content={authorName} />
      <link rel="canonical" href={canonicalUrl} />

      <meta property="og:type" content={isHomePage ? "website" : "article"} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDescription} />
      <meta property="og:image" content={fullImageUrl} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:locale" content="pl_PL" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:creator" content={twitterHandle} />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={pageDescription} />
      <meta name="twitter:image" content={fullImageUrl} />

      <script type="application/ld+json">{schemaJson}</script>
    </Helmet>
  );
}
