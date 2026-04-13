/**
 * AA-Ejendomme ApS — Corporate Homepage
 * Two sections: Hero · Services
 */
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import type { Route } from "./+types/index";
import { getSiteInfo } from "~/lib/wp-api";
import { buildMeta, buildWebsiteJsonLd, stripHtml } from "~/lib/seo";
import type { WpSiteInfo } from "~/lib/wp-types";
import { Header } from "~/components/Header";
import { Footer } from "~/components/Footer";
import { JsonLd } from "~/components/JsonLd";

// ── Loader ───────────────────────────────────────────────────────────────────

export async function loader({ request }: Route.LoaderArgs) {
  const siteUrl = new URL(request.url).origin;
  const siteInfo: WpSiteInfo | null = await getSiteInfo().catch(() => null);
  return { siteInfo, siteUrl };
}

// ── Meta ─────────────────────────────────────────────────────────────────────

export function meta({ data }: Route.MetaArgs) {
  if (!data) return [{ title: "AA-Ejendomme ApS" }];
  const { siteInfo, siteUrl } = data;
  const siteName = siteInfo?.name ?? "AA-Ejendomme ApS";
  const description =
    siteInfo?.description ??
    "Privat boligudlejning i Roskilde og omegn — trygge og velholdte lejeboliger til private lejere.";
  return [
    ...buildMeta({ title: siteName, description, url: siteUrl, siteName, siteUrl, type: "website", locale: "da_DK" }),
    { tagName: "link", rel: "canonical", href: siteUrl },
  ];
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function Index({ loaderData }: Route.ComponentProps) {
  const { siteInfo, siteUrl } = loaderData;
  const siteName = siteInfo?.name ?? "AA-Ejendomme ApS";

  return (
    <div className="flex flex-col min-h-screen">
      <Header siteName={siteName} />
      <JsonLd data={buildWebsiteJsonLd(siteInfo, siteUrl)} />
      <main className="flex-1">
        <HeroSection />
        <ServicesSection />
      </main>
      <Footer siteName={siteName} siteDescription={siteInfo?.description} />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 1 · HERO
// ─────────────────────────────────────────────────────────────────────────────

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.18, delayChildren: 0.25 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.85, ease: [0.25, 1, 0.5, 1] as [number, number, number, number] } },
};

function HeroSection() {
  return (
    <section className="relative h-screen min-h-[640px] flex items-center justify-center overflow-hidden">
      {/* Animated background */}
      <div className="hero-bg">
        <div className="hero-blob hero-blob-1" />
        <div className="hero-blob hero-blob-2" />
        <div className="hero-blob hero-blob-3" />
        <div className="hero-grid" />
        <div className="absolute inset-0 bg-[rgba(10,15,30,0.45)]" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <motion.div variants={containerVariants} initial="hidden" animate="visible">
          <motion.p variants={itemVariants} className="section-label mb-8 tracking-[0.25em]">
            AA-Ejendomme ApS · Roskilde
          </motion.p>

          <motion.h1
            variants={itemVariants}
            className="text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight mb-8"
            style={{ fontFamily: "var(--font-heading)", color: "#F1F5F9" }}
          >
            Vi skaber{" "}
            <span className="gradient-text">bæredygtig&nbsp;værdi</span>
            <br />
            gennem ejendomme
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed"
            style={{ color: "#CBD5E1" }}
          >
            Privat boligudlejning i Roskilde og omegn – med fokus på
            kvalitet, tryghed og langsigtede lejeforhold.
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 items-center justify-center">
            <a href="/kontakt" className="btn-primary">
              Kontakt os
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
            <a href="/om-os" className="btn-secondary">
              Om os
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.6 }}
      >
        <span className="text-[0.625rem] uppercase tracking-[0.2em] text-[#94A3B8]">Scroll</span>
        <motion.div
          className="w-px h-12 bg-gradient-to-b from-[#C0A062] to-transparent"
          animate={{ scaleY: [1, 0.6, 1], opacity: [1, 0.4, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 2 · SERVICES
// ─────────────────────────────────────────────────────────────────────────────

const services = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
    title: "Privat Boligudlejning",
    description:
      "Velholdte lejeboliger til private lejere i Roskilde og omegn. Vi fokuserer udelukkende på privat udlejning – ikke erhverv.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    title: "Tryghed & Kvalitet",
    description:
      "Ordentlige vilkår, klare aftaler og hurtig kommunikation. Vi lægger vægt på langsigtede og stabile lejeforhold.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065zM15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    title: "Vedligehold & Drift",
    description:
      "Vi sørger for, at boligerne er i god stand – fra løbende vedligehold til akut service, så lejerne kan koncentrere sig om hverdagen.",
  },
];

function ServicesSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="relative py-32 md:py-40 overflow-hidden" style={{ background: "#1E293B" }}>
      {/* Animated mesh gradient background */}
      <div className="mesh-bg">
        <div className="mesh-blob mesh-blob-1" />
        <div className="mesh-blob mesh-blob-2" />
        <div className="mesh-blob mesh-blob-3" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
        >
          <p className="section-label mb-4">Hvad vi tilbyder</p>
          <h2
            className="text-4xl md:text-5xl font-bold mb-6"
            style={{ fontFamily: "var(--font-heading)", color: "#F1F5F9" }}
          >
            Vores Fokusområder
          </h2>
          <div className="accent-divider mx-auto" />
        </motion.div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              className="glass-card p-8"
              initial={{ opacity: 0, y: 32 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1], delay: 0.15 * i }}
            >
              <div className="icon-wrapper mb-6">{service.icon}</div>
              <h3
                className="text-xl font-bold mb-4"
                style={{ fontFamily: "var(--font-heading)", color: "#F1F5F9" }}
              >
                {service.title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: "#94A3B8" }}>
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

