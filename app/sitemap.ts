import { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { students } from "@/data/adibun";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: base, lastModified: new Date(), changeFrequency: "monthly", priority: 1 },
    { url: `${base}/profil`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
  ];

  const profilRoutes: MetadataRoute.Sitemap = students.map((student) => ({
    url: `${base}/profil/${student.id}`,
    lastModified: new Date(),
    changeFrequency: "yearly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...profilRoutes];
}
