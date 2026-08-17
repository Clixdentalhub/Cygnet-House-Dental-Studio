# Cygnet House Dental Studio — Dental Implants Funnel

Single-page, mobile-first lead-generation landing page for dental implants
(Single / All-on-4 / All-on-6), built from the Clix Dental build brief.

**Deliverables**

| File | What it is |
|------|------------|
| `index.html` | The live funnel page. One self-contained file (HTML + CSS + vanilla JS). No frameworks, no build step, no external JS. |
| `thank-you.html` | The post-submission confirmation page. Same tokens, same header and footer, self-contained in the same way. `noindex` on purpose. |
| `design-lab.html` | Internal design reference — background motion options, section cuts and reusable funnel blocks, with copy-paste code. Not a public page. |
| `motion-lab.html` | Internal reference — 27 motion patterns for sections, cards, headlines, media, hover and micro-interactions. Every case is live and replayable, with a reduced-motion toggle that shows exactly what a visitor with that preference gets. Ends with the shortlist I would actually apply. |
| `form-lab.html` | Internal reference — four luxury treatments of the qualifier form. **F1 · Ink Atelier is the one shipped in `index.html`.** F2 · Gilded Hairline is the natural control to A/B test it against. |

Open any of them in a browser or drop them on any static host.

---

## Launch status

**No blocking items remain.** Every `[bracketed placeholder]` is gone, the
`noindex` meta tag has been removed, and the page is cleared to go live.

## To do

### Before you point traffic at it

- [ ] **Set the three footer policy links.** They currently point at
      `cygnethousedentalstudio.co.uk/privacy-policy/`, `/complaints/` and
      `/terms/`. Confirm those paths exist, or repoint them at the equivalent
      pages once the funnel is up in GHL.
- [ ] **Set the canonical URL** to the funnel's GHL address once it has one.
- [ ] **Point `SITE_CONFIG.thankYouUrl`** (in `index.html`) at the thank-you
      page's real URL, and **`SITE_CONFIG.funnelUrl`** (in `thank-you.html`) at
      the funnel's — both are relative paths today, which only works while the
      two files sit side by side.
- [ ] **Add the conversion tag** to `thank-you.html` — the marked block at the
      bottom of its script takes the Google Ads / Meta snippet.

### After it is live

- [ ] **Submit one real test lead** and confirm the field mapping in GHL.
      Posted fields: `situation`, `timing`, `firstName`, `lastName`,
      `phone`, `email`, `pageUrl`, `treatment`, plus a `website` honeypot.
- [ ] **Filter the honeypot in GHL** — any lead with a non-empty `website`
      field is a bot. One workflow condition bins them.
- [ ] Real-device testing and a screen-reader pass. Neither has been done; the
      build is verified in headless Chromium only.

### Optional, whenever you have them

- [ ] **Lender name and FRN** for the footer finance paragraph. The line is
      accurate and publishable as it stands — nothing in it is invented — and
      a source comment marks where the two details slot in.
- [ ] **"Save up to £1,000"** — needs a genuine, substantiated prior price
      before it can be used. Omitted until then; §5 carries a build note where
      it would go back in.

---

## Standing recommendation

> **Full-arch finance is the biggest open lever on this page.** 0% over 12
> months is a superb anchor for a single implant (£250/month) but forces
> £1,000 and £1,250 per month for All-on-4 and All-on-6 — figures that stop
> most people reading. Those two cards lead with the total instead, which is
> the best available framing, but a longer-term plan for full-arch would do
> more for conversion than any design change left in this build.

---

## Confirmed and in the build

- Legal entity **Cygnet House Dental Studio Ltd**, company number **05359263**
- Address **Cygnet House, Grace Swan Close, Hundleby, Spilsby, PE23 5LT**,
  live Google map embed + three "Get directions" links
- Phone **07450 302990** (wired through `SITE_CONFIG`)
- Opening hours Mon–Fri, closed Sat & Sun (page, footer and JSON-LD agree);
  website, Facebook and Instagram
- Implant treatment provider **Dr Dimitrios Sourtzis**, GDC 287145
- Six-person clinical team with official bios, GDC numbers and confirmed
  portraits, as a clickable roster over the team photo
- Pricing: single **£3,000–£3,500**, All-on-4 **from £12,000/arch**, All-on-6
  **from £15,000/arch**
- Finance: **0% over 12 months on every implant treatment**, in its own box in
  §11, with the representative example beside it
