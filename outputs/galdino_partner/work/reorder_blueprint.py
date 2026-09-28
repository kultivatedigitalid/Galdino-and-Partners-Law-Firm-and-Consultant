"""Reorder numbered blueprint sections without changing their contents."""

from __future__ import annotations

import re
import sys
from pathlib import Path


def main() -> None:
    if len(sys.argv) != 2:
        raise SystemExit("Usage: reorder_blueprint.py <blueprint.md>")

    path = Path(sys.argv[1]).resolve()
    text = path.read_text(encoding="utf-8")
    matches = list(re.finditer(r"(?m)^## (\d+)\.", text))
    if not matches:
        raise SystemExit("No numbered H2 sections found")

    preamble = text[: matches[0].start()].rstrip()
    sections: dict[int, str] = {}
    for index, match in enumerate(matches):
        start = match.start()
        end = matches[index + 1].start() if index + 1 < len(matches) else len(text)
        number = int(match.group(1))
        if number in sections:
            raise SystemExit(f"Duplicate section {number}")
        sections[number] = text[start:end].strip()

    expected = list(range(13))
    missing = [number for number in expected if number not in sections]
    extras = sorted(set(sections) - set(expected))
    if missing or extras:
        raise SystemExit(f"Unexpected section set; missing={missing}, extras={extras}")

    reordered = preamble + "\n\n" + "\n\n".join(sections[number] for number in expected) + "\n"
    path.write_text(reordered, encoding="utf-8")


if __name__ == "__main__":
    main()
