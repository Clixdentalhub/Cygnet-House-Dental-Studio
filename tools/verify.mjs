/* Verification pass for a funnel page.
 *
 *   node tools/verify.mjs composite-bonding.html [--shots]
 *
 * Checks, at 360 / 375 / 414 / 768 / 1024 / 1280 / 1440:
 *   - no horizontal overflow (scrollWidth - clientWidth === 0)
 *   - --header-h >= the real header height, or anchors land behind it
 *   - every nav anchor puts its heading clear of the header
 * Once, at 1280:
 *   - no console errors, JSON-LD parses, exactly one <h1>
 *   - every image has an alt; every <img> that failed to load is named
 *   - no dead or bracketed hrefs
 *   - contrast MEASURED (relative luminance) for the text pairs that matter
 *   - the form: pointer advances, arrow keys do not, validation blocks,
 *     a successful send redirects
 * With --shots it also writes a PNG per width to .verify/ — the worst bug on
 * this build passed every measurement and was only visible in a picture.
 */
import { chromium } from 'playwright';
import { mkdirSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';

const FILE = process.argv[2] || 'composite-bonding.html';
const SHOTS = process.argv.includes('--shots');
const PAGE_URL = 'file://' + resolve(FILE);
const WIDTHS = [360, 375, 414, 768, 1024, 1280, 1440];
const EXE = '/opt/pw-browsers/chromium-1194/chrome-linux/chrome';

let fails = 0, warns = 0;
const ok = m => console.log(`  \x1b[32m✓\x1b[0m ${m}`);
const bad = m => { fails++; console.log(`  \x1b[31m✗ ${m}\x1b[0m`); };
const warn = m => { warns++; console.log(`  \x1b[33m! ${m}\x1b[0m`); };

const browser = await chromium.launch({ executablePath: EXE });

/* This sandbox has no route to fonts.googleapis.com or the maps embed, and a
 * hanging stylesheet is not a neutral condition: a render-blocking <link>
 * defers every inline <script> after it, so the page sits in readyState
 * "loading" and nothing that the script does has happened yet. Aborting
 * off-site requests up front makes the run deterministic and tests the page's
 * own behaviour — which is the point — rather than this environment's network.
 * The token block names a full local fallback stack, so type still resolves. */
async function offline(page) {
  await page.route(/^https?:\/\//, r => r.abort());
}

/* ---------------------------------------------------------- per width */
console.log(`\n\x1b[1m${FILE} — layout at 7 widths\x1b[0m`);
if (SHOTS) mkdirSync('.verify', { recursive: true });

for (const w of WIDTHS) {
  const page = await browser.newPage({ viewport: { width: w, height: 900 } });
  await offline(page);
  await page.goto(PAGE_URL, { waitUntil: 'load' });
  await page.waitForTimeout(350);

  const r = await page.evaluate(() => {
    const doc = document.documentElement;
    const header = document.querySelector('.header');
    const token = parseInt(getComputedStyle(doc).getPropertyValue('--header-h'), 10);
    // Widest offender, so an overflow report names the element to fix.
    let worst = null, max = doc.clientWidth;
    for (const el of document.querySelectorAll('body *')) {
      const b = el.getBoundingClientRect();
      if (b.right > max + 0.5) { max = b.right; worst = el.tagName + '.' + (el.className || '').toString().split(' ')[0]; }
    }
    return {
      hasNav: !!document.querySelector('.section-nav a'),
      overflow: doc.scrollWidth - doc.clientWidth,
      headerReal: Math.ceil(header.getBoundingClientRect().height),
      token, worst, maxRight: Math.round(max),
    };
  });

  const tag = String(w).padStart(4);
  if (r.overflow !== 0) bad(`${tag}px overflow ${r.overflow}px — widest: ${r.worst} @ ${r.maxRight}px`);
  else ok(`${tag}px no horizontal overflow`);

  // Only meaningful where in-page anchors resolve from the token. A thank-you
  // page has no section nav, so a short token cannot put a heading behind the
  // header — its one anchor is the skip link, which clears via scroll-margin.
  if (!r.hasNav) ok(`${tag}px --header-h not load-bearing (no section nav)`);
  else if (r.token < r.headerReal) bad(`${tag}px --header-h ${r.token} < real header ${r.headerReal} — anchors land behind it`);
  else ok(`${tag}px --header-h ${r.token} >= header ${r.headerReal}`);

  // Every nav anchor must leave its heading visible below the header.
  const anchors = await page.evaluate(async () => {
    const out = [];
    for (const a of document.querySelectorAll('.section-nav a')) {
      const target = document.querySelector(a.getAttribute('href'));
      if (!target) { out.push([a.getAttribute('href'), 'MISSING']); continue; }
      location.hash = a.getAttribute('href');
      await new Promise(r => setTimeout(r, 120));
      const h = target.querySelector('h1,h2');
      const hh = document.querySelector('.header').getBoundingClientRect().height;
      out.push([a.getAttribute('href'), h ? Math.round(h.getBoundingClientRect().top - hh) : 'no-heading']);
    }
    return out;
  });
  const behind = anchors.filter(([, t]) => typeof t === 'number' && t < 0);
  const missing = anchors.filter(([, t]) => typeof t !== 'number');
  if (missing.length) bad(`${tag}px nav targets not found: ${missing.map(m => m[0]).join(', ')}`);
  else if (behind.length) bad(`${tag}px headings behind header: ${behind.map(b => b[0] + ' ' + b[1] + 'px').join(', ')}`);
  else if (anchors.length) ok(`${tag}px all ${anchors.length} nav anchors clear the header`);

  if (SHOTS) {
    await page.evaluate(() => { location.hash = '#top'; window.scrollTo(0, 0); });
    await page.waitForTimeout(250);
    await page.screenshot({ path: `.verify/${FILE.replace(/\W+/g, '-')}-${w}.png`, fullPage: true });
  }
  await page.close();
}

/* ---------------------------------------------------------- content, once */
console.log(`\n\x1b[1m${FILE} — content\x1b[0m`);
const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
await offline(page);
const errors = [], resourceFails = [];
page.on('console', m => {
  if (m.type() !== 'error') return;
  // Resource loads are reported separately: a not-yet-supplied image and a
  // sandbox-blocked Google host are expected, a thrown script is not.
  (/Failed to load resource|net::ERR_/.test(m.text()) ? resourceFails : errors).push(m.text());
});
page.on('requestfailed', r => resourceFails.push(r.url()));
page.on('pageerror', e => errors.push(String(e)));
await page.goto(PAGE_URL, { waitUntil: 'load' });
await page.waitForTimeout(600);

errors.length ? bad(`script errors: ${errors.join(' | ')}`) : ok('no script errors');
const offsite = [...new Set(resourceFails.filter(u => /^https?:/.test(u)))];
if (offsite.length) console.log(`  \x1b[36mi\x1b[0m ${offsite.length} off-site request(s) aborted on purpose (fonts, map embed) — page renders on its fallback stack`);

const c = await page.evaluate(() => {
  const res = {};
  res.h1 = document.querySelectorAll('h1').length;
  try {
    const ld = document.querySelector('script[type="application/ld+json"]');
    if (!ld) { res.ld = null; throw null; }
    const j = JSON.parse(ld.textContent);
    res.ld = j['@type'];
    res.ldAgg = 'aggregateRating' in j;
    res.ldServices = (j.availableService || []).map(s => s.name);
  } catch (e) { if (e) res.ld = 'PARSE FAIL: ' + e.message; }
  res.robots = document.querySelector('meta[name="robots"]')?.content || null;
  res.imgs = [...document.images].map(i => ({
    src: i.getAttribute('src'), alt: i.getAttribute('alt'),
  }));
  res.slots = [...document.querySelectorAll('[data-file],[data-files]')]
    .flatMap(e => (e.dataset.file || e.dataset.files).split('+').map(s => s.trim()));
  res.ph = [...document.querySelectorAll('.ph')].map(e => e.textContent.trim());
  res.hrefs = [...document.querySelectorAll('a[href]')].map(a => a.getAttribute('href'))
    .filter(h => h === '#' || h === '' || /\[|\]/.test(h));
  res.motion = [...document.querySelectorAll('section')].map(s => ({
    id: s.id || s.className.split(' ')[0],
    names: [...new Set([...s.querySelectorAll('[class*="anim-"]')]
      // U2 Tick Draw and U4 Bar Entrance are micro-interactions listed apart
      // from the section map; the seal happens to sit inside the hero.
      .filter(e => !e.closest('.js-form-success, .mobile-bar'))
      .flatMap(e => [...e.classList].filter(c => c.startsWith('anim-'))))],
  })).filter(s => s.names.length > 1);
  return res;
});

c.h1 === 1 ? ok('exactly one <h1>') : bad(`${c.h1} <h1> elements`);
if (c.ld === null) {
  // A noindex confirmation page carrying LocalBusiness markup would be a fault,
  // not a feature. Absent is the correct state; only flag it on an indexable page.
  c.robots ? ok('no JSON-LD, correct for a noindex page') : bad('no JSON-LD on an indexable page');
} else {
  c.ld === 'Dentist' ? ok(`JSON-LD parses (${c.ld}: ${c.ldServices.join(', ')})`) : bad(`JSON-LD ${c.ld}`);
  c.ldAgg ? bad('JSON-LD carries aggregateRating — not supported on LocalBusiness types') : ok('no aggregateRating in JSON-LD');
}
c.robots ? warn(`robots: "${c.robots}" — remove only when every placeholder is resolved`) : ok('no robots meta');

const noAlt = c.imgs.filter(i => i.alt === null);
noAlt.length ? bad(`${noAlt.length} image(s) without alt: ${noAlt.map(i => i.src).join(', ')}`)
             : ok(`all ${c.imgs.length} images carry an alt`);
const srcs = [...new Set(c.imgs.map(i => i.src).filter(s => s && !/^https?:|^data:/.test(s)))];
const onDisk = srcs.filter(s => existsSync(resolve(dirname(FILE), s)));
const absent = srcs.filter(s => !onDisk.includes(s));
ok(`${onDisk.length}/${srcs.length} referenced image files present on disk`);
if (absent.length) warn(`${absent.length} not supplied yet — each renders as its labelled striped slot: ${absent.join(', ')}`);
// Every not-yet-supplied file must have a slot naming it, or it degrades to a
// blank box instead of a labelled one.
const unlabelled = absent.filter(s => !c.slots.some(f => f.includes(s.split('/').pop())));
unlabelled.length ? bad(`missing image with no labelled slot: ${unlabelled.join(', ')}`)
                  : ok('every missing image has a labelled slot naming it');
c.hrefs.length ? bad(`dead/bracketed hrefs: ${c.hrefs.join(', ')}`) : ok('no dead or bracketed hrefs');
c.motion.length ? bad(`section with >1 motion pattern: ${JSON.stringify(c.motion)}`)
                : ok('no section carries more than one motion pattern');
console.log(`  \x1b[36mi\x1b[0m ${c.ph.length} visible [placeholder]s: ${c.ph.map(p => p.slice(0, 42)).join(' · ')}`);

/* ---------------------------------------------------------- contrast */
console.log(`\n\x1b[1m${FILE} — contrast (measured)\x1b[0m`);
const contrast = await page.evaluate(() => {
  const lum = ([r, g, b]) => {
    const f = v => { v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); };
    return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
  };
  const rgb = s => s.match(/\d+(\.\d+)?/g).slice(0, 3).map(Number);
  // Walk up for the first non-transparent background actually painted.
  const bgOf = (el, fg) => {
    const worst = cands => cands.reduce((w, c) =>
      w === null || ratio(fg, c) < ratio(fg, w) ? c : w, null);
    for (let n = el; n; n = n.parentElement) {
      const cs = getComputedStyle(n);
      // A gradient paints no backgroundColor, so an ink card built from one
      // is invisible to a colour-only walk — it would climb straight past to
      // the light section behind and report white on white. Read the stops.
      const stops = (cs.backgroundImage.match(/rgba?\([^)]+\)/g) || [])
        .map(rgb).filter(Boolean);
      if (stops.length) return worst(stops);
      const b = cs.backgroundColor;
      if (b && !/rgba\(0, 0, 0, 0\)|transparent/.test(b)) {
        const a = parseFloat((b.match(/[\d.]+\)$/) || ['1'])[0]) || 1;
        if (a >= 0.95) return rgb(b);
      }
    }
    return [255, 255, 255];
  };
  const ratio = (a, b) => {
    const [l1, l2] = [lum(a), lum(b)].sort((x, y) => y - x);
    return (l1 + 0.05) / (l2 + 0.05);
  };
  const probes = [
    ['body copy', '.section-head p'],
    ['price figure', '.price-card__figure'],
    ['price was', '.price-card__was s'],
    ['save pill', '.save-pill'],
    ['price note', '.price-card__note'],
    ['CTA label', '.btn--primary'],
    ['form title', '.form-card__title'],
    ['form option', '.option__box'],
    ['form eyebrow', '.form-card__eyebrow'],
    ['form label', '.field label'],
    ['offer box h3', '.finance-box--offer h3'],
    ['offer box p', '.finance-box--offer p'],
    ['inline [ph]', '.ph'],
    ['nav link', '.section-nav a'],
    ['trust strip', '.trust-strip li'],
    ['on-ink body', '.section--primary .section-head p'],
    ['footer legal', '.footer__legal p'],
  ];
  return probes.map(([name, sel]) => {
    const el = document.querySelector(sel);
    if (!el) return { name, missing: true };
    const cs = getComputedStyle(el);
    const size = parseFloat(cs.fontSize);
    const bold = parseInt(cs.fontWeight, 10) >= 700;
    const large = size >= 24 || (size >= 18.66 && bold);
    return {
      name, size: size.toFixed(1), large,
      r: +ratio(rgb(cs.color), bgOf(el, rgb(cs.color))).toFixed(2),
      need: large ? 3 : 4.5,
    };
  });
});
for (const p of contrast) {
  if (p.missing) { warn(`${p.name}: selector not found`); continue; }
  const line = `${p.name.padEnd(15)} ${String(p.r).padStart(6)}:1  (${p.size}px${p.large ? ', large' : ''}, needs ${p.need})`;
  p.r >= p.need ? ok(line) : bad(line);
}

