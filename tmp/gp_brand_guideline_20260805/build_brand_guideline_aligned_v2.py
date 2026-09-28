from __future__ import annotations

import importlib.util
import json
from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.enums import TA_LEFT
from reportlab.lib.styles import ParagraphStyle
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import Paragraph


WORKSPACE = Path(__file__).resolve().parents[2]
BASE_PATH = WORKSPACE / "tmp" / "brand" / "build_brand_guideline.py"
SPEC = importlib.util.spec_from_file_location("gp_brand_base", BASE_PATH)
if SPEC is None or SPEC.loader is None:
    raise RuntimeError(f"Cannot load base builder: {BASE_PATH}")
base = importlib.util.module_from_spec(SPEC)
SPEC.loader.exec_module(base)


def register_aligned_fonts(font_dir: Path) -> None:
    files = {
        "BrandSans": font_dir / "Poppins-Regular.ttf",
        "BrandSansItalic": font_dir / "Poppins-Italic.ttf",
        "BrandSansBold": font_dir / "Poppins-SemiBold.ttf",
        "BrandSansHeavy": font_dir / "Poppins-Bold.ttf",
        "BrandDisplay": font_dir / "ClashGrotesk-Regular.ttf",
        "BrandDisplayBold": font_dir / "ClashGrotesk-Semibold.ttf",
    }
    missing = [str(path) for path in files.values() if not path.exists()]
    if missing:
        raise FileNotFoundError(f"Required font files are missing: {missing}")
    for name, path in files.items():
        pdfmetrics.registerFont(TTFont(name, str(path)))


