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
      Posted fields: `situation`, `timing`, `firstName`, `phone`, `email`,
      `pageUrl`, `treatment`, plus a `website` honeypot.
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

`SITE_CONFIG.thankYouUrl` in `index.html` decides what a successful send does:

```js
thankYouUrl: 'thank-you.html'   // redirect (default)
thankYouUrl: null               // stay put, show the inline success state
```

The two are mutually exclusive, and **only one of them should carry a
conversion pixel**. As shipped, the thank-you page is the conversion event —
`thank-you.html` pushes `generate_lead` to the dataLayer and has a marked
block for Google Ads / Meta / GTM tags. Do not also fire one on submit in
`index.html`, or every lead counts twice.

The lead's first name rides along as `?firstName=…` so the page can greet them
by name. It is encoded on the way out and screened on the way in — written
with `textContent`, and dropped entirely unless it looks like a name — so a
crafted URL cannot put anything into the page.

If you would rather GHL own the redirect, set `thankYouUrl` to the full GHL
URL of the thank-you page.

### Form endpoint

Wired to the LeadConnector webhook on `#qualifier-form`. The submit handler
POSTs a `FormData` body with `mode: 'no-cors'` — that keeps it a "simple"
request with no CORS preflight, which is what the webhook accepts. The
response is opaque by design, so a resolved promise means delivered and a
rejection means a real network failure (the user then gets an inline error
inviting them to call instead).

### Images

`python3 tools/ingest-images.py <folder> "RAW=slot, …"` cover-crops to the
slot's box, strips EXIF, and writes WebP q80 into `assets/`. Run with no
mapping to list what it found and which slots are open.

---

## What was built

| § | Section |
|---|---------|
| 1 | Sticky header — logo, click-to-call, primary CTA |
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

Checked in headless Chromium at **375 / 768 / 1024 / 1440px**:

- no horizontal scroll at any breakpoint
- no JS console errors
- multi-step form: pointer selection auto-advances, arrow keys do not,
  validation blocks empty steps, errors clear on input, back navigation
  preserves answers, success state renders
- FAQ accordion opens/closes with correct `aria-expanded`

Accessibility on the ink form card, measured against its own ground:
title/legend/options 15.9:1, intro and labels 10.1:1, eyebrow 7.5:1, error text
9.4:1, CTA fill 3.3:1 with 4.7:1 text on it — all AA or better. Plus visible
focus rings, labelled inputs, `prefers-reduced-motion` respected, a skip link,
and inline SVG icons only — no emoji.

**Not yet checked:** real-device testing, and a screen-reader pass.
