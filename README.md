# Cygnet House Dental Studio — Dental Implants Funnel

Single-page, mobile-first lead-generation landing page for dental implants
(Single / All-on-4 / All-on-6), built from the Clix Dental build brief.

**Deliverables**

| File | What it is |
|------|------------|
| `index.html` | The live funnel page. One self-contained file (HTML + CSS + vanilla JS). No frameworks, no build step, no external JS. |
| `design-lab.html` | Internal design reference — background motion options, section cuts and reusable funnel blocks, with copy-paste code. Not a public page. |

Open either in a browser or drop them on any static host.

### `design-lab.html`

A picker for design decisions that are still open, built on the **same token
names** as `index.html`, so anything in it pastes straight across:

- **Part A — background motion**, six hero treatments from calmest to most
  active, including a zero-motion control worth A/B testing against.
- **Part B — section cuts**, eight SVG dividers using one overlay technique that
  never clips content.
- **Part C — funnel blocks**, reusable sections for any treatment funnel —
  alternative heroes, a before/after slider, a price comparison table, CTA bands,
  a stat strip and sticky-bar variants.

Three palette swatches in the header re-skin every preview live. That is the
re-use story for other practices: swap the token block, keep the components.
All three palettes are contrast-checked (accent on white: 4.92 / 5.13 / 5.48).

---

## ⚠ This page is not launch-ready

`<meta name="robots" content="noindex, nofollow">` is set in `index.html` on
purpose. **Remove it only after every item in the checklist below is signed off.**

Everything still awaiting client confirmation is rendered as a highlighted
`[bracketed placeholder]` so it is impossible to miss on the page itself.

---

## Blocking items (cannot launch without these)

| # | Item | Where it appears |
|---|------|------------------|
| 1 | **Finance figures** — provider, term, representative APR, monthly amounts | Hero anchor, all 3 pricing cards, §11 representative example, footer |
| 2 | **Real consented before/after images** | §6 — three placeholder slots |
| 3 | **Phone number** for click-to-call | Header, hero, §8, §13, footer, sticky mobile bar |
| 4 | **Substantiation for any savings claim** | Currently omitted entirely — see note below |

## Also outstanding

- Dr Rose — full name, credentials, GDC number
- Practice address + opening hours + Google Map embed (§13 placeholder slot)
- The six real, consented patient reviews (§7 — six placeholder cards, treatment
  labels already set)
- Real logo and brand colours (a proposed premium palette is in use)
- Clinician photos (§10), hero image (§2)
- CQC provider ID, FCA firm reference number
- Privacy policy / complaints / terms URLs (footer)
- £50 deposit — confirm whether it is refundable or redeemable against treatment

---

## Compliance decisions baked into the copy

These follow the brief's §4 flags. Changing them back needs a compliance sign-off.

- **No absolute success-rate claim.** "100% implant success rate" is removed.
  Dr Sourtzis' message is reframed around a careful, restoratively-driven,
  honest approach.
- **No savings claims.** "Save up to £1,000" / "SAVE £500" are omitted pending a
  genuine, substantiated prior price. A build note in §5 flags where to
  reintroduce them if substantiated.
- **Softened suitability language.** "We assess complex cases others have
  declined" — not "we can treat what others can't".
- **No manufactured urgency.** Vague scarcity is omitted.
- **Finance wording is a labelled placeholder** and must be replaced with
  FCA-approved copy before launch.

---

## Configuration

### Phone number

One place, at the bottom of `index.html`:

```js
var SITE_CONFIG = {
  phoneDisplay: null,   // e.g. '01790 123456'
  phoneHref:    null    // e.g. '+441790123456'
};
```

Set both and every phone reference and `tel:` link on the page updates. While
they are `null` the visible `[Phone]` placeholders stay put.

### Form endpoint

The form currently shows its success state without sending anything, so the flow
can be reviewed end to end. To wire it up:

1. Replace `action="[FORM_ENDPOINT]"` on `#qualifier-form`.
2. In the submit handler, swap the `setTimeout` block for the `fetch` call that
   is commented out directly above it.

Fields posted: `situation`, `timing`, `firstName`, `phone`, `email`, `pageUrl`,
`treatment`, plus a `website` honeypot (a non-empty value means a bot — discard).

---

## What was built

| § | Section |
|---|---------|
| 1 | Sticky header — logo, click-to-call, primary CTA |
| 2 | Hero — H1, subhead, 4 benefit ticks, finance anchor, trust chips, embedded multi-step form, image slot |
| 3 | Trust strip |
| 4 | "Is this you?" — 4 problem cards |
| 5 | Solutions + pricing — 3 finance-anchored cards, tabular figures |
| 6 | Before & after — 3 slots |
| 7 | Reviews — 6 cards with treatment labels |
| 8 | "Nervous about implants?" reassurance |
| 9 | Your journey — 3 steps |
| 10 | Meet your clinicians — 2 profiles |
| 11 | What's included + £50 deposit + finance representative example |
| 12 | FAQ — 5 items, accessible accordion |
| 13 | Final CTA + address + map slot |
| — | Footer with regulatory/finance/pricing disclosures |
| — | Sticky mobile CTA bar (Call · Check My Suitability) with safe-area padding |

**Multi-step qualifier form:** 3 steps, progress indicator, per-step validation,
inline errors wired with `aria-invalid` / `aria-describedby`, back navigation
that preserves answers, honeypot, and a success state. Enter advances a step
rather than submitting early. One primary CTA verb throughout —
*Check My Suitability*.

---

## Verified

Checked in headless Chromium at **375 / 768 / 1024 / 1440px**:

- no horizontal scroll at any breakpoint
- no JS console errors
- multi-step form: validation blocks empty steps, errors clear on input, back
  navigation preserves answers, success state renders
- FAQ accordion opens/closes with correct `aria-expanded`

Accessibility: WCAG AA contrast (CTA gold `#A16207` on white measures 4.9:1),
visible focus rings, labelled inputs, `prefers-reduced-motion` respected, skip
link, inline SVG icons only — no emoji.

**Not yet checked:** real-device testing, and a screen-reader pass.
