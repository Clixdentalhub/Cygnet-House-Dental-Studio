# New campaign — brief for a fresh Claude Code task

Paste this whole file as the first message of the new task, then add the
client-specific block at the bottom. It carries the design system, the build
and verification workflow, the GHL contract, the UK dental compliance rules,
and every trap already hit and solved on the Cygnet House build — so none of
that gets re-derived from scratch.

**Source of truth:** `Clixdentalhub/Cygnet-House-Dental-Studio`, branch
`claude/new-session-lx19ci`. Clone it and work from it; do not rebuild from
memory.

```bash
git clone -b claude/new-session-lx19ci \
  https://github.com/Clixdentalhub/Cygnet-House-Dental-Studio.git reference
```

---

## 0 · The instruction

> Build a lead-generation funnel for **[CLIENT]**, treatment **[TREATMENT]**,
> reusing the Cygnet House design system in full — every token, component,
> section pattern, motion pattern, the qualifier form, the thank-you page and
> the build tooling. Keep the structure identical unless the client's content
> genuinely demands otherwise. Content, imagery, pricing and the webhook are
> new; the design is not.
>
> Images and copy will be reviewed later — **use placeholders that are
> impossible to miss rather than leaving anything out.** Every unconfirmed
> value renders as a highlighted `[bracketed placeholder]` on the page, and
> `<meta name="robots" content="noindex, nofollow">` stays in `<head>` until
> every one of them is resolved.

---

## 1 · What to carry over, file by file

| File | Reuse | Notes |
|---|---|---|
| `index.html` | **Whole file as the starting point** | ~2,900 lines. 13 sections, self-contained: HTML + CSS + vanilla JS, no framework, no build step, no external JS. Swap content, keep structure. |
| `thank-you.html` | **Whole file** | Shares the token block, header and footer with the funnel. `noindex` on purpose. |
| `tools/build-ghl.mjs` | **As-is** | Produces the paste-into-GHL builds. |
| `tools/ingest-images.py` | **As-is, edit the `SLOTS` dict** | Cover-crops, strips EXIF, writes WebP q80. |
| `design-lab.html` | Reference | 3 palettes, 6 background motions, 8 section cuts, reusable blocks. |
| `motion-lab.html` | Reference | 27 live, replayable motion patterns + the shortlist actually applied. |
| `form-lab.html` | Reference | 4 qualifier-form treatments. **F1 · Ink Atelier is the one shipped.** |
| `assets/` | **Do not copy** | Client-specific. New shoot, new folder. |

The three labs are internal — `noindex`, never public. They exist so design
decisions are made by looking rather than describing.

---

## 2 · Design system

### Tokens

All of it resolves from one `:root` block at the top of `index.html`. Swapping
the palette is swapping that block; every component follows.

```css
--color-primary:        #241730;   /* plum ink — 16.9:1 with white */
--color-secondary:      #6A2383;   /* links */
--color-accent:         #6A2383;   /* CTA — the brand colour itself */
--color-accent-dark:    #521B66;
--cta-on-dark:          #9B4DD6;   /* CTA fill on ink bands — 3.6:1 vs ink */
--cta-on-dark-text:     #FFFFFF;   /* 4.7:1 on that fill */
--color-flourish:       #C4A5E8;   /* icons and rules on ink */
--color-on-primary-mut: #D5CADE;   /* body copy on ink */
--color-background:     #FAF8FB;
--color-surface:        #FFFFFF;
--color-foreground:     #1F1024;
--color-foreground-mut: #57496B;   /* 7.7:1 on background — AA for body */
--color-muted:          #EFEAF2;
--color-border:         #D8CFE0;
--color-border-strong:  #94879E;
--color-success:        #16794A;
--color-error:          #B42318;
--color-star:           #B45309;   /* semantic, not brand */

--radius: 12px / --radius-sm: 8px / --radius-lg: 20px / --radius-pill: 999px
--space: 8px  (8pt rhythm: --space-2 … --space-10)
--font-heading: "Lexend"        600/700
--font-body:    "Source Sans 3" 400/600
--ease-out: cubic-bezier(.22,1,.36,1)   /* the workhorse — no overshoot */
--t-fast 240ms / --t-base 460ms / --t-slow 680ms
--header-h: 136px (two-row) → 76px at ≥1280px
```

**The rule that matters most:** a CTA on an ink band must invert. `--color-accent`
on `--color-primary` fails contrast; `--cta-on-dark` exists for exactly that,
and `.section--primary .btn--primary` / `.form-card .btn--primary` apply it.
Any new dark band needs the same treatment.

### Sections in the funnel

