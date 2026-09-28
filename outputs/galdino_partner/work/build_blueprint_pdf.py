from __future__ import annotations

import re
import sys
from pathlib import Path
from xml.sax.saxutils import escape

from reportlab.lib import colors
from reportlab.lib.colors import HexColor
from reportlab.lib.enums import TA_CENTER, TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import mm
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import (
    BaseDocTemplate,
    Frame,
    HRFlowable,
    Image,
    KeepTogether,
    ListFlowable,
    ListItem,
    LongTable,
    NextPageTemplate,
    PageBreak,
    PageBreakIfNotEmpty,
    PageTemplate,
    Paragraph,
    Preformatted,
    Spacer,
    Table,
    TableStyle,
)


INK = HexColor('#173F3B')
INK_DEEP = HexColor('#0B2D30')
TEAL = HexColor('#0F8C82')
TEAL_LIGHT = HexColor('#DCEDE8')
GOLD = HexColor('#B4862B')
GOLD_LIGHT = HexColor('#F4E8D3')
WARM = HexColor('#F7F3EA')
MIST = HexColor('#EDF2EF')
BODY = HexColor('#263A39')
MUTED = HexColor('#637270')
LINE = HexColor('#D6DFDB')
WHITE = HexColor('#FFFFFF')

PAGE_W, PAGE_H = A4
LEFT = 18 * mm
RIGHT = 18 * mm
TOP = 20 * mm
BOTTOM = 18 * mm
CONTENT_W = PAGE_W - LEFT - RIGHT


def register_fonts() -> None:
    fonts = Path('C:/Windows/Fonts')
    pdfmetrics.registerFont(TTFont('SegoeUI', str(fonts / 'segoeui.ttf')))
    pdfmetrics.registerFont(TTFont('SegoeUI-Bold', str(fonts / 'segoeuib.ttf')))
    pdfmetrics.registerFont(TTFont('SegoeUI-Italic', str(fonts / 'segoeuii.ttf')))
    pdfmetrics.registerFont(TTFont('Consolas', str(fonts / 'consola.ttf')))
    pdfmetrics.registerFont(TTFont('Georgia', str(fonts / 'georgia.ttf')))
    pdfmetrics.registerFont(TTFont('Georgia-Bold', str(fonts / 'georgiab.ttf')))
    pdfmetrics.registerFontFamily(
        'SegoeUI', normal='SegoeUI', bold='SegoeUI-Bold', italic='SegoeUI-Italic'
    )
    pdfmetrics.registerFontFamily(
        'Georgia', normal='Georgia', bold='Georgia-Bold'
    )


class BlueprintDocTemplate(BaseDocTemplate):
    def __init__(self, filename: str, **kwargs):
        super().__init__(filename, **kwargs)
        self._heading_seq = 0
        cover_frame = Frame(0, 0, PAGE_W, PAGE_H, id='cover', leftPadding=0, rightPadding=0, topPadding=0, bottomPadding=0)
        body_frame = Frame(LEFT, BOTTOM, CONTENT_W, PAGE_H - TOP - BOTTOM, id='body', leftPadding=0, rightPadding=0, topPadding=0, bottomPadding=0)
        self.addPageTemplates([
            PageTemplate(id='cover', frames=[cover_frame], onPage=draw_cover),
            PageTemplate(id='body', frames=[body_frame], onPage=draw_body),
        ])

    def afterFlowable(self, flowable):
        if not isinstance(flowable, Paragraph):
            return
        level = getattr(flowable, '_toc_level', None)
        if level is None:
            return
        self._heading_seq += 1
        key = f'heading-{self._heading_seq}'
        self.canv.bookmarkPage(key)
        self.canv.addOutlineEntry(flowable.getPlainText(), key, level=level, closed=False)
        self.notify('TOCEntry', (level, flowable.getPlainText(), self.page, key))


