from __future__ import annotations

import hashlib
import json
from collections import Counter
from pathlib import Path

from PIL import Image


def sha256(path: Path) -> str:
    digest = hashlib.sha256()
    digest.update(path.read_bytes())
    return digest.hexdigest()


def inspect(path: Path) -> dict:
    with Image.open(path) as image:
        rgba = image.convert("RGBA")
        alpha = rgba.getchannel("A")
        alpha_values = Counter(alpha.getdata())
        visible = Counter((r, g, b) for r, g, b, a in rgba.getdata() if a > 127)
        return {
            "name": path.name,
            "sha256": sha256(path),
            "format": image.format,
            "mode": image.mode,
            "size": list(image.size),
            "alpha_bbox": list(alpha.getbbox() or (0, 0, 0, 0)),
            "alpha_min": min(alpha_values),
            "alpha_max": max(alpha_values),
            "transparent_pixels": sum(count for value, count in alpha_values.items() if value == 0),
            "partial_alpha_pixels": sum(count for value, count in alpha_values.items() if 0 < value < 255),
            "opaque_pixels": sum(count for value, count in alpha_values.items() if value == 255),
            "top_visible_rgb": [{"rgb": list(rgb), "count": count} for rgb, count in visible.most_common(12)],
        }


def main():
    folder = Path(__file__).resolve().parents[2] / "outputs" / "galdino_partner" / "website" / "public" / "assets"
    result = [inspect(path) for path in sorted(folder.glob("gp-logo*.png"))]
    print(json.dumps(result, indent=2))


if __name__ == "__main__":
    main()
