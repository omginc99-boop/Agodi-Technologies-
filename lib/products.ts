export type Product = {
  slug: string;
  n: string;
  name: string;
  layer: string;
  tagline: string;
  summary: string;
  description: string;
  capabilities: string[];
  url?: string;
};

export const PRODUCTS: Product[] = [
  {
    slug: "afriid",
    n: "01",
    name: "AfriID",
    layer: "Identity Infrastructure",
    tagline: "Verify Once. Trusted Everywhere.",
    summary: "Digital identity verification for governments, enterprises, platforms, and people.",
    description:
      "AfriID is Africa's consumer identity network — a single, portable digital identity people can use across every platform that matters. Verify once, then carry that trust everywhere you go online.",
    capabilities: [
      "Reusable, portable digital identity",
      "Government & enterprise-grade verification",
      "Consent-first data sharing",
      "Built for African ID systems first",
    ],
  },
  {
    slug: "idvero",
    n: "02",
    name: "IDVero",
    layer: "Verification Infrastructure",
    tagline: "Verify with Confidence.",
    summary: "Identity verification APIs — KYC, KYB, onboarding, compliance, and business verification.",
    description:
      "IDVero is the verification engine that powers identity and business checks worldwide. A clean API for KYC, KYB, document verification, liveness, and fraud signals — the rails trusted products are built on.",
    capabilities: [
      "KYC — document, selfie & liveness",
      "KYB — business / registry verification",
      "Fraud signals & risk decisioning",
      "Webhooks, dashboard & white-label",
    ],
    url: "https://idvero.vercel.app",
  },
  {
    slug: "afrimail",
    n: "03",
    name: "AfriMail",
    layer: "Trust Infrastructure",
    tagline: "Trust Every Email.",
    summary: "AI-powered email trust, phishing protection, cloned-email detection, and sender verification.",
    description:
      "AfriMail is the trust gateway for email — using live signal analysis and AI to detect phishing, spoofing, and cloned messages before they reach a person. Trust every email, or know exactly why you shouldn't.",
    capabilities: [
      "Live SPF / DKIM / DMARC analysis",
      "Phishing, BEC & clone detection",
      "Homograph & typosquat protection",
      "Sender verification scoring",
    ],
    url: "https://afriemail.com",
  },
  {
    slug: "helpers",
    n: "04",
    name: "Helpers",
    layer: "Workforce Infrastructure",
    tagline: "Work. Hire. Empower.",
    summary: "A trusted marketplace connecting skilled workers and service providers with opportunity.",
    description:
      "Helpers connects skilled workers and service providers with the people who need them — a trusted, verified workforce network that turns talent into opportunity across African communities.",
    capabilities: [
      "Verified worker & provider profiles",
      "90+ job types, multi-city",
      "In-app wallet & payments",
      "Safety, SOS & reputation built in",
    ],
    url: "https://helpers.africa",
  },
  {
    slug: "marketplace-lagos",
    n: "05",
    name: "Marketplace Lagos",
    layer: "Commerce Infrastructure",
    tagline: "Buy Local. Grow Local.",
    summary: "Trusted digital commerce infrastructure for retailers, wholesalers, and entrepreneurs.",
    description:
      "Marketplace Lagos is trust-first commerce infrastructure — safe payments, verification ladders, and escrow that let retailers, wholesalers, and entrepreneurs trade with confidence.",
    capabilities: [
      "Safe-pay escrow & payouts",
      "Seller verification ladder",
      "Goods + services in one place",
      "Built for local, mobile-first trade",
    ],
    url: "https://marketplacelagos.com",
  },
  {
    slug: "playolu",
    n: "06",
    name: "PlayOlu",
    layer: "Entertainment Infrastructure",
    tagline: "Play With Purpose.",
    summary: "Africa's digital entertainment ecosystem for children and families.",
    description:
      "PlayOlu is ad-free, African-inspired learning games and bedtime stories for children — a safe, joyful entertainment ecosystem that grows with every child, newborn to twelve.",
    capabilities: [
      "Ad-free, COPPA-aware by design",
      "African-inspired learning games",
      "Bedtime stories & characters",
      "Family pass + expansion packs",
    ],
    url: "https://playolu.com",
  },
];

export const productBySlug = (slug: string) => PRODUCTS.find((p) => p.slug === slug);
