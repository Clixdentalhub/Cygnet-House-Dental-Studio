# Cygnet House Dental Studio — lead-generation funnels

Two campaigns for the same practice, sharing one design system, one asset
folder and one set of build tools.

| Campaign | Funnel | Thank-you | Status |
|---|---|---|---|
| **Dental implants** (Single / All-on-4 / All-on-6) | `index.html` | `thank-you.html` | Live — no blocking items |
| **Composite bonding + teeth whitening** | `composite-bonding.html` | `composite-bonding-thank-you.html` | **`noindex` — placeholders open**, see below |

Everything below the "Composite bonding campaign" heading covers the second
one. Everything above it is the implants build and is unchanged.

**Deliverables**

| File | What it is |
|------|------------|
| `index.html` | The live implants funnel. One self-contained file (HTML + CSS + vanilla JS). No frameworks, no build step, no external JS. |
| `composite-bonding.html` | The composite bonding + teeth whitening funnel. Same design system, new content, new offer. Carries `noindex` until its placeholders are resolved. |
| `composite-bonding-thank-you.html` | Its confirmation page. `noindex` on purpose. |
| `tools/verify.mjs` | The verification pass — 7 widths, overflow, header offsets, contrast measured, and the full form journey end to end. `node tools/verify.mjs <page> [--shots]`. |
| `thank-you.html` | The post-submission confirmation page. Same tokens, same header and footer, self-contained in the same way. `noindex` on purpose. |
| `design-lab.html` | Internal design reference — background motion options, section cuts and reusable funnel blocks, with copy-paste code. Not a public page. |
| `motion-lab.html` | Internal reference — 27 motion patterns for sections, cards, headlines, media, hover and micro-interactions. Every case is live and replayable, with a reduced-motion toggle that shows exactly what a visitor with that preference gets. Ends with the shortlist I would actually apply. |
| `NEW-CAMPAIGN-BRIEF.md` | Handover brief for reusing this design system on another campaign. Paste it as the first message of a fresh Claude Code task. Carries the tokens, the motion map, the GHL field contract, the compliance rules and every trap already solved here. |
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
- [ ] **Set `SITE_CONFIG.funnelUrl`** in `thank-you.html` to the funnel's GHL
      URL. It is `null` today, which leaves the footer logo as a plain image
      rather than a link that 404s.
- [ ] **Swap `SITE_CONFIG.thankYouUrl`** off the preview URL. It points at
      `…/preview/d7eCNYHJ8bPcsjqpLcyP?notrack=true`; `notrack=true` disables
      GHL's own tracking, so the published address is what should go live.
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

---

# Composite bonding campaign

Second funnel, same practice: **composite bonding + professional teeth
whitening**, sold as one smile makeover package. Built from the Smile Makeover
brief, which is itself a rebuild of the old GoHighLevel funnel *"Transform Your
Smile With Composite Bonding & Teeth Whitening"*.

**It is not cleared to launch.** `<meta name="robots" content="noindex,
nofollow">` is in the `<head>` and every unconfirmed value renders as a
highlighted `[bracketed placeholder]` on the page. The list is below.

## What carried over, and what did not

The design system carried over **in full** — tokens, components, section
patterns, the ten motion patterns, the Ink Atelier qualifier form, the
thank-you page and the build tooling. Content, copy, pricing, imagery and the
offer are new.

Three deliberate departures from the incoming brief, each reversible:

| The brief asked for | What shipped | Why |
|---|---|---|
| **Poppins** as the typeface | Lexend + Source Sans 3, as the implants build uses | The heading face is what every measured line-break decision on this page was made against. Poppins is wider at the same size and re-breaks headlines everywhere, so swapping it is a re-verification pass, not a token edit. If you want it, change `--font-heading` / `--font-body` and the Google Fonts `<link>` — two lines — then re-run `tools/verify.mjs`. |
| **Gold + champagne as brand colours** on a cream ground | Gold used, but only as a *saving marker* | `#D4AF37` measures **2.1:1 on white** — unusable as text on any light ground — and **8.2:1 on the ink band**, where it is excellent. So gold appears on ink only, and always means "this is the saving". On the white price cards the same job is done by `--color-gold-ink` (`#7A5B12`, 11.4:1 in its pill). One meaning, two grounds, nothing decorative. |
| **Applying the `ui-ux-pro-max` design system** | The Cygnet design system | The two instructions conflict, and the Cygnet system is the one already measured for contrast, verified at seven widths and shipped. Re-deriving layout and type from a generic system would undo that. |

