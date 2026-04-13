/**
 * About Us (Om os) — static fallback page so the route never 404s
 * if WordPress is unavailable or the page doesn't exist in WP.
 */
import type { Route } from "./+types/om-os";
import { getSiteInfo } from "~/lib/wp-api";
import { buildMeta } from "~/lib/seo";
import { Header } from "~/components/Header";
import { Footer } from "~/components/Footer";

export async function loader({ request }: Route.LoaderArgs) {
  const siteUrl = new URL(request.url).origin;
  const siteInfo = await getSiteInfo().catch(() => null);
  return { siteInfo, siteUrl };
}

export function meta({ data }: Route.MetaArgs) {
  const siteName = data?.siteInfo?.name ?? "AA-Ejendomme ApS";
  const siteUrl = data?.siteUrl ?? "";
  const title = `Om os | ${siteName}`;
  const description =
    "Lær AA-Ejendomme ApS at kende — specialister i ejendomsudvikling, erhvervsudlejning og investering i Roskilde og omegn.";
  return [
    ...buildMeta({
      title,
      description,
      url: `${siteUrl}/om-os`,
      siteName,
      siteUrl,
      type: "website",
      locale: "da_DK",
    }),
    { tagName: "link", rel: "canonical", href: `${siteUrl}/om-os` },
  ];
}

export default function OmOs({ loaderData }: Route.ComponentProps) {
  const siteName = loaderData.siteInfo?.name ?? "AA-Ejendomme ApS";

  return (
    <div className="flex flex-col min-h-screen">
      <Header siteName={siteName} />

      <main className="flex-1">
        <section className="relative py-24 md:py-32 overflow-hidden">
          <div className="hero-bg">
            <div className="hero-blob hero-blob-1" />
            <div className="hero-blob hero-blob-2" />
            <div className="hero-grid" />
          </div>

          <div className="relative z-10 max-w-4xl mx-auto px-6">
            <p className="section-label mb-4">Om os</p>
            <h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight mb-6"
              style={{ fontFamily: "var(--font-heading)", color: "#F1F5F9" }}
            >
              Lokale specialister i{" "}
              <span className="gradient-text">ejendomme</span>
            </h1>
            <div className="accent-divider mb-8" />
            <p className="text-lg md:text-xl leading-relaxed" style={{ color: "#CBD5E1" }}>
              AA-Ejendomme ApS er en Roskilde-baseret virksomhed med fokus på
              udvikling, udlejning og investering i ejendomme. Vi skaber
              bæredygtig værdi gennem langsigtede partnerskaber og kvalitet i
              alle led af processen.
            </p>
          </div>
        </section>

        <section className="py-20 md:py-24" style={{ background: "#1E293B" }}>
          <div className="max-w-4xl mx-auto px-6 space-y-10">
            <div>
              <h2
                className="text-2xl md:text-3xl font-bold mb-4"
                style={{ fontFamily: "var(--font-heading)", color: "#F1F5F9" }}
              >
                Vores tilgang
              </h2>
              <p className="leading-relaxed" style={{ color: "#CBD5E1" }}>
                Vi tror på, at gode ejendomme skabes i samarbejde med
                lokalsamfundet. Det betyder omhyggelig planlægning, ansvarligt
                byggeri og en vedholdende fokus på at skabe værdi for både
                lejere, investorer og naboer.
              </p>
            </div>

            <div>
              <h2
                className="text-2xl md:text-3xl font-bold mb-4"
                style={{ fontFamily: "var(--font-heading)", color: "#F1F5F9" }}
              >
                Fokusområder
              </h2>
              <ul className="space-y-3 leading-relaxed" style={{ color: "#CBD5E1" }}>
                <li className="flex gap-3">
                  <span className="timeline-dot mt-2" />
                  <span>
                    <strong style={{ color: "#F1F5F9" }}>Projektudvikling</strong> — fra
                    grundkøb til nøglefærdig ejendom.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="timeline-dot mt-2" />
                  <span>
                    <strong style={{ color: "#F1F5F9" }}>Erhvervsudlejning</strong> —
                    premium lejemål til kontorer, showrooms og lager.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="timeline-dot mt-2" />
                  <span>
                    <strong style={{ color: "#F1F5F9" }}>Investering & Forvaltning</strong>{" "}
                    — strategisk rådgivning og professionel porteføljepleje.
                  </span>
                </li>
              </ul>
            </div>

            <div>
              <h2
                className="text-2xl md:text-3xl font-bold mb-4"
                style={{ fontFamily: "var(--font-heading)", color: "#F1F5F9" }}
              >
                Virksomhedsoplysninger
              </h2>
              <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 text-sm" style={{ color: "#CBD5E1" }}>
                <div>
                  <dt className="section-label mb-1">Navn</dt>
                  <dd>AA-Ejendomme ApS</dd>
                </div>
                <div>
                  <dt className="section-label mb-1">CVR</dt>
                  <dd>38891197</dd>
                </div>
                <div>
                  <dt className="section-label mb-1">Adresse</dt>
                  <dd>Risø Huse 1, 4000 Roskilde</dd>
                </div>
                <div>
                  <dt className="section-label mb-1">Selskabsform</dt>
                  <dd>Anpartsselskab (ApS)</dd>
                </div>
              </dl>
            </div>

            <div className="pt-4">
              <a href="/kontakt" className="btn-primary">
                Kom i kontakt
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer siteName={siteName} siteDescription={loaderData.siteInfo?.description} />
    </div>
  );
}
