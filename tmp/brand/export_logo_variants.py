from __future__ import annotations

import hashlib
import json
import shutil
from pathlib import Path

from PIL import Image, ImageChops


WHITE = (255, 255, 255, 255)
BLACK = (11, 11, 12, 255)  # Project token --brand-black: #0b0b0c


def sha256(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as stream:
        for block in iter(lambda: stream.read(1024 * 1024), b""):
            digest.update(block)
    return digest.hexdigest()


def composite(master: Image.Image, background: tuple[int, int, int, int]) -> Image.Image:
    plate = Image.new("RGBA", master.size, background)
    return Image.alpha_composite(plate, master)


def save_png(image: Image.Image, path: Path) -> None:
    image.save(path, format="PNG", optimize=True)


def save_webp(image: Image.Image, path: Path) -> None:
    image.save(path, format="WEBP", lossless=True, method=6)


def save_jpg(image: Image.Image, path: Path) -> None:
    image.convert("RGB").save(path, format="JPEG", quality=100, subsampling=0, optimize=True)


def inspect(path: Path) -> dict:
    with Image.open(path) as image:
        bands = image.getbands()
        alpha_extrema = image.getchannel("A").getextrema() if "A" in bands else None
        return {
            "file": path.name,
            "format": image.format,
            "mode": image.mode,
            "size": list(image.size),
            "alpha_extrema": list(alpha_extrema) if alpha_extrema else None,
            "sha256": sha256(path),
            "bytes": path.stat().st_size,
        }


def main() -> None:
    workspace = Path(__file__).resolve().parents[2]
    source = workspace / "outputs" / "galdino_partner" / "website" / "public" / "assets" / "gp-logo-brand.png"
    output = workspace / "outputs" / "galdino_partner" / "brand" / "logos"
    output.mkdir(parents=True, exist_ok=True)

    with Image.open(source) as opened:
        master = opened.convert("RGBA")
    white = composite(master, WHITE)
    black = composite(master, BLACK)

    transparent_png = output / "galdino-partner-logo-transparent.png"
    shutil.copy2(source, transparent_png)
    save_png(white, output / "galdino-partner-logo-white-bg.png")
    save_png(black, output / "galdino-partner-logo-black-bg.png")

    save_webp(master, output / "galdino-partner-logo-transparent.webp")
    save_webp(white, output / "galdino-partner-logo-white-bg.webp")
    save_webp(black, output / "galdino-partner-logo-black-bg.webp")

    save_jpg(white, output / "galdino-partner-logo-white-bg.jpg")
    save_jpg(black, output / "galdino-partner-logo-black-bg.jpg")

    # Pixel-level validation: the transparent PNG must be an exact copy, and
    # all lossless variants must decode to the expected pixels.
    assert sha256(source) == sha256(transparent_png)
    with Image.open(transparent_png) as check:
        assert ImageChops.difference(master, check.convert("RGBA")).getbbox() is None
    for name, expected in (
        ("galdino-partner-logo-white-bg.png", white),
        ("galdino-partner-logo-black-bg.png", black),
        ("galdino-partner-logo-transparent.webp", master),
        ("galdino-partner-logo-white-bg.webp", white),
        ("galdino-partner-logo-black-bg.webp", black),
    ):
        with Image.open(output / name) as check:
            assert ImageChops.difference(expected, check.convert("RGBA")).getbbox() is None, name

    assets = [inspect(path) for path in sorted(output.iterdir()) if path.is_file()]
    manifest = {
        "brand": "Galdino & Partner",
        "master_source": "outputs/galdino_partner/website/public/assets/gp-logo-brand.png",
        "master_sha256": sha256(source),
        "master_dimensions": list(master.size),
        "logo_geometry": "Preserved exactly; no redesign or recolouring.",
        "backgrounds": {"white": "#ffffff", "black": "#0b0b0c", "transparent": "alpha"},
        "format_note": "JPEG does not support transparency, so only white and black background variants are supplied.",
        "assets": assets,
    }
    manifest_path = output.parent / "logo-manifest.json"
    manifest_path.write_text(json.dumps(manifest, ensure_ascii=False, indent=2), encoding="utf-8")
    print(json.dumps(manifest, ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main()
