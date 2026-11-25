/**
 * llms[.]txt route — served at /llms.txt
 *
 * A short, factual description of the site for AI assistants and LLM
 * crawlers (https://llmstxt.org). Facts mirror the footer, contact page
 * and Organization JSON-LD.
 */
import { SITE_URL } from "~/lib/site";

export function loader() {
  const llmsTxt = [
    "# AA-Ejendomme ApS",
    "",
    "> Privat boligudlejning i Roskilde og omegn — trygge og velholdte lejeboliger til private lejere.",
    "",
    "- CVR: 38891197",
    "- Adresse: Risø Huse 1, 4000 Roskilde, Danmark",
    "- E-mail: kontakt@aa-ejendomme.dk",
    "",
    "## Sider",
    "",
    `- [Forside](${SITE_URL}/): Boligudlejning, tryghed & kvalitet, vedligehold & drift`,
    `- [Om os](${SITE_URL}/om-os)`,
    `- [Kontakt](${SITE_URL}/kontakt)`,
    `- [Sitemap](${SITE_URL}/sitemap.xml)`,
  ].join("\n");

  return new Response(llmsTxt, {
    status: 200,
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
