/* Build paste-into-GHL versions of the two public pages.
 *
 * Usage:  node tools/build-ghl.mjs
 * Output: dist/cygnet-implants-funnel.html
 *         dist/cygnet-thank-you.html
 *
 * These are complete standalone documents — doctype, head, body — identical
 * to the source pages except that every assets/*.webp is inlined as a data
 * URI, so there is no assets/ folder to upload alongside them. Paste one into
 * a GHL Custom Code / full-page HTML block and it renders as-is.
 *
 * The trade-off is real and worth stating: a data URI cannot be cached
 * separately from the document, and base64 costs about a third more bytes
 * than the file it encodes. If the practice will host the images anywhere
 * (GHL's own media library included), uploading them and leaving the src
 * attributes as URLs gives a materially faster page. This build exists so
 * that "get it live today" never blocks on that.
 */
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const DIST = `${ROOT}/dist`;
mkdirSync(DIST, { recursive: true });

const MIME = { webp: 'image/webp', png: 'image/png', jpg: 'image/jpeg', svg: 'image/svg+xml' };

function build(src, out, label) {
  let html = readFileSync(`${ROOT}/${src}`, 'utf8');
  let missing = 0, inlined = 0, bytes = 0;

  html = html.replace(/assets\/([\w\/-]+\.(webp|png|jpg|svg))/g, (m, file, ext) => {
    const path = `${ROOT}/assets/${file}`;
    if (!existsSync(path)) { missing++; return m; }
    const buf = readFileSync(path);
    inlined++; bytes += buf.length;
    return `data:${MIME[ext]};base64,${buf.toString('base64')}`;
  });

  writeFileSync(`${DIST}/${out}`, html);
  const kb = n => (n / 1024).toFixed(0) + 'KB';
  console.log(
    `${label.padEnd(12)} → dist/${out}\n` +
    `  ${inlined} image(s) inlined, ${kb(bytes)} raw → ${kb(readFileSync(`${DIST}/${out}`).length)} document` +
    (missing ? `\n  !! ${missing} asset reference(s) not found on disk — left as relative paths` : '')
  );
}

build('index.html',      'cygnet-implants-funnel.html', 'Funnel');
build('thank-you.html',  'cygnet-thank-you.html',       'Thank-you');

console.log(`
Before publishing, set two values:
  cygnet-implants-funnel.html → SITE_CONFIG.thankYouUrl = the thank-you page's GHL URL
  cygnet-thank-you.html       → SITE_CONFIG.funnelUrl   = the funnel's GHL URL
Both ship as relative paths, which only resolve while the two files sit in
the same folder.`);
