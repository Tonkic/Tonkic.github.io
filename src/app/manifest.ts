import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Tonkic — AI, Systems & Knowledge",
    short_name: "Tonkic",
    description: "人工智能知识库、工程项目与模型 API 中转。",
    start_url: "/",
    display: "standalone",
    background_color: "#080908",
    theme_color: "#080908",
    icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml" }],
  };
}
