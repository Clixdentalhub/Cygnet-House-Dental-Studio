#!/usr/bin/env python3
"""Ingest raw photos into the funnel's assets/ folder.

Usage:
    python3 tools/ingest-images.py <input-folder> [mapping]

Where [mapping] is an optional comma-separated list of  raw-name=slot  pairs,
e.g.  "Y#-51.jpg=hero, Y#-95.jpg=section-nervous, Y#-7.jpg=clinician-sourtzis"

With no mapping, the script just lists what it found and what slots are open.

For every mapped file it:
  - resizes to the slot's target box (cover-crop, centre)
  - strips EXIF (staff/patient photos should not ship GPS or device metadata)
  - saves as WebP q80 into assets/ under the slot's canonical filename
  - prints before/after sizes

Slots and target sizes mirror assets/README.md.
"""
import sys, io, pathlib
from PIL import Image, ImageOps

ROOT = pathlib.Path(__file__).resolve().parent.parent
ASSETS = ROOT / "assets"

# slot -> (width, height)  — crop is cover, centred
SLOTS = {
    "hero":                (1600, 900),
    "is-missing-teeth":    (800, 500),
    "is-loose-dentures":   (800, 500),
    "is-failing-teeth":    (800, 500),
    "is-full-mouth":       (800, 500),
    "clinician-sourtzis":  (600, 600),
    "clinician-rose":      (600, 600),   # reserved — profile returns when GDC no. arrives
    "practice":            (600, 600),
    "section-trust":       (1920, 600),
    "section-nervous":     (1920, 1000),
    "section-contact":     (1920, 1000),
    "case1-before":        (800, 600),
    "case1-after":         (800, 600),
    "case3-before":        (800, 600),
    "case3-after":         (800, 600),
    "case4-before":        (800, 600),
    "case4-after":         (800, 600),

    # --- Composite bonding / whitening campaign -------------------------
    # These land in assets/bonding/ rather than assets/, so the two funnels
    # never fight over a filename.
    "bonding/hero":                    (1600, 900),
    "bonding/why-natural":             (800, 500),
    "bonding/why-minimal":             (800, 500),
    "bonding/why-one-visit":           (800, 500),
    "bonding/why-clinicians":          (800, 500),
    "bonding/case-chipped-before":     (800, 600),
    "bonding/case-chipped-after":      (800, 600),
    "bonding/case-gaps-before":        (800, 600),
    "bonding/case-gaps-after":         (800, 600),
    "bonding/case-staining-before":  (800, 600),
    "bonding/case-staining-after":   (800, 600),
}

def ingest(src: pathlib.Path, slot: str) -> None:
    w, h = SLOTS[slot]
    im = Image.open(src)
    im = ImageOps.exif_transpose(im)          # honour rotation, then drop EXIF
    im = ImageOps.fit(im.convert("RGB"), (w, h), Image.LANCZOS, centering=(0.5, 0.5))
    out = ASSETS / f"{slot}.webp"
    out.parent.mkdir(parents=True, exist_ok=True)   # slots may be "bonding/hero"
    im.save(out, "WEBP", quality=80, method=6)
    print(f"  {src.name:32s} -> {slot+'.webp':34s} {w}x{h}  "
          f"{src.stat().st_size//1024:>5d}KB -> {out.stat().st_size//1024:>4d}KB")

def main() -> int:
    if len(sys.argv) < 2:
        print(__doc__); return 1
    folder = pathlib.Path(sys.argv[1])
    files = sorted(p for p in folder.iterdir()
                   if p.suffix.lower() in (".jpg", ".jpeg", ".png", ".webp", ".heic"))
    have = {str(p.relative_to(ASSETS).with_suffix("")) for p in ASSETS.rglob("*.webp")}
    print(f"found {len(files)} image(s) in {folder}")
    print("open slots:", ", ".join(s for s in SLOTS if s not in have) or "none")

    if len(sys.argv) > 2:
        ASSETS.mkdir(exist_ok=True)
        for pair in sys.argv[2].split(","):
            raw, _, slot = pair.strip().partition("=")
            slot = slot.strip()
            if slot not in SLOTS:
                print(f"  !! unknown slot '{slot}' — choices: {', '.join(SLOTS)}"); continue
            src = folder / raw.strip()
            if not src.exists():
                print(f"  !! not found: {src}"); continue
            ingest(src, slot)
    return 0

if __name__ == "__main__":
    sys.exit(main())
