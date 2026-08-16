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

## Why these aren't already here

The Google Drive folders shared for this build are blocked by this environment's
network policy (`drive.google.com`, `lh3.googleusercontent.com` and
`drive.usercontent.google.com` all refuse the connection), so the files could not
be fetched automatically. Committing them to this folder is the fastest route.
