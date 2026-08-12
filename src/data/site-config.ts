export type NavItem = {
  href: string;
  labelKey: "nav.blog" | "nav.relay" | "nav.portfolio" | "nav.cv";
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
  publicRelayUrl: "https://tonkicapi.xyz/",
  relayHealthPath: "/api/status",
  relayBrowserProbeEnabled: false,
};

export const navItems: NavItem[] = [
  { href: "/blog", labelKey: "nav.blog", tone: "primary" },
  { href: "/api-relay", labelKey: "nav.relay", tone: "primary" },
  { href: "/portfolio", labelKey: "nav.portfolio", tone: "secondary" },
  { href: "/cv", labelKey: "nav.cv", tone: "secondary" },
];
