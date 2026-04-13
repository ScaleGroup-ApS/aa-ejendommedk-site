/**
 * Terms & Conditions (Handelsbetingelser) — static fallback page so
 * the route never 404s if WordPress is unavailable.
 */
import type { Route } from "./+types/handelsbetingelser";
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
  const title = `Handelsbetingelser | ${siteName}`;
  const description =
    "Handelsbetingelser for AA-Ejendomme ApS — vilkår for samarbejde og udlejning.";
  return [
    ...buildMeta({
      title,
      description,
      url: `${siteUrl}/handelsbetingelser`,
      siteName,
      siteUrl,
      type: "website",
      locale: "da_DK",
    }),
    { tagName: "link", rel: "canonical", href: `${siteUrl}/handelsbetingelser` },
  ];
}

export default function Handelsbetingelser({ loaderData }: Route.ComponentProps) {
  const siteName = loaderData.siteInfo?.name ?? "AA-Ejendomme ApS";

  return (
    <div className="flex flex-col min-h-screen">
      <Header siteName={siteName} />

      <main className="flex-1">
        <section className="relative py-24 md:py-28 overflow-hidden">
          <div className="hero-bg">
            <div className="hero-blob hero-blob-1" />
            <div className="hero-grid" />
          </div>

          <div className="relative z-10 max-w-4xl mx-auto px-6">
            <p className="section-label mb-4">Juridisk</p>
            <h1
              className="text-4xl md:text-5xl font-bold leading-tight tracking-tight mb-6"
              style={{ fontFamily: "var(--font-heading)", color: "#F1F5F9" }}
            >
              Handelsbetingelser
            </h1>
            <div className="accent-divider" />
          </div>
        </section>

        <section className="py-16 md:py-20" style={{ background: "#1E293B" }}>
          <div className="max-w-3xl mx-auto px-6 space-y-8 leading-relaxed" style={{ color: "#CBD5E1" }}>
            <div>
              <h2 className="text-xl font-bold mb-3" style={{ fontFamily: "var(--font-heading)", color: "#F1F5F9" }}>
                1. Generelt
              </h2>
              <p>
                Disse handelsbetingelser gælder for alle aftaler om
                udlejning, udvikling og ejendomsrelaterede ydelser indgået
                med AA-Ejendomme ApS, medmindre andet er skriftligt aftalt.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold mb-3" style={{ fontFamily: "var(--font-heading)", color: "#F1F5F9" }}>
                2. Virksomhedsoplysninger
              </h2>
              <address className="not-italic text-sm" style={{ color: "#94A3B8" }}>
                AA-Ejendomme ApS
                <br />
                Risø Huse 1
                <br />
                4000 Roskilde
                <br />
                CVR: 38891197
              </address>
            </div>

            <div>
              <h2 className="text-xl font-bold mb-3" style={{ fontFamily: "var(--font-heading)", color: "#F1F5F9" }}>
                3. Indgåelse af aftale
              </h2>
              <p>
                En aftale er først bindende, når den er skriftligt bekræftet
                af AA-Ejendomme ApS. Alle priser er angivet i danske kroner
                (DKK) og er eksklusive moms, medmindre andet fremgår.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold mb-3" style={{ fontFamily: "var(--font-heading)", color: "#F1F5F9" }}>
                4. Betaling
              </h2>
              <p>
                Betalingsbetingelser fremgår af den konkrete aftale eller
                faktura. Ved forsinket betaling påløber renter efter
                rentelovens bestemmelser.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold mb-3" style={{ fontFamily: "var(--font-heading)", color: "#F1F5F9" }}>
                5. Ansvar
              </h2>
              <p>
                AA-Ejendomme ApS' ansvar følger dansk rets almindelige
                regler. Vi er ikke ansvarlige for indirekte tab, herunder
                driftstab, tabt avance og andre følgeskader.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold mb-3" style={{ fontFamily: "var(--font-heading)", color: "#F1F5F9" }}>
                6. Lovvalg og værneting
              </h2>
              <p>
                Enhver tvist afgøres efter dansk ret ved Retten i Roskilde
                som første instans.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold mb-3" style={{ fontFamily: "var(--font-heading)", color: "#F1F5F9" }}>
                7. Kontakt
              </h2>
              <p>
                Spørgsmål til handelsbetingelserne kan rettes til
                AA-Ejendomme ApS via vores <a href="/kontakt" className="text-primary hover:underline">kontaktside</a>.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer siteName={siteName} siteDescription={loaderData.siteInfo?.description} />
    </div>
  );
}
