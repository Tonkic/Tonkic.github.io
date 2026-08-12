import type { Metadata } from "next";
import { OverviewNotice } from "@/components/OverviewNotice";

export const metadata: Metadata = { title: "旧入口已迁移 / Entry moved", alternates: { canonical: "/" }, robots: { index: false, follow: true } };
export default function OverviewPage() { return <OverviewNotice />; }