def draw_cover(canvas, doc):
    canvas.saveState()
    canvas.setFillColor(INK_DEEP)
    canvas.rect(0, 0, PAGE_W, PAGE_H, fill=1, stroke=0)
    canvas.setStrokeColor(HexColor('#275855'))
    canvas.setLineWidth(0.7)
    for radius in (45 * mm, 68 * mm, 91 * mm):
        canvas.circle(PAGE_W + 8 * mm, PAGE_H - 24 * mm, radius, fill=0, stroke=1)
    canvas.setFillColor(GOLD)
    canvas.rect(0, 0, 8 * mm, PAGE_H, fill=1, stroke=0)
    canvas.setFillColor(HexColor('#2B625E'))
    canvas.rect(8 * mm, 0, 2 * mm, PAGE_H, fill=1, stroke=0)
    canvas.restoreState()


def draw_body(canvas, doc):
    canvas.saveState()
    canvas.setFillColor(WHITE)
    canvas.rect(0, 0, PAGE_W, PAGE_H, fill=1, stroke=0)
    canvas.setStrokeColor(LINE)
    canvas.setLineWidth(0.45)
    canvas.line(LEFT, PAGE_H - 12.5 * mm, PAGE_W - RIGHT, PAGE_H - 12.5 * mm)
    canvas.setFont('SegoeUI-Bold', 6.8)
    canvas.setFillColor(INK)
    canvas.drawString(LEFT, PAGE_H - 9.2 * mm, 'GALDINO AND PARTNER')
    canvas.setFont('SegoeUI', 6.8)
    canvas.setFillColor(MUTED)
    canvas.drawRightString(PAGE_W - RIGHT, PAGE_H - 9.2 * mm, 'WEBSITE DESIGN BLUEPRINT / 15 JULI 2026')
    canvas.setStrokeColor(LINE)
    canvas.line(LEFT, 10.8 * mm, PAGE_W - RIGHT, 10.8 * mm)
    canvas.setFont('SegoeUI', 6.8)
    canvas.setFillColor(MUTED)
    canvas.drawString(LEFT, 7 * mm, 'Rancangan untuk dipilih - bukan website production')
    canvas.setFillColor(INK)
    canvas.drawRightString(PAGE_W - RIGHT, 7 * mm, str(canvas.getPageNumber()))
    canvas.restoreState()