class AlignedBrandBook(base.BrandBook):
    def __init__(self, output: Path, assets: dict[str, Path], logo_dir: Path):
        super().__init__(output, assets, logo_dir)
        self.c.setTitle("Galdino & Partner Brand Guidelines - Aligned Edition")
        self.c.setAuthor("Galdino & Partner by Kultivate")
        self.c.setSubject("Aligned identity, typography, content-integrity, and digital application system")
        self.styles.update(
            {
                "body": ParagraphStyle(
                    "aligned_body",
                    fontName="BrandSans",
                    fontSize=9.5,
                    leading=14.5,
                    textColor=base.BLACK,
                    alignment=TA_LEFT,
                ),
                "body_dark": ParagraphStyle(
                    "aligned_body_dark",
                    fontName="BrandSans",
                    fontSize=9.5,
                    leading=14.8,
                    textColor=base.WHITE,
                    alignment=TA_LEFT,
                ),
                "small": ParagraphStyle(
                    "aligned_small",
                    fontName="BrandSans",
                    fontSize=7.8,
                    leading=11.5,
                    textColor=base.MUTED,
                    alignment=TA_LEFT,
                ),
                "small_dark": ParagraphStyle(
                    "aligned_small_dark",
                    fontName="BrandSans",
                    fontSize=7.8,
                    leading=11.7,
                    textColor=colors.HexColor("#d3d3d4"),
                    alignment=TA_LEFT,
                ),
                "card": ParagraphStyle(
                    "aligned_card",
                    fontName="BrandSans",
                    fontSize=8.7,
                    leading=12.7,
                    textColor=base.BLACK,
                    alignment=TA_LEFT,
                ),
                "card_dark": ParagraphStyle(
                    "aligned_card_dark",
                    fontName="BrandSans",
                    fontSize=8.7,
                    leading=13.0,
                    textColor=base.WHITE,
                    alignment=TA_LEFT,
                ),
            }
        )

    def end(self, source: str = "") -> None:
        ink = colors.HexColor("#bfc0c1") if self.dark else base.MUTED
        rule = colors.HexColor("#333335") if self.dark else base.LINE_STRONG
        self.c.setStrokeColor(rule)
        self.c.setLineWidth(0.5)
        self.c.line(base.M, 24, base.PAGE_W - base.M, 24)
        self.c.setFillColor(ink)
        self.c.setFont("BrandSans", 6.4)
        self.c.drawString(base.M, 11, "GALDINO & PARTNER BY KULTIVATE  /  BRAND GUIDELINES  /  2026")
        if source:
            text = source if len(source) <= 112 else source[:109] + "..."
            self.c.drawCentredString(base.PAGE_W / 2, 11, text)
        self.c.drawRightString(base.PAGE_W - base.M, 11, f"{self.page:02d}")
        self.c.showPage()

    def title(self, text: str, x=base.M, y=base.PAGE_H - 82, size=31, width=520, color=None) -> float:
        ink = color or (base.WHITE if self.dark else base.BLACK)
        style = ParagraphStyle(
            "aligned_title",
            fontName="BrandDisplayBold",
            fontSize=size,
            leading=size * 0.98,
            textColor=ink,
            spaceAfter=0,
        )
        p = Paragraph(base.html.escape(text), style)
        _, height = p.wrap(width, base.PAGE_H)
        p.drawOn(self.c, x, y - height)
        return y - height

    def page_cover(self) -> None:
        self.begin(dark=True)
        self.draw_cover_image(self.assets["editorial_crop"], base.PAGE_W * 0.48, 0, base.PAGE_W * 0.52, base.PAGE_H)
        self.c.setFillColor(colors.Color(0.043, 0.043, 0.047, alpha=0.12))
        self.c.rect(base.PAGE_W * 0.48, 0, base.PAGE_W * 0.52, base.PAGE_H, stroke=0, fill=1)
        self.c.setFillColor(base.RED)
        self.c.rect(0, 0, 9, base.PAGE_H, stroke=0, fill=1)
        self.c.setFillColor(base.GOLD)
        self.c.rect(base.M, base.PAGE_H - 58, 82, 2, stroke=0, fill=1)
        self.c.setFont("BrandSansBold", 8)
        self.c.setFillColor(base.GOLD_DARK_SURFACE)
        self.c.drawString(base.M, base.PAGE_H - 46, "ALIGNED IDENTITY SYSTEM / 2026")
        self.c.setFillColor(base.WHITE)
        self.c.setFont("BrandDisplayBold", 39)
        self.c.drawString(base.M, base.PAGE_H - 148, "BRAND")
        self.c.drawString(base.M, base.PAGE_H - 188, "GUIDELINES")
        self.c.setFont("BrandSans", 9.8)
        self.c.setFillColor(colors.HexColor("#d4d4d5"))
        self.c.drawString(base.M, base.PAGE_H - 214, "Clear rules for identity, typography, evidence, and digital use.")
        self.draw_logo(self.logo_dir / "galdino-partner-logo-transparent.png", base.M, 84, 210)
        self.end("Aligned with the current website, Fase 1, Fase 2, and approved project decisions")

    def page_contents(self) -> None:
        self.begin()
        self.eyebrow("00 / Using this guide")
        self.title("Preserve the identity. Make every rule executable.", size=29, width=690)
        self.status_chip("Aligned decision", base.M, 425)
        self.paragraph(
            "Website implementation is the primary source for structure and behaviour. Confirmed project decisions govern legal identity, publication limits, and prototype status.",
            base.M,
            394,
            335,
        )
        self.status_chip("Operational extension", 410, 425, extension=True)
        self.paragraph(
            "Typography, sizing, responsive formulas, and production checks are explicit so designers, writers, and developers can apply the system consistently.",
            410,
            394,
            355,
        )
        sections = [
            ("01", "Foundation", "Identity, audience, positioning, personality"),
            ("02", "Expression", "Voice, messaging, claims, publication boundaries"),
            ("03", "Identity", "Logo, colour, typography, sizing, layout"),
            ("04", "Experience", "UI, inquiry flow, imagery, motion, accessibility"),
            ("05", "Governance", "Dummy data, approval, launch blockers, sources"),
        ]
        y = 290
        for number, name, detail in sections:
            self.c.setFillColor(base.RED)
            self.c.setFont("BrandDisplayBold", 22)
            self.c.drawString(base.M, y, number)
            self.c.setFillColor(base.BLACK)
            self.c.setFont("BrandSansBold", 10.5)
            self.c.drawString(base.M + 48, y + 3, name)
            self.paragraph(detail, base.M + 185, y + 8, 430, "small")
            self.c.setStrokeColor(base.LINE)
            self.c.line(base.M, y - 16, base.PAGE_W - base.M, y - 16)
            y -= 48
        self.end("Sources: current website codebase; aligned Fase 1 and Fase 2 deliverables; approved decisions")

    def page_foundation(self) -> None:
        self.begin(dark=True)
        self.eyebrow("01 / Foundation")
        self.title("A legal-regulatory brand operated by a confirmed company.", width=520)
        self.status_chip("Confirmed", base.M, 410)
        self.paragraph(
            "Galdino & Partner is a brand operated by PT Karya Usaha Sukses, a limited liability company established in 2015 and domiciled in Kota Tangerang, Banten, Indonesia. The business registration number remains pending from official company records.",
            base.M,
            380,
            415,
        )
        self.c.setFillColor(base.RED)
        self.c.rect(500, 84, 255, 352, stroke=0, fill=1)
        self.c.setFillColor(base.WHITE)
        self.c.setFont("BrandSansBold", 7.5)
        self.c.drawString(524, 399, "PUBLIC DESCRIPTOR")
        self.c.setFont("BrandDisplayBold", 24)
        for index, line in enumerate(("GALDINO", "& PARTNER", "BY KULTIVATE")):
            self.c.drawString(524, 350 - index * 44, line)
        self.c.setStrokeColor(base.GOLD_DARK_SURFACE)
        self.c.setLineWidth(1)
        self.c.line(524, 191, 712, 191)
        self.c.setFont("BrandSans", 8)
        self.c.drawString(524, 170, "OPERATOR")
        self.c.setFont("BrandSansBold", 10)
        self.c.drawString(524, 150, "PT KARYA USAHA SUKSES")
        self.c.setFont("BrandSans", 7.2)
        self.c.drawString(524, 115, "REGISTRATION NUMBER: PENDING VERIFICATION")
        self.end("Approved decisions 3 and 10; aligned discovery and website brand blueprint")

    def page_positioning(self) -> None:
        self.begin()
        self.eyebrow("01 / Foundation")
        self.title("Four service pillars. One ordered regulatory journey.", width=680)
        self.status_chip("Website current", base.M, 415)
        self.paragraph(
            "The website presents four primary categories: Business Establishment & Legality, Risk-Based Licensing, Compliance & Legal Advisory, and Project & Investment Licensing.",
            base.M,
            386,
            360,
        )
        self.status_chip("Prototype scope", 450, 415, extension=True)
        self.paragraph(
            "The 15 detailed service items shown in the high-fidelity prototype remain a prototype catalogue under these four categories. They are not separate approved claims.",
            450,
            386,
            330,
        )
        steps = ["ASSESS", "MAP", "PREPARE", "COORDINATE", "MONITOR", "FOLLOW UP"]
        y = 222
        x = base.M
        for index, step in enumerate(steps):
            width = 103
            self.c.setFillColor(base.RED if index in (0, 5) else base.BLACK)
            self.c.rect(x, y, width, 54, stroke=0, fill=1)
            self.c.setFillColor(base.WHITE)
            self.c.setFont("BrandSansBold", 7.5)
            self.c.drawCentredString(x + width / 2, y + 23, step)
            if index < len(steps) - 1:
                self.c.setStrokeColor(base.GOLD)
                self.c.line(x + width, y + 27, x + width + 17, y + 27)
            x += 120
        self.paragraph(
            "Lead with permit handling and operational clarity. Legal capability supports the journey. Never promise outcomes controlled by an authority.",
            base.M,
            188,
            650,
            "small",
        )
        self.end("Sources: current site service data; approved decision 5; aligned architecture workbook")

    def page_messaging(self) -> None:
        self.begin()
        self.eyebrow("02 / Expression")
        self.title("Message architecture: activity, problem, support, next step.", width=720)
        rows = [
            ("ACTIVITY", "Name the business activity, entity action, project, or compliance event."),
            ("PROBLEM", "Explain the classification, risk, document, authority, or sequencing issue."),
            ("SUPPORT", "State how Galdino & Partner maps, prepares, coordinates, monitors, or reviews."),
            ("NEXT STEP", "Invite a consultation or inquiry. Use one consistent intent across navigation and content."),
            ("BOUNDARY", "State that information is general and outcomes remain subject to the relevant authority."),
        ]
        y = 383
        for index, (label, body) in enumerate(rows):
            self.c.setFillColor(base.RED if index < 4 else base.RED_DEEP)
            self.c.rect(base.M, y - 25, 110, 42, stroke=0, fill=1)
            self.c.setFillColor(base.WHITE)
            self.c.setFont("BrandSansBold", 7.4)
            self.c.drawCentredString(base.M + 55, y - 7, label)
            self.paragraph(body, base.M + 135, y + 5, 585, "body")
            self.c.setStrokeColor(base.LINE)
            self.c.line(base.M + 135, y - 31, base.PAGE_W - base.M, y - 31)
            y -= 66
        self.c.setFillColor(base.BLACK)
        self.c.setFont("BrandSansItalic", 8)
        self.c.drawString(
            base.M,
            55,
            "Required disclaimer: Information on this website is general and does not constitute legal advice for a specific matter.",
        )
        self.end("Sources: current website copy; aligned CTA and routing workbook")

    def page_claims(self) -> None:
        self.begin(dark=True)
        self.eyebrow("02 / Expression")
        self.title("Distinguish confirmed facts, pending facts, and prototype content.", width=690)
        columns = [
            (
                "CONFIRMED",
                [
                    "Brand display name",
                    "PT Karya Usaha Sukses operator",
                    "Established 2015",
                    "Kota Tangerang, Banten",
                    "Four primary service categories",
                    "Indonesian and English routes",
                ],
            ),
            (
                "PENDING VERIFICATION",
                [
                    "Registration number",
                    "Public firm phone and email",
                    "Official office address",
                    "Privacy and Terms copy",
                    "Credentials and project outcomes",
                    "Target domain purchase",
                ],
            ),
            (
                "PROTOTYPE ONLY",
                [
                    "Three named team profiles",
                    "15 detailed service items",
                    "Six localized article entries",
                    "Project and experience cards",
                    "Statistics and client marks",
                    "Prices and timelines",
                ],
            ),
        ]
        x = base.M
        for index, (title, items) in enumerate(columns):
            self.c.setFillColor(colors.HexColor("#171719"))
            self.c.setStrokeColor(colors.HexColor("#333336"))
            self.c.rect(x, 88, 224, 302, stroke=1, fill=1)
            accent = base.RED if index == 0 else base.GOLD_DARK_SURFACE
            self.c.setFillColor(accent)
            self.c.rect(x, 386, 224, 4, stroke=0, fill=1)
            self.c.setFillColor(base.WHITE)
            self.c.setFont("BrandSansBold", 8)
            self.c.drawString(x + 15, 358, title)
            y = 320
            for item in items:
                self.c.setFillColor(accent)
                self.c.circle(x + 18, y + 3, 2, stroke=0, fill=1)
                self.c.setFillColor(base.WHITE)
                self.c.setFont("BrandSans", 8.6)
                self.c.drawString(x + 30, y, item)
                y -= 40
            x += 246
        self.end("Sources: approved decisions 2-7 and 9; dummy and placeholder register")

    def page_typography(self) -> None:
        self.begin(dark=True)
        self.eyebrow("03 / Identity")
        self.title("Poppins anchors the system. Clash Grotesk adds measured display contrast.", width=720)
        self.status_chip("Typography update", base.M, 420)
        self.c.setFillColor(base.WHITE)
        self.c.setFont("BrandDisplayBold", 72)
        self.c.drawString(base.M, 285, "Aa")
        self.c.setFont("BrandSansBold", 8)
        self.c.setFillColor(base.GOLD_DARK_SURFACE)
        self.c.drawString(base.M, 255, "ANCHOR / PRIMARY FAMILY")
        self.c.setFillColor(base.WHITE)
        self.c.setFont("BrandSansHeavy", 24)
        self.c.drawString(base.M, 222, "Poppins")
        self.c.setFont("BrandSans", 8.7)
        self.c.drawString(base.M, 198, "Body, navigation, labels, forms, metadata, long-form content")
        self.c.setFont("BrandSansBold", 8)
        self.c.setFillColor(base.GOLD_DARK_SURFACE)
        self.c.drawString(base.M, 156, "DISPLAY COMPANION")
        self.c.setFillColor(base.WHITE)
        self.c.setFont("BrandDisplayBold", 25)
        self.c.drawString(base.M, 122, "Clash Grotesk")
        self.c.setFont("BrandSans", 8.7)
        self.c.drawString(base.M, 98, "Hero, H1-H2, selected numerical or campaign emphasis only")

        self.c.setFillColor(colors.HexColor("#171719"))
        self.c.rect(420, 84, 357, 316, stroke=0, fill=1)
        samples = [
            ("HERO / CLASH 600", 31, "Clarity for business action."),
            ("SECTION / CLASH 600", 22, "Ordered regulatory steps."),
            ("CARD / POPPINS 600", 15, "Risk-Based Licensing"),
            ("BODY / POPPINS 400", 10, "Explain regulations clearly without reducing legal nuance."),
            ("LABEL / POPPINS 600", 7, "PERMIT PROCESS"),
        ]
        y = 360
        for label, size, sample in samples:
            self.c.setFillColor(base.GOLD_DARK_SURFACE)
            self.c.setFont("BrandSansBold", 5.8)
            self.c.drawString(440, y, label)
            self.c.setFillColor(base.WHITE)
            font = "BrandDisplayBold" if "CLASH" in label else ("BrandSansBold" if "600" in label else "BrandSans")
            self.c.setFont(font, size)
            self.c.drawString(440, y - size - 4, sample)
            y -= 63 if size < 20 else 75
        self.end("Sources: Google Fonts Poppins; Fontshare Clash Grotesk; Fonts In Use pairing references")

    def page_typography_decision(self) -> None:
        self.begin()
        self.eyebrow("03 / Identity")
        self.title("The selected pair preserves the modern tone without feeling generic.", width=720)
        cards = [
            (
                "POPPINS / SELECTED ANCHOR",
                "Google Fonts availability, broad weight range, strong multilingual utility, and a documented history as a workhorse in web and identity systems.",
                base.RED,
            ),
            (
                "CLASH GROTESK / COMPANION",
                "Used only where display contrast is useful. It adds sharper apertures and confident large-scale rhythm without replacing Poppins as the anchor.",
                base.GOLD,
            ),
            (
                "FONT IN USE LOGIC",
                "Inetum pairs Poppins with PP Monument: a workhorse sans plus a more expressive grotesk. This system adapts that contrast logic with Clash Grotesk.",
                base.BLACK,
            ),
            (
                "CONTINUITY",
                "The prior Aptos and Segoe direction remains the fallback logic. The change is a typography refinement, not a logo, colour, voice, or architecture redesign.",
                base.RED_DEEP,
            ),
        ]
        positions = [(base.M, 264), (base.M + 365, 264), (base.M, 86), (base.M + 365, 86)]
        for (title, body, accent), (x, y) in zip(cards, positions):
            self.card(x, y, 336, 145, title, body, accent=accent)
        self.end("Reference: fontsinuse.com/uses/54197/inetum; fontsinuse.com/typefaces/45323/poppins")

    def page_type_scale(self) -> None:
        self.begin(dark=True)
        self.eyebrow("03 / Identity")
        self.title("A 1.25 scale gives every size a clear job.", width=620)
        self.status_chip("CSS pixels", base.M, 420)
        self.paragraph(
            "The samples below use a CSS-to-PDF reference of 1 px = 0.75 pt. Browser implementation must use rem and clamp values; the px labels remain the shared design handoff.",
            base.M,
            390,
            700,
            "small",
        )
        scale = [
            (12, "Micro label", "Poppins 600", 0.09),
            (14, "UI label", "Poppins 600", 0.01),
            (16, "Body", "Poppins 400", 0.00),
            (20, "Lead", "Poppins 400", -0.01),
            (25, "Card title", "Poppins 600", -0.015),
            (31, "H3", "Clash 600", -0.02),
            (39, "H2", "Clash 600", -0.025),
            (49, "H1", "Clash 600", -0.03),
            (61, "Display", "Clash 600", -0.03),
            (76, "Hero", "Clash 600", -0.035),
        ]
        x = base.M
        y = 335
        for index, (px, role, font_label, tracking) in enumerate(scale):
            col = 0 if index < 5 else 1
            row = index if index < 5 else index - 5
            x = base.M + col * 375
            y = 333 - row * 58
            pt = px * 0.75
            self.c.setFillColor(base.GOLD_DARK_SURFACE if col else base.RED_BRIGHT)
            self.c.setFont("BrandSansBold", 7)
            self.c.drawString(x, y + 12, f"{px}px")
            self.c.setFillColor(base.WHITE)
            font = "BrandDisplayBold" if "Clash" in font_label else ("BrandSansBold" if "600" in font_label else "BrandSans")
            self.c.setFont(font, min(pt, 26))
            self.c.drawString(x + 48, y, "Aa")
            self.c.setFont("BrandSans", 7.2)
            self.c.setFillColor(colors.HexColor("#d3d3d4"))
            self.c.drawString(x + 105, y + 7, f"{role} / {font_label} / tracking {tracking:+.3f}em")
            self.c.setStrokeColor(colors.HexColor("#333336"))
            self.c.line(x, y - 14, x + 335, y - 14)
        self.c.setFillColor(base.RED_DEEP)
        self.c.rect(base.M, 49, base.PAGE_W - 2 * base.M, 27, stroke=0, fill=1)
        self.c.setFillColor(base.WHITE)
        self.c.setFont("BrandSansBold", 7)
        self.c.drawString(base.M + 12, 59, "96PX IS THE ABSOLUTE DISPLAY CEILING. BODY, LEGAL COPY, FORMS, SERVICES, AND PROFILES NEVER DROP BELOW 16PX.")
        self.end("Scale: 12, 14, 16, 20, 25, 31, 39, 49, 61, 76, 96 px")

    def page_type_roles(self) -> None:
        self.begin()
        self.eyebrow("03 / Identity")
        self.title("Semantic roles translate the scale into repeatable decisions.", width=700)
        roles = [
            ("Hero", "Clash 600", "48-76 px", "0.96", "-0.035em", "10-12ch"),
            ("Page H1", "Clash 600", "44-61 px", "1.00", "-0.030em", "12-16ch"),
            ("Section H2", "Clash 600", "32-49 px", "1.05", "-0.025em", "18-24ch"),
            ("H3", "Clash 600", "25-31 px", "1.12", "-0.020em", "28ch"),
            ("Card title", "Poppins 600", "20-25 px", "1.18", "-0.015em", "24ch"),
            ("Lead", "Poppins 400", "20 px", "1.50", "-0.010em", "55ch"),
            ("Body / legal", "Poppins 400", "16 px", "1.65", "0", "60-70ch"),
            ("Nav / button", "Poppins 600", "14-16 px", "1.25", "0", "one line"),
            ("Metadata", "Poppins 400", "14 px", "1.55", "0", "45-60ch"),
            ("Micro label", "Poppins 600", "12 px", "1.30", "+0.09em", "short only"),
        ]
        headers = ["ROLE", "FONT", "SIZE", "LH", "TRACK", "MEASURE"]
        widths = [115, 130, 95, 55, 80, 100]
        x0 = base.M
        y = 386
        self.c.setFillColor(base.BLACK)
        self.c.rect(x0, y, sum(widths), 30, stroke=0, fill=1)
        x = x0
        for header, width in zip(headers, widths):
            self.c.setFillColor(base.WHITE)
            self.c.setFont("BrandSansBold", 6.8)
            self.c.drawString(x + 8, y + 11, header)
            x += width
        y -= 31
        for index, row in enumerate(roles):
            bg = base.WHITE if index % 2 == 0 else base.SOFT
            self.c.setFillColor(bg)
            self.c.rect(x0, y - 29, sum(widths), 29, stroke=0, fill=1)
            x = x0
            for col, (value, width) in enumerate(zip(row, widths)):
                self.c.setFillColor(base.RED_DEEP if col == 0 else base.BLACK)
                self.c.setFont("BrandSansBold" if col in (0, 2) else "BrandSans", 7.1)
                self.c.drawString(x + 8, y - 18, value)
                x += width
            y -= 30
        self.paragraph(
            "Exception rule: 12 px is reserved for short uppercase labels and non-critical annotations. It is never used for form values, service descriptions, profile facts, disclaimers, navigation, or article summaries.",
            base.M,
            68,
            700,
            "small",
        )
        self.end("Typography roles approved for design handoff; codebase remains unchanged")

    def page_type_responsive(self) -> None:
        self.begin(dark=True)
        self.eyebrow("03 / Identity")
        self.title("Fluid headings. Fixed body. Predictable reading.", width=650)
        formulas = [
            ("HERO", "clamp(3rem, 4.8vw + 0.5rem, 4.75rem)", "48-76 px"),
            ("H1", "clamp(2.75rem, 4vw + 0.5rem, 3.8125rem)", "44-61 px"),
            ("H2", "clamp(2rem, 3vw + 0.5rem, 3.0625rem)", "32-49 px"),
            ("H3", "clamp(1.5625rem, 1.5vw + 0.5rem, 1.9375rem)", "25-31 px"),
            ("BODY", "1rem", "16 px fixed"),
            ("SMALL", "0.875rem", "14 px fixed"),
        ]
        y = 382
        for index, (role, formula, range_text) in enumerate(formulas):
            accent = base.RED if index < 4 else base.GOLD
            self.c.setFillColor(accent)
            self.c.rect(base.M, y - 17, 90, 32, stroke=0, fill=1)
            self.c.setFillColor(base.WHITE if accent == base.RED else base.BLACK)
            self.c.setFont("BrandSansBold", 7.2)
            self.c.drawCentredString(base.M + 45, y - 4, role)
            self.c.setFillColor(base.WHITE)
            self.c.setFont("BrandSans", 9)
            self.c.drawString(base.M + 112, y - 5, formula)
            self.c.setFillColor(base.GOLD_DARK_SURFACE)
            self.c.setFont("BrandSansBold", 8)
            self.c.drawRightString(base.PAGE_W - base.M, y - 5, range_text)
            self.c.setStrokeColor(colors.HexColor("#333336"))
            self.c.line(base.M + 112, y - 28, base.PAGE_W - base.M, y - 28)
            y -= 55
        self.c.setFillColor(base.RED_DEEP)
        self.c.rect(base.M, 48, base.PAGE_W - 2 * base.M, 45, stroke=0, fill=1)
        self.c.setFillColor(base.WHITE)
        self.c.setFont("BrandSansBold", 7.2)
        self.c.drawString(base.M + 12, 74, "RESPONSIVE RULE")
        self.c.setFont("BrandSans", 7.4)
        self.c.drawString(base.M + 120, 74, "Scale the heading and its container together. Keep body measure at 60-70ch and preserve 200% zoom reflow.")
        self.c.drawString(base.M + 120, 59, "Use rem in code. Pixel values are design handoff references, not hardcoded body sizes.")
        self.end("Accessibility target: WCAG 2.2 AA; zoomable; no body text below 16 px")

    def page_type_rhythm(self) -> None:
        self.begin()
        self.eyebrow("03 / Identity")
        self.title("Line-height and spacing share one vertical rhythm.", width=670)
        self.status_chip("Base rhythm", base.M, 420)
        self.c.setFillColor(base.BLACK)
        self.c.setFont("BrandDisplayBold", 40)
        self.c.drawString(base.M, 333, "16 / 26")
        self.c.setFont("BrandSansBold", 8)
        self.c.setFillColor(base.RED)
        self.c.drawString(base.M, 302, "BODY SIZE / LINE BOX IN CSS PX")
        self.paragraph(
            "The 26 px body line box is the reading unit. Paragraph gaps use 16 or 24 px. Section spacing uses 72, 88, or 112 px depending on hierarchy. Avoid arbitrary one-off gaps.",
            base.M,
            276,
            300,
            "body",
        )
        self.c.setFillColor(base.WHITE)
        self.c.setStrokeColor(base.LINE_STRONG)
        self.c.rect(380, 96, 395, 314, stroke=1, fill=1)
        self.c.setFillColor(colors.Color(0.77, 0.08, 0.16, alpha=0.10))
        for i in range(11):
            yy = 116 + i * 26 * 0.8
            self.c.rect(400, yy, 355, 1, stroke=0, fill=1)
        self.c.setFillColor(base.BLACK)
        self.c.setFont("BrandSansBold", 19)
        self.c.drawString(405, 355, "Regulatory clarity")
        self.c.setFont("BrandSans", 12)
        copy = [
            "Map the business activity and risk level.",
            "Prepare the evidence and supporting documents.",
            "Coordinate the filing path and next action.",
        ]
        yy = 304
        for line in copy:
            self.c.drawString(405, yy, line)
            yy -= 36
        self.c.setStrokeColor(base.RED)
        self.c.setLineWidth(2)
        self.c.line(405, 180, 720, 180)
        self.c.setFillColor(base.MUTED)
        self.c.setFont("BrandSans", 8)
        self.c.drawString(405, 157, "Measure: 60-70ch / paragraph gap: 16-24 px / heading gap: 24-40 px")
        self.end("Spacing reference: 8 px grid with a 26 px reading rhythm")

    def page_type_implementation(self) -> None:
        self.begin(dark=True)
        self.eyebrow("03 / Identity")
        self.title("Implementation tokens keep design and code in one language.", width=690)
        code_lines = [
            ':root {',
            '  --font-display: "Clash Grotesk", "Aptos Display", "Segoe UI", sans-serif;',
            '  --font-text: "Poppins", Aptos, "Segoe UI", sans-serif;',
            '  --text-body: 1rem;',
            '  --text-lead: 1.25rem;',
            '  --text-h2: clamp(2rem, 3vw + .5rem, 3.0625rem);',
            '  --text-hero: clamp(3rem, 4.8vw + .5rem, 4.75rem);',
            '  --leading-body: 1.625;',
            '  --tracking-display: -0.03em;',
            '}',
        ]
        self.c.setFillColor(colors.HexColor("#171719"))
        self.c.setStrokeColor(colors.HexColor("#333336"))
        self.c.rect(base.M, 92, 475, 312, stroke=1, fill=1)
        y = 376
        for line in code_lines:
            self.c.setFillColor(base.GOLD_DARK_SURFACE if line.strip().startswith("--") else base.WHITE)
            self.c.setFont("Courier", 8)
            self.c.drawString(base.M + 18, y, line)
            y -= 25
        self.card(
            545,
            255,
            232,
            149,
            "LOAD",
            "Self-host WOFF2. Use font-display: swap. Preload only Poppins Regular and the display weight used above the fold.",
            dark=True,
            accent=base.RED,
        )
        self.card(
            545,
            92,
            232,
            149,
            "FALLBACK",
            "Retain Aptos and Segoe UI in the stack. Test metric shift. Do not link Google Fonts from a production HTML head.",
            dark=True,
            accent=base.GOLD,
        )
        self.end("Font files: Google Fonts Poppins; Fontshare Clash Grotesk; implementation remains pending")

    def page_type_audit(self) -> None:
        self.begin()
        self.eyebrow("03 / Identity")
        self.title("The guideline sets a migration target. It does not claim the code is already updated.", width=720)
        findings = [
            ("CURRENT STACK", "Aptos Display / Aptos with Segoe UI and system fallbacks."),
            ("SIZE VALUES", "120 font-size declarations use 73 unique values."),
            ("BELOW 16 PX", "Many service, profile, form, navigation, and article strings render below the new body minimum."),
            ("WEIGHT VALUES", "17 distinct font-weight values create unnecessary role fragmentation."),
            ("DISPLAY LIMIT", "One 101.6 px maximum and one -0.08em tracking value exceed the new ceiling."),
            ("ACTION", "Adopt semantic tokens in a future code change. This document does not modify the website."),
        ]
        positions = [(base.M, 285), (base.M + 246, 285), (base.M + 492, 285), (base.M, 115), (base.M + 246, 115), (base.M + 492, 115)]
        for index, ((title, body), (x, y)) in enumerate(zip(findings, positions)):
            self.card(x, y, 224, 140, title, body, accent=base.RED if index in (0, 5) else base.GOLD)
        self.end("Read-only typography audit; Impeccable detector plus literal CSS review")

    def page_inquiry_experience(self) -> None:
        self.begin()
        self.eyebrow("04 / Experience")
        self.title("A focused inquiry flow with an explicit completion state.", width=680)
        steps = [
            ("FORM", "Contact page collects the required inquiry details."),
            ("API", "Submission routes through /api/contact."),
            ("RESEND", "Email delivery uses Resend only for the current phase."),
            ("THANK YOU", "A pop-up style modal confirms successful submission inline."),
        ]
        x = base.M
        for index, (label, body) in enumerate(steps):
            self.c.setFillColor(base.RED if index in (0, 3) else base.BLACK)
            self.c.rect(x, 235, 165, 128, stroke=0, fill=1)
            self.c.setFillColor(base.WHITE)
            self.c.setFont("BrandDisplayBold", 17)
            self.c.drawString(x + 14, 327, label)
            p = Paragraph(
                base.html.escape(body),
                ParagraphStyle("inquiry", fontName="BrandSans", fontSize=7.7, leading=11.5, textColor=base.WHITE),
            )
            _, h = p.wrap(137, 70)
            p.drawOn(self.c, x + 14, 300 - h)
            if index < len(steps) - 1:
                self.c.setStrokeColor(base.GOLD)
                self.c.setLineWidth(1)
                self.c.line(x + 165, 299, x + 184, 299)
            x += 184
        self.status_chip("Publication boundary", base.M, 180, extension=True)
        self.paragraph(
            "The current phone and email are Kultivate project contacts, not approved public Galdino & Partner contacts. The target domain galdinopartner.co.id is not yet purchased. Privacy and Terms remain unavailable.",
            base.M,
            151,
            700,
            "body",
        )
        self.end("Approved decisions 2, 7, 8, 9, and 11; aligned action and routing workbook")

    def page_governance(self) -> None:
        self.begin()
        self.eyebrow("05 / Governance")
        self.title("Prototype visibility never converts dummy data into company fact.", width=690)
        workflow = [
            ("LABEL", "Mark dummy, placeholder, preview-only, and pending-verification content at its source."),
            ("EXCLUDE", "Keep dummy facts out of metadata, structured data, legal notices, and launch claims."),
            ("VERIFY", "Confirm registration, public contacts, address, credentials, privacy, terms, and domain ownership."),
            ("APPROVE", "Record business, legal, content, and asset approval before a status changes."),
            ("REMOVE", "Before launch, replace or remove every blocker that is not approved for publication."),
        ]
        y = 390
        for index, (label, body) in enumerate(workflow, 1):
            self.c.setFillColor(base.RED)
            self.c.setFont("BrandDisplayBold", 22)
            self.c.drawString(base.M, y, f"{index:02d}")
            self.c.setFillColor(base.BLACK)
            self.c.setFont("BrandSansBold", 8)
            self.c.drawString(base.M + 48, y + 5, label)
            self.paragraph(body, base.M + 145, y + 10, 590, "small")
            self.c.setStrokeColor(base.LINE)
            self.c.line(base.M + 48, y - 20, base.PAGE_W - base.M, y - 20)
            y -= 67
        self.c.setFillColor(base.RED_DEEP)
        self.c.rect(base.M, 50, base.PAGE_W - 2 * base.M, 34, stroke=0, fill=1)
        self.c.setFillColor(base.WHITE)
        self.c.setFont("BrandSansBold", 6.9)
        self.c.drawString(base.M + 12, 63, "HIGH-FIDELITY PROTOTYPE CONTENT MAY REMAIN ON STAGING. IT MUST NOT BE PRESENTED AS FINAL FACT OR SHIP UNREVIEWED.")
        self.end("Sources: dummy and placeholder register; approved launch and prototype decisions")

    def page_asset_package(self) -> None:
        self.begin(dark=True)
        self.eyebrow("05 / Governance")
        self.title("This aligned edition extends the existing brand package.", width=680)
        rows = [
            ("ORIGINAL", "Galdino-and-Partner-Brand-Guidelines.pdf remains unchanged", "preserved"),
            ("ALIGNED PDF", "New edition with confirmed facts and explicit typography", "new"),
            ("TYPOGRAPHY", "Poppins anchor, Clash Grotesk companion, numeric scale", "updated"),
            ("LOGO", "Approved master and exports remain unchanged", "preserved"),
            ("PALETTE", "Red-led palette remains unchanged", "preserved"),
            ("GOVERNANCE", "Prototype, preview-only, contact, domain, and launch status", "updated"),
        ]
        y = 385
        for label, detail, status in rows:
            self.c.setFillColor(base.RED)
            self.c.rect(base.M, y - 17, 95, 32, stroke=0, fill=1)
            self.c.setFillColor(base.WHITE)
            self.c.setFont("BrandSansBold", 7.2)
            self.c.drawCentredString(base.M + 47.5, y - 4, label)
            self.c.setFont("BrandSans", 8.7)
            self.c.drawString(base.M + 118, y - 5, detail)
            self.c.setFillColor(base.GOLD_DARK_SURFACE)
            self.c.setFont("BrandSansBold", 7.5)
            self.c.drawRightString(base.PAGE_W - base.M, y - 5, status.upper())
            self.c.setStrokeColor(colors.HexColor("#333336"))
            self.c.line(base.M + 118, y - 28, base.PAGE_W - base.M, y - 28)
            y -= 55
        self.paragraph(
            "The logo artwork, transparent master, colour values, and approved application direction are not redesigned by this edition.",
            base.M,
            62,
            720,
            "small",
        )
        self.end("Original guideline preserved; aligned edition created as a separate file")

    def page_sources(self) -> None:
        self.begin()
        self.eyebrow("05 / Governance")
        self.title("Source and decision register.", width=560)
        sources = [
            ("Website", "outputs/galdino_partner/website/src/ and public/"),
            ("Aligned discovery", "GP_Fase1_Discovery_Aligned_2026-08-05.docx"),
            ("Aligned blueprint", "GP_Fase2_Website_Brand_Blueprint_Aligned_2026-08-05.docx"),
            ("Architecture", "GP_Fase2_Architecture_Workbook_Aligned_2026-08-05.xlsx"),
            ("Routing", "GP_Fase2_Action_Routing_Workbook_Aligned_2026-08-05.xlsx"),
            ("Data governance", "GP_Dummy_Placeholder_Register_2026-08-05.xlsx"),
            ("Decisions", "User approvals recorded on 2026-08-05"),
            ("Typography research", "fontsinuse.com; fonts.google.com/specimen/Poppins; fontshare.com/fonts/clash-grotesk"),
        ]
        y = 395
        for category, value in sources:
            self.c.setFillColor(base.RED)
            self.c.setFont("BrandSansBold", 7.8)
            self.c.drawString(base.M, y, category.upper())
            self.paragraph(value, base.M + 150, y + 7, 585, "small")
            self.c.setStrokeColor(base.LINE)
            self.c.line(base.M + 150, y - 18, base.PAGE_W - base.M, y - 18)
            y -= 44
        self.c.setFillColor(base.BLACK)
        self.c.setFont("BrandSansBold", 8)
        self.c.drawString(base.M, 54, "SCOPE NOTE")
        self.paragraph(
            "This document records the current brand system and approved project statuses. It does not purchase the target domain, approve public contacts, validate the pending registration number, or convert prototype content into final company fact.",
            base.M + 105,
            62,
            630,
            "small",
        )
        self.end("Aligned on 2026-08-05; original sources and website code remain unchanged")

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
            self.page_typography_decision,
            self.page_type_scale,
            self.page_type_roles,
            self.page_type_responsive,
            self.page_type_rhythm,
            self.page_type_implementation,
            self.page_type_audit,
            self.page_layout,
            self.page_ui_motion,
            self.page_inquiry_experience,
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


