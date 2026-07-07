import type { NextConfig } from "next";

// React's dev mode needs eval() and an HMR websocket; neither is used in production.
const DEV = process.env.NODE_ENV === "development";

/**
 * Security headers applied to every route. CSP is intentionally conservative;
 * widen `script-src`/`connect-src` when analytics or embeds are added. Every
 * route is DENY — the site is never embeddable.
 */
function securityHeaders() {
  return [
    { key: "X-Content-Type-Options", value: "nosniff" },
    { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
    { key: "X-Frame-Options", value: "DENY" },
    { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
    {
      key: "Strict-Transport-Security",
      value: "max-age=63072000; includeSubDomains; preload",
    },
    {
      key: "Content-Security-Policy",
      value: [
        "default-src 'self'",
        "base-uri 'self'",
        "form-action 'self'",
        "frame-ancestors 'none'",
        "img-src 'self' data:",
        // The design system pulls Space Grotesk + IBM Plex Mono via an @import;
        // allow the stylesheet host and the font CDN.
        "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
        "font-src 'self' https://fonts.gstatic.com",
        // Next injects inline hydration scripts; React dev also needs eval (never in prod).
        // nonce-based CSP is the stricter follow-up.
        `script-src 'self' 'unsafe-inline'${DEV ? " 'unsafe-eval'" : ""}`,
        `connect-src 'self'${DEV ? " ws:" : ""}`,
        "object-src 'none'",
        "upgrade-insecure-requests",
      ].join("; "),
    },
  ];
}

const config: NextConfig = {
  poweredByHeader: false,
  images: { formats: ["image/avif", "image/webp"] },
  async headers() {
    return [{ source: "/(.*)", headers: securityHeaders() }];
  },
};

export default config;
