# Prompt — bring the dental implants funnel up to the bonding build's standard

Paste this whole file as the first message of a fresh Claude Code task on the
`Clixdentalhub/Cygnet-House-Dental-Studio` repo.

**Source of truth:** branch `claude/cygnet-house-composite-bonding-bd05jr`.
Clone it and work from it. `composite-bonding.html` is the reference; do not
rebuild anything from memory or from `NEW-CAMPAIGN-BRIEF.md` alone, which
predates the work below.

---

## The instruction

> `index.html` is the **live dental implants funnel** and the original source of
> this design system. `composite-bonding.html` was built from it, and in the
> course of that build a set of fixes and improvements were made that were never
> carried back. Carry them back.
>
> This is a refresh, not a rebuild. **Do not restructure the page, do not
> rewrite the copy, and do not touch anything implants-specific.** Everything
> in "Leave alone" below stays exactly as it is.
>
> Work through "Fix first" before "Carry across" — the first list contains a
> live compliance exposure and two real defects; the second is polish.

---

## Fix first — real problems on the live page

### 1. The 0% finance copy is an unlawful financial promotion, and this page is live

`index.html` promotes 0% credit **eleven times** and carries **no `noindex`**.
Under FCA rules a financial promotion may not run without the **lender named**
and the practice's **FCA authorisation / credit-broker status and FRN** stated
on the page. The footer carries the broker sentence — "acts as a credit broker,
not a lender" — but the lender's name and the FRN appear **only inside HTML
comments**, which is to say nowhere.

The practice was asked during the bonding build and said it does not hold these
details. That does not make the promotion compliant; it makes it unresolved.

Do not quietly ship around this. Do one of:

1. **Get the two details onto the page.** The FRN is public — it is on the FCA
   Financial Services Register, searchable by practice name.
2. **Strip the specific credit terms.** Remove 0%, "12 months", the monthly
   figures (`£250/month`, `12 × £1,000`, `12 × £1,250`) and the representative
   example, leaving "payment options available — ask at your consultation",
   which is not a financial promotion. This costs a genuine conversion lever on
   a page whose whole pricing structure leans on monthly figures, so it is the
   second option, not the first.

Whichever route, **raise it with the user before changing pricing copy** — the
monthly framing is load-bearing on all three price cards.

### 2. `SITE_CONFIG.thankYouUrl` is a preview URL with tracking switched off

```
https://sites.leadconnectorhq.com/preview/d7eCNYHJ8bPcsjqpLcyP?notrack=true
```

`/preview/` is not the published address, and `notrack=true` **disables GHL's
own tracking**. Traffic pointed at this records nothing. Ask the user for the
published URL; do not guess one.

The `?`/`&` separator logic already handles the existing query string
correctly — `tools/verify.mjs` asserts exactly this — so only the URL changes.

### 3. Three footer policy links are 404s

`/privacy-policy/`, `/complaints/` and `/terms/` on
`cygnethousedentalstudio.co.uk` **do not exist** — the practice confirmed this
during the bonding build. A dead privacy link on a page collecting a name, a
phone number and an email is worse than no link.

Do what `composite-bonding.html` does: remove the three links and replace them
with the plain statement of what is true today — what the details are used for,
that they are not shared, and how to ask what is held or raise a concern. Copy
that block across verbatim; it was written to be reusable.

### 4. `.ba__layer` is missing from the broken-image cleanup

Latent rather than visible, because all six of this page's case images exist. If
one is ever removed the slider paints two broken-image glyphs and runs its
divider through the striped slot's own filename. Carry the `.ba--empty` fix
across anyway — it costs nothing and removes the trap.

---

## Carry across — the six deltas

Verified differences between the two files as they stand today:

| # | Change | Now on implants | Why |
|---|---|---|---|
| 1 | `--color-secondary` / `--color-accent` `#6A2383` → `#6823A3` | 3 occurrences of the old value | `#6823A3` is the hex the practice actually states. 8.9:1 on white, visually identical, but it is theirs. |
| 2 | `.section-head p{max-width:62ch}` → `78ch` | 62ch | At 62ch every section intro sat at **67% of its heading's width** — measured 671px against 1000px at every viewport from 1024px up, so a long paragraph stacked into six short lines and read as a block rather than a lead-in. 78ch takes the ratio to 0.84. Below ~1000px the container already capped it, so nothing changes on phone or tablet. |
| 3 | `.ba--empty` state | absent | An unfilled before/after slot paints its divider, knob and Before/After badges over the striped block, cutting the filename label in half. |
| 4 | `.ba__layer` in the image-error cleanup | absent | See "Fix first" 4. |
| 5 | Price-card glyphs | 4 occurrences | **This one needs judgement — do not carry it blindly.** They were removed from the bonding page because bonding vs whitening has no quantitative difference for a glyph to encode, so two of three read as the same cluster of marks. On implants the arch with **1 / 4 / 6 posts** encodes a real difference the heading does not state, which is precisely what earns it the space. **Keep the implants glyphs.** Listed here so nobody "aligns" the two pages by deleting them. |
| 6 | Video band | absent | Only if the practice supplies an implants video. Pattern below. |

---

## The video band, if a clip is supplied

`composite-bonding.html` §10a is the reference. Ask which section it belongs
above and what is in the clip before building — both change the markup.

- **Speech → click to play, never autoplay**, and it needs a
  `<track kind="captions">`. Dialogue without captions fails WCAG 1.2.2.
