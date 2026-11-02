import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingButtons from "@/components/FloatingButtons";
import AIAssistant from "@/components/AIAssistant";
import RedCarCursor from "@/components/RedCarCursor";

export const metadata: Metadata = {
  title: "TSR TRAVEL - Premium Tours & Travel Booking Trichy",
  description: "Safe, comfortable, and affordable travels from Trichy to all over Tamil Nadu. Book 20+ seater Mini Bus and 7-8 seater Maruti Omni Van. Pilgrimage, school, wedding, and corporate trips.",
  keywords: "TSR Travel, Trichy Travels, Trichy Tour Packages, Mini Bus Rental Trichy, Van Rental Trichy, Tamil Nadu Tours, Family Trip Trichy, Temple Tour Tamil Nadu, Ravitharan Kattur Trichy",
  openGraph: {
    title: "TSR TRAVEL - Trichy's Trusted Travel Partner",
    description: "Providing comfortable family tours, corporate trips, and pilgrimage packages across Tamil Nadu with premium 20+ seater mini bus and 8-seater van.",
    url: "https://tsrtravels.in",
    siteName: "TSR TRAVEL",
    locale: "en_IN",
    type: "website",
  },
  alternates: {
    canonical: "https://tsrtravels.in",
  },
  robots: {
    index: true,
    follow: true,
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Schema.org structured data for LocalBusiness & TravelAgency
  const schemaJson = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "TravelAgency",
        "@id": "https://tsrtravels.in/#agency",
        "name": "TSR TRAVEL",
        "alternateName": "TSR Travels Trichy",
        "description": "Safe, comfortable, and affordable travel services from Trichy to all over Tamil Nadu. Family trips, school tours, wedding transit, and airport pickups.",
        "url": "https://tsrtravels.in",
        "logo": "https://tsrtravels.in/images/logo.png",
        "telephone": "+91 97914 65995",
        "email": "tsr@gmail.com",
        "priceRange": "$$",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Kattur",
          "addressLocality": "Tiruchirappalli",
          "addressRegion": "Tamil Nadu",
          "postalCode": "620019",
          "addressCountry": "IN"
        },
        "areaServed": {
          "@type": "State",
          "name": "Tamil Nadu"
        },
        "founder": {
          "@type": "Person",
          "name": "Ravitharan"
        }
      },
      {
        "@type": "LocalBusiness",
        "@id": "https://tsrtravels.in/#business",
        "name": "TSR TRAVEL",
        "telephone": "+91 97914 65995",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Kattur",
          "addressLocality": "Tiruchirappalli",
          "addressRegion": "Tamil Nadu",
          "addressCountry": "IN"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": "10.7905",
          "longitude": "78.7047"
        },
        "openingHoursSpecification": {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday"
          ],
          "opens": "00:00",
          "closes": "23:59"
        }
      }
    ]
  };

  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Outfit:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaJson) }}
        />
      </head>
      <body className="font-sans antialiased bg-cream text-foreground-theme min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
        <FloatingButtons />
        <AIAssistant />
        <RedCarCursor />
      </body>
    </html>
  );
}
