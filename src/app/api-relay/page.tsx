import { ApiRelayDashboard } from "@/components/ApiRelayDashboard";

export const metadata = {
  title: "模型 API 中转",
  description: "Tonkic 模型 API 中转站入口与公开服务状态。 Public status and entry point for the Tonkic API relay.",
  alternates: { canonical: "/api-relay/" },
};

export default function ApiRelayPage() {
  return <ApiRelayDashboard />;
}
