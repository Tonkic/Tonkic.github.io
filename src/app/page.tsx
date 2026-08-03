import type { Metadata } from "next";
import { HomeHero } from "@/components/HomeHero";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return <HomeHero />;
}
