from pathlib import Path


source = Path(__file__).with_name("build_brand_guideline.py")
code = source.read_text(encoding="utf-8")
replacements = [
    (
        'self.title("Regulatory clarity for business action.", width=480)',
        'self.title("Regulatory complexity into ordered, decision-ready steps.", width=650)',
    ),
    (
        'Galdino & Partner is positioned as a business licensing consultant, law firm, and legal-regulatory partner in Indonesia. The firm translates regulatory complexity into ordered, decision-ready steps.',
        'Use the display name Galdino & Partner. G&P is the project short name; the legal company name remains unverified. The brand is positioned as a business licensing consultant, law firm, and legal-regulatory partner in Indonesia. The firm translates regulatory complexity into ordered, decision-ready steps.',
    ),
    (
        '("ARROWS", "Movement is capped at 3 px and communicates direction."),',
        '("ARROWS & ICONS", "Use the existing ArrowIcon.astro for directional controls. Movement is capped at 3 px; avoid text-glyph arrows and generic icon grids."),',
    ),
    (
        '("HERO", 35, "Licensing clarity for business."),',
        '("HERO", 27, "Licensing clarity for business."),',
    ),
    (
        '("SECTION", 25, "Ordered, decision-ready steps."),',
        '("SECTION", 21, "Ordered, decision-ready steps."),',
    ),
]
for old, new in replacements:
    if old not in code:
        raise RuntimeError(f"Expected builder fragment not found: {old}")
    code = code.replace(old, new)

exec(compile(code, str(source), "exec"), {"__name__": "__main__", "__file__": str(source)})
