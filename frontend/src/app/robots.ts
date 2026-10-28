import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/admin/", // Disallow search engine crawlers from indexing the admin dashboard
    },
    sitemap: "https://tsrtravels.in/sitemap.xml",
  };
}