The brand purple **did** move: `#6A2383` → `#6823A3`, the value the brief
states. It is 8.9:1 on white and the change is imperceptible, but it is now
the client's stated hex rather than a near neighbour.

## Section map

| § | Section | Brief |
|---|---------|-------|
| 1 | Sticky header — logo, six section links, click-to-call, **Book Now**, scroll progress | §3.2 |
| 2 | Hero — H1, subhead, four offer ticks, deposit + finance line, trust chips, the qualifier form | §3.3 |
| 3 | Trust strip | — |
| 4 | Why patients choose Cygnet House — four value cards | §3.5 + the §3.4 intro |
| 5 | The offer — bonding · **package** · whitening, then the £245+ total | §3.8 |
| 6 | Before & after — chipped teeth · gaps · discolouration | §3.6 |
| 7 | Reviews — 4.9 from 122, ten genuine Google reviews | §3.10 |
| 8 | Reassurance band | §3.4 |
| 9 | Your new smile in 3 steps | §3.7 |
| 10 | Meet Dr Rose + the full team roster | §3.9 |
| 11 | What your consultation includes, deposit, finance | — |
| 12 | FAQ — five bonding/whitening questions | — |
| 13 | Final CTA + address + live map | §3.11 |

The brief's **top bar** (§3.1, practice name + address in a slim purple band)
is not built. It would add a third row to a header that already resolves its
anchor offsets from `--header-h`, and the address is already in §13 and the
footer. Say the word and it goes in, but `--header-h` and every anchor offset
move with it.

The package card sits **in the middle** of the three, not last, because the
C2 Centre Out motion lands the middle card first — so the thing the offer is
actually about is the thing that arrives first.

## The offer, as built

| Item | Price | Was | Saving |
|---|---|---|---|
| Composite bonding | £220 per tooth | £280 per tooth | £80 per tooth |
| Professional teeth whitening | £300 | £450 | £150 |
| Oral examination + X-rays | included | £15 | £15 |
| **Total potential saving** | | | **£245+** |

Plus 0% interest-free finance over 12 months, and a **£50 non-refundable
consultation deposit** — worded identically in the hero, §5, §11, the footer
and the thank-you page, per the brief's fix list.

## Compliance decisions baked into the copy

Same standard as the implants build. Reversing any of these needs a sign-off,
not a copy edit.

- **"Today" is dropped from the headline.** The brief's H1 ends *"— Save Over
  £245 Today"*. "Today" asserts a deadline, and no offer end date was
  supplied. The figure is untouched; the word is out until there is a date to
  justify it, and `[offer end date]` is a placeholder in three places ready to
  take one.
- **The savings claim needs substantiation.** "Normally £280" and "normally
  £450" have to be prices the practice genuinely charged, for a meaningful
  period, immediately before this offer — that is what the ASA looks for.
  §5 carries a visible note saying so and the footer has the substantiation
  sentence written, waiting on `[dates the previous prices applied]`.
- **No shade-count promise on whitening.** The brief suggested "brightens your
  smile by several shades". That is an outcome claim; it reads *"How much
  lighter your teeth go varies from person to person, and whitening is not
  permanent"* instead. The legal line that whitening may only be carried out
  by a registered dental professional is in §5 and the footer.
- **Suitability is qualified throughout** — "for suitable patients", "many
  cases", "usually needs little to no removal". No absolutes.
- **Bonding's downside is stated**, in the FAQ: it can chip or stain and may
  need repair or replacement.