1 Sticky header (logo · section nav · click-to-call · CTA · scroll progress) ·
2 Hero (H1, subhead, 4 ticks, finance anchor, trust chips, embedded form,
photo) · 3 Trust strip · 4 Problem cards · 5 Pricing · 6 Before & after
sliders · 7 Reviews marquee · 8 Reassurance · 9 Journey · 10 Team ·
11 What's included + finance · 12 FAQ · 13 Final CTA + map · Footer ·
Sticky mobile CTA bar.

### Motion — one pattern per section, never two

A page where every band moves differently reads as nervous. Keep this map:

| Pattern | Section |
|---|---|
| H1 Line Mask (per **word**, built by JS) | §2 hero H1 |
| M2 Zoom Settle | §4 card photos |
| C2 Centre Out | §5 pricing cards |
| S3 Rule First | §6 section head |
| U1 Count Up (2.2s) | §7 rating figures |
| S4 Settle | §8 section head |
| I1 Lift + I2 Media Zoom | §10 roster tiles (hover) |
| U3 Icon Trace | §11 check-list |
| U2 Tick Draw | form success seal |
| U4 Bar Entrance | sticky mobile bar |

Transform, opacity, clip-path and stroke-dashoffset only. Every element has a
defined resting state, so nothing depends on JS to look right — only to know
when to start. `prefers-reduced-motion` puts everything into its **finished
state**, not a faster animation.

---

## 3 · The form and the GHL contract

Three steps, Ink Atelier treatment. Selection **auto-advances on pointer
input only** — arrow keys move between radios and fire `change` at every stop,
so advancing on keyboard selection throws a keyboard user past the question.
Keyboard users get the Continue button, which is why it stays.

**Posted fields — these names are a contract.** GHL maps on the name, so a
mapping survives every future paste. Never rename or drop one silently: a
rename leaves a mapping that keeps working and quietly stops carrying data.

```
situation · timing · firstName · lastName · phone · email
website (honeypot) · pageUrl · treatment
```

Sent as **`application/x-www-form-urlencoded`** via
`new URLSearchParams(new FormData(form))`, `mode:'no-cors'`. That content type
is CORS-safelisted, so the request stays "simple" — no preflight, which a
no-cors request could not answer — and GHL reads flat form fields far more
predictably than a multipart body. The response is opaque by design: resolve
means delivered, reject means a real network failure (the visitor then gets an
inline error inviting them to call).

`SITE_CONFIG` at the bottom of each file holds `phoneDisplay`, `phoneHref`,
`thankYouUrl` (funnel) and `funnelUrl` (thank-you page). **Every URL lives in
the HTML** — pasting a fresh build into GHL overwrites anything edited by hand
there, so change it in the source and rebuild.

First workflow condition in GHL should be the honeypot: `website` is not empty
→ stop.

---

## 4 · Build and verify

```bash
node tools/build-ghl.mjs     # → dist/*.html, images inlined, paste into GHL
python3 tools/ingest-images.py <folder> "RAW.jpg=slot, …"
```

Chromium for verification lives at
`/opt/pw-browsers/chromium-1194/chrome-linux/chrome` — pass it as
`executablePath`; do **not** run `playwright install`.

Check every change at **360 / 375 / 414 / 768 / 1024 / 1280 / 1440**:

- `document.documentElement.scrollWidth - clientWidth === 0` at every width
- `--header-h` ≥ the real header height, or anchors land behind it
- no console errors, JSON-LD parses, zero `.ph` placeholders before launch
- every image loads and carries an `alt`
- form: pointer advances, arrow keys do not, validation blocks, redirect fires
- contrast measured, not assumed — relative luminance, 4.5:1 text, 3:1 UI

**Screenshot as well as measure.** The worst bug on this build — words
rendering out of order in a price card — passed every measurement and was only
visible in a picture.

---

## 5 · UK dental compliance — non-negotiable

Reversing any of these needs a compliance sign-off, not a copy edit.

- **No absolute outcome claims.** "100% success rate", "without any failures"
  — GDC and ASA treat these as unsubstantiable, even when the practice
  supplies them. Reframe around approach and process.
- **No savings claims** without a genuine, substantiated prior price.
- **Softened suitability language.** "We assess complex cases others have
  declined", not "we treat what others can't".
- **No manufactured urgency.**
- **Before/after images** need patient consent on file, and each needs a
  caption saying what was treated.
- **No `aggregateRating` in JSON-LD** — Google does not support self-serving
  review markup on `LocalBusiness` types. Reviews go in the copy instead.
- **Finance:** 0% credit cannot be promoted without the lender named and the
  practice's FCA authorisation / credit-broker status and FRN stated.