def make_styles():
    sample = getSampleStyleSheet()
    styles = {}
    styles['CoverKicker'] = ParagraphStyle(
        'CoverKicker', parent=sample['Normal'], fontName='SegoeUI-Bold', fontSize=8.5,
        leading=11, textColor=HexColor('#74D9CC'), tracking=1.2, spaceAfter=12,
    )
    styles['CoverTitle'] = ParagraphStyle(
        'CoverTitle', parent=sample['Title'], fontName='Georgia-Bold', fontSize=30,
        leading=34, textColor=WHITE, alignment=TA_LEFT, spaceAfter=12,
    )
    styles['CoverSubtitle'] = ParagraphStyle(
        'CoverSubtitle', parent=sample['Normal'], fontName='SegoeUI', fontSize=13,
        leading=18, textColor=HexColor('#CFE0DC'), spaceAfter=16,
    )
    styles['CoverMeta'] = ParagraphStyle(
        'CoverMeta', parent=sample['Normal'], fontName='SegoeUI', fontSize=8.4,
        leading=12, textColor=HexColor('#B8CBC7'), spaceAfter=5,
    )
    styles['TOCTitle'] = ParagraphStyle(
        'TOCTitle', parent=sample['Heading1'], fontName='Georgia-Bold', fontSize=23,
        leading=27, textColor=INK, spaceAfter=16,
    )
    styles['H1'] = ParagraphStyle(
        'H1', parent=sample['Heading1'], fontName='Georgia-Bold', fontSize=19,
        leading=23, textColor=INK, spaceBefore=0, spaceAfter=11, keepWithNext=True,
    )
    styles['H2'] = ParagraphStyle(
        'H2', parent=sample['Heading2'], fontName='SegoeUI-Bold', fontSize=12.5,
        leading=16, textColor=TEAL, spaceBefore=8, spaceAfter=5.5, keepWithNext=True,
    )
    styles['H3'] = ParagraphStyle(
        'H3', parent=sample['Heading3'], fontName='SegoeUI-Bold', fontSize=10,
        leading=13, textColor=INK, spaceBefore=8, spaceAfter=5, keepWithNext=True,
    )
    styles['Body'] = ParagraphStyle(
        'Body', parent=sample['BodyText'], fontName='SegoeUI', fontSize=8.7,
        leading=12.6, textColor=BODY, spaceAfter=5.4, allowWidows=0, allowOrphans=0,
    )
    styles['BodySmall'] = ParagraphStyle(
        'BodySmall', parent=styles['Body'], fontSize=7.5, leading=10.4, textColor=MUTED,
    )
    styles['Bullet'] = ParagraphStyle(
        'Bullet', parent=styles['Body'], leftIndent=0, firstLineIndent=0, spaceAfter=2,
    )
    styles['TableHeader'] = ParagraphStyle(
        'TableHeader', parent=styles['Body'], fontName='SegoeUI-Bold', fontSize=7.2,
        leading=8.8, textColor=WHITE, spaceAfter=0,
    )
    styles['TableCell'] = ParagraphStyle(
        'TableCell', parent=styles['Body'], fontSize=6.7, leading=8.5, spaceAfter=0,
    )
    styles['Caption'] = ParagraphStyle(
        'Caption', parent=styles['BodySmall'], fontName='SegoeUI-Italic', alignment=TA_CENTER,
        textColor=MUTED, spaceBefore=4, spaceAfter=8,
    )
    styles['Callout'] = ParagraphStyle(
        'Callout', parent=styles['Body'], fontName='SegoeUI-Bold', fontSize=9,
        leading=13, textColor=INK, spaceAfter=0,
    )
    styles['Code'] = ParagraphStyle(
        'Code', parent=sample['Code'], fontName='Consolas', fontSize=6.5,
        leading=8.7, textColor=INK_DEEP, leftIndent=0,
    )
    return styles


def inline_markup(text: str) -> str:
    text = escape(text.strip())
    text = re.sub(r'\[([^\]]+)\]\(([^)]+)\)', r'<link href="\2" color="#0F756E">\1</link>', text)
    text = re.sub(r'\*\*(.+?)\*\*', r'<b>\1</b>', text)
    text = re.sub(r'(?<!\*)\*([^*]+?)\*(?!\*)', r'<i>\1</i>', text)
    text = re.sub(r'`([^`]+)`', r'<font name="SegoeUI-Bold" color="#0F756E">\1</font>', text)
    return text


def heading_paragraph(text: str, level: int, styles):
    style_name = {1: 'H1', 2: 'H2', 3: 'H3'}[level]
    paragraph = Paragraph(inline_markup(text), styles[style_name])
    paragraph._toc_level = level - 1
    return paragraph


def screenshot_block(path: Path, caption: str, styles):
    image = Image(str(path))
    scale = min(CONTENT_W / image.imageWidth, 105 * mm / image.imageHeight)
    image.drawWidth = image.imageWidth * scale
    image.drawHeight = image.imageHeight * scale
    image.hAlign = 'CENTER'
    return KeepTogether([
        Spacer(1, 3 * mm),
        image,
        Paragraph(caption, styles['Caption']),
    ])