def main() -> None:
    font_dir = WORKSPACE / "tmp" / "gp_brand_guideline_20260805" / "fonts"
    register_aligned_fonts(font_dir)
    source_brand = WORKSPACE / "outputs" / "galdino_partner" / "brand"
    output_dir = WORKSPACE / "outputs" / "galdino_partner" / "alignment_2026-08-05"
    output_dir.mkdir(parents=True, exist_ok=True)
    logo_dir = source_brand / "logos"
    master_logo = WORKSPACE / "outputs" / "galdino_partner" / "website" / "public" / "assets" / "gp-logo-brand.png"
    pdf_path = output_dir / "GP_Brand_Guidelines_Aligned_2026-08-05.pdf"
    assets = {
        "editorial": source_brand / "visuals" / "editorial-regulatory-system.png",
        "editorial_crop": source_brand / "visuals" / "editorial-regulatory-system-crop.jpg",
        "stationery": source_brand / "visuals" / "stationery-application.png",
    }
    book = AlignedBrandBook(pdf_path, assets, logo_dir)
    book.build()
    print(
        json.dumps(
            {
                "pdf": str(pdf_path.resolve()),
                "pages": book.page,
                "bytes": pdf_path.stat().st_size,
                "sha256": base.sha256(pdf_path),
            },
            indent=2,
        )
    )


if __name__ == "__main__":
    main()