- **No `aggregateRating` in the JSON-LD.**
- **The rating is 4.9 from 122, not 5/5.** The brief allowed the 5/5 framing
  only if accurate for Cygnet. It is not; 4.9/122 is, and it is verifiable.
- **The source funnel's reviews are gone.** The "Gedling Dental" / "Dr
  Sandeep" testimonials belonged to a different practice and are not carried
  over in any form.
- **Finance still needs the lender named and the FRN stated** before the 0%
  copy can go live. The broker-status sentence is in the footer; the two
  missing details are marked in §11.
- **Every clinician named carries their GDC number**, Dr Rose (290358) at the
  top of §10 and in the footer.

## Reviews

The ten reviews in the marquee are the practice's **own genuine Google
reviews**, carried over from the implants build. Every one of them is about
the team, the care, or a nervous patient being looked after — none is tagged
as a bonding or whitening result, because none of them describes one. That is
deliberate: a real review with an honest label beats a fabricated one with a
flattering label, and beats an empty section.

A visible placeholder under the marquee says exactly that and asks for the new
smile-makeover testimonials. When they arrive they replace the placeholder;
whether they also replace the ten is the client's call.

## Images

**Where they have to come from.** Google hosts are blocked by this environment's
network policy — `drive.google.com` returns a 403 at the proxy — so images
cannot be pulled from Drive directly. The Drive *connector* can read them: it
returns each file as base64, and when that exceeds the tool-result limit the
harness writes it to disk instead of into the conversation — so the bytes can
be decoded straight to a file at no context cost. That is how the five frames
above arrived. It is one call per image, so it suits a handful rather than a
hundred. `github.com` and `raw.githubusercontent.com` are both
reachable. So the two working routes are:

1. **Attach the files in the Claude chat** — they land on disk here, then
   `tools/ingest-images.py` crops, strips EXIF and files them in one command.
2. **Drag them into `assets/bonding/` via GitHub's web UI** on this branch.

No pre-resizing or renaming needed — send the raw files and say which goes
where.

**What already exists and is in use:** the April 2026 Cygnet shoot
(`2026-04-22_CygnetHouse/pics` on Drive, ~100 frames) was ingested during the
implants build. The logo, the team photo, all six roster portraits and the two
section backgrounds come from it and render on this page today. Roughly 85 of
those frames are still unused and several would suit the hero and the four §4
cards — they just have to travel by one of the two routes above.

**No implant imagery on this page.** Two frames were pulled and then replaced
because each had a panoramic X-ray on a screen behind the subject showing
extensive tooth loss — an implant story on a composite bonding page. Three
more were rejected for the same reason, and one because a private-fee list on
the wall survived the crop. The rule for any future swap: check what is on the
screens in the background, not just the subject.

**Before/after cases** come from the client's "B&As for composite bonding"
folder — four cases, three used. Ordering was decided visually; the files in
each case share one EXIF timestamp, so capture order is no help.

Case 3 was dropped from the third slider despite having the most striking after
frame: its before is retracted and its after relaxed, so the wipe jumps between
two obviously different photographs. Case 2 replaced it because its two frames
line up almost exactly. Full reasoning in `assets/SELECTION.md`.

**All eleven files are in.** Five practice frames from the April shoot, and six before/after files from the client's "B&As for composite bonding" folder. Every one is mapped in `assets/SELECTION.md`. Until a
file exists its slot renders as a labelled striped block naming the file it
wants — never a broken-image icon.

| File | Where | Size | Status |
|---|---|---|---|
| `bonding/hero.webp` | Hero, beside the form | 1600 × 900 | ✅ `Y#-118` |
| `bonding/why-natural.webp` | §4 card 1 | 800 × 500 | ✅ `Y#-68` |
| `bonding/why-minimal.webp` | §4 card 2 | 800 × 500 | ✅ `Y#-113` |
| `bonding/why-one-visit.webp` | §4 card 3 | 800 × 500 | ✅ `Y#-106` |
| `bonding/why-clinicians.webp` | §4 card 4 | 800 × 500 | ✅ `Y#-79` |
| `bonding/case-chipped-{before,after}.webp` | §6 slider 1 | 800 × 600 | ✅ Case 1 |
| `bonding/case-gaps-{before,after}.webp` | §6 slider 2 | 800 × 600 | ✅ Case 4 |
| `bonding/case-staining-{before,after}.webp` | §6 slider 3 | 800 × 600 | ✅ Case 2 |

