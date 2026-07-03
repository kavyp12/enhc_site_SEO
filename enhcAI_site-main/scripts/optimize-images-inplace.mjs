#!/usr/bin/env node
// In-place image optimizer for public/.
// Re-encodes large images (resize oversized dimensions to <= MAX_W, recompress)
// WITHOUT changing filenames/paths — so no code references or layouts change and
// there is zero CLS risk (aspect ratios are preserved). Only overwrites a file
// when the result is actually smaller. Run:  node scripts/optimize-images-inplace.mjs
import { readdir, readFile, writeFile } from 'node:fs/promises';
import { join, extname } from 'node:path';
import sharp from 'sharp';

const ROOT = 'public';
const MAX_W = 1920;            // full-bleed max; everything else is smaller
const MIN_BYTES = 300 * 1024; // only touch files larger than 300 KB
const EXTS = new Set(['.jpg', '.jpeg', '.png', '.webp']);

async function walk(dir) {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...(await walk(p)));
    else out.push(p);
  }
  return out;
}

const kb = (n) => (n / 1024).toFixed(0) + ' KB';
const mb = (n) => (n / 1024 / 1024).toFixed(2) + ' MB';

const files = await walk(ROOT);
let beforeTotal = 0;
let afterTotal = 0;
const changed = [];

for (const file of files) {
  const ext = extname(file).toLowerCase();
  if (!EXTS.has(ext)) continue;
  const buf = await readFile(file);
  if (buf.length < MIN_BYTES) continue;

  beforeTotal += buf.length;

  let meta;
  try {
    meta = await sharp(buf).metadata();
  } catch {
    afterTotal += buf.length;
    continue; // unreadable — leave untouched
  }

  let pipeline = sharp(buf, { failOn: 'none' }).rotate(); // auto-orient
  if (meta.width && meta.width > MAX_W) {
    pipeline = pipeline.resize({ width: MAX_W, withoutEnlargement: true });
  }
  if (ext === '.png') {
    pipeline = pipeline.png({ compressionLevel: 9, adaptiveFiltering: true });
  } else if (ext === '.webp') {
    pipeline = pipeline.webp({ quality: 80 });
  } else {
    pipeline = pipeline.jpeg({ quality: 80, mozjpeg: true });
  }

  let out;
  try {
    out = await pipeline.toBuffer();
  } catch {
    afterTotal += buf.length;
    continue;
  }

  if (out.length < buf.length * 0.97) {
    await writeFile(file, out);
    afterTotal += out.length;
    changed.push({ file: file.replace(/\\/g, '/'), before: buf.length, after: out.length });
  } else {
    afterTotal += buf.length; // not worth rewriting
  }
}

changed.sort((a, b) => b.before - b.after - (a.before - a.after));
console.log('\nBiggest reductions:');
for (const c of changed.slice(0, 25)) {
  const pct = (100 * (1 - c.after / c.before)).toFixed(0);
  console.log(`  ${kb(c.before).padStart(9)} -> ${kb(c.after).padStart(8)}  (-${pct}%)  ${c.file}`);
}
console.log(`\nFiles rewritten: ${changed.length}`);
console.log(`Scanned (>300KB) total: ${mb(beforeTotal)}  ->  ${mb(afterTotal)}`);
console.log(`Saved: ${mb(beforeTotal - afterTotal)} (${(100 * (1 - afterTotal / beforeTotal)).toFixed(0)}% of the large-image weight)`);