/* ---------------------------------------------------------- the form */
// A thank-you page has no qualifier form; everything below is funnel-only.
const hasForm = await page.$('#qualifier-form');
if (!hasForm) {
  console.log(`\n\x1b[1m${FILE} — no qualifier form, funnel-only checks skipped\x1b[0m`);
  await page.close(); await browser.close();
  console.log(`\n\x1b[1m${fails ? '\x1b[31mFAIL' : '\x1b[32mPASS'}\x1b[0m — ${fails} failure(s), ${warns} warning(s)\n`);
  process.exit(fails ? 1 : 0);
}
console.log(`\n\x1b[1m${FILE} — form\x1b[0m`);
const step = () => page.evaluate(() =>
  [...document.querySelectorAll('.step')].findIndex(s => !s.hidden) + 1);

// 1 · validation blocks an empty step
await page.click('.step[data-step="1"] .js-next');
await page.waitForTimeout(120);
(await step()) === 1 && await page.isVisible('[data-error-for="situation"].is-visible')
  ? ok('empty step blocked, error shown') : bad('empty step was not blocked');

// 2 · pointer selection auto-advances. Click the INPUT, not the box: the
// input is absolutely positioned at opacity 0 over the whole label, which is
// the design — it is the thing a finger actually lands on.
await page.click('.step[data-step="1"] .option:nth-child(2) input');
await page.waitForTimeout(600);
(await step()) === 2 ? ok('pointer selection auto-advances') : bad(`pointer selection did not advance (step ${await step()})`);