- **£50 consultation deposit** — covers the full assessment and scans
- 15 verbatim Google reviews in a three-column marquee (4.9 from 122)
- Three before/after comparison sliders (cases 1, 3, 4) with short
  treatment captions, shown with patient consent
- Lead form posts to the **LeadConnector webhook**
- `Dentist` JSON-LD with NAP, hours, services, `hasMap` and social profiles

---

## Compliance decisions baked into the copy

These follow the brief's §4 flags. Reversing any of them needs a compliance
sign-off, not just a copy edit.

- **No absolute success-rate claim.** The supplied bios said "100% implant
  success rate" and "over 50 implants without any failures". Both are removed —
  GDC and ASA treat absolute outcome claims as unsubstantiable. Dr Sourtzis'
  message is reframed around a careful, restoratively-driven, honest approach.
- **No savings claims.** "Save up to £1,000" / "SAVE £500" omitted pending a
  genuine, substantiated prior price.
- **Softened suitability language.** "We assess complex cases others have
  declined" — not "we can treat what others can't".
- **No manufactured urgency.** Vague scarcity is omitted.
- **No `aggregateRating` in the JSON-LD.** Google does not support
  self-serving review markup on `LocalBusiness` types.
- **Reviews are post-ownership only.** Mitchell-era reviews are excluded, and
  the one existing 1-star review is acknowledged rather than papered over.

---

## Configuration

### Phone number

One place, near the bottom of `index.html`:

```js
var SITE_CONFIG = {
  phoneDisplay: '07450 302990',
  phoneHref:    '+447450302990'
};
```

Set both and every phone reference and `tel:` link on the page updates.

### Where a submission lands

`SITE_CONFIG.thankYouUrl` in `index.html` decides what a successful send does.
It currently points at the GHL page:

```js
thankYouUrl: 'https://sites.leadconnectorhq.com/preview/d7eCNYHJ8bPcsjqpLcyP?notrack=true'
```

Set it to `null` to keep the visitor here and show the inline success state
instead. The two are mutually exclusive, and **only one of them should carry a
conversion pixel**, or every lead counts twice.

> **That is a preview URL, and `notrack=true` disables GHL's own tracking.**
> Fine while testing; swap both for the published address before running
> traffic, or the page will not record a thing.

The lead's first name rides along as `firstName=…`. The separator is chosen
rather than assumed — this destination already has a query string, so a second
`?` would collapse the whole thing into one unparseable value. Verified: the
visitor lands on `…?notrack=true&firstName=Margaret` with both parameters
readable.

**This URL lives in the HTML.** Pasting a fresh build into GHL overwrites
whatever is in the block, including any endpoint you edited there by hand — so
change it here and rebuild, rather than in GHL. `index.html` is the source of
truth; `dist/` is disposable output.

If `thank-you.html` is used instead of a GHL page, it reads `firstName` from
the query string, screens it, and greets the visitor by name.

### Form endpoint

Posts to the LeadConnector inbound webhook on `#qualifier-form`:

```
https://services.leadconnectorhq.com/hooks/mucgOLidUbBVBQ060OW7/webhook-trigger/8de02f9e-13c5-49a1-b1f4-7f2f991e867d
```

Sent as **`application/x-www-form-urlencoded`** via `URLSearchParams`. That
content type is CORS-safelisted, so the request stays "simple" and skips the
preflight — which a `no-cors` request could not answer anyway — and GHL reads
flat form fields far more predictably than it reads a multipart body. The
response is opaque by design, so a resolved promise means delivered and a
rejection means a real network failure (the visitor then gets an inline error
inviting them to call instead).

**Field names are a contract.** Once a name is mapped in a GHL workflow, that
mapping survives every future paste — GHL matches on the name, and pasting new
HTML does not touch the workflow. Re-mapping is only ever needed when a field
is **added**, and then only for the new one. Nothing here will be renamed or
removed without it being called out, because a silent rename is a mapping that
keeps working and quietly stops carrying data.

History so far: the eight original fields have never changed. `lastName` was
added later and is the only one that has ever needed a fresh mapping.

**The payload**, captured from a real submission:

```
situation=Missing+several+teeth&timing=As+soon+as+possible&firstName=Margaret
&lastName=O%E2%80%99Sullivan&phone=07700+900123&email=margaret%40example.co.uk&website=
&pageUrl=https%3A%2F%2F…&treatment=Dental+Implants
```

