import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getDestinationDetails, DESTINATIONS_DATA } from "@/lib/destinations";
import DestinationClient from "./DestinationClient";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Generate static params for static site generation optimization (Next.js standard)
export async function generateStaticParams() {
  return Object.keys(DESTINATIONS_DATA).map((slug) => ({
    slug,
  }));
}

// Generate dynamic meta tags for SEO
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const data = getDestinationDetails(slug);
  
  if (!data) return {};

  return {
    title: `${data.name} Tour Package from Trichy - TSR TRAVEL`,
    description: `Book a safe, premium, and affordable trip to ${data.name} from Trichy. ${data.duration}, starting at ₹${data.price.toLocaleString("en-IN")}. Included: ${data.included.slice(0, 2).join(", ")}.`,
    openGraph: {
      title: `${data.name} Tour Package - TSR TRAVEL Trichy`,
      description: data.tagline,
      images: [{ url: data.images[0] }],
    },
    alternates: {
      canonical: `https://tsrtravels.in/packages/${slug}`,
    }
  };
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const data = getDestinationDetails(slug);

  if (!data) {
    notFound();
  }

  return <DestinationClient data={data} />;
}