- **Every clinician named needs their GDC number.**
- Use `Dentist` JSON-LD with NAP, hours, services, `hasMap`, `sameAs`.

---

## 6 · Collect from the client before building

Legal entity + company number · full address · phone · opening hours
(**including weekends** — the JSON-LD needs them) · website + socials ·
treatment provider name + GDC number · every clinician's name, role, GDC
number and bio · prices and what varies them · finance terms (lender, APR,
term, FCA status, FRN) · deposit amount and whether it is refundable or
redeemable · Google review URL + rating + count · consented before/after
images with treatment descriptions · CQC registration · privacy / complaints /
terms URLs · the GHL inbound webhook URL · the thank-you page URL · brand
colour and logo · photography.

Anything missing ships as a highlighted `[placeholder]`, never as an
invention, and never silently omitted.

---

## 7 · Traps already solved — do not re-derive

- **`.reveal` on a container swallows a stagger inside it.** Neutralise the
  container's own reveal where a section has its own entrance pattern.
- **Removing a class does not snap an element back** — it starts a transition
  towards the resting state, so a forced reflow reads a value still at the
  finished end. Suppress transitions across the reset: kill, remove, commit,
  restore, commit, replay.
- **`word-break: keep-all` does not suppress breaks at an explicit hyphen** in
  Chromium. Only a `white-space: nowrap` wrapper does.
- **A `nowrap` span inside a `display:flex` list item becomes a flex item**
  and renders the words out of order. Never use one in `.ticks li`,
  `.check-list li` or `.price-card__ticks li`.
- **`justify-content:center` on an overflowing flex track spills out of both
  sides** — the left overflow becomes unreachable. Use `width:max-content` +
  `min-width:100%` so it grows and scrolls instead.
- **A wider border on one card of a row shifts its content** by that many
  pixels. Use an inset ring for emphasis; it paints inside the box.
- **Line-based headline masks hard-code the line breaks** and the headline
  re-wraps inside them. Mask per word, built from the live text at runtime.
- **A destination URL may already carry a query string.** Choose the `?`/`&`
  separator; do not assume.
- **A pseudo-element badge taller than its reserved padding** lands on the
  heading's ascenders.
- **`align-items: baseline` is not centring.** For a glyph in a disc, use
  `display:grid; place-items:center` with the glyph as one wrapped child.
- **`--color-error` is unusable on ink** (3.0:1). Ship an on-dark twin.
- **Query-string values are attacker-controlled.** Write with `textContent`
  and screen the value; drop anything that is not plausibly a name.
- **A thank-you page must be `noindex`** — one that ranks is reachable without
  converting and inflates every conversion fired on it.
- **Fire the conversion in exactly one place** — the thank-you page or the
  submit handler, never both.
- **Data-URI images cannot be cached** and cost ~33% more bytes. Inlining is
  the get-it-live-today option; hosting the images is the fast one.
- **The broken-image cleanup covers `.stack__media img` and `.card__media img`
  but not `.ba__layer`.** On a build whose before/after cases do not exist yet,
  every empty slider paints two broken-image glyphs — and its divider, knob and
  Before/After badges sit over the striped slot, cutting the filename label in
  half. Add `.ba__layer` to the selector and give the slider a `.ba--empty`
  state that hides the comparison furniture. Fixed in `composite-bonding.html`.
- **A gradient ground has no `backgroundColor`.** Any contrast check that walks
  up looking for one climbs straight past an ink card built from a gradient and
  reports white text on the light section behind it — 1.06:1 for something that
  actually measures 15.9:1. Read the gradient's own stops and take the worst.
- **A render-blocking off-site stylesheet defers every inline script after it.**
  With no route to `fonts.googleapis.com`, the document sits in `readyState:
  "loading"`, the bottom script never runs, and the page looks broken in a way
  it is not. Verification must abort off-site requests up front, or it measures
  the network rather than the page.
- **Gold is not a light-ground colour.** `#D4AF37` is 2.1:1 on white and 8.2:1
  on the ink band. If a brief hands you gold, give it one job on ink and a
  darker twin for the same job on light — never let it become decoration.

---

## 8 · Client block — fill this in

```
Client:              [practice name]
Legal entity:        [Ltd name, company number]
Campaign:            [treatment]
Brand colour:        [hex]
Address / phone:     [...]
Hours:               [Mon–Fri …, weekends?]
Clinicians:          [name · role · GDC no.]
Pricing:             [...]
Finance:             [lender, APR, term, FCA status, FRN]
Google reviews:      [rating, count, URL]
GHL webhook:         [inbound webhook URL]
Thank-you page:      [published GHL URL]
Assets:              [Drive folder]
```
