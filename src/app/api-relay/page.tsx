import { ApiRelayDashboard } from "@/components/ApiRelayDashboard";

export const metadata = {
  title: "模型 API 中转",
  description: "Tonkic 模型 API 中转站入口、公开状态与模型价格。",
  alternates: { canonical: "/api-relay/" },
};

export default function ApiRelayPage() {
  return <ApiRelayDashboard />;
}
