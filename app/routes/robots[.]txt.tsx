/**
 * robots[.]txt route — served at /robots.txt
 *
 * Allows all crawlers, points to the sitemap.
 */
import type { Route } from "./+types/robots[.]txt";
import { SITE_URL } from "~/lib/site";

export function loader({ request }: Route.LoaderArgs) {
  const siteUrl = SITE_URL;

  const robotsTxt = [
    "User-agent: *",
    "Allow: /",
    "",
    "# WordPress admin — not publicly relevant",
    "Disallow: /wp-admin/",
    "Disallow: /wp-login.php",
    "Disallow: /wp-json/",
    "",
    `Sitemap: ${siteUrl}/sitemap.xml`,
  ].join("\n");

  return new Response(robotsTxt, {
    status: 200,
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
