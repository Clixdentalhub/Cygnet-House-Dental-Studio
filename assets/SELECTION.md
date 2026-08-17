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
