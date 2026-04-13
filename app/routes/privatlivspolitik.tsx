/**
 * Privacy Policy (Privatlivspolitik) — static fallback page so the
 * route never 404s if WordPress is unavailable.
 */
import type { Route } from "./+types/privatlivspolitik";
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
  const title = `Privatlivspolitik | ${siteName}`;
  const description =
    "Privatlivspolitik for AA-Ejendomme ApS — oplysninger om behandling af personoplysninger.";
  return [
    ...buildMeta({
      title,
      description,
      url: `${siteUrl}/privatlivspolitik`,
      siteName,
      siteUrl,
      type: "website",
      locale: "da_DK",
    }),
    { tagName: "link", rel: "canonical", href: `${siteUrl}/privatlivspolitik` },
  ];
}

export default function Privatlivspolitik({ loaderData }: Route.ComponentProps) {
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
              Privatlivspolitik
            </h1>
            <div className="accent-divider" />
          </div>
        </section>

        <section className="py-16 md:py-20" style={{ background: "#1E293B" }}>
          <div className="max-w-3xl mx-auto px-6 space-y-8 leading-relaxed" style={{ color: "#CBD5E1" }}>
            <p>
              Denne privatlivspolitik beskriver, hvordan AA-Ejendomme ApS
              (”vi”, ”os”) behandler personoplysninger, når du besøger vores
              hjemmeside eller kontakter os.
            </p>

            <div>
              <h2 className="text-xl font-bold mb-3" style={{ fontFamily: "var(--font-heading)", color: "#F1F5F9" }}>
                1. Dataansvarlig
              </h2>
              <p>
                AA-Ejendomme ApS er dataansvarlig for de personoplysninger,
                der behandles.
              </p>
              <address className="not-italic mt-3 text-sm" style={{ color: "#94A3B8" }}>
                AA-Ejendomme ApS
                <br />
                Risø Huse 1
                <br />
                4000 Roskilde
                <br />
                CVR: 38891197
                <br />
                E-mail:{" "}
                <a
                  href="mailto:kontakt@aa-ejendomme.dk"
                  className="text-primary hover:underline"
                >
                  kontakt@aa-ejendomme.dk
                </a>
              </address>
            </div>

            <div>
              <h2 className="text-xl font-bold mb-3" style={{ fontFamily: "var(--font-heading)", color: "#F1F5F9" }}>
                2. Hvilke oplysninger indsamler vi
              </h2>
              <p>
                Vi indsamler kun de oplysninger, du selv giver os, fx når du
                udfylder en kontaktformular eller sender os en mail. Det kan
                typisk være navn, e-mailadresse, telefonnummer og indholdet
                af din henvendelse.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold mb-3" style={{ fontFamily: "var(--font-heading)", color: "#F1F5F9" }}>
                3. Formål og retsgrundlag
              </h2>
              <p>
                Oplysningerne anvendes til at besvare din henvendelse, indgå
                og administrere aftaler samt til at overholde vores juridiske
                forpligtelser. Behandlingen sker på grundlag af
                Databeskyttelsesforordningens artikel 6, stk. 1, litra b og f.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold mb-3" style={{ fontFamily: "var(--font-heading)", color: "#F1F5F9" }}>
                4. Opbevaring
              </h2>
              <p>
                Vi opbevarer dine oplysninger, så længe det er nødvendigt for
                det formål, de er indsamlet til. Herefter slettes eller
                anonymiseres oplysningerne.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold mb-3" style={{ fontFamily: "var(--font-heading)", color: "#F1F5F9" }}>
                5. Dine rettigheder
              </h2>
              <p>
                Du har ret til indsigt, berigtigelse, sletning, begrænsning
                og indsigelse samt dataportabilitet. Du kan klage til
                Datatilsynet, hvis du mener, at vi behandler dine oplysninger
                i strid med reglerne.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold mb-3" style={{ fontFamily: "var(--font-heading)", color: "#F1F5F9" }}>
                6. Kontakt
              </h2>
              <p>
                Spørgsmål til privatlivspolitikken kan rettes til
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