| Field | Example | Notes |
|---|---|---|
| `situation` | `Missing several teeth` | One of: *Missing 1 tooth · Missing several teeth · Loose or uncomfortable dentures · Failing teeth / considering full-mouth* |
| `timing` | `As soon as possible` | One of: *As soon as possible · In the next few months · Just researching for now* |
| `firstName` | `Margaret` | Validated: 2+ characters |
| `lastName` | `O’Sullivan` | Validated: 2+ characters |
| `phone` | `07700 900123` | Validated: 10–15 digits, punctuation preserved as typed |
| `email` | `margaret@example.co.uk` | Validated |
| `website` | *(empty)* | **Honeypot.** Always empty from a human. Non-empty = bot — bin it. |
| `pageUrl` | full page URL | Useful for attribution if the funnel is ever duplicated |
| `treatment` | `Dental Implants` | Constant, for routing when other funnels share the workflow |

#### Capturing the reference payload in GHL

The Inbound Webhook trigger stores one captured request as its **reference**,
and every downstream action can only pick from the keys in that stored sample.
So:

- **Existing mappings are unaffected by a paste.** They resolve by key name,
  and the key names do not change.
- **Re-capture only when a field is added** — after `lastName`, for example.
  Re-running "listen for new request" replaces the stored sample; every key
  still present keeps working, and the new one becomes selectable.
- **Make the capture submission complete.** Fill every field, because a key
  missing from the stored sample cannot be picked afterwards. All nine keys
  are transmitted on every send, including `website` with an empty value
  (verified: the body always contains `website=`), so one ordinary submission
  is enough.

Submit from the published page rather than a local copy, so `pageUrl` holds
the real address.

**First workflow condition should be the honeypot:** if `website` `is not
empty` → stop. Everything downstream then only ever sees real people.

### Putting it in GHL

```
node tools/build-ghl.mjs
```

Writes two **standalone, paste-and-go** documents to `dist/`:

| File | Size | What it is |
|---|---|---|
| `cygnet-implants-funnel.html` | ~2.2 MB | The funnel, with all 33 images inlined as data URIs |
| `cygnet-thank-you.html` | ~215 KB | The confirmation page, same treatment |

No `assets/` folder to upload — paste either into a GHL custom-code / full-page
HTML block and it renders. The live Google Maps iframe is intact.

**Set two values before publishing.** Both ship as relative paths, which only
resolve while the files sit in one folder:

- in the funnel — `SITE_CONFIG.thankYouUrl` → the thank-you page's GHL URL
- in the thank-you page — `SITE_CONFIG.funnelUrl` → the funnel's GHL URL

**Worth doing when there is time:** inlining is the "live today" option, not
the fast one. A data URI cannot be cached separately from the document, and
base64 costs about a third more bytes than the file it encodes — so every
visitor re-downloads 2.2 MB. Uploading the 33 images to GHL's media library
and swapping the `src` attributes back to URLs would cut the document to
about 90 KB and let the browser cache the photographs. Use `index.html` +
`assets/` as the source for that.

### Images

`python3 tools/ingest-images.py <folder> "RAW=slot, …"` cover-crops to the
slot's box, strips EXIF, and writes WebP q80 into `assets/`. Run with no
mapping to list what it found and which slots are open.

---

## What was built

| § | Section |
|---|---------|
| 1 | Sticky header — logo, section nav, click-to-call, primary CTA, scroll-progress bar |
| 2 | Hero — H1, subhead, 4 benefit ticks, finance anchor, trust chips, embedded multi-step form, practice photo |
| 3 | Trust strip |
| 4 | "Is this you?" — 4 problem cards with photos above them |
| 5 | Solutions + pricing — 3 finance-anchored cards with arch glyphs |
| 6 | Before & after — 3 interactive comparison sliders |
| 7 | Reviews — 15 reviews in a 3-column down/up/down marquee |
| 8 | "Nervous about implants?" reassurance |
| 9 | Your journey — 3 steps |
| 10 | Meet your clinicians — team photo + clickable 6-person roster |
| 11 | What's included + £50 deposit + 0% finance box + representative example |
| 12 | FAQ — 5 items, accessible accordion |
| 13 | Final CTA + address + live map |
| — | Footer with regulatory/finance/pricing disclosures |
| — | Sticky mobile CTA bar (Call · Check My Suitability) with safe-area padding |