// 3 · arrow keys must NOT advance
await page.evaluate(() => document.querySelector('.step[data-step="2"] input[type=radio]').focus());
await page.keyboard.press('ArrowDown');
await page.waitForTimeout(500);
(await step()) === 2 ? ok('arrow keys move between radios without advancing') : bad('arrow key advanced the step');

// 4 · Continue takes the keyboard user forward
await page.click('.step[data-step="2"] .js-next');
await page.waitForTimeout(200);
(await step()) === 3 ? ok('Continue advances to step 3') : bad('Continue did not advance');

// 5 · field validation
await page.click('.step[data-step="3"] button[type="submit"]');
await page.waitForTimeout(200);
const errs = await page.evaluate(() =>
  [...document.querySelectorAll('.step[data-step="3"] .field__error.is-visible')].length);
errs === 4 ? ok('all 4 detail fields validate') : bad(`${errs}/4 field errors shown`);

// 6 · back preserves answers
await page.click('.step[data-step="3"] .js-back');
await page.waitForTimeout(150);
await page.evaluate(() => { document.querySelector('.step[data-step="2"] .js-next').click(); });
await page.waitForTimeout(150);
await page.evaluate(() => document.querySelector('.step[data-step="1"]')) // noop guard
const kept = await page.evaluate(() => !!document.querySelector('input[name="timing"]:checked'));
kept ? ok('back navigation preserves answers') : bad('back navigation lost the answer');

