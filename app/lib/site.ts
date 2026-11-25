/**
 * The site's canonical origin.
 *
 * Derived constants rather than `new URL(request.url).origin`: behind the
 * cluster's proxy the request origin is plain http, which leaked http://
 * URLs into the sitemap and canonicals.
 */
export const SITE_URL = "https://aa-ejendomme.dk";
