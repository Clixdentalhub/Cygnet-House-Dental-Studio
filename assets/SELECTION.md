# Photo selection — implants landing page

Source: client Google Drive folder "Y#" shoot (fetched 2026-08-17 via the
Google Drive connector; direct Google network access is still blocked from this
environment). 98 of the ~120 originals were retrieved and reviewed. Raw files
were **not** committed — only the processed WebP outputs below.

## Mapping

| Slot | Source file | What the photo shows |
|------|-------------|----------------------|
| `hero.webp` | `Y#-105.jpg` | Post-treatment moment: patient in the chair flanked by Dr Dimitrios S. (surgical gown) and Dr Rose, all three smiling with thumbs up — warm, celebratory, sharp. |
| `is-missing-teeth.webp` | `Y#-44.jpg` | Patient in the green top laughing in the dental chair, clinician softly blurred in the foreground; a panoramic X-ray with missing teeth is visible on the monitor behind. |
| `is-loose-dentures.webp` | `Y#-76.jpg` | Dr Dimitrios in consultation with an older gentleman, holding a denture/arch model while explaining options. |
| `is-failing-teeth.webp` | `Y#-72.jpg` | Clinical examination in progress — masked clinician working under the operating light with a nurse assisting. |
| `is-full-mouth.webp` | `Y#-116.jpg` | Treatment-plan discussion: Dr Dimitrios standing at a large wall screen showing radiographs, talking a seated patient through the plan. |
| `clinician-sourtzis.webp` | `Y#-8.jpg` | Portrait of Dr Dimitrios S. — seated, warm open smile, black clinical scrubs with embroidered name, palm backdrop. |
| `practice.webp` | `Y#-41.jpg` | Outdoor team photo in golden light: six team members (both doctors centre, Dr Dimitrios holding the practice dog) along the fence; square crop keeps everyone in frame. |
| `section-trust.webp` | `Y#-51.jpg` | Calm wide operatory: patient reclined, clinician standing at the window, sky-panel ceiling — low detail, works under the dark scrim. |
| `section-nervous.webp` | `Y#-45.jpg` | Quiet reassurance scene: patient settled in the chair while Dr Rose points through her panoramic X-ray — calm and unhurried. |
| `section-contact.webp` | `Y#-61.jpg` | Reception: smiling receptionist at the front desk talking with a patient by the window. |

No photo is used in more than one slot.

## Dr Sourtzis identity note

The male implant dentist appears throughout the set in black scrubs embroidered
**"Dr Dimitrios S."**, which matches Dr Dimitrios Sourtzis. Identity could not
be verified beyond the embroidery, so please confirm. Alternate portraits of
the same clinician, if a different expression/pose is preferred:
`Y#-7.jpg` (relaxed, arm on chair), `Y#-9.jpg` / `Y#-10.jpg` (candid laugh),
and `Y#-73.jpg` / `Y#-74.jpg` (holding a denture model in front of an X-ray
screen — more clinical in tone).

## Notes from the review

- **Folder B ("Implants ") is empty** — it contains no files at all, so no
  patient case imagery was available (and none would have been used without
  consent paperwork anyway; per that policy the §6 before/after slots remain
  intentionally unfilled).
- **Files not fetched:** `Y#-5, 13, 24, 27, 29, 38, 46, 55, 58, 64, 65, 66,
  77, 81, 89, 96, 99, 101, 102, 107` are absent from the shared folder itself
  (the folder holds exactly 100 files, not 120). Same-named files exist in
  other Drive folders but appear to be different shoots, so they were not used.
  `Y#-39.jpg` and `Y#-42.jpg` are in the folder but could not be downloaded —
  the connector consistently timed out on these two (they are the set's largest
  files at ~6.5–6.8 MB); both are team photos, alternates to the chosen `Y#-41`.
- The set also includes implant-surgery sequences (Y#-85 – Y#-103, gowned team,
  microscope work) — usable later if a "day of surgery" section is added.
- `clinician-rose.webp` remains reserved per the ingest script (profile returns
  when GDC number arrives); good candidates for it exist in `Y#-15 – Y#-18`.

## People export

Individual portraits for the clickable team roster, keyed by Y-number:
`assets/people/y01–y04, y06–y12, y14–y23, y25, y26, y28, y30–y37.webp`
(32 files, 600×600 WebP q75, cover-cropped centred slightly high).
Unavailable Y numbers — no file in the shared folder: **5, 13, 24, 27, 29.**

`assets/team-wide.webp` (1600×760, q78) is from `Y#-40` — of the two team
frames on disk (Y#-40/Y#-41) it has all six faces most clearly turned to
camera. Y#-39/Y#-42 remain unfetchable (connector timeouts).

## Before/after cases

Sourced from the client's Drive case folders (filenames are UUIDs; images were
classified visually). All six ingested at 800×600 WebP q80, EXIF stripped.

### Case 1 (folder "Case 1")
- **case1-before.webp** ← `688f3b4e-aebf-497c-bf20-0cdb74349e00.JPG` — retracted
  frontal view: upper front teeth missing with healing gum ridge, remaining
  upper canines and lower teeth heavily stained/worn.
- **case1-after.webp** ← `4b7997d1-e872-4b2e-8c51-b61ac067d46a.JPG` — same
  retracted frontal view: upper front span restored with an implant-supported
  bridge, gap closed.
- No extras; the folder holds exactly these two photos, same angle/framing.

### Case 3 (folder "Case 3")
- **case3-before.webp** ← `542b0c12-c829-4514-be9b-99758baa06ff.JPG` — right
  lateral retracted view: upper back teeth missing behind the canine, decayed
  lower molar visible in the gap.