// 7 · a successful send posts the contract fields, then really navigates.
// The webhook is stubbed; the redirect is not, so this exercises the actual
// query-string separator logic rather than a mock of it.
let posted = null, navTo = null;
await page.exposeFunction('__record', o => { posted = o; });
// The redirect target may be off-site (the implants funnel points at a GHL
// page), and off-site requests are aborted above — so record where the page
// TRIED to go rather than only where it landed.
// The REQUEST, not the resulting frame: an aborted off-site navigation lands
// on chrome-error://, which says nothing about the URL the page built.
page.on('request', r => {
  if (r.isNavigationRequest() && r.frame() === page.mainFrame() && r.url() !== PAGE_URL) navTo = r.url();
});
const thankYou = await page.evaluate(() =>
  (document.body.innerHTML.match(/thankYouUrl:\s*'([^']*)'/) || [])[1] || null);
await page.evaluate(() => {
  window.fetch = (u, o) => { window.__record({ url: u, body: o.body.toString() }); return Promise.resolve({}); };
  const f = document.getElementById('qualifier-form');
  f.firstName.value = 'Margaret'; f.lastName.value = 'O’Sullivan';
  f.phone.value = '07700 900123'; f.email.value = 'margaret@example.co.uk';
});
await Promise.all([
  page.waitForURL(/composite-bonding-thank-you/, { timeout: 8000 }).catch(() => null),
  page.click('.step[data-step="3"] button[type="submit"]'),
]);
await page.waitForTimeout(400);

const REQUIRED = ['situation', 'timing', 'firstName', 'lastName', 'phone', 'email', 'website', 'pageUrl', 'treatment'];
const sent = posted?.body ? [...new URLSearchParams(posted.body).keys()] : [];
const miss = REQUIRED.filter(k => !sent.includes(k));
if (!posted) bad('form never posted');
else if (miss.length) bad(`posted body missing: ${miss.join(', ')}`);
else ok(`all 9 contract fields posted (treatment="${new URLSearchParams(posted.body).get('treatment')}")`);
if (posted) ok(`posts urlencoded to ${new URL(posted.url).host}`);

const landed = /^file:|^https?:/.test(page.url()) ? page.url() : (navTo || page.url());
const offsiteTY = thankYou && /^https?:/.test(thankYou);
if (offsiteTY) {
  // Cannot be followed here; assert the URL was built correctly instead —
  // including the ?/& separator choice for a destination that already has a
  // query string, which is the part that actually goes wrong.
  const built = navTo || '';
  built.startsWith(thankYou) && /[?&]firstName=Margaret$/.test(built)
    ? ok(`redirect built correctly for the off-site thank-you page: …${built.slice(-46)}`)
    : bad(`off-site redirect URL wrong: ${built || '(none)'}`);
} else if (/thank-you/.test(landed)) {
  const q = new URL(landed).searchParams;
  ok(`redirected to the thank-you page, firstName="${q.get('firstName')}"`);
  // Wait on the condition, not a fixed delay: waitForURL resolves once the
  // document loads, which can be before its inline script has run.
  const greeted = await page.waitForFunction(
    () => /Margaret/.test(document.querySelector('#ty-title')?.textContent || ''),
    null, { timeout: 4000 }).then(() => true).catch(() => false);
  const greeting = (await page.textContent('#ty-title').catch(() => '')).trim();
  greeted ? ok(`thank-you page greets by name: "${greeting}"`)
          : bad(`thank-you page did not greet by name: "${greeting}"`);
} else bad(`no redirect — still on ${landed}`);

await page.close();
await browser.close();

console.log(`\n\x1b[1m${fails ? '\x1b[31mFAIL' : '\x1b[32mPASS'}\x1b[0m — ${fails} failure(s), ${warns} warning(s)\n`);
process.exit(fails ? 1 : 0);
