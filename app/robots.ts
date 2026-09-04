import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

// output: "export" のため、ビルド時に out/robots.txt として静的生成される。
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // 画像生成APIはクロール対象ではない
      disallow: "/api/",
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
