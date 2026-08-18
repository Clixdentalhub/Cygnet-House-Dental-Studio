# Image assets

Drop files here using **exactly these names** and the page picks them up with no
code changes. Until a file exists, its slot renders as a labelled striped block
showing the filename it wants — never a broken-image icon.

| Filename | Used in | Suggested size | Crop |
|----------|---------|----------------|------|
| `hero.webp` | Hero, beside the qualifier form | 1600 × 900 | 16:9 |
| `is-missing-teeth.webp` | §4 card 1 — "Missing one or more teeth" | 800 × 500 | 16:10 |
| `is-loose-dentures.webp` | §4 card 2 — "Struggling with loose dentures" | 800 × 500 | 16:10 |
| `is-failing-teeth.webp` | §4 card 3 — "Living with failing teeth" | 800 × 500 | 16:10 |
| `is-full-mouth.webp` | §4 card 4 — "Ready for a full-mouth solution" | 800 × 500 | 16:10 |
| `clinician-sourtzis.webp` | §10 — Dr Sourtzis | 600 × 600 | square |
| `practice.webp` | §10 — the practice | 600 × 600 | square |
| `section-trust.webp` | §3 trust strip background | 1920 × 600 | wide, low detail |
| `section-nervous.webp` | §8 "Feeling nervous?" background | 1920 × 1000 | wide |
| `section-contact.webp` | §13 final CTA background | 1920 × 1000 | wide |

## Composite bonding campaign — `assets/bonding/`

Used by `composite-bonding.html`. Same rules as above; they live in their own
folder so the two campaigns can never fight over a filename.

| Filename | Used in | Suggested size | Crop |
|----------|---------|----------------|------|
| `bonding/hero.webp` | Hero, beside the qualifier form | 1600 × 900 | 16:9 |
| `bonding/why-natural.webp` | §4 card 1 — "Natural-looking results" | 800 × 500 | 16:10 |
| `bonding/why-minimal.webp` | §4 card 2 — "Minimally invasive treatment" | 800 × 500 | 16:10 |
| `bonding/why-one-visit.webp` | §4 card 3 — "Often completed in one visit" | 800 × 500 | 16:10 |
| `bonding/why-clinicians.webp` | §4 card 4 — "Skilled cosmetic clinicians" | 800 × 500 | 16:10 |
| `bonding/case-chipped-before.webp` | §6 slider 1 | 800 × 600 | 4:3 |
| `bonding/case-chipped-after.webp` | §6 slider 1 | 800 × 600 | 4:3 |
| `bonding/case-gaps-before.webp` | §6 slider 2 | 800 × 600 | 4:3 |
| `bonding/case-gaps-after.webp` | §6 slider 2 | 800 × 600 | 4:3 |
| `bonding/case-staining-before.webp` | §6 slider 3 | 800 × 600 | 4:3 |
| `bonding/case-staining-after.webp` | §6 slider 3 | 800 × 600 | 4:3 |

All eleven are now supplied — see `SELECTION.md` for what each one is and
where it came from. **The before/after pairs still need signed patient consent
on file before the page goes live.** If any is ever reshot: match angle,
distance and lighting across the pair. The comparison slider is unforgiving,
and a pair whose framing drifts reads as two unrelated photographs rather than
one result.

The bonding funnel reuses `logo.webp`, `team-wide.webp`, the `people/`
portraits and the two section backgrounds (`section-nervous.webp`,
`section-contact.webp`) from the implants shoot. Only the eleven files above
are new.

## Notes

**Section backgrounds** sit under a dark scrim (~85% opacity) so white text keeps
its contrast whatever the photo does. Pick calm, low-detail frames — a busy
photo still reads as noise through a scrim. Faces near the centre will be
covered by copy, so favour wider room shots for these three.

**Card images** are flush to the card edge with no gutter, cropped to fill. Keep
the subject centred; the crop takes the middle.

**WebP** at quality ~80 is the target. JPEG works too — change the extension in
`index.html` if you use one. Keep each file under ~250 KB; the section
backgrounds are the ones most likely to bloat.

**Consent:** the §6 before/after slots are deliberately *not* listed here. Those
need genuine, consented patient images with signed forms on file, and they are
the single most scrutinised asset on a dental page. They stay blocked until that
paperwork exists.

## How to deliver the files

The Google Drive folders cannot be fetched from this environment (its network
policy blocks every Google host), so the files need to arrive one of two ways:

1. **Attach them in the Claude chat** — attachments land on disk here, then
   `tools/ingest-images.py` resizes, strips EXIF, converts to WebP and drops
   them into this folder under the right names in one command.
2. **Upload via GitHub's web UI** to the `claude/new-session-lx19ci` branch
   (drag-and-drop into `assets/` works) — github.com is reachable from here,
   so they can be pulled and processed the same way.

There is no need to pre-resize or rename anything — send the raw `Y#-…` files
and say which goes where.
