export type NavItem = {
  href: string;
  label: string;
  tone: "primary" | "secondary";
};

export const siteProfile = {
  name: "Tonkic",
  realName: "Zhang Tingyu",
  role: "Master's student in Artificial Intelligence",
  affiliation: "School of Artificial Intelligence, SCNU",
  email: "tonkic@qq.com",
  github: "https://github.com/Tonkic",
  siteUrl: "https://tonkic.github.io",
  publicRelayUrl: "http://8.134.127.63:3000/",
  relayHealthPath: "/api/status",
};

export const navItems: NavItem[] = [
  { href: "/blog", label: "Blog", tone: "primary" },
  { href: "/api-relay", label: "模型 API 中转", tone: "primary" },
  { href: "/portfolio", label: "Portfolio", tone: "secondary" },
  { href: "/cv", label: "CV", tone: "secondary" },
];
