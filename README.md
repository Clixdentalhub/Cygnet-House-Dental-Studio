# Cygnet House Dental Studio — Dental Implants Funnel

Single-page, mobile-first lead-generation landing page for dental implants
(Single / All-on-4 / All-on-6), built from the Clix Dental build brief.

**Deliverables**

| File | What it is |
|------|------------|
| `index.html` | The live funnel page. One self-contained file (HTML + CSS + vanilla JS). No frameworks, no build step, no external JS. |
| `design-lab.html` | Internal design reference — background motion options, section cuts and reusable funnel blocks, with copy-paste code. Not a public page. |
| `form-lab.html` | Internal reference — four luxury treatments of the qualifier form. **F1 · Ink Atelier is the one shipped in `index.html`.** F2 · Gilded Hairline is the natural control to A/B test it against. |

Open any of them in a browser or drop them on any static host.

---

## ⚠ This page is not launch-ready

`<meta name="robots" content="noindex, nofollow">` is set in `index.html` on
purpose. **Remove it only after every blocking item below is signed off.**

Anything still awaiting client confirmation is rendered as a highlighted
`[bracketed placeholder]` so it is impossible to miss on the page itself.

---

## 1 · Blocking — cannot launch without these

| # | Item | Why it blocks | Where |
|---|------|---------------|-------|
| 1 | **Finance lender name + Cygnet House's FCA authorisation / credit-broker status + FRN** | Promoting 0% credit without naming the lender and your FCA status is an FCA/ASA breach. The visible placeholder was removed at client request; the requirement was not. | §11 finance block, footer disclosure. A build-note comment marks the spot in the source. |
| 2 | **Written patient consent on file for the three before/after cases** | GDC and ASA both require it. §6 states consent is held — that statement has to be true. | §6 |
| 3 | **Before/after captions** — say what was treated in each case | ASA requires before/afters to state the treatment shown. Proposed wording below. | §6 |
| 4 | **Final GDC/ASA copy review**, then delete the `noindex` meta tag | Last gate before the page is indexable. | `<head>` |

### Proposed §6 captions — confirm or correct

- **Case 1** — Implant bridge replacing missing upper front teeth
- **Case 3** — Implants restoring missing upper back teeth
- **Case 4** — Full upper arch restored on six implants

**Case 4 needs a decision.** Only two photos exist for it: the "before" is a
retracted intraoral view showing six exposed abutments, the "after" is a
natural smile. The framings don't match, and the before is clinically graphic
for a public page. Keep it, swap it for another case, or drop to two sliders —
your call.

---

## 2 · Client confirmations still outstanding (non-blocking)

- [ ] **Weekend opening hours** — currently `[Confirm — closed?]`. Affects the
      footer, the contact block and the `Dentist` JSON-LD.
- [ ] **CQC provider ID**
- [ ] **"Save up to £1,000"** — substantiate against a genuine prior price or
      it stays omitted. §5 carries a build note where it would go back in.
- [ ] **Four staff photo matches** — Samantha `y20`, Melissa `y23`, Ava `y28`,
      Hayley `y34`. Both doctors are confirmed by the embroidered scrubs.
- [ ] **Hosting destination** — subdomain, subfolder, or a landing-page
      platform. Changes nothing in the build, but the canonical URL and the
      GHL source tracking depend on it.

## 3 · Post-deploy checks

- [ ] **Submit one real test lead** and confirm the field mapping in GHL.
      Posted fields: `situation`, `timing`, `firstName`, `phone`, `email`,
      `pageUrl`, `treatment`, plus a `website` honeypot.
- [ ] **Filter the honeypot in GHL** — any lead with a non-empty `website`
      field is a bot. Add a workflow condition to bin them.
- [ ] Real-device testing and a screen-reader pass (neither has been done).

---

## 4 · Standing recommendation

> **Full-arch finance is the biggest open lever on this page.** 0% over 12
> months is a superb anchor for a single implant (£250/month) but forces
> £1,000 and £1,250 per month for All-on-4 and All-on-6 — figures that stop
> most people reading. Those two cards currently lead with the total instead,
> which is the best available framing, but a longer-term plan for full-arch
> would do more for conversion than any design change left in this build.

---

## Confirmed and in the build

- Legal entity **Cygnet House Dental Studio Ltd**, company number **05359263**
- Address **Cygnet House, Grace Swan Close, Hundleby, Spilsby, PE23 5LT**,
  live Google map embed + three "Get directions" links
- Phone **07450 302990** (wired through `SITE_CONFIG`)
- Opening hours Mon–Fri; website, Facebook and Instagram
- Implant treatment provider **Dr Dimitrios Sourtzis**, GDC 287145
- Six-person clinical team with official bios and GDC numbers, as a clickable
  roster over the team photo
- Pricing: single **£3,000–£3,500**, All-on-4 **from £12,000/arch**, All-on-6
  **from £15,000/arch**
- Finance: **0% over 12 months on every implant treatment**, in its own box in
  §11, with the representative example beside it
- **£50 consultation deposit** — covers the full assessment and scans
- 15 verbatim Google reviews in a three-column marquee (4.9 from 122)
- Three before/after comparison sliders (cases 1, 3, 4)
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

**Qualifier form (Ink Atelier):** 3 steps, hairline progress rail, per-step
validation, inline errors wired with `aria-invalid` / `aria-describedby`, back
navigation that preserves answers, honeypot, and a success state.

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
