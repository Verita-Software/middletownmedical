# Middletown Medical — Web Application

Public marketing and patient-facing web experience for **Middletown Medical**, a multi-location healthcare network in the Hudson Valley. The site helps visitors discover services and locations, find providers, book appointments (with scheduling integrations), and read patient resources—while staying fast, accessible, and SEO-friendly.

This repository is the **Next.js** front end and **Route Handlers** that proxy or call backend scheduling APIs.

---

## For new developers: how to read this codebase

| Layer | Where | Purpose |
|--------|--------|---------|
| **App routes** | `src/app/` | Pages, layouts, metadata, API routes under `src/app/api/` |
| **UI** | `src/components/` | Feature sections, layout (nav, footer), shared UI (`src/components/ui/`) |
| **Data & copy** | `src/lib/` | Content helpers, mock data, validation, Healow client |
| **State** | `src/store/` | Client-side Zustand stores (booking flow, search filters) |
| **Types** | `src/types/` | TypeScript contracts (e.g. FHIR/Healow shapes) |
| **Static/API assets** | `api/` (repo root) | JSON content used by resources and tooling |

Path alias: imports use `@/` → `src/` (see `tsconfig.json`).

---

## Tech stack

- **Framework:** [Next.js 15](https://nextjs.org/) (App Router, React Server Components where applicable)
- **UI:** React 19, **Tailwind CSS 4**, **Radix UI**-based primitives via [shadcn/ui](https://ui.shadcn.com/) (`components.json`), **Lucide** icons
- **State:** [Zustand](https://zustand-demo.pmnd.rs/) for client flows (booking, search filters)
- **Maps:** Leaflet / React-Leaflet; Google Maps API wrapper where used
- **Motion:** Framer Motion (select sections)
- **Language:** TypeScript (strict mode)
- **Tooling:** ESLint (`next/core-web-vitals` + TypeScript), React Compiler enabled in `next.config.ts`

---

## Prerequisites

- **Node.js** 20+ (LTS recommended)
- **npm** (this repo uses `package-lock.json`)

---

## Install and run locally

```bash
git clone <repository-url>
cd middletownmedical
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The dev server uses **Turbopack** (`next dev --turbopack`).

### Production-like run

```bash
npm run build
npm start
```

---

## Environment variables

Scheduling features talk to **Healow** (FHIR) from the server. The client in `src/lib/healow/client.ts` expects:

| Variable | Purpose |
|----------|---------|
| `HEALOW_BASE_URL` | Base URL for the Healow API |
| `HEALOW_PRACTICE_CODE` | Practice identifier used in FHIR paths |
| `HEALOW_BEARER_TOKEN` | **Server-only** bearer token (never expose to the browser) |

Optional / defaults used by API routes:

| Variable | Purpose |
|----------|---------|
| `HEALOW_DEFAULT_SLOT_TYPE` | Slot type filter (default `"none"`) |
| `HEALOW_DEFAULT_PROVIDER_NPI` | Fallback NPI when query params omit actor |
| `HEALOW_DEFAULT_LOCATION_ID` | Fallback location id for schedule queries |

Create a **`.env.local`** in the project root (Next.js loads it automatically; do not commit secrets):

```env
HEALOW_BASE_URL=
HEALOW_PRACTICE_CODE=
HEALOW_BEARER_TOKEN=
# Optional:
# HEALOW_DEFAULT_SLOT_TYPE=none
# HEALOW_DEFAULT_PROVIDER_NPI=
# HEALOW_DEFAULT_LOCATION_ID=
```

Without Healow credentials, **pages still render**, but API routes that call `getConfig()` in the Healow client will fail at runtime when invoked. Use this split to develop UI against mock data where applicable (`src/lib/mock-data.ts`, etc.).

---

## Project structure (concise)

```
src/
  app/                 # Routes, layout, global CSS, Route Handlers (api/)
  components/          # Feature + layout + ui/
  lib/                 # Utilities, content, Healow client, validation
  store/               # Zustand stores
  types/               # Shared TS types
api/                   # JSON and content consumed by the app (e.g. resources)
```

**Notable API routes**

- `POST /api/appointments/book` — book using Healow
- `GET /api/appointments/schedule` — schedule-related queries
- `GET /api/appointments/slots` — slot search
- `GET /api/locations` — locations data

Inspect `src/app/api/**/route.ts` for exact contracts.

---

## Development workflow

1. **Branch** from your team’s default branch; keep PRs focused and small when possible.
2. **Pages & layout:** Root shell lives in `src/app/layout.tsx` (global nav, notification banner, footer, main content area).
3. **Styling:** Prefer Tailwind utility classes; shared patterns live in `src/app/globals.css` and component classes. Use `cn()` from `@/lib/utils` when merging conditional classes.
4. **New UI primitives:** Project is set up for shadcn (`components.json`); add components with the shadcn CLI if your team uses it.
5. **Images:** Remote hosts must be allowlisted in `next.config.ts` → `images.remotePatterns`.
6. **Redirects:** Add entries in `next.config.ts` → `redirects()` for legacy URLs.

### Typecheck without emitting

```bash
npx tsc --noEmit
```

---

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Dev server (Turbopack) on port 3000 |
| `npm run build` | Production build |
| `npm start` | Run production build locally |
| `npm run lint` | ESLint via Next.js |

---

## Testing

There is **no automated unit/e2e test suite** in this repo yet (`*.test.ts` / Playwright / Vitest are not configured).

**Practical checks before opening a PR**

1. `npm run lint`
2. `npx tsc --noEmit`
3. `npm run build` (catches many RSC and route issues)
4. **Manual smoke test** of flows you touched (e.g. home → providers → book, urgent care pages, resources).

When you add tests, prefer colocating `*.test.ts(x)` next to modules or a `__tests__` folder and document the runner in this README.

---

## Deployment

Deploy like any Next.js 15 app (e.g. **Vercel**, Node server, or container). Set production **environment variables** for Healow in the host dashboard—never bake secrets into the client bundle.

---

## Product & content notes

- **Provider and location data** may combine mock data and APIs during development; confirm with product which source is authoritative for release.
- **Resources and long-form copy** often live in JSON under `api/` and types in `src/types/`—update both when changing content shape.

---

## Learn more

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS v4](https://tailwindcss.com/docs)

---

## License / ownership

Private project (`"private": true` in `package.json`). Do not redistribute client credentials or PHI outside approved systems.
