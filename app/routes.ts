import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/index.tsx"),
  route("robots.txt", "routes/robots[.]txt.tsx"),
  route("sitemap.xml", "routes/sitemap[.]xml.tsx"),
  // Static subpages — take priority over the WP catch-all so these
  // routes always render, even when WordPress is unavailable.
  route("om-os", "routes/om-os.tsx"),
  route("kontakt", "routes/kontakt.tsx"),
  route("privatlivspolitik", "routes/privatlivspolitik.tsx"),
  route("handelsbetingelser", "routes/handelsbetingelser.tsx"),
  route("*", "routes/$.tsx"),
] satisfies RouteConfig;