def parse_table(lines, styles):
    rows = []
    for index, line in enumerate(lines):
        cells = [cell.strip() for cell in line.strip().strip('|').split('|')]
        if index == 1 and all(re.fullmatch(r':?-{3,}:?', cell or '') for cell in cells):
            continue
        style = styles['TableHeader'] if not rows else styles['TableCell']
        rows.append([Paragraph(inline_markup(cell), style) for cell in cells])
    if not rows:
        return Spacer(1, 1)
    cols = len(rows[0])
    if cols == 2:
        widths = [CONTENT_W * 0.27, CONTENT_W * 0.73]
    elif cols == 3:
        widths = [CONTENT_W * 0.2, CONTENT_W * 0.4, CONTENT_W * 0.4]
    elif cols == 4:
        widths = [CONTENT_W * 0.18] + [CONTENT_W * 0.2733] * 3
    elif cols == 5:
        widths = [CONTENT_W * 0.15] + [CONTENT_W * 0.2125] * 4
    else:
        widths = [CONTENT_W / cols] * cols
    table = LongTable(rows, colWidths=widths, repeatRows=1, hAlign='LEFT', splitByRow=1)
    commands = [
        ('BACKGROUND', (0, 0), (-1, 0), INK),
        ('TEXTCOLOR', (0, 0), (-1, 0), WHITE),
        ('VALIGN', (0, 0), (-1, -1), 'TOP'),
        ('GRID', (0, 0), (-1, -1), 0.35, LINE),
        ('LEFTPADDING', (0, 0), (-1, -1), 5),
        ('RIGHTPADDING', (0, 0), (-1, -1), 5),
        ('TOPPADDING', (0, 0), (-1, -1), 4),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 4),
    ]
    for row in range(1, len(rows)):
        commands.append(('BACKGROUND', (0, row), (-1, row), WHITE if row % 2 else WARM))
    table.setStyle(TableStyle(commands))
    return table


def bullet_flow(items, ordered, styles):
    list_items = [
        ListItem(Paragraph(inline_markup(text), styles['Bullet']), leftIndent=0)
        for text in items
    ]
    return ListFlowable(
        list_items,
        bulletType='1' if ordered else 'bullet',
        start='1',
        leftIndent=14,
        bulletFontName='SegoeUI-Bold',
        bulletFontSize=7.5,
        bulletColor=TEAL if not ordered else GOLD,
        spaceAfter=6,
    )


def callout(text: str, styles):
    table = Table([[Paragraph(inline_markup(text), styles['Callout'])]], colWidths=[CONTENT_W])
    table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, -1), TEAL_LIGHT),
        ('BOX', (0, 0), (-1, -1), 0.7, TEAL),
        ('LINEBEFORE', (0, 0), (0, -1), 4, GOLD),
        ('LEFTPADDING', (0, 0), (-1, -1), 12),
        ('RIGHTPADDING', (0, 0), (-1, -1), 12),
        ('TOPPADDING', (0, 0), (-1, -1), 10),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 10),
    ]))
    return table