`python3 tools/ingest-images.py <folder> "RAW.jpg=bonding/hero, …"` crops,
strips EXIF and writes them at WebP q80.

One fix to the shared slider pattern came out of building this: an empty
before/after slot still painted its divider, knob and Before/After badges over
the striped block, and the line ran straight through the slot's own filename
label — plus Chromium left a broken-image glyph in each corner, because the
error-cleanup selector covered `.stack__media img` and `.card__media img` but
not `.ba__layer`. Both are fixed in `composite-bonding.html` (see `.ba--empty`).
`index.html` is untouched: all six of its case images exist, so the change
would be inert there, and it is live and verified. Worth backporting the next
time that file is opened.

**The six before/after files need signed patient consent on file before they
are published**, and each needs a caption naming the treatment — the captions
are already written. If a case does not exist for one of the three concerns,
that slider comes out rather than being filled with a stand-in.

Everything else is reused from the implants shoot: the logo, the team photo,
the roster portraits, and the two section backgrounds (§8, §13), all of which
are practice or team photography rather than treatment photography.

## GHL wiring

The form posts to **this campaign's own LeadConnector inbound webhook** — same
sub-account as the implants funnel, different trigger, so the two campaigns
land in separate workflows:

```
https://services.leadconnectorhq.com/hooks/mucgOLidUbBVBQ060OW7/webhook-trigger/xG6w8R0Itdi8jxe3jEIK
```

**All nine field names are identical to the implants funnel**, so anything
already mapped there maps the same way here:

| Field | What arrives in it |
|---|---|
| `situation` | *Chipped or worn front teeth · Gaps between my teeth · Uneven edges or minor misalignment · Discoloured or stained teeth · Several of these* |
| `timing` | *As soon as possible · In the next few months · Just researching for now* |
| `firstName` | validated, 2+ characters |
| `lastName` | validated, 2+ characters |
| `phone` | validated, 10–15 digits, punctuation preserved as typed |
| `email` | validated |
| `website` | **honeypot** — always empty from a human; non-empty means a bot |
| `pageUrl` | full page URL, useful for attribution |
| `treatment` | constant: `Composite Bonding & Teeth Whitening` |

`situation`'s *values* are new, but GHL maps on the key rather than the value,
so nothing breaks. Keep `treatment` even now that the campaign has a dedicated
webhook: it survives into the contact record and says which campaign a lead
came from without anyone having to infer it from which workflow fired.

**First workflow condition is the honeypot:** `website` `is not empty` → stop.
Everything downstream then only ever sees real people.

**Capturing the reference payload.** The Inbound Webhook trigger stores one
captured request as its reference, and every downstream action can only pick
from the keys in that stored sample — so make the capture submission complete.
Fill every field: a key missing from the sample cannot be picked afterwards.
All nine are transmitted on every send, including `website` with an empty
value, so one ordinary submission is enough. Submit from the published page
rather than a local copy, so `pageUrl` holds the real address.

## Before this can go live

All nine questions put to the practice have been answered, and every visible
`[placeholder]` is gone. **One blocker remains, and it is a real one.**

### Blocker — the finance copy is a financial promotion

Every mention of 0% credit on this page is a financial promotion under FCA
rules, and one may not run without the **lender named** and the practice's
**FCA authorisation / credit-broker status and FRN** stated on the page. The
footer already carries the broker sentence; the lender's name and the FRN are
missing, and the practice has said it does not hold them.

The copy has been left as written at the practice's instruction, and `noindex`
stays on until this closes. Two ways to close it:

