import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

// output: "export" のため、ビルド時に out/sitemap.xml として静的生成される。
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    {
      url: `${SITE_URL}/`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${SITE_URL}/erabikata/`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
  ];
}
