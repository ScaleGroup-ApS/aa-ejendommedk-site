/**
 * AA-Ejendomme ApS — Corporate Homepage
 * Three sections: Hero · Services · Portfolio
 */
import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
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
    "Specialister i ejendomsudvikling, erhvervsudlejning og investering i Roskilde og omegn.";
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
        <PortfolioSection />
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
            Specialister i udvikling, udlejning og investering i Roskilde og
            omegn – med fokus på kvalitet og langsigtede partnerskaber.
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 items-center justify-center">
            <a href="#projekter" className="btn-primary">
              Se Vores Projekter
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
          d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
    title: "Projektudvikling",
    description:
      "Fra idé til nøglefærdig ejendom. Vi varetager hele udviklingsprocessen – grundkøb, myndighedsbehandling, design og opførelse – med fokus på langsigtet værdi.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
    title: "Erhvervsudlejning",
    description:
      "Premium erhvervslejemål til kontorer, showrooms og lager i Roskilderegionen. Fleksible løsninger til virksomheder i vækst.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    title: "Investering & Forvaltning",
    description:
      "Strategisk rådgivning til ejendomsinvestorer. Vi identificerer attraktive investeringsmuligheder og tilbyder professionel porteføljeforvaltning.",
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

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 3 · PORTFOLIO
// ─────────────────────────────────────────────────────────────────────────────

const projects = [
  {
    id: 1,
    title: "Roskildevej Erhvervscenter",
    category: "Erhvervsudlejning",
    gradient:
      "linear-gradient(135deg, #1a2a4a 0%, #0d1b35 40%, #162032 70%, #1E293B 100%)",
    accentLine: "linear-gradient(135deg, #3B5998 0%, #1E293B 100%)",
    size: "large",
  },
  {
    id: 2,
    title: "Søndergade Boliger",
    category: "Projektudvikling",
    gradient:
      "linear-gradient(135deg, #2D1B00 0%, #1A0F00 50%, #12100E 100%)",
    accentLine: "linear-gradient(135deg, #C0A062 0%, #7A5C2E 100%)",
    size: "small",
  },
  {
    id: 3,
    title: "Havnekvarteret Roskilde",
    category: "Investering",
    gradient:
      "linear-gradient(135deg, #002D33 0%, #001A1F 50%, #0A1520 100%)",
    accentLine: "linear-gradient(135deg, #1B6B7B 0%, #0A2A30 100%)",
    size: "small",
  },
];

function ParallaxProjectCard({
  project,
  className,
}: {
  project: (typeof projects)[number];
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <motion.div
      ref={ref}
      className={`portfolio-item ${className ?? ""}`}
      initial={{ opacity: 0, scale: 0.97 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.85, ease: [0.25, 1, 0.5, 1] }}
    >
      {/* Parallax inner */}
      <motion.div
        className="portfolio-image absolute inset-0"
        style={{ y, background: project.gradient }}
      >
        {/* Architectural texture overlay */}
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(203,213,225,1) 1px, transparent 1px), linear-gradient(90deg, rgba(203,213,225,1) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        {/* Accent gradient bar */}
        <div
          className="absolute bottom-0 left-0 right-0 h-1 opacity-60"
          style={{ background: project.accentLine }}
        />
      </motion.div>

      {/* Hover overlay */}
      <div className="portfolio-overlay">
        <div>
          <p className="section-label text-[0.625rem] mb-1">{project.category}</p>
          <h3
            className="text-xl font-bold text-[#F1F5F9]"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            {project.title}
          </h3>
        </div>
      </div>
    </motion.div>
  );
}

function PortfolioSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="projekter" ref={ref} className="py-32 md:py-40" style={{ background: "#0F172A" }}>
      <div className="max-w-7xl mx-auto px-6">
        {/* Section header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-20">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
          >
            <p className="section-label mb-4">Vores arbejde</p>
            <h2
              className="text-4xl md:text-5xl font-bold mb-4"
              style={{ fontFamily: "var(--font-heading)", color: "#F1F5F9" }}
            >
              Udvalgte Projekter
            </h2>
            <div className="accent-divider" />
          </motion.div>
          <motion.p
            className="max-w-md text-sm leading-relaxed md:text-right"
            style={{ color: "#94A3B8" }}
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.25, 1, 0.5, 1] }}
          >
            Et udsnit af vores seneste projekter inden for erhvervsudvikling,
            boligudlejning og ejendomsinvestering i Roskilderegionen.
          </motion.p>
        </div>

        {/* Asymmetric grid: large left + 2 stacked right */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          <div className="md:col-span-7 h-[480px] md:h-[580px]">
            <ParallaxProjectCard project={projects[0]} className="h-full" />
          </div>
          <div className="md:col-span-5 grid grid-rows-2 gap-6 h-[580px] hidden md:grid">
            <ParallaxProjectCard project={projects[1]} className="h-full" />
            <ParallaxProjectCard project={projects[2]} className="h-full" />
          </div>
          {/* Mobile: show the remaining two stacked */}
          <div className="md:hidden h-[300px]">
            <ParallaxProjectCard project={projects[1]} className="h-full" />
          </div>
          <div className="md:hidden h-[300px]">
            <ParallaxProjectCard project={projects[2]} className="h-full" />
          </div>
        </div>

        {/* CTA */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.4, ease: [0.25, 1, 0.5, 1] }}
        >
          <a href="/kontakt" className="btn-secondary">
            Diskuter dit projekt
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
