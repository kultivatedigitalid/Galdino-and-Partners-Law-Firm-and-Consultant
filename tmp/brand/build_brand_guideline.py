from __future__ import annotations

import hashlib
import html
import json
from pathlib import Path

from PIL import Image, ImageOps
from reportlab.lib import colors
from reportlab.lib.enums import TA_LEFT
from reportlab.lib.pagesizes import A4, landscape
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.utils import ImageReader
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfgen import canvas
from reportlab.platypus import Paragraph


PAGE_W, PAGE_H = landscape(A4)
M = 42

BLACK = colors.HexColor("#0b0b0c")
WHITE = colors.HexColor("#ffffff")
PAPER = colors.HexColor("#f4f3f1")
SOFT = colors.HexColor("#ecebea")
MUTED_SURFACE = colors.HexColor("#e4e2df")
RED = colors.HexColor("#c4142a")
RED_BRIGHT = colors.HexColor("#ed2942")
RED_DEEP = colors.HexColor("#710d1b")
GOLD = colors.HexColor("#b18a4b")
MUTED = colors.HexColor("#515156")
LINE = colors.HexColor("#deddda")
LINE_STRONG = colors.HexColor("#b9b8b5")
FOCUS_GOLD = colors.HexColor("#b77d35")
TEXT_GOLD = colors.HexColor("#755018")
GOLD_DARK_SURFACE = colors.HexColor("#d9b878")