- **Silent b-roll → `autoplay muted loop`** plus a `prefers-reduced-motion`
  guard that drops the autoplay.
- **The whole poster is the button.** Make only the disc clickable and half the
  taps land on the poster and do nothing, which reads as broken. Use a real
  `<button>` so it is in the tab order and takes Enter and Space for free.
- **The poster is its own `<img>`, not the `poster` attribute.** The still and
  the film want opposite fits — the poster should fill, the video must never be
  cropped — and the attribute shares `object-fit` with the video element, so it
  cannot do both.
- **Crop the poster with the overlay drawn on it.** The disc sits dead centre;
  a centred crop puts it on the subject's face. Mock the scrim, disc and label
  over each candidate crop and choose from that, not from the bare photograph.
- Keep the clip a **remote URL**. `tools/build-ghl.mjs` inlines `assets/*.webp`
  and friends; a video has no business inside a data URI.

---

## Leave alone — implants-specific, not style

Nothing here is a candidate for "consistency".

- **Dr Dimitrios Sourtzis, GDC 287145** is the implant treatment provider and
  the default roster profile. Dr Rose leads the bonding page; she does not lead
  this one.
- **Pricing:** single implant £3,000–£3,500, All-on-4 from £12,000/arch,
  All-on-6 from £15,000/arch. The £50 deposit here is described differently from
  the bonding page's — check with the user before aligning the wording, because
  the bonding one was confirmed as deducted from treatment and this one was not.
- **Its own webhook**, `…/webhook-trigger/8de02f9e-13c5-49a1-b1f4-7f2f991e867d`,
  and `treatment=Dental Implants`. The two campaigns are deliberately separate.
- **`situation` values** — *Missing 1 tooth · Missing several teeth · Loose or
  uncomfortable dentures · Failing teeth / considering full-mouth*. These are
  mapped in a live GHL workflow. Renaming a **field** breaks a mapping silently;
  the values are safer but still land in the contact record.
- **The compliance decisions already baked into this page:** no absolute success
  rate, no savings claims without a substantiated prior price, softened
  suitability language, no manufactured urgency, no `aggregateRating`,
  post-ownership reviews only. All documented in `README.md`. Reversing any of
  them needs a sign-off, not a copy edit.
- Its 15 reviews, its three before/after cases, its CBCT and full-arch copy.

---

## Verification bar

```bash
node tools/verify.mjs index.html --shots
node tools/build-ghl.mjs
```

`verify.mjs` was written during the bonding build and already runs clean on
both pages. **It must still report 0 failures when you are done.** It checks
seven widths for horizontal overflow, `--header-h` against the real header,
every nav anchor clearing the header, script errors, JSON-LD, one `<h1>`, alt
text, dead hrefs, one motion pattern per section, seventeen measured contrast
pairs, and the whole form journey — validation, pointer auto-advance, arrow keys
*not* advancing, the nine posted fields, and the redirect.

Note it aborts off-site requests on purpose. A hanging Google Fonts stylesheet
is not neutral: a render-blocking `<link>` defers every inline `<script>` after
it, so the page sits in `readyState: "loading"` and looks broken when it is not.

---

## How to work, based on what actually went wrong last time

- **Screenshot as well as measure.** The worst bug on the implants build — words
  rendering out of order in a price card — passed every measurement and was
  visible only in a picture. Two bugs in the bonding build were the same story.
- **Check what is on the screens in background photographs, not just the
  subject.** Five candidate photos were rejected for having a panoramic X-ray on
  a monitor behind someone, and one for a private-fee list on a wall that
  survived the crop and would have contradicted the page's own pricing. Every
  rejection came from the background.
- **Alt text describes the photograph that is there**, not the treatment you
  wish it showed. Alt text asserting a result the picture does not show is both
  an accessibility fault and, on a dental page, a claim.
- **A comparison slider whose halves are visibly different photographs
  undermines the thing it exists to show.** One bonding case had the most
  striking after-frame in the set and was still dropped, because its before was
  retracted and its after relaxed, so the wipe jumped. Matched framing beats a
  better photograph.
- **When a value is unknown, render it as a highlighted `[placeholder]` and keep
  `noindex` on.** Never invent, never silently omit.
- **When the answer to "what should this be?" changes the work materially, ask.**
  The video was built into the hero first and had to be moved, because placement
  was guessed rather than asked.

---

## Traps already solved — do not re-derive

`NEW-CAMPAIGN-BRIEF.md` §7 carries the full list. The ones added during the
bonding build:

- **`.ba__layer` is missing from the broken-image cleanup selector**, so empty
  sliders paint glyphs and a divider over their own label.
- **A gradient ground has no `backgroundColor`.** Any contrast check that walks
  up looking for one climbs straight past an ink card built from a gradient and
  reports white text on the light section behind it — 1.06:1 for something that
  actually measures 15.9:1. Read the gradient's stops and take the worst.
- **A render-blocking off-site stylesheet defers every inline script after it.**
  Verification must abort off-site requests or it measures the network.
- **Gold is not a light-ground colour.** `#D4AF37` is 2.1:1 on white and 8.2:1
  on the ink band. Give it one job on ink and a darker twin for the same job on
  light.
- **The `poster` attribute shares `object-fit` with its video element**, so a
  poster that should fill and a video that must not be cropped cannot both be
  satisfied by it.

---

## Deliverable

Work on a new branch, commit with real reasoning in the messages, push, and open
a **draft** PR. Report what you changed, what you deliberately did not, and
anything you found that the user has to decide.