1. **Supply the two details.** The FRN is public — it is on the FCA Financial
   Services Register, so this is findable rather than unknowable.
2. **Strip the specific credit terms.** Remove 0%, "12 months", the monthly
   figures and the representative example, and reduce it to "payment options
   available — ask at your consultation", which is not a financial promotion.
   This costs a genuine conversion lever, which is why it is the second option.

Do not simply publish as-is.

### Second item — the policy pages do not exist

The footer used to link to `/privacy-policy/`, `/complaints/` and `/terms/` on
the practice site. The practice has confirmed **none of those pages exists**, so
those links were 404s. A dead privacy link on a page collecting a name, a phone
number and an email is worse than no link, so they are gone, replaced by a
plain statement of what can be said truthfully today: what the details are used
for, that they are not shared, and how to ask what is held or raise a concern.

That is an interim. A hosted privacy policy and a complaints procedure still
have to exist — UK GDPR expects the first at the point of collection, and GDC
Standard 5.1 expects the second — and then link from the footer.

### Then

- [ ] **Remove `<meta name="robots" content="noindex, nofollow">`** — after the
      blocker above, not before.
- [ ] **Set `SITE_CONFIG.thankYouUrl`** in `composite-bonding.html` to the
      thank-you page's published GHL URL. It ships as a relative path.
- [ ] **Set `SITE_CONFIG.funnelUrl`** in `composite-bonding-thank-you.html` to
      the funnel's GHL URL. It is `null` today.
- [ ] **Add the conversion tag** to the thank-you page — the marked block at
      the bottom of its script. Fire it there **or** in the funnel's submit
      handler, never both.
- [ ] **Submit one real test lead** and confirm the mapping. Re-capture the
      webhook reference only if a field is *added* — nothing has been renamed.
- [ ] Real-device testing and a screen-reader pass. Neither has been done.

### Answered by the practice, and now reflected on the page

| | Answer | What changed |
|---|---|---|
| Offer end date | None — the offer is open-ended | Every "offer valid until…" clause removed. "Today" stays out of the headline permanently: with no end date it would be manufactured urgency. |
| Dates the £280 / £450 prices applied | No date range | Reframed. These are the practice's **standard fees**, not a former price, so no period applies. The footer now substantiates the saving as a promotional reduction from standard fees. The internal "before this goes live" note that was rendering to visitors is gone. |
| Is the £50 deposit deducted? | **Yes** | Now stated: it covers the examination, X-rays and assessment, comes straight off the treatment cost, and is non-refundable only if the patient does not proceed. A better offer than the page previously described. |
| Lender minimum credit amount | Not held; use what's there | The £300 / 12 × £25 representative example stands; the caveat sentence removed. |
| Lender name, FCA status, FRN | Not held | **The blocker above.** |
| Consent for all three before/afters | **Yes, all three** | The page's consent sentence is now true as written. |
| Composite bonding in all three cases? | **Yes** | The three captions are confirmed accurate. |
| Bonding / whitening testimonials | None available | The "not yet supplied" panel is gone. The ten genuine Google reviews stand on their own, none labelled as a bonding result. |
| Do the three policy pages exist? | **No** | The second item above. |

## Building and verifying

```bash
node tools/build-ghl.mjs                              # → dist/cygnet-bonding-*.html
node tools/verify.mjs composite-bonding.html --shots  # 7 widths + screenshots
```

`verify.mjs` checks horizontal overflow, `--header-h` against the real header
height, every nav anchor clearing the header, console errors, JSON-LD, one
`<h1>`, alt text, dead hrefs, one motion pattern per section, seventeen
measured contrast pairs, and the whole form journey — validation, pointer
auto-advance, arrow keys *not* advancing, the nine posted fields, and the
redirect landing on the thank-you page with the name in the query string.

**Screenshot as well as measure.** The worst bug on the implants build — words
rendering out of order in a price card — passed every measurement and was
visible only in a picture. `--shots` writes a full-page PNG per width to
`.verify/`.