def build_story(markdown_path: Path, asset_root: Path, styles):
    story = []

    # Cover
    story.extend([
        Spacer(1, 37 * mm),
        Paragraph('WEBSITE STRATEGY / UX / SEO / ASTRO', styles['CoverKicker']),
        Paragraph('Blueprint Rancangan Website<br/>Galdino and Partner', styles['CoverTitle']),
        Paragraph('Tiga alternatif desain homepage, strategi content dan SEO, arsitektur teknis Astro, serta decision gate sebelum production.', styles['CoverSubtitle']),
        HRFlowable(width=58 * mm, thickness=2, color=GOLD, hAlign='LEFT', spaceBefore=3, spaceAfter=18),
        Paragraph('<b>Alternatif 01</b>  Modern Clarity - modern tanpa 3D', styles['CoverMeta']),
        Paragraph('<b>Alternatif 02</b>  Institutional Trust - corporate tanpa 3D', styles['CoverMeta']),
        Paragraph('<b>Alternatif 03</b>  Regulatory Constellation - interactive WebGL', styles['CoverMeta']),
        Spacer(1, 30 * mm),
        Table(
            [[Paragraph('<b>STATUS</b><br/>Rancangan untuk dipilih. Belum merupakan website production dan tidak menambahkan klaim firma yang belum disetujui.', styles['CoverMeta'])]],
            colWidths=[128 * mm],
            style=TableStyle([
                ('BACKGROUND', (0, 0), (-1, -1), HexColor('#174642')),
                ('BOX', (0, 0), (-1, -1), 0.6, HexColor('#4C7B76')),
                ('LEFTPADDING', (0, 0), (-1, -1), 12),
                ('RIGHTPADDING', (0, 0), (-1, -1), 12),
                ('TOPPADDING', (0, 0), (-1, -1), 10),
                ('BOTTOMPADDING', (0, 0), (-1, -1), 10),
            ]),
        ),
        Spacer(1, 12 * mm),
        Paragraph('Disusun dari Strategi Website Galdino and Partner - Revisi Perizinan dan SEO Implementation Workflow Playbook. 15 Juli 2026.', styles['CoverMeta']),
        NextPageTemplate('body'),
        PageBreak(),
    ])

    toc_items = [
        '0. Ringkasan keputusan',
        '1. Fondasi bersama untuk ketiga rancangan',
        '2. Mockup 1 - Modern Clarity',
        '3. Mockup 2 - Institutional Trust',
        '4. Mockup 3 - Regulatory Constellation',
        '5. Content strategy lintas desain',
        '6. Arsitektur teknis Astro',
        '7. Best practice website building',
        '8. Perbandingan tiga rancangan',
        '9. Roadmap implementasi',
        '10. KPI dan measurement plan',
        '11. Pertanyaan keputusan sebelum pembuatan Astro',
        '12. Source map dan rujukan',
    ]
    toc_table = Table(
        [[Paragraph(f'<b>{item.split(". ", 1)[0]}</b>', styles['BodySmall']), Paragraph(item.split('. ', 1)[1], styles['Body'])] for item in toc_items],
        colWidths=[12 * mm, CONTENT_W - 12 * mm],
    )
    toc_table.setStyle(TableStyle([
        ('VALIGN', (0, 0), (-1, -1), 'TOP'),
        ('LINEBELOW', (0, 0), (-1, -1), 0.35, LINE),
        ('LEFTPADDING', (0, 0), (-1, -1), 0),
        ('RIGHTPADDING', (0, 0), (-1, -1), 4),
        ('TOPPADDING', (0, 0), (-1, -1), 5),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 5),
    ]))
    story.extend([
        Paragraph('Daftar isi', styles['TOCTitle']),
        Paragraph('Struktur dokumen mengikuti keputusan, tiga konsep, fondasi content/teknis, perbandingan, roadmap, dan decision gate.', styles['Body']),
        Spacer(1, 4 * mm),
        toc_table,
        PageBreak(),
    ])

    lines = markdown_path.read_text(encoding='utf-8').splitlines()
    # Skip the document title/front matter already represented on the cover.
    start = next((i for i, line in enumerate(lines) if line.startswith('## 0.')), 0)
    lines = lines[start:]
    paragraph_buffer = []
    major_count = 0
    i = 0

    def flush_paragraph():
        if paragraph_buffer:
            text = ' '.join(part.strip() for part in paragraph_buffer)
            if text.startswith('**Rekomendasi awal:') or text.startswith('**Default yang direkomendasikan:'):
                story.append(callout(text.replace('**', ''), styles))
                story.append(Spacer(1, 3 * mm))
            else:
                story.append(Paragraph(inline_markup(text), styles['Body']))
            paragraph_buffer.clear()

    while i < len(lines):
        line = lines[i]
        stripped = line.strip()

        if not stripped:
            flush_paragraph()
            i += 1
            continue

        if stripped.startswith('```'):
            flush_paragraph()
            code_lines = []
            i += 1
            while i < len(lines) and not lines[i].strip().startswith('```'):
                code_lines.append(lines[i])
                i += 1
            code = Preformatted('\n'.join(code_lines), styles['Code'])
            wrapper = Table([[code]], colWidths=[CONTENT_W])
            wrapper.setStyle(TableStyle([
                ('BACKGROUND', (0, 0), (-1, -1), MIST),
                ('BOX', (0, 0), (-1, -1), 0.5, LINE),
                ('LEFTPADDING', (0, 0), (-1, -1), 8),
                ('RIGHTPADDING', (0, 0), (-1, -1), 8),
                ('TOPPADDING', (0, 0), (-1, -1), 7),
                ('BOTTOMPADDING', (0, 0), (-1, -1), 7),
            ]))
            story.extend([wrapper, Spacer(1, 3 * mm)])
            i += 1
            continue

        if stripped.startswith('|') and stripped.endswith('|'):
            flush_paragraph()
            table_lines = []
            while i < len(lines) and lines[i].strip().startswith('|') and lines[i].strip().endswith('|'):
                table_lines.append(lines[i])
                i += 1
            story.extend([parse_table(table_lines, styles), Spacer(1, 3 * mm)])
            continue

        if stripped.startswith('## '):
            flush_paragraph()
            major_count += 1
            if major_count > 1:
                story.append(PageBreakIfNotEmpty())
            story.append(heading_paragraph(stripped[3:], 1, styles))
            story.append(HRFlowable(width=26 * mm, thickness=2, color=GOLD, hAlign='LEFT', spaceAfter=8))
            i += 1
            continue

        if stripped.startswith('### '):
            flush_paragraph()
            story.append(heading_paragraph(stripped[4:], 2, styles))
            i += 1
            continue

        if stripped.startswith('#### '):
            flush_paragraph()
            story.append(heading_paragraph(stripped[5:], 3, styles))
            i += 1
            continue

        if stripped in ('---', '***'):
            flush_paragraph()
            next_nonempty = next((candidate.strip() for candidate in lines[i + 1:] if candidate.strip()), '')
            if next_nonempty.startswith('## '):
                i += 1
                continue
            story.append(HRFlowable(width='100%', thickness=0.5, color=LINE, spaceBefore=4, spaceAfter=7))
            i += 1
            continue

        marker_map = {
            '[[MOCKUP_1_SCREENSHOT]]': ('qa/mockup1_desktop.png', 'Preview homepage Mockup 1 - Modern Clarity. Visual placeholder dan wordmark bersifat provisional.'),
            '[[MOCKUP_2_SCREENSHOT]]': ('qa/mockup2_desktop.png', 'Preview homepage Mockup 2 - Institutional Trust. Layout formal menekankan credibility dan readability.'),
            '[[MOCKUP_3_SCREENSHOT]]': ('qa/mockup3_desktop.png', 'Preview homepage Mockup 3 - Regulatory Constellation. Canvas WebGL adalah progressive enhancement dengan fallback statis.'),
        }
        if stripped in marker_map:
            flush_paragraph()
            rel, caption = marker_map[stripped]
            story.append(screenshot_block(asset_root / rel, caption, styles))
            i += 1
            continue

        bullet_match = re.match(r'^-\s+(.+)$', stripped)
        number_match = re.match(r'^\d+\.\s+(.+)$', stripped)
        if bullet_match or number_match:
            flush_paragraph()
            ordered = bool(number_match)
            items = []
            while i < len(lines):
                current = lines[i].strip()
                match = re.match(r'^\d+\.\s+(.+)$', current) if ordered else re.match(r'^-\s+(.+)$', current)
                if not match:
                    break
                items.append(match.group(1))
                i += 1
            story.append(bullet_flow(items, ordered, styles))
            continue

        paragraph_buffer.append(stripped)
        i += 1

    flush_paragraph()
    return story


def main() -> None:
    if len(sys.argv) != 3:
        raise SystemExit('Usage: build_blueprint_pdf.py <markdown> <output.pdf>')
    markdown_path = Path(sys.argv[1]).resolve()
    output_path = Path(sys.argv[2]).resolve()
    output_path.parent.mkdir(parents=True, exist_ok=True)
    register_fonts()
    styles = make_styles()
    asset_root = markdown_path.parent
    story = build_story(markdown_path, asset_root, styles)
    doc = BlueprintDocTemplate(
        str(output_path), pagesize=A4, leftMargin=LEFT, rightMargin=RIGHT,
        topMargin=TOP, bottomMargin=BOTTOM, title='Blueprint Rancangan Website Galdino and Partner',
        author='OpenAI Codex', subject='Website strategy, UX, SEO, and Astro architecture',
    )
    doc.build(story)
    print(output_path)


if __name__ == '__main__':
    main()