- **case3-after.webp** ← `b97f2c1a-7e06-4a29-b453-a5caaa17781b.JPG` — same
  lateral view: implant crowns restoring the upper posterior span, arch
  complete.
- No extras; two photos, matching angle/framing — reads cleanly in the slider.

### Case 4 (folder "Case 4")
- **case4-before.webp** ← `75d5e8e6-1d31-4f41-a777-ee7bea959aa9.JPG` — retracted
  open view: upper arch with no teeth, six implant abutments exposed in the
  gum (pre-restoration stage).
- **case4-after.webp** ← `555b8c57-6a4d-4717-8991-6b815fade8d6.JPG` — natural
  close-up smile: full upper and lower arches restored.
- No extras. Note: the pair's framing differs (retracted intraoral vs natural
  smile) — only two photos exist for this case, so the slider comparison is
  looser here than for Cases 1 and 3.

---

## Composite bonding campaign — `assets/bonding/`

Same April 2026 `Y#` shoot, fetched via the Google Drive connector (direct
Google network access stays blocked from this environment; the connector's
oversized result is written to disk, which is what makes the transfer
possible at all). These are the practice's own marketing photographs and are
already in use on the live implants funnel, so the consent basis is unchanged
— none of them is a clinical before/after.

| Slot | Source | What the photo shows |
|------|--------|----------------------|
| `bonding/why-natural.webp` | `Y#-68.jpg` | Two team members smiling beside a seated patient in a bright room — the most positive human frame left once the X-ray shots were out. |
| `bonding/why-minimal.webp` | `Y#-113.jpg` | Close-up: gloved hands holding a tooth shade guide and a fine instrument, "Dr Dimitrios S." scrubs. Reads as delicate, precise work. |
| `bonding/why-one-visit.webp` | `Y#-106.jpg` | A clinician treating a patient with an iTero 3D intraoral scan on the screen beside them. Checked at full resolution: a colour scan, not a radiograph. |
| `bonding/why-clinicians.webp` | `Y#-79.jpg` | The clinical team working together on a patient under the operating light. Skill in action. |

No frame is reused between the two campaigns.

**Why not `Y#-47` and `Y#-53`.** Both were used here first and both were
replaced: each has a panoramic X-ray on a screen behind the subject, and the
X-ray shows extensive tooth loss — `Y#-53`'s is sharp enough to read a largely
edentulous upper arch. That is an implant story on a composite bonding page.
`Y#-43`, `Y#-104` and `Y#-57` were rejected for the same reason, and `Y#-62`
because a private-fee list on the wall survives the crop and would sit on the
page contradicting the offer pricing. `Y#-64` (the branded reception desk) is
clean but unusable as a hero: the subjects sit far right with a blank wall
filling the left half, and cropping in to them loses the signage.

**Rule for any future swap on this page: check what is on the screens in the
background, not just the subject.** Every rejection above came from a monitor,
a lightbox or a wall, never from the person being photographed.

## Before / after cases — `assets/bonding/case-*`

Source: the client's **"B&As for composite bonding"** Drive folder, four case
subfolders, ten files, all 1620×1080. Ingested at 800×600 WebP q80, EXIF
stripped. Before/after order was determined visually — every file in a case
carries the same EXIF timestamp, so capture order gives nothing.

| Slot | Source | What it shows |
|------|--------|---------------|
| `case-chipped-before` | Case 1 · `e4d14983…` | Chipped, worn and heavily stained upper front teeth; broken, uneven edges. |
| `case-chipped-after`  | Case 1 · `9a688d45…` | The same view: edges rebuilt to an even line, uniform shade. |
| `case-gaps-before`    | Case 4 · `85f47814…` | Narrow upper lateral incisors leaving dark triangular gaps at the gum line. |
| `case-gaps-after`     | Case 4 · `1d2b8160…` | Gaps closed, edges levelled into a continuous smile line. |
| `case-staining-before` | Case 2 · `89b6d465…` | Lower front teeth with brown staining and notched, worn edges. |
| `case-staining-after`  | Case 2 · `9474db96…` | The same teeth rebuilt to an even edge, staining gone. |

**Case 1 also holds a retracted pair** (`fde71104…` before, `08e6b35d…` after)
of the same patient. The natural-smile pair was chosen instead — it is more
relatable and the two frames match each other more closely.

**Case 3 is unused, and that was a judgement call.** Its after is the single
most striking frame in the set — a bright, even smile — and it was in the build
first. But its before is a retracted view with the lips held back and its after
is a relaxed smile, so at the wipe the slider jumps from gum-and-retractor to
lip-and-beard. Two matched-scale re-crops were tried and neither fixed it: the
mismatch is retracted-versus-relaxed, which no crop reaches. A comparison
slider whose halves are visibly different photographs undermines the very thing
it exists to show, so Case 2 took the slot — the two frames line up almost
exactly, and the change reads right at the seam.

The cost is that the brief's third concern, tooth discolouration, is now
covered by staining on lower teeth rather than a whole-smile shade change. If a
whitening case is ever shot with matched framing, it belongs in this slot and
Case 3 can come back as a still elsewhere.

**Two things to confirm before launch.** Signed patient consent for all three
cases, and that composite bonding is genuinely what was carried out in each —
the captions name the treatment, and the folder name is the only evidence for
that so far. Case 1's before is broken down far enough that crowns would be a
reasonable reading, so it is worth Dr Rose confirming.
