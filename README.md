# briesa-web

The public marketing website for **Briesa** — a unified WHS, GRC & ISO
certification platform for Australian business.

A self-contained [Next.js](https://nextjs.org) 16 app (App Router, React 19,
Tailwind CSS v4). The design-system components live locally under
[`src/components/ui`](src/components/ui); there are no external private
dependencies.

## Getting started

```bash
bun install      # or: npm install / pnpm install
bun run dev      # http://localhost:3000
```

## Scripts

| Script      | What it does                          |
|-------------|---------------------------------------|
| `dev`       | Start the dev server on port 3000     |
| `build`     | Production build                      |
| `start`     | Serve the production build            |
| `typecheck` | `tsc --noEmit`                        |
| `lint`      | Biome lint + format check             |
| `format`    | Biome fix (format + safe lint fixes)  |

## Notes

This is a frontend-only build: it ships the marketing UI and content with **no
backend**. The contact, newsletter and waitlist forms validate in the browser
and confirm locally — they do not send anything. To capture submissions, wire
each form's validated payload to an endpoint of your choice (e.g. a serverless
route or a service like Formspree); look for the `Public build: there is no
backend` comments in `src/components/*form*`.
