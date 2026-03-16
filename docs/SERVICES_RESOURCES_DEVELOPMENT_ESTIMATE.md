# Services & Resources – Development Estimate (Duly-Style)

This project migrates [Middletown Medical](https://middletownmedical.com/) to a new UI that matches [Duly Health and Care](https://dulyhealthandcare.com) (see [DESIGN_REFERENCE.md](./DESIGN_REFERENCE.md)). This document estimates time and effort to bring all **Services** and **Resources** pages from placeholder state to production-ready, **Duly-style** pages using Middletown Medical’s content structure.

---

## 1. Current State Summary

### Services
- **Listing:** `/services` – single page with three groups (Featured Services, Specialty Services, Specialties A–Z). Links go to `/services/[id]` with `id` = service name (spaces → underscores).
- **Detail:** `/services/[id]` – one dynamic route serves **all 45 services** with the same template and generic placeholder copy.
- **Count:** 12 Featured + 5 Specialty + 28 Specialties A–Z = **45 unique service pages** (all use the same file; no new route files needed).

### Resources
- **Listing:** No dedicated `/resources` landing page; resources appear in the nav dropdown and mobile nav via `ResourceListingComponent`.
- **Detail:** `/resource/[id]` – one dynamic route; content from `api/resources-content.json` (4 entries) + `resource-pages-data.ts` fallback for the rest.
- **Count:** **9 resource slugs** (patient-resources, covid-19-info, telemedicine, patient-centered-medical-home, patient-forms, findhelp, billing-insurance, patient-bill-of-rights, careers).
- **Nested on live site (optional):** Covid-19 (Monoclonal Antibodies, Vaccine, Post COVID-19 Recovery), Patient Forms (Feedback, Pediatric Forms) → adds ~5 more pages if mirrored.

### Duly-Style in This Codebase
- **Nav:** Dark grey text (`text-slate-800`), light grey icons (`text-slate-500`), rounded hover (white bg, shadow, `hover:bg-[#EDF6FB]`, `hover:text-[#49A3DA]`).
- **Locations:** White header strip, border-b, search/filters bar, list + map, blue bottom border per list item, `bg-slate-50`.
- **Hero:** Optional decorative circle (hero-banner), wave divider.
- **Colors:** Slate-50/200/700/800/900, `#002147` for headings, `#49A3DA` for primary accent, `#EDF6FB` for hover.
- **Current service/resource pages** use `#002147`, `#b5097b`, `#8b9e73` (Middletown brand). “Match Duly-style” = refactor to the lighter, slate-based Duly look used in Locations and WebNav.

---

## 2. Scope: What “Create Files for Each Page” Means

| Area | Existing Files | New Files Needed | Work Type |
|------|----------------|------------------|-----------|
| **Services listing** | `src/app/services/page.tsx` | 0 | Refactor to Duly-style layout, typography, spacing |
| **Service detail** | `src/app/services/[id]/page.tsx` | 0 | Refactor template to Duly-style; optionally add content source |
| **Service content** | Inline placeholder in [id] page | Optional: `lib/services-content.ts` or CMS | Copy per service (45) if real content desired |
| **Resources listing** | Dropdown only | Optional: `src/app/resources/page.tsx` | New landing page in Duly-style |
| **Resource detail** | `src/app/resource/[id]/page.tsx` | 0 | Refactor to Duly-style; ensure all 9 slugs have content |
| **Resource content** | `api/resources-content.json` + `resource-pages-data.ts` | 0 (or add missing entries to JSON) | Fill in JSON for remaining 5 slugs if not in backend |
| **Nested resources** | — | Optional: new slugs + routes or nested data | e.g. covid-19-vaccine, pediatric-forms (~5 pages) |

So: **no new route files are required** for the 45 services or 9 resources; one services listing, one service detail, one resource detail. Optional: one resources landing page, optional nested resource slugs, and optional per-service content file(s).

---

## 3. Effort Estimate (Time & Effort)

### A. Duly-Style Refactor (UI Only)

| Task | Description | Estimate |
|------|-------------|----------|
| Services listing page | Align `/services` with Duly: white/slate-50 sections, typography (slate-800/900), accent #49A3DA, spacing, optional wave divider | **4–6 hours** |
| Service detail template | Refactor `/services/[id]`: hero (no heavy overlay), breadcrumbs, heading/sidebar to Duly palette and components; reuse Locations-style header strip if desired | **6–8 hours** |
| Resource detail template | Refactor `/resource/[id]`: same hero + content layout to Duly-style; keep `ResourceSectionContent` logic | **4–6 hours** |
| Optional: Resources landing | Add `/resources` page with card grid or list of `RESOURCE_CATEGORIES` in Duly-style | **3–4 hours** |
| **Subtotal (UI refactor)** | | **17–24 hours (~2–3 days)** |

### B. Content & Data

| Task | Description | Estimate |
|------|-------------|----------|
| Resource content | Ensure all 9 resource slugs have entries in `api/resources-content.json` or fallback (5 already in fallback; copy from live site or stakeholder) | **2–4 hours** |
| Optional: Nested resources | Add slugs + content for Covid-19 sub-pages, Patient Forms sub-pages (~5 pages) | **4–8 hours** |
| Optional: Per-service content | 45 services: write or migrate short intro + “What we offer” (or pull from CMS); add `lib/services-content.ts` or API and wire into `[id]` | **15–30 hours** (copy-dependent) |
| **Subtotal (content)** | | **2–4 hours (min)** to **21–42 hours (with optional content)** |

### C. Testing, SEO, and Polish

| Task | Description | Estimate |
|------|-------------|----------|
| Links and navigation | Verify all service links (45) and resource links (9) work; breadcrumbs and “View All” | **1–2 hours** |
| Responsive / a11y | Check services and resources on mobile; focus states, headings | **2–3 hours** |
| Meta and SEO | Title/description per service (dynamic) and per resource (from data or fallback) | **2–3 hours** |
| **Subtotal (polish)** | | **5–8 hours** |

---

## 4. Total Time Ranges

| Scenario | Scope | Total (hours) | Total (days at 6–8 h/day) |
|----------|--------|----------------|----------------------------|
| **Minimum** | Duly-style refactor (services + resource templates) + ensure 9 resources have content + basic polish | **24–36 h** | **3–5 days** |
| **Recommended** | Above + Resources landing page + nested resource pages (~5) + meta/SEO | **36–48 h** | **5–6 days** |
| **Full** | Above + unique copy or CMS-driven content for all 45 services | **51–74 h** | **7–10 days** |

---

## 5. Assumptions

- “Match Duly-style” = apply the same design language as Locations and WebNav (slate palette, rounded hovers, clear hierarchy, optional wave/decoration).
- No new route files for the 45 services or 9 resources; only refactoring existing pages and optionally adding one `/resources` route and a few nested resource slugs.
- Content for resources can be filled from existing fallback or migrated from middletownmedical.com; service copy is optional and can be phased (template first, content later).
- One senior Next.js developer; no backend CMS changes in this estimate.

---

## 6. Recommended Order of Work

1. Refactor **service detail** template to Duly-style (biggest visual impact; one file, 45 URLs).
2. Refactor **services listing** to Duly-style.
3. Refactor **resource detail** to Duly-style; ensure all 9 slugs have content in JSON or fallback.
4. Add **Resources landing** page and optional nested resource routes/content.
5. Add **per-service content** (or CMS) in a second phase if needed.

This keeps all existing placeholders working while moving the site to a consistent Duly-style and gives a clear path to full content later.
