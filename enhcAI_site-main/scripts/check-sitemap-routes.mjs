#!/usr/bin/env node
// Build-time guard: every indexable App-Router route MUST appear in the sitemap.
// Runs as `prebuild`, so a route that isn't in src/app/sitemap.ts fails the build
// instead of silently shipping as an orphan (the exact defect the SEO audit found:
// /us, /europe, /middle-east and /machinelearningmodel undiscovered by Google).
//
// A route is EXEMPT only if it is intentionally noindex (declares `index: false`
// or `noindex: true` in its page/layout) — those must stay out of the sitemap.
// Dynamic segments ([id]) and /api are skipped; dynamic URLs are emitted from
// data inside sitemap.ts, which this script does not attempt to execute.
//
// Pure Node built-ins, no deps. Run standalone with: node scripts/check-sitemap-routes.mjs
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const APP_DIR = join(process.cwd(), 'src', 'app');
const SITEMAP = join(APP_DIR, 'sitemap.ts');

function fail(msg) {
  console.error(`\n[31m✗ sitemap route check failed[0m\n${msg}\n`);
  process.exit(1);
}

if (!existsSync(SITEMAP)) fail(`Cannot find ${SITEMAP}`);

// Paths declared in the sitemap's staticRoutes (path: '/...').
const sitemapSrc = readFileSync(SITEMAP, 'utf8');
const sitemapPaths = new Set(
  [...sitemapSrc.matchAll(/path:\s*'([^']+)'/g)].map((m) => m[1]),
);

// Does a route folder opt out of indexing (and therefore the sitemap)?
function isNoindex(dir) {
  for (const file of ['page.tsx', 'page.jsx', 'layout.tsx']) {
    const p = join(dir, file);
    if (!existsSync(p)) continue;
    const src = readFileSync(p, 'utf8');
    if (/index:\s*false/.test(src) || /noindex:\s*true/.test(src)) return true;
  }
  return false;
}

const hasPage = (dir) =>
  existsSync(join(dir, 'page.tsx')) || existsSync(join(dir, 'page.jsx'));

// Walk src/app, collecting route paths from folders that render a page.
// Nested routes are supported; [dynamic] segments and /api are skipped.
const routes = [];
function walk(dir, segments) {
  if (hasPage(dir)) {
    const path = segments.length ? '/' + segments.join('/') : '/';
    routes.push({ path, dir });
  }
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    const name = entry.name;
    if (name === 'api' || name === 'components' || name.startsWith('[') || name.startsWith('(')) continue;
    walk(join(dir, name), [...segments, name]);
  }
}
walk(APP_DIR, []);

const missing = routes.filter((r) => !sitemapPaths.has(r.path) && !isNoindex(r.dir));
const routePaths = new Set(routes.map((r) => r.path));
const stale = [...sitemapPaths].filter((p) => !routePaths.has(p));

const problems = [];
if (missing.length)
  problems.push(
    `Indexable routes MISSING from src/app/sitemap.ts:\n` +
      missing.map((r) => `  • ${r.path}   (add it to staticRoutes, or mark the route noindex)`).join('\n'),
  );
if (stale.length)
  problems.push(
    `sitemap.ts lists paths with NO matching route (would 404):\n` +
      stale.map((p) => `  • ${p}`).join('\n'),
  );

if (problems.length) fail(problems.join('\n\n'));

console.log(`✓ sitemap route check: ${routePaths.size} routes, all indexable routes present.`);
