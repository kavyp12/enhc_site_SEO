# enhc — SEO Audit & Implementation Report

**Site:** enhc (Enhc Tech LLP) — AI-first IT/software company, Ahmedabad, India
**Canonical domain:** https://enhc.tech (apex)
**Method:** [claude-seo](https://github.com/AgriciDaniel/claude-seo) plugin v2.2.0 methodology (8 specialist dimensions + synthesis), run against the **local production build** because the live domain is unreachable (see #1). Findings verified against real server-rendered HTML.
**Date:** 2026-07-01 · Build status after changes: ✅ `npm run build` passes (45 static pages)

> ⚠️ The plugin's own `/seo` slash-command is installed to `~/.claude/skills/` but only loads at Claude Code **session start** — it was not invokable mid-session, so the audit was driven by running the plugin's Python scanners + replicating its specialist methodology across the repo.

---

## 1. Overall

**Plugin SEO Health Score (pre-fix): 41 / 100** — dragged down mostly by Content Quality (28) and Performance/Images (22), i.e. template-leftover content and unoptimized images, not technical foundations.

| Category | Weight | Pre-fix | Notes |
|---|---|---|---|
| Technical SEO | 22% | 58 | Strong security headers, valid SSR, sitemap/robots OK |
| Content Quality | 23% | 28 | **Template leaks, fabricated testimonials/authors** (biggest drag) |
| On-Page | 20% | 38 | Multiple H1s, thin titles |
| Schema | 10% | 54 | Good base, missing Service/Article/Breadcrumb |
| Performance (CWV) | 10% | 22 | Unoptimized multi-MB images |
| AI Search (GEO) | 10% | 53 | SSR OK, no llms.txt, weak citability |
| Images | 5% | 22 | 126 MB of images, wrong OG/manifest |

---

## 2. 🚨 #1 CRITICAL — Production is offline for SEO (OPS, you own this)

`https://enhc.tech` (and `www`, and every path incl. `/robots.txt`, `/sitemap.xml`) returns **HTTP 403** from an nginx box at `147.93.107.170` that serves a **different app** — a Vite dev server for a real-estate CRM (`crm.we9properties.com` / "rama_realty"), whose TLS cert is what `enhc.tech` presents:

```
$ curl -I https://enhc.tech    →  HTTP 403 Forbidden (nginx)
body: "Blocked request. This host ("enhc.tech") is not allowed.
       add "enhc.tech" to server.allowedHosts in vite.config.js"
TLS cert CN = crm.we9properties.com   (not enhc.tech)
```

Google and AI crawlers never index non-200 responses, so **nothing on the domain can rank until this is fixed.** Every code change below only takes effect once the domain serves the Next.js app.

**Fix (server/DNS — not code):** repoint `enhc.tech` + `www.enhc.tech` origin to the Next.js deployment; install a valid TLS cert covering both hosts; remove the 403 nginx vhost. Verify `curl -I https://enhc.tech` → `200` before treating on-page work as live. Ship all the code fixes below in the **same deploy** that fixes the host.

---

## 3. What I changed (code — in your working tree, not committed)

All changes extend the existing SEO setup (`src/lib/seo.ts`, `StructuredData`, `sitemap.ts`, `robots.ts`) — nothing was replaced. Business contact details kept consistent from `src/lib/seo.ts`.

### Critical / High
- **Fixed the blog self-de-indexing regression.** The two deleted blog metadata layouts were restored: `/blogs` and all 7 `/blogs/N` posts were canonicalizing to the **homepage** with the generic root title. Now each has a unique title, self-referencing canonical, and `BlogPosting` + `Person` (author) + `BreadcrumbList` schema. *(`blogs/layout.tsx`, `blogs/[id]/layout.tsx`)*
- **Removed template-leak content** (wrong brand / competitor / wrong city):
  - `ModelCraft` → `enhc` (×5) on the machine-learning page.
  - `Manchester` / `MadeByenhc` / `Andrew (MadeByShape)` / Shopify / Craft Commerce purged from the contact FAQ + services blog cards + studio address (`MadeByenhc` → `Enhc Tech LLP`).
  - `Webito Infotech` competitor removed from the homepage client-logo strip and the company-overview "reviews" badge.
  - "over a decade of experience" (a 2022 firm) → truthful "founded in 2022".
- **Canonical host unified to the apex.** `NEXT_PUBLIC_SITE_URL` set to `https://enhc.tech`; added a `www → apex` 301 in `next.config.ts`. Robots/sitemap/canonicals/JSON-LD all now agree on one host. *(set the same env var in production)*
- **Real 404s instead of soft-404s.** `/blogs/<bad>` and `/project/<bad>` returned 200; now `generateStaticParams` + `dynamicParams=false` make unknown ids return **404** (verified). Both dynamic routes are now **SSG-prerendered** (was on-demand).
- **One `<h1>` per page.** The global footer tagline "Building Intelligence since 2022" was an `<h1>` on every page; the homepage had **10** H1s. Footer → `<p>`; secondary section H1s in components (`business`, `aboutus`, `workwith`, `helpwith`, `team`) and the 2nd/3rd H1 on all 7 service pages → `<h2>/<h3>`; added missing H1s to `/blogs`, `/project`, `/company-overview`. **Every indexable page now renders exactly one H1** (verified).

### Schema (structured data)
- New reusable JSON-LD builders in `src/lib/seo.ts` + a `<JsonLd>` component (`serviceJsonLd`, `breadcrumbJsonLd`, `blogPostingJsonLd`, `creativeWorkJsonLd`, `webPageJsonLd`, `faqJsonLd`), all wired to a single `#organization` `@id`.
- `Service` schema on **all 7** service pages (was on 3); the AI/ML money pages now carry a service entity with `areaServed` = Ahmedabad/Gujarat/India.
- `BreadcrumbList` on all service/blog/project/about/contact pages.
- `ProfessionalService` LocalBusiness (upgraded from bare `LocalBusiness`) with named `areaServed`, `PostalAddress`, `contactPoint`, `openingHoursSpecification`, `hasMap`; `Organization` gained `address` + `contactPoint` + `foundingLocation`.
- `CreativeWork` on project case studies, `AboutPage`/`ContactPage`/`CollectionPage` page-type nodes, and a real `FAQPage` on `/contact` (rewritten with real enhc Q&A).

### On-page & internal linking
- Location added to money-page titles (e.g. *Web Development Company in Ahmedabad — Next.js & React*, *Machine Learning Development Company in India*).
- Footer now links all 5 AI service pages (were unlinked from the footer).
- Homepage blog carousel and services-page blog cards converted from JS `onClick`/dead cards to crawlable `<Link href="/blogs/…">`.

### Performance / GEO / assets
- Removed **27 render-blocking `@import`** calls for the non-existent "Product Sans" web font (they 400'd — pure waste, no visual change).
- Deleted a dead **23 MB** `public/threat_Detaction.jpg` (only referenced in commented-out code); lazy-loaded the navbar dropdown image.
- Generated a real **1200×630 branded OG image** (`/og-image.png`) + real **192/512 maskable PWA icons**; `DEFAULT_OG_IMAGE` and manifest now point to real assets (were a 648×454 logo mis-declared as 1200×630 / 192 / 512).
- Added **`/llms.txt`** and trimmed `robots.txt` to only `Disallow: /api/` (the noindex utility routes must stay crawlable so engines can read their noindex).

**Verified in server-rendered HTML:** apex canonicals sitewide · `/blogs/1` canonical = `/blogs/1` (was homepage) · 1 H1/page · `/blogs/999` & `/project/x` → 404 · `/llms.txt` → 200 · `FAQPage`/`Service`/`BlogPosting`/`BreadcrumbList` all present · no `CollectionPage` leaking onto posts.

---

## 4. What still needs YOU (content — I won't fabricate)

These are ranked Critical/High by the plugin but require *real, truthful* content only you can supply:

1. **Remove or replace fabricated testimonials.** Invented reviewers with `randomuser.me/…` avatars are rendered on the 7 service pages and on `/about` (via `components/testimonial.tsx`). Fabricated reviews are a Google "deceptive content" (QRG trust) risk. Replace with real, attributable client quotes (name, company, permission) — e.g. tied to KretoAI / Rama Realty — or remove the sections. Files: `components/testimonial.tsx` + each `*/page.tsx` testimonial block.
2. **Fix fictional blog authors.** All posts are bylined to invented personas (Dr. Sarah Chen, Johnathan Chen, Peter Jones, Mike Williams, Emily White) in `src/data/blogData.ts` + `components/blog.tsx`, contradicting the real team (Harsh Gajera, Kavy Patel). Reassign to real authors + add a short bio with a LinkedIn `sameAs`. This directly powers the new `BlogPosting`/`Person` schema.
3. **Verify NAP details I left as TODO:** the exact **PIN code** (add to `COMPANY.postalCode` in `src/lib/seo.ts` — it flows into schema + footer) and real **business hours** (`COMPANY.openingHours`). NAP must match your Google Business Profile byte-for-byte.
4. **Deepen thin/service content** (plugin ranks this High for competitive AI queries): each core service page → an answer-first definition, a "how we deliver" process, 2–3 India/Ahmedabad use-cases with an outcome metric, and a 3–4 item FAQ (aim ~800 words). Add real ISO dates + cited stats to blog posts.
5. Unverifiable badges on `/company-overview` (Microsoft/Clutch/GoodFirms/AppFutura) — link each to its public proving profile or remove.

---

## 5. Off-page / ops the code cannot do (plugin recommendations)

- **Fix deployment/DNS/TLS** so `enhc.tech` serves this app on 200 (see #1) — the single highest-impact action.
- **Re-encode `public/` images** with a real tool (`cwebp`/`sharp`/squoosh): source JPGs are 5000–8000px for ~1000–1200px slots (`AI_intelegence.jpg` 12 MB, `Data_analysis.jpg` 12 MB, etc.). Target WebP/AVIF < 200 KB each — this is the biggest Core Web Vitals lever and pairs with migrating hot-path `<img>` to `next/image`. Also re-encode the ~23 MB hero showreel MP4 (+ a small poster).
- **Google Business Profile** — claim & fully complete (primary category "Software company"; secondaries "IT consulting", "Website designer") with the corrected NAP; then **Bing Places** (powers ChatGPT/Copilot) and **Apple Business Connect**.
- **Citations/directories:** Justdial, IndiaMART, Sulekha, Clutch, GoodFirms with identical NAP.
- **Brand-entity signals** (correlate ~3× stronger than backlinks for AI visibility): org GitHub (`github.com/enhctech` — currently `sameAs` points to a personal `kavyp12`), YouTube, Wikidata, Crunchbase, LinkedIn activity. Add them to `COMPANY.social`.
- **Reviews:** run a genuine Google-review cadence; only then add `aggregateRating` schema (never fabricate — FTC/Google penalty).
- **IndexNow:** add a `public/<key>.txt` and ping on publish (faster Bing/Yandex discovery).
- **Rotate exposed credentials** flagged in the prior security audit (server-side).

---

*Generated by the claude-seo methodology. Re-run `/seo audit https://enhc.tech` once the domain serves 200 to get live field data (CrUX, GSC, real CWV).*
