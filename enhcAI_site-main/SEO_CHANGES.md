# SEO Changes — enhc (Enhc Tech LLP)

All existing section designs were left untouched. Changes are either new metadata files, text fixes, or two new pages built in your existing service-page design language.

## 1. Technical SEO foundation (new files)
- `src/lib/seo.ts` — one place for your site URL, brand/company facts, and a `buildMetadata()` helper so every page gets consistent titles, canonical URLs, Open Graph and Twitter cards. **Set your real domain here** (or via the `NEXT_PUBLIC_SITE_URL` env var). It currently defaults to `https://enhc.tech`.
- `src/app/components/StructuredData.tsx` — sitewide JSON-LD: `Organization`, `LocalBusiness` (with your Ahmedabad address, phone, email, geo and social profiles) and `WebSite`. Rendered once from the root layout, so it appears on every page.
- `src/app/robots.ts` — allows crawling, blocks `/api`, `/allinfo`, `/room`, `/analytic`, `/ROI`, and points to the sitemap.
- `src/app/sitemap.ts` — auto-generated sitemap covering all indexable pages plus every project case study and the published blog posts.
- `src/app/manifest.ts` — web app manifest (name, icons, theme) for PWA/brand signals.

## 2. Page-level metadata (new, non-invasive)
Your pages are client components, which can't export metadata directly. So each route got a small server `layout.tsx` that only adds SEO metadata and renders the page unchanged:
- Home (`page.tsx`), Services, Custom AI Solutions, Machine Learning Models, AI Automation, Predictive Analytics, AI Strategy, About, Company Overview, Projects, Blogs, Contact, Start Project — each with a unique, keyword-aware title + description + canonical URL.
- `blogs/[id]` and `project/[id]` — titles/descriptions generated **per item** from your data files.
- Utility/admin pages (`allinfo`, `room`, `analytic`, `ROI`) set to `noindex` so they stay out of search.
- Root layout now has a proper title template, default description, keywords, OG/Twitter defaults, `metadataBase`, robots directives and manifest link.

## 3. Content / on-page fixes
- Replaced the placeholder brand **"AIInnovate"** with your real brand **"enhc"** everywhere it appeared (service pages, About, Blog sections, blog data) — important for brand consistency and SEO.

## 4. New pages (your design language, new content)
Your company offers web and app development but had no pages for them. Added both, cloned from your existing service-page layout (same hero, capabilities, marquee, vision/scalable sections, services grid, testimonials, work carousel, blog + footer):
- `/web-development` — Web Development service page.
- `/app-development` — App Development service page.
Both have their own metadata + `Service` JSON-LD, and are now linked from the **navbar services dropdown** and the **footer**, so they're internally linked and crawlable.

## Recommended next steps (need things only you have)
1. Confirm the production domain in `src/lib/seo.ts`.
2. Add a real social share image (1200×630) and point `DEFAULT_OG_IMAGE` to it (currently uses `/enhc_logo.jpg`).
3. Submit `https://your-domain/sitemap.xml` in Google Search Console.
4. Optional: add a few real client logos/testimonials to replace placeholders.
