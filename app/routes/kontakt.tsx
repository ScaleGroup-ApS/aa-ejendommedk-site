/**
 * Contact (Kontakt) — static fallback page so the route never 404s
 * if WordPress is unavailable or the page doesn't exist in WP.
 */
import type { Route } from "./+types/kontakt";
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
  const title = `Kontakt | ${siteName}`;
  const description =
    "Kontakt AA-Ejendomme ApS i Roskilde. Vi besvarer gerne spørgsmål om udlejning, udvikling og investering.";
  return [
    ...buildMeta({
      title,
      description,
      url: `${siteUrl}/kontakt`,
      siteName,
      siteUrl,
      type: "website",
      locale: "da_DK",
    }),
    { tagName: "link", rel: "canonical", href: `${siteUrl}/kontakt` },
  ];
}

export default function Kontakt({ loaderData }: Route.ComponentProps) {
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
            <p className="section-label mb-4">Kontakt</p>
            <h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight mb-6"
              style={{ fontFamily: "var(--font-heading)", color: "#F1F5F9" }}
            >
              Lad os <span className="gradient-text">tale sammen</span>
            </h1>
            <div className="accent-divider mb-8" />
            <p className="text-lg leading-relaxed max-w-2xl" style={{ color: "#CBD5E1" }}>
              Har du spørgsmål om et af vores lejemål, ønsker at drøfte et
              udviklingsprojekt eller er nysgerrig på investeringsmuligheder?
              Vi hører gerne fra dig.
            </p>
          </div>
        </section>

        <section className="py-20 md:py-24" style={{ background: "#1E293B" }}>
          <div className="max-w-5xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="glass-card p-8">
              <p className="section-label mb-3">Virksomhed</p>
              <h2
                className="text-2xl font-bold mb-4"
                style={{ fontFamily: "var(--font-heading)", color: "#F1F5F9" }}
              >
                AA-Ejendomme ApS
              </h2>
              <dl className="space-y-3 text-sm" style={{ color: "#CBD5E1" }}>
                <div>
                  <dt className="section-label mb-1">Adresse</dt>
                  <dd>
                    Risø Huse 1
                    <br />
                    4000 Roskilde
                  </dd>
                </div>
                <div>
                  <dt className="section-label mb-1">CVR-nummer</dt>
                  <dd>38891197</dd>
                </div>
                <div>
                  <dt className="section-label mb-1">Selskabsform</dt>
                  <dd>Anpartsselskab (ApS)</dd>
                </div>
              </dl>
            </div>

            <div className="glass-card p-8">
              <p className="section-label mb-3">Henvendelser</p>
              <h2
                className="text-2xl font-bold mb-4"
                style={{ fontFamily: "var(--font-heading)", color: "#F1F5F9" }}
              >
                Skriv til os
              </h2>
              <p className="text-sm leading-relaxed mb-4" style={{ color: "#CBD5E1" }}>
                Vi besvarer alle henvendelser så hurtigt som muligt – typisk
                inden for én til to hverdage.
              </p>
              <p className="text-sm leading-relaxed" style={{ color: "#94A3B8" }}>
                For generelle henvendelser kan du skrive til os pr. brev på
                ovenstående adresse. Kontaktoplysninger opdateres løbende
                her på siden.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer siteName={siteName} siteDescription={loaderData.siteInfo?.description} />
    </div>
  );
}
