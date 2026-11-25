import type { MetadataRoute } from "next";
import { SITE } from "@/data/site";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE.name,
    short_name: SITE.shortName,
    description: "Rekond, tvätt och polering i Ängelholm.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#9a231e",
    lang: "sv",
  };
}