def sha256(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as stream:
        for block in iter(lambda: stream.read(1024 * 1024), b""):
            digest.update(block)
    return digest.hexdigest()


def register_fonts() -> None:
    regular = Path(r"C:\Windows\Fonts\segoeui.ttf")
    bold = Path(r"C:\Windows\Fonts\segoeuib.ttf")
    italic = Path(r"C:\Windows\Fonts\segoeuii.ttf")
    light = Path(r"C:\Windows\Fonts\segoeuil.ttf")
    if all(path.exists() for path in (regular, bold, italic, light)):
        pdfmetrics.registerFont(TTFont("BrandSans", str(regular)))
        pdfmetrics.registerFont(TTFont("BrandSansBold", str(bold)))
        pdfmetrics.registerFont(TTFont("BrandSansItalic", str(italic)))
        pdfmetrics.registerFont(TTFont("BrandDisplay", str(light)))
    else:
        # The project font stack explicitly permits system sans fallbacks.
        pdfmetrics.registerFont(TTFont("BrandSans", str(regular)))
        pdfmetrics.registerFont(TTFont("BrandSansBold", str(bold)))
        pdfmetrics.registerFont(TTFont("BrandSansItalic", str(italic)))
        pdfmetrics.registerFont(TTFont("BrandDisplay", str(regular)))


def luminance(hex_value: str) -> float:
    rgb = [int(hex_value[index:index + 2], 16) / 255 for index in (1, 3, 5)]
    linear = [value / 12.92 if value <= 0.04045 else ((value + 0.055) / 1.055) ** 2.4 for value in rgb]
    return 0.2126 * linear[0] + 0.7152 * linear[1] + 0.0722 * linear[2]


def contrast(foreground: str, background: str) -> float:
    a, b = luminance(foreground), luminance(background)
    light, dark = max(a, b), min(a, b)
    return (light + 0.05) / (dark + 0.05)


def prepare_visuals(brand_dir: Path, master_logo: Path) -> dict[str, Path]:
    visuals = brand_dir / "visuals"
    editorial = visuals / "editorial-regulatory-system.png"
    stationery_base = visuals / "stationery-application-base.png"
    if not editorial.exists() or not stationery_base.exists():
        raise FileNotFoundError("Imagegen visual assets are missing")

    with Image.open(master_logo) as source:
        logo = source.convert("RGBA")

    with Image.open(editorial) as source:
        editorial_cover = ImageOps.fit(source.convert("RGB"), (1600, 1000), method=Image.Resampling.LANCZOS)
        editorial_cover.save(visuals / "editorial-regulatory-system-crop.jpg", quality=94, subsampling=0)

    with Image.open(stationery_base) as source:
        application = source.convert("RGBA")
    # Exact approved artwork, scaled proportionally but never redrawn or recoloured.
    placements = [
        (900, 118, 220),  # white letterhead
        (295, 150, 210),  # charcoal folder
        (875, 780, 150),  # red business card
    ]
    for x, y, width in placements:
        height = round(width * logo.height / logo.width)
        scaled = logo.resize((width, height), Image.Resampling.LANCZOS)
        application.alpha_composite(scaled, (x, y))
    application_path = visuals / "stationery-application.png"
    application.convert("RGB").save(application_path, quality=95, subsampling=0)

    return {
        "editorial": editorial,
        "editorial_crop": visuals / "editorial-regulatory-system-crop.jpg",
        "stationery": application_path,
    }


class BrandBook:
    def __init__(self, output: Path, assets: dict[str, Path], logo_dir: Path):
        self.output = output
        self.assets = assets
        self.logo_dir = logo_dir
        self.c = canvas.Canvas(str(output), pagesize=(PAGE_W, PAGE_H), pageCompression=1)
        self.c.setTitle("Galdino & Partner Brand Guidelines")
        self.c.setAuthor("Prepared from the Galdino & Partner website project")
        self.c.setSubject("English brand guidelines derived from project implementation and documentation")
        self.page = 0
        self.dark = False

        self.styles = {
            "body": ParagraphStyle("body", fontName="BrandSans", fontSize=10, leading=14, textColor=BLACK, alignment=TA_LEFT),
            "body_dark": ParagraphStyle("body_dark", fontName="BrandSans", fontSize=10, leading=14, textColor=WHITE, alignment=TA_LEFT),
            "small": ParagraphStyle("small", fontName="BrandSans", fontSize=8.2, leading=11.2, textColor=MUTED, alignment=TA_LEFT),
            "small_dark": ParagraphStyle("small_dark", fontName="BrandSans", fontSize=8.2, leading=11.2, textColor=colors.HexColor("#c9c9ca"), alignment=TA_LEFT),
            "card": ParagraphStyle("card", fontName="BrandSans", fontSize=9.2, leading=12.5, textColor=BLACK, alignment=TA_LEFT),
            "card_dark": ParagraphStyle("card_dark", fontName="BrandSans", fontSize=9.2, leading=12.5, textColor=WHITE, alignment=TA_LEFT),
        }

    def begin(self, dark: bool = False, background=None) -> None:
        self.page += 1
        self.dark = dark
        bg = background if background is not None else (BLACK if dark else PAPER)
        self.c.setFillColor(bg)
        self.c.rect(0, 0, PAGE_W, PAGE_H, stroke=0, fill=1)

    def end(self, source: str = "") -> None:
        ink = colors.HexColor("#bfc0c1") if self.dark else MUTED
        rule = colors.HexColor("#333335") if self.dark else LINE_STRONG
        self.c.setStrokeColor(rule)
        self.c.setLineWidth(0.5)
        self.c.line(M, 24, PAGE_W - M, 24)
        self.c.setFillColor(ink)
        self.c.setFont("BrandSans", 6.7)
        self.c.drawString(M, 11, f"GALDINO & PARTNER  /  BRAND GUIDELINES  /  2026")
        if source:
            text = source if len(source) <= 108 else source[:105] + "..."
            self.c.drawCentredString(PAGE_W / 2, 11, text)
        self.c.drawRightString(PAGE_W - M, 11, f"{self.page:02d}")
        self.c.showPage()

    def eyebrow(self, text: str, x=M, y=PAGE_H - 50, color=None) -> None:
        ink = color or (GOLD_DARK_SURFACE if self.dark else RED)
        self.c.setFillColor(ink)
        self.c.setFont("BrandSansBold", 7.4)
        self.c.drawString(x, y, text.upper())
        self.c.setStrokeColor(ink)
        self.c.setLineWidth(1)
        self.c.line(x, y - 7, x + 31, y - 7)

    def title(self, text: str, x=M, y=PAGE_H - 82, size=31, width=520, color=None) -> float:
        ink = color or (WHITE if self.dark else BLACK)
        style = ParagraphStyle("title", fontName="BrandDisplay", fontSize=size, leading=size * 0.98, textColor=ink, spaceAfter=0)
        p = Paragraph(html.escape(text), style)
        _, height = p.wrap(width, PAGE_H)
        p.drawOn(self.c, x, y - height)
        return y - height

    def subhead(self, text: str, x: float, y: float, width: float, size=15, color=None) -> float:
        ink = color or (WHITE if self.dark else BLACK)
        style = ParagraphStyle("subhead", fontName="BrandSansBold", fontSize=size, leading=size * 1.08, textColor=ink)
        p = Paragraph(html.escape(text), style)
        _, height = p.wrap(width, PAGE_H)
        p.drawOn(self.c, x, y - height)
        return y - height

    def paragraph(self, text: str, x: float, y: float, width: float, style="body", max_height=500) -> float:
        key = style
        if self.dark and key == "body":
            key = "body_dark"
        if self.dark and key == "small":
            key = "small_dark"
        p = Paragraph(html.escape(text).replace("\n", "<br/>"), self.styles[key])
        _, height = p.wrap(width, max_height)
        p.drawOn(self.c, x, y - height)
        return y - height

    def status_chip(self, label: str, x: float, y: float, extension=False) -> None:
        bg = GOLD if extension else RED
        self.c.setFillColor(bg)
        self.c.roundRect(x, y - 14, 104 if extension else 94, 18, 2, stroke=0, fill=1)
        self.c.setFillColor(BLACK if extension else WHITE)
        self.c.setFont("BrandSansBold", 6.7)
        self.c.drawString(x + 8, y - 8.5, label.upper())

    def card(self, x: float, y: float, w: float, h: float, title: str, body: str, dark=False, accent=None, number=None) -> None:
        bg = colors.HexColor("#171719") if dark else WHITE
        edge = colors.HexColor("#333336") if dark else LINE
        self.c.setFillColor(bg)
        self.c.setStrokeColor(edge)
        self.c.setLineWidth(0.7)
        self.c.rect(x, y, w, h, stroke=1, fill=1)
        if accent:
            self.c.setFillColor(accent)
            self.c.rect(x, y + h - 4, w, 4, stroke=0, fill=1)
        if number:
            self.c.setFillColor(GOLD_DARK_SURFACE if dark else RED)
            self.c.setFont("BrandDisplay", 22)
            self.c.drawRightString(x + w - 14, y + h - 28, number)
        self.c.setFillColor(WHITE if dark else BLACK)
        self.c.setFont("BrandSansBold", 10)
        self.c.drawString(x + 14, y + h - 24, title)
        style = "card_dark" if dark else "card"
        p = Paragraph(html.escape(body), self.styles[style])
        _, ph = p.wrap(w - 28, h - 48)
        p.drawOn(self.c, x + 14, y + h - 39 - ph)

    def draw_logo(self, path: Path, x: float, y: float, w: float, h: float | None = None) -> None:
        with Image.open(path) as image:
            ratio = image.height / image.width
        height = h if h is not None else w * ratio
        self.c.drawImage(ImageReader(str(path)), x, y, width=w, height=height, preserveAspectRatio=True, mask="auto")

    def draw_cover_image(self, path: Path, x: float, y: float, w: float, h: float) -> None:
        self.c.drawImage(ImageReader(str(path)), x, y, width=w, height=h, preserveAspectRatio=False, mask="auto")

    def page_cover(self) -> None:
        self.begin(dark=True)
        self.draw_cover_image(self.assets["editorial_crop"], PAGE_W * 0.48, 0, PAGE_W * 0.52, PAGE_H)
        self.c.setFillColor(colors.Color(0.043, 0.043, 0.047, alpha=0.12))
        self.c.rect(PAGE_W * 0.48, 0, PAGE_W * 0.52, PAGE_H, stroke=0, fill=1)
        self.c.setFillColor(RED)
        self.c.rect(0, 0, 9, PAGE_H, stroke=0, fill=1)
        self.c.setFillColor(GOLD)
        self.c.rect(M, PAGE_H - 58, 82, 2, stroke=0, fill=1)
        self.c.setFont("BrandSansBold", 8)
        self.c.setFillColor(GOLD_DARK_SURFACE)
        self.c.drawString(M, PAGE_H - 46, "IDENTITY SYSTEM / 2026")
        self.c.setFillColor(WHITE)
        self.c.setFont("BrandDisplay", 39)
        self.c.drawString(M, PAGE_H - 148, "BRAND")
        self.c.drawString(M, PAGE_H - 188, "GUIDELINES")
        self.c.setFont("BrandSans", 10)
        self.c.setFillColor(colors.HexColor("#c9c9ca"))
        self.c.drawString(M, PAGE_H - 214, "A practical system for clarity, trust, and business action.")
        self.draw_logo(self.logo_dir / "galdino-partner-logo-transparent.png", M, 84, 210)
        self.end("Project-defined system with compatible operational extensions")

    def page_contents(self) -> None:
        self.begin()
        self.eyebrow("00 / Using this guide")
        self.title("A system grounded in the project - not a redesign.", size=29, width=660)
        self.status_chip("Project-defined", M, 425)
        self.paragraph("Rules directly evidenced by source code, project documentation, or the approved logo asset.", M, 394, 320)
        self.status_chip("Operational extension", 390, 425, extension=True)
        self.paragraph("New practical standards added only where they reinforce the approved direction. They never alter the master logo or invent business claims.", 390, 394, 365)

        columns = [
            ("01", "Foundation", "Purpose, audience, positioning, personality"),
            ("02", "Expression", "Voice, messaging, claim discipline"),
            ("03", "Identity", "Logo, colour, typography, layout"),
            ("04", "Experience", "UI, imagery, motion, accessibility"),
            ("05", "Governance", "Approvals, placeholders, asset package"),
        ]
        y = 290
        for number, title, body in columns:
            self.c.setFillColor(RED)
            self.c.setFont("BrandDisplay", 22)
            self.c.drawString(M, y, number)
            self.c.setFillColor(BLACK)
            self.c.setFont("BrandSansBold", 11)
            self.c.drawString(M + 48, y + 3, title)
            self.paragraph(body, M + 180, y + 8, 440, "small")
            self.c.setStrokeColor(LINE)
            self.c.line(M, y - 16, PAGE_W - M, y - 16)
            y -= 48
        self.end("Sources: docs/DESIGN_SYSTEM.md; docs/PROJECT_CONTEXT.md; public/assets/gp-logo-brand.png")

    def page_foundation(self) -> None:
        self.begin(dark=True)
        self.eyebrow("01 / Foundation")
        self.title("Regulatory clarity for business action.", width=480)
        self.status_chip("Project-defined", M, 410)
        self.paragraph("Galdino & Partner is positioned as a business licensing consultant, law firm, and legal-regulatory partner in Indonesia. The firm translates regulatory complexity into ordered, decision-ready steps.", M, 380, 405)
        self.c.setFillColor(RED)
        self.c.rect(500, 84, 255, 352, stroke=0, fill=1)
        self.c.setFillColor(WHITE)
        self.c.setFont("BrandSansBold", 8)
        self.c.drawString(524, 399, "CORE PROMISE")
        self.c.setFont("BrandDisplay", 26)
        for idx, line in enumerate(("MAP THE", "REQUIREMENTS.", "PREPARE THE", "DOCUMENTS.", "GUIDE THE", "PROCESS.")):
            self.c.drawString(524, 354 - idx * 35, line)
        self.c.setStrokeColor(GOLD_DARK_SURFACE)
        self.c.setLineWidth(1)
        self.c.line(524, 121, 712, 121)
        self.c.setFont("BrandSans", 7.5)
        self.c.drawString(524, 104, "NO GUARANTEES OF AUTHORITY-CONTROLLED OUTCOMES")
        self.end("Sources: docs/PROJECT_CONTEXT.md; docs/PAGE_SPECIFICATIONS.md; src/data/site.ts")

    def page_audience(self) -> None:
        self.begin()
        self.eyebrow("01 / Foundation")
        self.title("Built for decision-makers navigating Indonesia.", width=680)
        cards = [
            ("Business leaders", "Indonesian owners, founders, directors, and operations teams who need a clear path from activity to permit requirements."),
            ("Legal teams", "In-house legal and compliance teams seeking structured orientation, scope clarity, and documented follow-up."),
            ("International teams", "Investors and international companies who need English-language orientation without diluting official Indonesian terminology."),
            ("Growth situations", "Companies establishing, expanding, regularising, or maintaining business activities in Indonesia."),
        ]
        positions = [(M, 275), (M + 365, 275), (M, 96), (M + 365, 96)]
        for index, ((title, body), (x, y)) in enumerate(zip(cards, positions), 1):
            self.card(x, y, 336, 145, title, body, accent=RED if index == 1 else GOLD, number=f"{index:02d}")
        self.end("Source: docs/PROJECT_CONTEXT.md - Audience")

    def page_positioning(self) -> None:
        self.begin()
        self.eyebrow("01 / Foundation")
        self.title("Permit handling first. Legal capability in support.", width=650)
        self.status_chip("Project-defined", M, 415)
        self.paragraph("The homepage must lead with permit handling and business operations. It must not present the firm as a generic digital agency or an hourly legal-consultation practice.", M, 386, 370)
        self.status_chip("Operational extension", 450, 415, extension=True)
        self.paragraph("Use the phrase 'Regulatory clarity for business action' as a brand essence line when a concise internal expression is needed. It is a working line, not a verified market claim.", 450, 386, 330)

        steps = ["ASSESS", "MAP", "PREPARE", "COORDINATE", "MONITOR", "FOLLOW UP"]
        y = 222
        x = M
        for index, step in enumerate(steps):
            width = 103
            self.c.setFillColor(RED if index in (0, 5) else BLACK)
            self.c.rect(x, y, width, 54, stroke=0, fill=1)
            self.c.setFillColor(WHITE)
            self.c.setFont("BrandSansBold", 8)
            self.c.drawCentredString(x + width / 2, y + 23, step)
            if index < len(steps) - 1:
                self.c.setStrokeColor(GOLD)
                self.c.setLineWidth(1)
                self.c.line(x + width, y + 27, x + width + 17, y + 27)
            x += 120
        self.paragraph("This sequence is the brand's recurring narrative: understand the activity, identify the regulatory pathway, prepare evidence, coordinate filing, communicate progress, and support the next action.", M, 188, 650, "small")
        self.end("Sources: docs/PAGE_SPECIFICATIONS.md; docs/PROJECT_CONTEXT.md; src/data/home.ts")

    def page_personality(self) -> None:
        self.begin(dark=True)
        self.eyebrow("01 / Foundation")
        self.title("Calm precision. Decisive structure.", width=580)
        traits = [
            ("CALM", "Never alarmist. Reduce noise and make the next step visible."),
            ("PRECISE", "Use accurate legal and regulatory language without hiding uncertainty."),
            ("PRACTICAL", "Connect every requirement to an operational decision or action."),
            ("COMMERCIALLY AWARE", "Frame compliance around expansion, continuity, risk, and investment."),
            ("PREMIUM", "Earn authority through restraint, hierarchy, and verified evidence."),
            ("DECISIVE", "Prioritise the permit path and state what happens next."),
        ]
        x0, y0 = M, 355
        for index, (title, body) in enumerate(traits):
            col, row = index % 3, index // 3
            self.card(x0 + col * 248, y0 - row * 150, 224, 122, title, body, dark=True, accent=RED if col == 0 else GOLD)
        self.end("Sources: docs/DESIGN_SYSTEM.md; docs/CONTENT_GUIDELINES.md")

    def page_voice(self) -> None:
        self.begin()
        self.eyebrow("02 / Expression")
        self.title("Plain language without losing legal nuance.", width=650)
        self.c.setFillColor(BLACK)
        self.c.rect(M, 102, 347, 322, stroke=0, fill=1)
        self.c.setFillColor(WHITE)
        self.c.setFont("BrandSansBold", 9)
        self.c.drawString(M + 20, 392, "USE")
        use = ["we help", "map", "review", "guide", "requirements", "business activity", "risk level", "next step"]
        y = 354
        for item in use:
            self.c.setFillColor(GOLD_DARK_SURFACE)
            self.c.circle(M + 25, y + 3, 2, stroke=0, fill=1)
            self.c.setFillColor(WHITE)
            self.c.setFont("BrandSans", 11)
            self.c.drawString(M + 38, y, item)
            y -= 29

        self.c.setFillColor(WHITE)
        self.c.setStrokeColor(LINE_STRONG)
        self.c.rect(430, 102, 347, 322, stroke=1, fill=1)
        self.c.setFillColor(RED)
        self.c.setFont("BrandSansBold", 9)
        self.c.drawString(450, 392, "AVOID")
        avoid = ["guarantee", "fastest", "100% approved", "best in Indonesia", "instant approval", "unsupported superlatives", "hourly-advice framing", "authority outcome promises"]
        y = 354
        for item in avoid:
            self.c.setFillColor(RED)
            self.c.circle(455, y + 3, 2, stroke=0, fill=1)
            self.c.setFillColor(BLACK)
            self.c.setFont("BrandSans", 11)
            self.c.drawString(468, y, item)
            y -= 29
        self.end("Source: docs/CONTENT_GUIDELINES.md - Voice")

    def page_messaging(self) -> None:
        self.begin()
        self.eyebrow("02 / Expression")
        self.title("Message architecture: activity, problem, next step.", width=720)
        rows = [
            ("ACTIVITY", "Name the business activity, entity action, project, or compliance event."),
            ("REGULATORY PROBLEM", "Explain the classification, risk, document, authority, or sequencing issue."),
            ("SUPPORT", "State how Galdino & Partner maps, prepares, coordinates, monitors, or reviews."),
            ("NEXT STEP", "Invite a permit-needs assessment, consultation, service review, or WhatsApp discussion."),
            ("BOUNDARY", "State that information is general and outcomes remain subject to the relevant authority."),
        ]
        y = 383
        for index, (label, body) in enumerate(rows, 1):
            self.c.setFillColor(RED if index < 5 else RED_DEEP)
            self.c.rect(M, y - 25, 110, 42, stroke=0, fill=1)
            self.c.setFillColor(WHITE)
            self.c.setFont("BrandSansBold", 7.5)
            self.c.drawCentredString(M + 55, y - 7, label)
            self.paragraph(body, M + 135, y + 5, 585, "body")
            self.c.setStrokeColor(LINE)
            self.c.line(M + 135, y - 31, PAGE_W - M, y - 31)
            y -= 66
        self.c.setFillColor(BLACK)
        self.c.setFont("BrandSansItalic", 8.5)
        self.c.drawString(M, 55, "Required disclaimer: Information on this website is general and does not constitute legal advice for a specific matter.")
        self.end("Sources: docs/CONTENT_GUIDELINES.md; src/data/site.ts - COPY.en")

    def page_claims(self) -> None:
        self.begin(dark=True)
        self.eyebrow("02 / Expression")
        self.title("Trust is built through evidence - never inflated metrics.", width=650)
        self.status_chip("Project-defined", M, 420)
        columns = [
            ("SAFE TO EXPLAIN", ["Service process", "Regulatory topics", "Scope boundaries", "General next steps", "Published articles after review"]),
            ("VERIFY BEFORE USE", ["Legal name", "Registration", "Founding year", "Credentials", "Prices and timelines", "Project outcomes"]),
            ("CONSENT REQUIRED", ["Client identities", "Client logos", "Testimonials", "Project details", "Official photography", "Sensitive documents"]),
        ]
        x = M
        for index, (title, items) in enumerate(columns):
            self.c.setFillColor(colors.HexColor("#171719"))
            self.c.setStrokeColor(colors.HexColor("#333336"))
            self.c.rect(x, 105, 224, 270, stroke=1, fill=1)
            self.c.setFillColor(RED if index == 0 else GOLD_DARK_SURFACE)
            self.c.rect(x, 371, 224, 4, stroke=0, fill=1)
            self.c.setFillColor(WHITE)
            self.c.setFont("BrandSansBold", 8.3)
            self.c.drawString(x + 15, 343, title)
            y = 304
            for item in items:
                self.c.setFillColor(RED if index == 0 else GOLD_DARK_SURFACE)
                self.c.circle(x + 18, y + 3, 2, stroke=0, fill=1)
                self.c.setFillColor(WHITE)
                self.c.setFont("BrandSans", 9.4)
                self.c.drawString(x + 30, y, item)
                y -= 38
            x += 246
        self.end("Sources: docs/REQUIREMENTS.md; docs/PROJECT_CONTEXT.md; docs/CONTENT_GUIDELINES.md")

    def page_logo_master(self) -> None:
        self.begin()
        self.eyebrow("03 / Identity")
        self.title("The approved red-black-gold master mark.", width=650)
        self.status_chip("Project-defined", M, 420)
        self.c.setFillColor(WHITE)
        self.c.setStrokeColor(LINE)
        self.c.rect(M, 86, 490, 287, stroke=1, fill=1)
        self.draw_logo(self.logo_dir / "galdino-partner-logo-transparent.png", M + 94, 121, 300)

        self.c.setFillColor(BLACK)
        self.c.setFont("BrandSansBold", 9)
        self.c.drawString(570, 356, "MASTER FILE")
        self.paragraph("public/assets/gp-logo-brand.png", 570, 338, 210, "small")
        self.c.setFont("BrandSansBold", 9)
        self.c.drawString(570, 292, "DIMENSIONS")
        self.paragraph("600 x 413 px / RGBA", 570, 274, 210, "small")
        self.c.setFont("BrandSansBold", 9)
        self.c.drawString(570, 228, "INTEGRITY")
        self.paragraph("No redesign. No recolouring. The transparent PNG supplied in this package is byte-for-byte identical to the project master.", 570, 210, 210, "small")
        self.c.setFont("BrandSansBold", 9)
        self.c.drawString(570, 144, "SHA-256")
        self.paragraph("92c2079247e08515100b3c7861c738db9b280f591b66f2dd6ffe3de187e012ed", 570, 126, 210, "small")
        self.end("Sources: docs/DESIGN_SYSTEM.md; public/assets/gp-logo-brand.png")

    def page_logo_spacing(self) -> None:
        self.begin()
        self.eyebrow("03 / Identity")
        self.title("Protect the mark with consistent space and scale.", width=680)
        self.status_chip("Operational extension", M, 420, extension=True)
        self.paragraph("These production standards are introduced by this guide because the project does not define clear space or minimum sizes. They preserve the approved artwork and suit its current detail level.", M, 390, 700, "small")

        x, y, w = M + 38, 118, 360
        h = w * 413 / 600
        space = w * 0.10
        self.c.setFillColor(WHITE)
        self.c.rect(x - space, y - space, w + 2 * space, h + 2 * space, stroke=0, fill=1)
        self.c.setStrokeColor(RED)
        self.c.setDash(4, 3)
        self.c.rect(x - space, y - space, w + 2 * space, h + 2 * space, stroke=1, fill=0)
        self.c.setDash()
        self.draw_logo(self.logo_dir / "galdino-partner-logo-transparent.png", x, y, w)
        self.c.setFillColor(RED)
        self.c.setFont("BrandSansBold", 7)
        self.c.drawString(x - space, y + h + space + 10, "X = 10% OF ARTWORK WIDTH ON EVERY SIDE")

        self.card(535, 244, 242, 126, "Digital minimum", "Use at 160 px wide or larger. For smaller interfaces, request an approved simplified asset rather than cropping the master.", accent=RED)
        self.card(535, 102, 242, 126, "Print minimum", "Use at 35 mm wide or larger. Always review a physical proof when printing on textured or absorbent stock.", accent=GOLD)
        self.end("Extension based on master dimensions; source asset remains unchanged")

    def page_logo_variants(self) -> None:
        self.begin()
        self.eyebrow("03 / Identity")
        self.title("Choose the file by background - not by convenience.", width=700)
        variants = [
            ("WHITE", WHITE, BLACK, "galdino-partner-logo-white-bg.png", "PNG / WebP / JPG"),
            ("BLACK", BLACK, WHITE, "galdino-partner-logo-black-bg.png", "PNG / WebP / JPG"),
            ("TRANSPARENT", SOFT, BLACK, "galdino-partner-logo-transparent.png", "PNG / WebP"),
        ]
        x = M
        for label, bg, ink, file_name, formats in variants:
            self.c.setFillColor(bg)
            self.c.setStrokeColor(LINE_STRONG)
            self.c.rect(x, 165, 224, 235, stroke=1, fill=1)
            self.draw_logo(self.logo_dir / file_name, x + 42, 236, 140)
            self.c.setFillColor(ink)
            self.c.setFont("BrandSansBold", 8)
            self.c.drawString(x + 15, 188, label)
            self.c.setFont("BrandSans", 7.5)
            self.c.drawRightString(x + 209, 188, formats)
            x += 246
        self.paragraph("Transparent assets retain alpha. JPEG cannot carry transparency, so it is supplied only with fixed white and brand-black backgrounds. Never add a white or off-white plate behind the transparent logo.", M, 132, 720, "small")
        self.end("Sources: docs/DESIGN_SYSTEM.md; brand/logo-manifest.json")

    def page_logo_misuse(self) -> None:
        self.begin(dark=True)
        self.eyebrow("03 / Identity")
        self.title("Consistency is a trust signal.", width=500)
        items = [
            ("DO NOT REDRAW", "Do not recreate lettering, shapes, or proportions."),
            ("DO NOT RECOLOUR", "Do not replace the red, black, or gold artwork."),
            ("DO NOT DISTORT", "Do not stretch, compress, skew, or rotate."),
            ("DO NOT CROP", "Do not remove part of the approved artwork."),
            ("DO NOT ADD A PLATE", "Never place a white rectangle behind the transparent asset."),
            ("DO NOT USE LEGACY GREEN", "The older gp-logo.png is not the approved current master."),
        ]
        positions = [(M, 285), (M + 246, 285), (M + 492, 285), (M, 115), (M + 246, 115), (M + 492, 115)]
        for (title, body), (x, y) in zip(items, positions):
            self.card(x, y, 224, 140, title, body, dark=True, accent=RED)
            self.c.setStrokeColor(RED)
            self.c.setLineWidth(2)
            self.c.line(x + 175, y + 95, x + 202, y + 122)
            self.c.line(x + 202, y + 95, x + 175, y + 122)
        self.end("Sources: docs/DESIGN_SYSTEM.md; docs/COMPONENT_GUIDELINES.md")

    def page_color(self) -> None:
        self.begin()
        self.eyebrow("03 / Identity")
        self.title("A disciplined red-led palette.", width=520)
        palette = [
            ("BRAND BLACK", "#0b0b0c", BLACK), ("WHITE", "#ffffff", WHITE),
            ("PAPER", "#f4f3f1", PAPER), ("SOFT SURFACE", "#ecebea", SOFT),
            ("PRIMARY RED", "#c4142a", RED), ("BRIGHT RED", "#ed2942", RED_BRIGHT),
            ("DEEP RED", "#710d1b", RED_DEEP), ("OPTIONAL GOLD", "#b18a4b", GOLD),
            ("MUTED TEXT", "#515156", MUTED), ("STRONG LINE", "#b9b8b5", LINE_STRONG),
        ]
        sw, sh = 137, 105
        for index, (name, value, colour) in enumerate(palette):
            col, row = index % 5, index // 5
            x, y = M + col * 148, 275 - row * 125
            self.c.setFillColor(colour)
            self.c.setStrokeColor(LINE_STRONG)
            self.c.rect(x, y, sw, sh, stroke=1, fill=1)
            dark_swatch = value in ("#0b0b0c", "#c4142a", "#710d1b", "#515156")
            self.c.setFillColor(WHITE if dark_swatch else BLACK)
            self.c.setFont("BrandSansBold", 6.8)
            self.c.drawString(x + 9, y + 24, name)
            self.c.setFont("BrandSans", 7)
            self.c.drawString(x + 9, y + 10, value)

        ratios = [
            f"Black / White {contrast('#0b0b0c', '#ffffff'):.1f}:1",
            f"Primary Red / White {contrast('#c4142a', '#ffffff'):.1f}:1",
            f"Deep Red / White {contrast('#710d1b', '#ffffff'):.1f}:1",
            f"Muted / Paper {contrast('#515156', '#f4f3f1'):.1f}:1",
        ]
        self.c.setFillColor(BLACK)
        self.c.setFont("BrandSansBold", 7)
        self.c.drawString(M, 66, "DERIVED CONTRAST RATIOS")
        self.c.setFont("BrandSans", 7)
        self.c.drawString(M + 144, 66, "   /   ".join(ratios))
        self.paragraph("Red is reserved for primary actions, active states, focus, and meaningful emphasis. Gold stays secondary. Legacy forest/teal utilities remain in global.css but are not part of the approved red-led direction for new brand work.", M, 50, 720, "small")
        self.end("Sources: docs/DESIGN_SYSTEM.md; src/styles/global.css; contrast ratios derived from project tokens")

    def page_typography(self) -> None:
        self.begin(dark=True)
        self.eyebrow("03 / Identity")
        self.title("System typography: modern, direct, and dependency-free.", width=690)
        self.status_chip("Project-defined", M, 420)
        self.c.setFillColor(WHITE)
        self.c.setFont("BrandDisplay", 72)
        self.c.drawString(M, 285, "Aa")
        self.c.setFont("BrandSansBold", 8)
        self.c.setFillColor(GOLD_DARK_SURFACE)
        self.c.drawString(M, 257, "DISPLAY STACK")
        self.c.setFillColor(WHITE)
        self.c.setFont("BrandSans", 10)
        self.c.drawString(M, 239, "Aptos Display / Segoe UI Variable Display / Segoe UI / system sans")

        self.c.setFillColor(colors.HexColor("#171719"))
        self.c.rect(420, 90, 357, 304, stroke=0, fill=1)
        samples = [
            ("HERO", 35, "Licensing clarity for business."),
            ("SECTION", 25, "Ordered, decision-ready steps."),
            ("CARD", 17, "Risk-Based Licensing"),
            ("BODY", 10, "Explain regulations in plain language without minimising legal nuance."),
            ("EYEBROW", 7, "PERMIT PROCESS / 04"),
        ]
        y = 350
        for label, size, sample in samples:
            self.c.setFillColor(GOLD_DARK_SURFACE)
            self.c.setFont("BrandSansBold", 6)
            self.c.drawString(440, y, label)
            self.c.setFillColor(WHITE)
            self.c.setFont("BrandDisplay" if size >= 17 else "BrandSans", size)
            self.c.drawString(440, y - size - 4, sample)
            y -= 60 if size < 20 else 78
        self.paragraph("Display tracking must never go below -0.04em. Hero scale: clamp(3rem, 4.5vw, 4rem). Section scale: clamp(2.25rem, 3.8vw, 3.5rem). Body uses Aptos / Segoe UI / system sans.", M, 165, 330, "small")
        self.end("Sources: docs/DESIGN_SYSTEM.md; src/styles/global.css")

    def page_layout(self) -> None:
        self.begin()
        self.eyebrow("03 / Identity")
        self.title("Editorial asymmetry, measured structure, generous space.", width=720)
        self.status_chip("Project-defined", M, 420)

        x, y, w, h = M, 104, 470, 270
        self.c.setFillColor(WHITE)
        self.c.setStrokeColor(LINE_STRONG)
        self.c.rect(x, y, w, h, stroke=1, fill=1)
        cols = 8
        gutter = 10
        col_w = (w - 2 * 18 - (cols - 1) * gutter) / cols
        for i in range(cols):
            self.c.setFillColor(colors.Color(0.77, 0.08, 0.16, alpha=0.10))
            self.c.rect(x + 18 + i * (col_w + gutter), y + 18, col_w, h - 36, stroke=0, fill=1)
        self.c.setFillColor(BLACK)
        self.c.rect(x + 18, y + 172, col_w * 4 + gutter * 3, 72, stroke=0, fill=1)
        self.c.setFillColor(RED)
        self.c.rect(x + 18 + 5 * (col_w + gutter), y + 48, col_w * 3 + gutter * 2, 105, stroke=0, fill=1)
        self.c.setStrokeColor(GOLD)
        self.c.line(x + 18, y + 155, x + w - 18, y + 155)

        rules = [
            ("78rem", "Maximum content container"),
            ("4.5-7rem", "Fluid section spacing"),
            ("SQUARE", "Predominantly flat, square-edged components"),
            ("RULES", "Hierarchy through lines, type, image, and colour"),
            ("NO GLOW", "No glassmorphism, decorative glow, or excessive gradients"),
        ]
        y2 = 360
        for value, label in rules:
            self.c.setFillColor(RED)
            self.c.setFont("BrandSansBold", 10)
            self.c.drawString(560, y2, value)
            self.paragraph(label, 640, y2 + 5, 140, "small")
            self.c.setStrokeColor(LINE)
            self.c.line(560, y2 - 17, 777, y2 - 17)
            y2 -= 52
        self.end("Sources: docs/DESIGN_SYSTEM.md; src/styles/global.css")

    def page_ui_motion(self) -> None:
        self.begin(dark=True)
        self.eyebrow("04 / Experience")
        self.title("Digital behaviour should clarify state - never perform for attention.", width=720)
        cards = [
            ("CONTROLS", "140-190 ms / cubic-bezier(.22, 1, .36, 1). Hover lift no more than 2 px; press scale 0.97."),
            ("ARROWS", "Movement is capped at 3 px and communicates direction."),
            ("REVEALS", "Opacity plus a 12 px translation over approximately 500-520 ms."),
            ("IMAGES", "Hover scale capped at 1.02; fine pointers only."),
            ("CAROUSELS", "Service rails never autoplay. Company gallery may advance every six seconds only when motion is allowed."),
            ("REDUCED MOTION", "Remove non-essential movement and smooth scrolling when the preference is enabled."),
        ]
        positions = [(M, 290), (M + 246, 290), (M + 492, 290), (M, 112), (M + 246, 112), (M + 492, 112)]
        for index, ((title, body), (x, y)) in enumerate(zip(cards, positions)):
            self.card(x, y, 224, 145, title, body, dark=True, accent=RED if index in (0, 5) else GOLD)
        self.end("Sources: docs/DESIGN_SYSTEM.md; docs/COMPONENT_GUIDELINES.md; src/styles/global.css")

    def page_imagery(self) -> None:
        self.begin()
        self.eyebrow("04 / Experience")
        self.title("Imagery must feel specific, editorial, and approved.", width=650)
        self.draw_cover_image(self.assets["editorial"], M, 92, 470, 305)
        self.status_chip("Operational extension", 542, 390, extension=True)
        self.subhead("Compatible visual direction", 542, 355, 240, 16)
        y = self.paragraph("Use measured document geometry, architectural linework, matte paper, controlled red fields, and restrained gold rules to express complexity becoming order.", 542, 326, 240, "small")
        y -= 16
        self.subhead("Photography rules", 542, y, 240, 12)
        self.paragraph("Prefer official team, office, project, and permit-process photography with consent. Use natural texture, credible environments, and descriptive alt text. Avoid generic gavels, justice scales, government-looking seals, stock handshakes, and invented evidence.", 542, y - 22, 240, "small")
        self.c.setFillColor(RED_DEEP)
        self.c.rect(M, 61, 470, 22, stroke=0, fill=1)
        self.c.setFillColor(WHITE)
        self.c.setFont("BrandSansBold", 6.8)
        self.c.drawString(M + 9, 68, "IMAGEGEN CONCEPT - VISUAL DIRECTION ONLY - NOT COMPANY OR PROJECT EVIDENCE")
        self.end("Sources: docs/DESIGN_SYSTEM.md; docs/PROJECT_CONTEXT.md; generated visual follows approved direction")

    def page_accessibility(self) -> None:
        self.begin()
        self.eyebrow("04 / Experience")
        self.title("Accessibility and bilingual clarity are brand behaviours.", width=700)
        left = [
            ("WCAG 2.2 AA", "Preserve semantics, heading order, labels, lists, and native controls."),
            ("44 x 44 PX", "Use approximately 44 px minimum interactive targets."),
            ("FOCUS", "Use a high-contrast gold outline; never remove visible focus."),
            ("COLOUR", "Never let colour carry the only meaning."),
        ]
        right = [
            ("/ID/ + /EN/", "Indonesian remains default and prefixed; English receives complete equivalent content."),
            ("TERMINOLOGY", "Keep official Indonesian legal terms when translation would create ambiguity; add an English explanation."),
            ("NATURAL COPY", "Translations should be natural, not literal, while preserving service meaning and status."),
            ("REDUCED MOTION", "Disable non-essential animation and smooth scrolling."),
        ]
        for col, items in enumerate((left, right)):
            x = M + col * 368
            y = 385
            for value, body in items:
                self.c.setFillColor(RED if col == 0 else GOLD)
                self.c.rect(x, y - 18, 105, 34, stroke=0, fill=1)
                self.c.setFillColor(WHITE if col == 0 else BLACK)
                self.c.setFont("BrandSansBold", 7.5)
                self.c.drawCentredString(x + 52.5, y - 5, value)
                self.paragraph(body, x + 124, y + 8, 216, "small")
                y -= 78
        self.end("Sources: docs/ACCESSIBILITY_GUIDELINES.md; docs/I18N_GUIDELINES.md")

    def page_applications(self) -> None:
        self.begin(dark=True)
        self.eyebrow("04 / Experience")
        self.title("A restrained application system across digital and print.", width=690)
        self.draw_cover_image(self.assets["stationery"], 345, 76, 450, 360)
        self.status_chip("Operational extension", M, 408, extension=True)
        self.subhead("Application principles", M, 371, 260, 16)
        principles = [
            "Use the approved logo master only.",
            "Let white, paper, or black carry the composition.",
            "Reserve red for decisions and action.",
            "Use gold as a thin secondary signal.",
            "Keep typography sparse and aligned to rules.",
            "Treat mockups as identity applications, not evidence of production materials.",
        ]
        y = 335
        for item in principles:
            self.c.setFillColor(RED)
            self.c.circle(M + 3, y + 3, 2, stroke=0, fill=1)
            self.paragraph(item, M + 15, y + 8, 260, "small")
            y -= 40
        self.c.setFillColor(RED_DEEP)
        self.c.rect(345, 54, 450, 18, stroke=0, fill=1)
        self.c.setFillColor(WHITE)
        self.c.setFont("BrandSansBold", 6.5)
        self.c.drawString(354, 60, "CONCEPT APPLICATION - APPROVED LOGO OVERLAID WITHOUT REDESIGN")
        self.end("Sources: approved logo master; generated blank stationery base; compatible application extension")

    def page_governance(self) -> None:
        self.begin()
        self.eyebrow("05 / Governance")
        self.title("Publish only what the project can prove.", width=600)
        workflow = [
            ("01", "SOURCE", "Store editable business facts centrally in site.ts, home.ts, profile.ts, or reviewed Markdown."),
            ("02", "VERIFY", "Confirm legal identity, credentials, dates, prices, outcomes, and current-law accuracy."),
            ("03", "APPROVE", "Record business, legal, content, and asset approval before removing a placeholder."),
            ("04", "PUBLISH", "Use consented photography, client marks, testimonials, and project evidence only."),
            ("05", "REVIEW", "Keep articles current, preserve review dates, and re-check metadata and schema."),
        ]
        y = 390
        for number, label, body in workflow:
            self.c.setFillColor(RED)
            self.c.setFont("BrandDisplay", 22)
            self.c.drawString(M, y, number)
            self.c.setFillColor(BLACK)
            self.c.setFont("BrandSansBold", 8)
            self.c.drawString(M + 48, y + 5, label)
            self.paragraph(body, M + 145, y + 10, 590, "small")
            self.c.setStrokeColor(LINE)
            self.c.line(M + 48, y - 20, PAGE_W - M, y - 20)
            y -= 67
        self.c.setFillColor(RED_DEEP)
        self.c.rect(M, 50, PAGE_W - 2 * M, 34, stroke=0, fill=1)
        self.c.setFillColor(WHITE)
        self.c.setFont("BrandSansBold", 7.2)
        self.c.drawString(M + 12, 63, "PLACEHOLDERS, MOCK DATA, CONCEPT IMAGERY, AND UNVERIFIED CLAIMS MUST NEVER BE PRESENTED AS FINAL FACT.")
        self.end("Sources: docs/CONTENT_GUIDELINES.md; docs/REQUIREMENTS.md; docs/PROJECT_CONTEXT.md")

    def page_asset_package(self) -> None:
        self.begin(dark=True)
        self.eyebrow("05 / Governance")
        self.title("The supplied brand package.", width=520)
        rows = [
            ("PNG", "White background / Black background / Transparent", "3 files"),
            ("WEBP", "White background / Black background / Transparent", "3 files"),
            ("JPG", "White background / Black background", "2 files"),
            ("PDF", "English brand guideline book", "1 file"),
            ("VISUALS", "Imagegen editorial system + stationery concept", "4 files"),
            ("MANIFEST", "Logo source, checksum, dimensions, formats", "1 file"),
        ]
        y = 385
        for label, detail, count in rows:
            self.c.setFillColor(RED)
            self.c.rect(M, y - 17, 88, 32, stroke=0, fill=1)
            self.c.setFillColor(WHITE)
            self.c.setFont("BrandSansBold", 7.5)
            self.c.drawCentredString(M + 44, y - 4, label)
            self.c.setFillColor(WHITE)
            self.c.setFont("BrandSans", 9.5)
            self.c.drawString(M + 112, y - 5, detail)
            self.c.setFillColor(GOLD_DARK_SURFACE)
            self.c.setFont("BrandSansBold", 8)
            self.c.drawRightString(PAGE_W - M, y - 5, count)
            self.c.setStrokeColor(colors.HexColor("#333336"))
            self.c.line(M + 112, y - 28, PAGE_W - M, y - 28)
            y -= 55

        self.paragraph("JPEG does not support alpha transparency. The transparent PNG is an exact copy of the approved project master. Transparent WebP is lossless. White and black variants preserve artwork geometry and use #ffffff and #0b0b0c backgrounds.", M, 62, 720, "small")
        self.end("Source: brand/logo-manifest.json")

    def page_sources(self) -> None:
        self.begin()
        self.eyebrow("05 / Governance")
        self.title("Project source register.", width=500)
        sources = [
            ("Identity", "public/assets/gp-logo-brand.png; docs/DESIGN_SYSTEM.md"),
            ("Strategy", "docs/PROJECT_CONTEXT.md; docs/PAGE_SPECIFICATIONS.md"),
            ("Voice", "docs/CONTENT_GUIDELINES.md; src/data/site.ts"),
            ("Visual system", "src/styles/global.css; src/styles/contrast.css; docs/COMPONENT_GUIDELINES.md"),
            ("Accessibility", "docs/ACCESSIBILITY_GUIDELINES.md"),
            ("Bilingual behaviour", "docs/I18N_GUIDELINES.md"),
            ("Content integrity", "docs/REQUIREMENTS.md; docs/SEO_GUIDELINES.md"),
            ("Page implementation", "src/components/; src/data/home.ts; src/data/profile.ts; src/layouts/BaseLayout.astro"),
        ]
        y = 395
        for category, files in sources:
            self.c.setFillColor(RED)
            self.c.setFont("BrandSansBold", 8)
            self.c.drawString(M, y, category.upper())
            self.paragraph(files, M + 135, y + 7, 600, "small")
            self.c.setStrokeColor(LINE)
            self.c.line(M + 135, y - 18, PAGE_W - M, y - 18)
            y -= 44
        self.c.setFillColor(BLACK)
        self.c.setFont("BrandSansBold", 8)
        self.c.drawString(M, 54, "SCOPE NOTE")
        self.paragraph("This book documents the implemented red-led brand direction and adds compatible operating rules where the project was silent. It does not validate the firm's legal identity, credentials, statistics, client relationships, outcomes, official photography, prices, or other placeholders.", M + 105, 62, 630, "small")
        self.end("All content derived from the local Galdino & Partner website project")

    def build(self) -> None:
        pages = [
            self.page_cover,
            self.page_contents,
            self.page_foundation,
            self.page_audience,
            self.page_positioning,
            self.page_personality,
            self.page_voice,
            self.page_messaging,
            self.page_claims,
            self.page_logo_master,
            self.page_logo_spacing,
            self.page_logo_variants,
            self.page_logo_misuse,
            self.page_color,
            self.page_typography,
            self.page_layout,
            self.page_ui_motion,
            self.page_imagery,
            self.page_accessibility,
            self.page_applications,
            self.page_governance,
            self.page_asset_package,
            self.page_sources,
        ]
        for page in pages:
            page()
        self.c.save()


def write_readme(brand_dir: Path, pdf_path: Path) -> None:
    readme = """# Galdino & Partner Brand Package

This folder contains an English brand-guideline book derived from the local website project, the approved logo master, compatible editorial visuals, and production-ready logo exports.

## Contents

- `Galdino-and-Partner-Brand-Guidelines.pdf` - 23-page brand guideline book.
- `logos/` - 3 PNG, 3 WebP, and 2 JPG variants.
- `visuals/` - imagegen editorial direction and concept application visuals.
- `logo-manifest.json` - source checksum, dimensions, formats, and output checksums.
- `qa/` - local rendering and verification reports.

## Important

- The logo artwork was not redesigned or recoloured.
- The transparent PNG is byte-for-byte identical to `website/public/assets/gp-logo-brand.png`.
- JPEG cannot support transparency; only white and black background variants are supplied.
- Imagegen visuals are art-direction concepts, not company, client, team, project, or regulatory evidence.
- Unverified business facts and placeholders remain outside this package.
"""
    (brand_dir / "README.md").write_text(readme, encoding="utf-8")


def main() -> None:
    register_fonts()
    workspace = Path(__file__).resolve().parents[2]
    brand_dir = workspace / "outputs" / "galdino_partner" / "brand"
    logo_dir = brand_dir / "logos"
    master_logo = workspace / "outputs" / "galdino_partner" / "website" / "public" / "assets" / "gp-logo-brand.png"
    pdf_path = brand_dir / "Galdino-and-Partner-Brand-Guidelines.pdf"
    assets = prepare_visuals(brand_dir, master_logo)
    book = BrandBook(pdf_path, assets, logo_dir)
    book.build()
    write_readme(brand_dir, pdf_path)
    print(json.dumps({
        "pdf": str(pdf_path.resolve()),
        "pages": book.page,
        "bytes": pdf_path.stat().st_size,
        "sha256": sha256(pdf_path),
        "visuals": {key: str(value.resolve()) for key, value in assets.items()},
    }, indent=2))


if __name__ == "__main__":
    main()