**`thank-you.html`** — confirmation seal, what-happens-next in three steps, a
call band (they are as warm as they will ever be at that moment), four things
worth thinking about before the call, and two reviews. One mobile action, not
two: they have already filled the form in. Every link back to the funnel
resolves through `SITE_CONFIG.funnelUrl`, so moving the page in GHL is one
edit rather than five.

**Qualifier form (Ink Atelier):** 3 steps, hairline progress rail, per-step
validation, inline errors wired with `aria-invalid` / `aria-describedby`, back
navigation that preserves answers, honeypot, and a success state.

### Header nav and progress

Six section links, plus a 3px scroll-progress bar painted over the header's
own bottom border so it costs no height. The links scroll-spy: whichever
section you are in is the one lit up, and on the mobile rail that chip is
scrolled to centre automatically.

Below **1280px** the links drop to their own scrollable rail under the logo
row — six links cannot share a row with a logo, a phone number and a CTA
without the row collapsing. `--header-h` changes with the layout (136px on
two rows, 76px on one) and every anchor offset resolves from that token, so
a link never drops a heading behind the header.

Progress and scroll-spy share one `requestAnimationFrame`-throttled scroll
listener. A scroll event can fire dozens of times per frame, and doing layout
reads in each one is how a smooth page starts to feel sticky.

### Section motion

Ten patterns from `motion-lab.html`, each with exactly one home. No section
carries two — a page where every band moves differently reads as nervous
rather than considered.

| Pattern | Where | What moves |
|---|---|---|
| **H1 · Line Mask** | §2 hero | the H1, masked and revealed word by word |
| **M2 · Zoom Settle** | §4 Is this you? | the four card photos ease back from 114% |
| **C2 · Centre Out** | §5 pricing | three cards, the middle one first |
| **S3 · Rule First** | §6 before & after | an accent rule draws, then the head arrives |
| **U1 · Count Up** | §7 reviews | 4.9 and 122 climb over 2.2s |
| **S4 · Settle** | §8 nervous | the head scales from 97% |
| **I1 + I2** | §10 clinicians | roster tiles lift, portraits zoom inside — hover only |
| **U3 · Icon Trace** | §11 consultation | the check-list ticks draw in sequence |
| **U2 · Tick Draw** | form success | the seal draws itself once |
| **U4 · Bar Entrance** | sticky mobile bar | arrives once the hero is behind you |

Every element has a defined resting state, so nothing depends on JavaScript to
look right — only to know when to begin. `prefers-reduced-motion` puts all ten
straight into their finished state rather than running them faster.

**Selection auto-advances** — tap an answer and the step moves itself after a
260 ms beat. Pointer input only: arrow keys move between radios in a group and
fire a `change` event at every stop, so advancing on keyboard selection would
throw a keyboard user past the question the instant they started reading it.
Keyboard users get the Continue button, which is why it stays. Enter advances a
step rather than submitting early.

---

## Verified

Headless Chromium, both pages, at **360 / 375 / 414 / 768 / 1024 / 1280 / 1440px**.

**`index.html`** — no console errors · JSON-LD parses · no `noindex` · zero
visible `[placeholders]` · no dead or bracketed hrefs · every image loads and
carries an `alt` · exactly one `h1` · no section carries more than one motion
pattern · no horizontal overflow at any width · `--header-h` is >= the real
header height at every width, so no anchor lands behind it · the six nav links
scroll-spy correctly and each one puts its heading clear of the header ·
scroll progress runs 0 to 1.

**Form** — pointer selection auto-advances, arrow keys do not, validation
blocks an empty step, errors clear on input, back navigation preserves
answers, and a successful send redirects to `thank-you.html?firstName=…`.

**`thank-you.html`** — no console errors · greets by name · pushes
`generate_lead` · `noindex` present · no dead hrefs · an `<img onerror>`
payload in `?firstName` is rejected with zero nodes injected · no overflow.

**Accessibility** — WCAG AA contrast throughout, measured rather than assumed.
On the ink form card, against its own ground: title and options 15.9:1, intro
and labels 10.1:1, eyebrow 7.5:1, error text 9.4:1, CTA fill 3.3:1 with 4.7:1
text on it. Visible focus rings, labelled inputs, a skip link, `aria-current`
on the active nav link, and inline SVG icons only — no emoji.
`prefers-reduced-motion` puts every pattern into its finished state rather
than running it faster.

**Not yet checked:** real-device testing, and a screen-reader pass.
