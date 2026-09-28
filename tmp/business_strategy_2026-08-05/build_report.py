from __future__ import annotations

import json
import os
import sys
from pathlib import Path

from docx import Document
from docx.enum.section import WD_ORIENT
from docx.enum.table import WD_CELL_VERTICAL_ALIGNMENT, WD_ROW_HEIGHT_RULE, WD_TABLE_ALIGNMENT
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.oxml import OxmlElement
from docx.oxml.ns import qn
from docx.shared import Inches, Pt, RGBColor

from strategy_data import (
    SOURCE_REGISTER, CRITERIA, SERVICES, TYPE_MAP, SCENARIO_WEIGHTS, SCENARIOS,
    CONFLICTS, MISSING, RISKS, WEBSITE_IA, CONTENT_STRATEGY, ROADMAP,
    FINAL_CHOICES, DECISION_TREE,
)


HERE = Path(__file__).resolve().parent
OUTPUT_DIR = Path(r"C:\Users\Joshua\OneDrive\Documents\Law\outputs\galdino_partner\business_strategy_2026-08-05")
OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
DOCX_PATH = OUTPUT_DIR / "GP_Business_Service_Portfolio_Strategy_2026-08-05.docx"
JSON_PATH = HERE / "strategy_data.json"


# standard_business_brief preset + named Galdino brand-color override.
PAGE_W = 12240
PAGE_H = 15840
MARGIN = 1440
CONTENT_W = 9360
TABLE_INDENT = 120
FONT = "Calibri"
BODY_SIZE = 11
INK = "202124"
MUTED = "5F6368"
BRAND_RED = "8B1E2D"
BRAND_RED_DARK = "5E1320"
BRAND_GOLD = "B28A45"
BLUE = "2E74B5"
DARK_BLUE = "1F4D78"
LIGHT_GRAY = "F2F4F7"
PALE_RED = "F8EDEF"
PALE_GOLD = "FBF6EA"
PALE_GREEN = "EAF4EE"
PALE_YELLOW = "FFF4D6"
PALE_BLUE = "E8EEF5"
WHITE = "FFFFFF"
RED = "9B1C1C"


def set_cell_shading(cell, fill):
    tc_pr = cell._tc.get_or_add_tcPr()
    shd = tc_pr.find(qn("w:shd"))
    if shd is None:
        shd = OxmlElement("w:shd")
        tc_pr.append(shd)
    shd.set(qn("w:fill"), fill)


def set_cell_margins(cell, top=80, start=120, bottom=80, end=120):
    tc = cell._tc
    tc_pr = tc.get_or_add_tcPr()
    tc_mar = tc_pr.first_child_found_in("w:tcMar")
    if tc_mar is None:
        tc_mar = OxmlElement("w:tcMar")
        tc_pr.append(tc_mar)
    for tag, value in (("top", top), ("start", start), ("bottom", bottom), ("end", end)):
        node = tc_mar.find(qn(f"w:{tag}"))
        if node is None:
            node = OxmlElement(f"w:{tag}")
            tc_mar.append(node)
        node.set(qn("w:w"), str(value))
        node.set(qn("w:type"), "dxa")


def set_cell_width(cell, width_dxa):
    tc_pr = cell._tc.get_or_add_tcPr()
    tc_w = tc_pr.find(qn("w:tcW"))
    if tc_w is None:
        tc_w = OxmlElement("w:tcW")
        tc_pr.append(tc_w)
    tc_w.set(qn("w:w"), str(width_dxa))
    tc_w.set(qn("w:type"), "dxa")


def set_repeat_table_header(row):
    tr_pr = row._tr.get_or_add_trPr()
    tbl_header = OxmlElement("w:tblHeader")
    tbl_header.set(qn("w:val"), "true")
    tr_pr.append(tbl_header)


def set_table_geometry(table, widths):
    assert sum(widths) == CONTENT_W, (sum(widths), widths)
    table.alignment = WD_TABLE_ALIGNMENT.LEFT
    table.autofit = False
    tbl_pr = table._tbl.tblPr
    tbl_w = tbl_pr.find(qn("w:tblW"))
    if tbl_w is None:
        tbl_w = OxmlElement("w:tblW")
        tbl_pr.append(tbl_w)
    tbl_w.set(qn("w:w"), str(CONTENT_W))
    tbl_w.set(qn("w:type"), "dxa")
    tbl_layout = tbl_pr.find(qn("w:tblLayout"))
    if tbl_layout is None:
        tbl_layout = OxmlElement("w:tblLayout")
        tbl_pr.append(tbl_layout)
    tbl_layout.set(qn("w:type"), "fixed")
    tbl_ind = tbl_pr.find(qn("w:tblInd"))
    if tbl_ind is None:
        tbl_ind = OxmlElement("w:tblInd")
        tbl_pr.append(tbl_ind)
    tbl_ind.set(qn("w:w"), str(TABLE_INDENT))
    tbl_ind.set(qn("w:type"), "dxa")
    grid = table._tbl.tblGrid
    for child in list(grid):
        grid.remove(child)
    for width in widths:
        col = OxmlElement("w:gridCol")
        col.set(qn("w:w"), str(width))
        grid.append(col)
    for row in table.rows:
        for idx, cell in enumerate(row.cells):
            set_cell_width(cell, widths[idx])
            set_cell_margins(cell)
            cell.vertical_alignment = WD_CELL_VERTICAL_ALIGNMENT.TOP


def set_run(run, size=BODY_SIZE, color=INK, bold=None, italic=None, font=FONT):
    run.font.name = font
    run._element.get_or_add_rPr().rFonts.set(qn("w:ascii"), font)
    run._element.get_or_add_rPr().rFonts.set(qn("w:hAnsi"), font)
    run.font.size = Pt(size)
    run.font.color.rgb = RGBColor.from_string(color)
    if bold is not None:
        run.bold = bold
    if italic is not None:
        run.italic = italic


def configure_styles(doc):
    styles = doc.styles
    normal = styles["Normal"]
    normal.font.name = FONT
    normal._element.rPr.rFonts.set(qn("w:ascii"), FONT)
    normal._element.rPr.rFonts.set(qn("w:hAnsi"), FONT)
    normal.font.size = Pt(11)
    normal.font.color.rgb = RGBColor.from_string(INK)
    normal.paragraph_format.space_before = Pt(0)
    normal.paragraph_format.space_after = Pt(6)
    normal.paragraph_format.line_spacing = 1.10
    for name, size, color, before, after in (
        ("Heading 1", 16, BLUE, 16, 8),
        ("Heading 2", 13, BLUE, 12, 6),
        ("Heading 3", 12, DARK_BLUE, 8, 4),
    ):
        st = styles[name]
        st.font.name = FONT
        st._element.rPr.rFonts.set(qn("w:ascii"), FONT)
        st._element.rPr.rFonts.set(qn("w:hAnsi"), FONT)
        st.font.size = Pt(size)
        st.font.bold = True
        st.font.color.rgb = RGBColor.from_string(color)
        st.paragraph_format.space_before = Pt(before)
        st.paragraph_format.space_after = Pt(after)
        st.paragraph_format.keep_with_next = True
    for name in ("List Bullet", "List Number"):
        st = styles[name]
        st.font.name = FONT
        st._element.rPr.rFonts.set(qn("w:ascii"), FONT)
        st._element.rPr.rFonts.set(qn("w:hAnsi"), FONT)
        st.font.size = Pt(11)
        st.paragraph_format.space_after = Pt(8)
        st.paragraph_format.line_spacing = 1.167


def add_numbering(doc):
    numbering = doc.part.numbering_part.element
    existing_abs = [int(e.get(qn("w:abstractNumId"))) for e in numbering.findall(qn("w:abstractNum"))]
    existing_num = [int(e.get(qn("w:numId"))) for e in numbering.findall(qn("w:num"))]

    def make_abstract(num_fmt, text, font_name=None):
        aid = max(existing_abs + [-1]) + 1
        existing_abs.append(aid)
        abstract = OxmlElement("w:abstractNum")
        abstract.set(qn("w:abstractNumId"), str(aid))
        multi = OxmlElement("w:multiLevelType")
        multi.set(qn("w:val"), "singleLevel")
        abstract.append(multi)
        lvl = OxmlElement("w:lvl")
        lvl.set(qn("w:ilvl"), "0")
        start = OxmlElement("w:start"); start.set(qn("w:val"), "1"); lvl.append(start)
        fmt = OxmlElement("w:numFmt"); fmt.set(qn("w:val"), num_fmt); lvl.append(fmt)
        txt = OxmlElement("w:lvlText"); txt.set(qn("w:val"), text); lvl.append(txt)
        jc = OxmlElement("w:lvlJc"); jc.set(qn("w:val"), "left"); lvl.append(jc)
        ppr = OxmlElement("w:pPr")
        tabs = OxmlElement("w:tabs"); tab = OxmlElement("w:tab"); tab.set(qn("w:val"), "num"); tab.set(qn("w:pos"), "720"); tabs.append(tab); ppr.append(tabs)
        ind = OxmlElement("w:ind"); ind.set(qn("w:left"), "720"); ind.set(qn("w:hanging"), "360"); ppr.append(ind)
        spacing = OxmlElement("w:spacing"); spacing.set(qn("w:after"), "160"); spacing.set(qn("w:line"), "280"); spacing.set(qn("w:lineRule"), "auto"); ppr.append(spacing)
        lvl.append(ppr)
        if font_name:
            rpr = OxmlElement("w:rPr")
            fonts = OxmlElement("w:rFonts"); fonts.set(qn("w:ascii"), font_name); fonts.set(qn("w:hAnsi"), font_name); rpr.append(fonts)
            lvl.append(rpr)
        abstract.append(lvl)
        numbering.append(abstract)
        nid = max(existing_num + [0]) + 1
        existing_num.append(nid)
        num = OxmlElement("w:num"); num.set(qn("w:numId"), str(nid))
        abstract_id = OxmlElement("w:abstractNumId"); abstract_id.set(qn("w:val"), str(aid)); num.append(abstract_id)
        numbering.append(num)
        return nid

    return make_abstract("bullet", "•", FONT), make_abstract("decimal", "%1.", FONT)


def apply_num(paragraph, num_id):
    ppr = paragraph._p.get_or_add_pPr()
    num_pr = ppr.find(qn("w:numPr"))
    if num_pr is None:
        num_pr = OxmlElement("w:numPr")
        ppr.append(num_pr)
    ilvl = OxmlElement("w:ilvl"); ilvl.set(qn("w:val"), "0")
    numid = OxmlElement("w:numId"); numid.set(qn("w:val"), str(num_id))
    num_pr.append(ilvl); num_pr.append(numid)


def setup_section(section):
    section.page_width = Inches(8.5)
    section.page_height = Inches(11)
    section.top_margin = Inches(1)
    section.right_margin = Inches(1)
    section.bottom_margin = Inches(1)
    section.left_margin = Inches(1)
    section.header_distance = Inches(0.492)
    section.footer_distance = Inches(0.492)


def add_page_field(paragraph):
    run = paragraph.add_run()
    fld_char = OxmlElement("w:fldChar"); fld_char.set(qn("w:fldCharType"), "begin")
    instr = OxmlElement("w:instrText"); instr.set(qn("xml:space"), "preserve"); instr.text = " PAGE "
    sep = OxmlElement("w:fldChar"); sep.set(qn("w:fldCharType"), "separate")
    text = OxmlElement("w:t"); text.text = "1"
    end = OxmlElement("w:fldChar"); end.set(qn("w:fldCharType"), "end")
    run._r.extend([fld_char, instr, sep, text, end])
    set_run(run, size=8.5, color=MUTED)


def set_header_footer(section):
    hp = section.header.paragraphs[0]
    hp.alignment = WD_ALIGN_PARAGRAPH.LEFT
    hp.paragraph_format.space_after = Pt(0)
    set_run(hp.add_run("GALDINO & PARTNER  /  BUSINESS & SERVICE PORTFOLIO STRATEGY"), size=8.5, color=MUTED, bold=True)
    ppr = hp._p.get_or_add_pPr()
    borders = OxmlElement("w:pBdr")
    bottom = OxmlElement("w:bottom"); bottom.set(qn("w:val"), "single"); bottom.set(qn("w:sz"), "4"); bottom.set(qn("w:space"), "4"); bottom.set(qn("w:color"), "D7DBE2")
    borders.append(bottom); ppr.append(borders)
    fp = section.footer.paragraphs[0]
    fp.alignment = WD_ALIGN_PARAGRAPH.RIGHT
    fp.paragraph_format.space_before = Pt(0)
    set_run(fp.add_run("Internal working strategy  •  5 August 2026  •  "), size=8.5, color=MUTED)
    add_page_field(fp)


def add_para(doc, text="", *, size=BODY_SIZE, color=INK, bold=False, italic=False, align=None, before=0, after=6, keep=False):
    p = doc.add_paragraph()
    p.paragraph_format.space_before = Pt(before)
    p.paragraph_format.space_after = Pt(after)
    p.paragraph_format.line_spacing = 1.10
    p.paragraph_format.keep_with_next = keep
    if align is not None:
        p.alignment = align
    set_run(p.add_run(text), size=size, color=color, bold=bold, italic=italic)
    return p


def add_rich_para(doc, parts, *, after=6, keep=False):
    p = doc.add_paragraph()
    p.paragraph_format.space_after = Pt(after)
    p.paragraph_format.line_spacing = 1.10
    p.paragraph_format.keep_with_next = keep
    for text, kwargs in parts:
        set_run(p.add_run(text), **kwargs)
    return p


def add_bullet(doc, text, bullet_id):
    p = doc.add_paragraph(style="List Bullet")
    apply_num(p, bullet_id)
    set_run(p.add_run(text), size=11, color=INK)
    return p


def add_heading(doc, text, level=1):
    return doc.add_heading(text, level=level)


def add_callout(doc, label, text, fill=PALE_BLUE, accent=BLUE):
    table = doc.add_table(rows=1, cols=1)
    set_table_geometry(table, [CONTENT_W])
    cell = table.cell(0, 0)
    set_cell_shading(cell, fill)
    p = cell.paragraphs[0]
    p.paragraph_format.space_after = Pt(0)
    set_run(p.add_run(f"{label.upper()}  "), size=9, color=accent, bold=True)
    set_run(p.add_run(text), size=10.2, color=INK)
    add_para(doc, "", after=2)
    return table


def add_table(doc, headers, rows, widths, *, font_size=8.5, header_fill=LIGHT_GRAY, fills=None):
    table = doc.add_table(rows=1, cols=len(headers))
    table.style = "Table Grid"
    set_table_geometry(table, widths)
    hdr = table.rows[0]
    set_repeat_table_header(hdr)
    for i, header in enumerate(headers):
        cell = hdr.cells[i]
        set_cell_shading(cell, header_fill)
        p = cell.paragraphs[0]
        p.paragraph_format.space_after = Pt(0)
        set_run(p.add_run(str(header)), size=font_size, color=INK, bold=True)
    for r_idx, row in enumerate(rows):
        cells = table.add_row().cells
        for c_idx, value in enumerate(row):
            cell = cells[c_idx]
            if fills and r_idx < len(fills) and fills[r_idx]:
                fill = fills[r_idx]
                if isinstance(fill, (list, tuple)):
                    fill = fill[c_idx]
                if fill:
                    set_cell_shading(cell, fill)
            p = cell.paragraphs[0]
            p.paragraph_format.space_after = Pt(0)
            set_run(p.add_run(str(value)), size=font_size, color=INK)
        set_table_geometry(table, widths)
    add_para(doc, "", after=2)
    return table


def add_label_detail(doc, rows, widths=(2700, 6660), font_size=9):
    table = doc.add_table(rows=0, cols=2)
    table.style = "Table Grid"
    for label, value in rows:
        cells = table.add_row().cells
        set_cell_shading(cells[0], LIGHT_GRAY)
        p0 = cells[0].paragraphs[0]; p0.paragraph_format.space_after = Pt(0)
        set_run(p0.add_run(label), size=font_size, color=INK, bold=True)
        p1 = cells[1].paragraphs[0]; p1.paragraph_format.space_after = Pt(0)
        set_run(p1.add_run(value), size=font_size, color=INK)
    set_table_geometry(table, list(widths))
    add_para(doc, "", after=2)
    return table


def add_source_note(doc, text):
    p = doc.add_paragraph()
    p.paragraph_format.space_before = Pt(4)
    p.paragraph_format.space_after = Pt(4)
    set_run(p.add_run("Sumber: "), size=8.5, color=MUTED, bold=True)
    set_run(p.add_run(text), size=8.5, color=MUTED, italic=True)
    return p


def section_intro(doc, number, title, text):
    add_heading(doc, f"{number}. {title}", 1)
    add_para(doc, text)


def scenario_detail(doc, sc):
    add_heading(doc, f"{sc['id']} — {sc['name']}", 3)
    add_rich_para(doc, [
        (sc["description"] + "  ", {"size": 10.5, "color": INK}),
        (f"Keputusan: {sc['recommendation']}.", {"size": 10.5, "color": BRAND_RED_DARK, "bold": True}),
    ], keep=True)
    rows = [
        ("Offer & pasar", f"Tipe: {sc['permit_types']} | Layanan: {sc['services']} | Grade: {sc['grades']} | Target: {sc['target']}"),
        ("Owner & tim", f"Owner: {sc['time']}; {sc['owner']} | Tim: {sc['team']} — {sc['roles']}"),
        ("Delivery", f"Partner: {sc['partners']} | Automasi: {sc['automation']} | Capacity: {sc['capacity']}"),
        ("Beban", f"Kompleksitas: {sc['complexity']} | Risiko: {sc['risk']} | Komunikasi: {sc['communication']} | Regulasi: {sc['regulation']}"),
        ("Website & media", f"Web: {sc['web']} | SEO: {sc['seo']} | YouTube: {sc['youtube']} | Social: {sc['social']}"),
        ("Economics pattern", f"Repeat: {sc['repeat']} | Cross-sell: {sc['cross']} | Tidak ada angka pendapatan/margin dalam file."),
        ("Trade-off", f"Kelebihan: {sc['advantages']} | Kekurangan: {sc['disadvantages']}"),
        ("Gate", f"Berhasil jika: {sc['success']} | Tidak layak jika: {sc['fail']}"),
    ]
    add_label_detail(doc, rows, font_size=8.4)


def build_doc():
    doc = Document()
    configure_styles(doc)
    for section in doc.sections:
        setup_section(section)
        set_header_footer(section)
    bullet_id, decimal_id = add_numbering(doc)

    # memo_masthead first page.
    add_para(doc, "STRATEGY & DECISION REPORT", size=9, color=BRAND_GOLD, bold=True, after=4)
    add_para(doc, "Galdino & Partner", size=30, color=BRAND_RED_DARK, bold=True, after=2)
    add_para(doc, "Business Model, Service Portfolio, Operating Scenarios & Website Implications", size=15, color=MUTED, after=18)
    add_label_detail(doc, [
        ("Prepared as", "Business, Service Portfolio, Operational, Brand & Information Architecture analysis"),
        ("Evidence rule", "Project files only for facts; all ratings and recommendations are explicitly analytical"),
        ("Scope", "39 service families • 18 scenarios • 15 permit-type groups • website/content roadmap"),
        ("Date", "5 August 2026"),
        ("Status", "Internal decision document — not a legal classification or market forecast"),
    ], widths=(1800, 7560), font_size=9.2)
    add_callout(doc, "Recommended direction", "High-Ticket Regulatory Boutique: Regulatory Readiness & Permit Roadmap + Annual Regulatory Care as core; Selected Project & Investment Permit Management only after partner and evidence gates.", PALE_RED, BRAND_RED)
    add_callout(doc, "Critical caveat", "No project file provides reliable prices, margins, demand volumes, case hours, or client capacity. Numeric profitability and capacity claims are therefore intentionally not made.", PALE_YELLOW, BRAND_GOLD)
    doc.add_page_break()

    section_intro(doc, 1, "Executive Summary", "The current evidence supports a narrow, system-led regulatory boutique—not a broad permit catalog. The website can keep four approved categories as an information framework, but the launch offer should be reduced to three commercial propositions.")
    add_table(doc, ["Decision", "Recommendation", "Consequence"], [
        ["Business model", "High-ticket boutique with partner execution layer", "G&P owns diagnosis, scope, client experience, QA; specialists execute technical modules"],
        ["Core offers", "Readiness/Roadmap; Regulatory Care; selective Project PM", "Basic entity/NIB/product/admin services become supporting modules"],
        ["Owner model", "2 hours/day as steady-state design", "4 hours/day only for controlled expansion or key project gates"],
        ["Team", "4-5 people for launch", "Do not hire 8-10 before validated utilization and unit economics"],
        ["Website", "11-13 realistic launch pages", "Remove/hide dummy team, stats, experience, 15-service catalog, and unreviewed articles"],
        ["Capacity", "Stage-gated WIP cap, not a guessed client number", "Measure hours, rework, partner SLA, and owner touches during pilot"],
    ], [1800, 3600, 3960], font_size=8.6, header_fill=PALE_RED)
    add_source_note(doc, "S01-S12, S14-S22. Synthesis and recommendations are analytical; commercial numbers are unavailable.")
    add_callout(doc, "Final recommendation", "Choose K13 — High-Ticket Boutique, operated under a 2-hour/day owner default and using K16 as its delivery layer. Launch L01/L06/L11/L14 first; gate L15 and all technical project modules behind verified partners.", PALE_GREEN, "2D6A4F")

    section_intro(doc, 2, "Fakta Utama dari Seluruh File", "Facts below are traceable to current/aligned project files. They are separated from analytical assumptions.")
    facts = [
        ["Legal operator", "Galdino & Partner is operated by PT Karya Usaha Sukses, founded in 2015, domiciled in Tangerang; registration number pending", "S01 D-03; S02 T21; S03 T5"],
        ["Approved service framework", "Four categories: establishment/legal status; risk-based permits; compliance/legal advisory; project/investment permits", "S02 T14; S03 T10; S05 W-008"],
        ["Positioning", "Permit handling first; legal capability supports the permit engagement", "S03 T7"],
        ["Commercial pattern", "One-time projects, retainers, tender/procurement, or combinations; fees unavailable", "S02 T16-T17; S05 I-022"],
        ["Target", "Companies, owners, legal/ops, investors dealing with establishment, expansion, regularization, or compliance in Indonesia", "S02 T34-T39"],
        ["Acquisition", "Referral/relations, search/Google, and existing clients are checked discovery channels", "S02 T23"],
        ["Website", "Current site is bilingual with 24 localized HTML URLs and eight current page types", "S04; S08"],
        ["Prototype", "Fifteen service cards, three team profiles, stats/proof, and six article pages are not production facts", "S01 D-04-D-06; S07; S10; S21"],
        ["Contact/form", "Current contact is project/Kultivate; form sends by Resend only and current success state is inline", "S01 D-02,D-08,D-11; S17"],
        ["Claim boundary", "No guarantee of authority outcome, speed, or unverified proof; illegal/unethical requests are rejected", "S02 T31,T58,T60; S16; S20"],
    ]
    add_table(doc, ["Topic", "Fact", "Source"], facts, [1500, 5760, 2100], font_size=8.2)

    section_intro(doc, 3, "Konflik atau Ketidakkonsistenan Antarfile", "Aligned decisions and current implementation take priority, except where current implementation is dummy, unsafe, legally unconfirmed, or clearly unfinished.")
    add_table(doc, ["Topic", "Older/current conflict", "Priority state", "Source", "Resolution"], CONFLICTS, [1250, 2350, 2200, 1650, 1910], font_size=7.4, header_fill=PALE_YELLOW)

    section_intro(doc, 4, "Informasi yang Belum Tersedia", "These gaps are material. They prevent quantitative profit, capacity, and production-readiness claims.")
    add_table(doc, ["Area", "Missing information", "Status", "Decision impact"], MISSING, [1200, 4440, 1400, 2320], font_size=8.2, header_fill=PALE_YELLOW)
    add_callout(doc, "Perlu konfirmasi", "Which vertical has real team capability, partner coverage, referenceable cases, and client demand? Without this answer, project/industrial/product/health/financial sectors remain conditional.", PALE_YELLOW, BRAND_GOLD)

    section_intro(doc, 5, "Tujuan, Batasan, dan Prinsip Bisnis", "The file evidence is evaluated against the current owner brief: lean team, high-ticket focus, limited owner time, no disruption to the agency, and an explicit accounting for delivery and media maintenance debt.")
    principles = [
        "A service is not launchable merely because it appears in a file or prototype.",
        "Every published service must pass commercial, operational, capability, regulatory, and content-maintenance gates.",
        "Diagnosis and scope control precede execution; government outcomes are never guaranteed.",
        "The 2-hour owner model is the default architecture; the 4-hour model is an expansion option, not a hidden dependency.",
        "Basic/commodity services may exist as modules, bundles, or referrals without occupying the main navigation.",
        "Technology/media leverage is useful only when reviewed content stays current and feeds a validated offer.",
    ]
    for item in principles:
        add_bullet(doc, item, bullet_id)
    add_callout(doc, "Classification rule", "Grade A/B/C is an internal business-operational grade. It is not a legal classification and does not replace sector-specific professional review.", PALE_BLUE, BLUE)

    section_intro(doc, 6, "Inventarisasi Seluruh Tipe dan Layanan Perizinan", "The scan produced 39 service families. Examples are retained to preserve source coverage, but broad families are not automatically approved offers.")
    inventory_rows = [[s["id"], s["permit_type"], s["name"], s["examples"], s["source"]] for s in SERVICES]
    add_table(doc, ["ID", "Type", "Service family", "Examples found", "Source"], inventory_rows, [500, 1500, 2300, 3160, 1900], font_size=6.9)

    section_intro(doc, 7, "Penilaian Setiap Layanan", "Each service is scored 1-5 across 30 requested criteria. Positive criteria use 5 = attractive; burden/risk criteria use 5 = heavy. The composite reverses burden/risk scores before applying weights. Scores are analytical, not market facts.")
    criteria_rows = [[label, direction, f"{weight:.1%}"] for _key, label, direction, weight in CRITERIA]
    add_table(doc, ["Criterion", "Direction", "Weight"], criteria_rows, [5100, 2200, 2060], font_size=8.0)
    add_source_note(doc, "Scoring assumptions are documented in the companion workbook. Commercial variables are qualitative because project files contain no reliable financial or demand data.")
    decision_rows = [[s["id"], s["name"], s["grade"], f"{s['composite']:.2f}", s["decision"], s["rationale"], s["source"]] for s in SERVICES]
    fills = [PALE_GREEN if r[2] == "A" else PALE_YELLOW if r[2] == "B" else PALE_RED for r in decision_rows]
    add_table(doc, ["ID", "Service", "Grade", "Score", "Decision", "Why", "Source"], decision_rows, [450, 1950, 500, 600, 1250, 2900, 1710], font_size=7.1, fills=fills)

    section_intro(doc, 8, "Klasifikasi Grade A, B, dan C", "Grade is assigned through both score and hard gates. A service with an attractive score remains B/C if proof, expertise, or operational control is missing.")
    for grade, title, fill, text in (
        ("A", "Core High-Ticket", PALE_GREEN, "L01 Readiness/Roadmap; L06 KBLI/OSS mapping when diagnostic; L10 LKPM/reporting module; L11 Audit/Remediation; L14 Compliance Retainer."),
        ("B", "Selective Growth", PALE_YELLOW, "Entity/investment bundles, selected PB UMKU/sector permits, project PM, industry/construction/product packages, and supporting legal work—only with scope and partner gates."),
        ("C", "Conditional / Low Priority", PALE_RED, "Commodity standalone services, broad long-tail permits, unproven specialist sectors, and administrative distractions. C may be high-ticket but still operationally unsuitable."),
    ):
        add_callout(doc, f"Grade {grade} — {title}", text, fill, "2D6A4F" if grade == "A" else BRAND_GOLD if grade == "B" else BRAND_RED)
    grade_details = [[s["id"], s["name"], s["advantages"], s["disadvantages"], s["risks"], s["conditions"]] for s in SERVICES]
    add_table(doc, ["ID", "Service", "Advantages", "Disadvantages", "Risks", "Conditions"], grade_details, [450, 1700, 1650, 1700, 1750, 2110], font_size=6.8)

    section_intro(doc, 9, "Pengelompokan Berdasarkan Tipe Perizinan", "Grouping follows the project evidence rather than forcing every example from the brief. Employment licensing was not found as a supported service family in the scanned project files.")
    type_rows = [[t["type"], t["client"], t["problem"], t["value"], t["complexity"], t["expert"], t["core"], t["content"], t["burden"], t["average_grade"], t["fit_2h"], t["fit_4h"]] for t in TYPE_MAP]
    # Split into two readable tables.
    add_table(doc, ["Type", "Target", "Problem", "Value", "Complexity", "Avg"], [[r[0],r[1],r[2],r[3],r[4],r[9]] for r in type_rows], [1900, 1700, 2500, 1300, 1500, 460], font_size=7.2)
    add_table(doc, ["Type", "Expert", "Core potential", "Content", "Operational burden", "2h fit", "4h fit"], [[r[0],r[5],r[6],r[7],r[8],r[10],r[11]] for r in type_rows], [1900, 1350, 1200, 1200, 1350, 1180, 1180], font_size=7.2)

    section_intro(doc, 10, "Skenario Pemilik 2 Jam per Hari", "The 2-hour design is the preferred operating constraint. It requires paid discovery, refusal rules, delegated case ownership, and a stage-based WIP cap.")
    for sc in [s for s in SCENARIOS if s["id"] in {"K01","K02","K03","K04"}]:
        scenario_detail(doc, sc)
    add_callout(doc, "2-hour conclusion", "Most realistic maximum: three public offers, one B vertical at most, and no open-ended specialist catalog. Numeric client capacity cannot be asserted until time-per-stage is measured.", PALE_GREEN, "2D6A4F")

    section_intro(doc, 11, "Skenario Pemilik 4 Jam per Hari", "Four hours permits more sales, QA, and project steering, but it materially raises the risk of interfering with the agency. Adding service types is less attractive than increasing throughput in validated offers.")
    for sc in [s for s in SCENARIOS if s["id"] in {"K05","K06","K07","K08"}]:
        scenario_detail(doc, sc)
    add_callout(doc, "4-hour conclusion", "Use 4 hours as an expansion gate after a delivery lead exists. Do not make 4 hours the hidden requirement of a business advertised as lean.", PALE_YELLOW, BRAND_GOLD)

    section_intro(doc, 12, "Skenario Berdasarkan Ukuran Tim", "Headcount is a structural choice, not a capacity fact. Files contain no utilization or workload data; team recommendations therefore describe roles and gates, not payroll economics.")
    for sc in [s for s in SCENARIOS if s["id"] in {"K09","K10","K11"}]:
        scenario_detail(doc, sc)

    section_intro(doc, 13, "Skenario Berdasarkan Tipe Perizinan", "The strongest type strategies are specialist compliance, high-ticket boutique, and—later—an industrial/project vertical. Digital is a plausible adjacency but not yet evidenced capability.")
    for sc in [s for s in SCENARIOS if s["id"] in {"K12","K13","K14","K15","K17","K18"}]:
        scenario_detail(doc, sc)

    section_intro(doc, 14, "Skenario Berdasarkan Model Pengerjaan", "The preferred delivery architecture separates the commercial/client-control layer from specialist execution while keeping accountability explicit.")
    scenario_detail(doc, next(s for s in SCENARIOS if s["id"] == "K16"))
    add_para(doc, "Operating boundary map", size=10.5, color=BRAND_RED_DARK, bold=True, after=4, keep=True)
    add_table(doc, ["G&P owns", "Shared / governed", "Partner owns"], [[
        "Qualification; paid diagnosis; scope; proposal; client communication; document control; QA; decision log",
        "Work plan; dependencies; status; issue escalation; acceptance evidence; change control",
        "Technical execution; fieldwork; specialist submissions/opinions; sector-specific compliance"
    ]], [3120, 3120, 3120], font_size=8.4, header_fill=PALE_RED)
    add_source_note(doc, "Analytical operating model built from S02 process/claim boundaries, S03 positioning, S11 partner-heavy opportunities, and S12 process requirements.")

    section_intro(doc, 15, "Matriks Perbandingan Seluruh Skenario", "Scenario ratings use 1-5, where 5 is favorable. Risk, complexity, content burden, maintenance, and partner dependence are expressed as favorable inverse scores. Full 16-criterion formula and input cells are in the workbook.")
    matrix_rows = []
    for sc in sorted(SCENARIOS, key=lambda x: x["final_score"], reverse=True):
        r = sc["ratings"]
        matrix_rows.append([sc["id"], sc["name"], r["revenue"], r["margin"], r["owner_fit"], sc["team"], r["low_complexity"], r["low_risk"], r["sop"], r["delegation"], r["automation"], r["repeat"], r["seo"], r["agency_fit"], r["scalability"], f"{sc['final_score']:.2f}", sc["recommendation"]])
    add_table(doc, ["ID","Scenario","Rev","Mar","Owner","Team","Low Cx","Low Risk","SOP","Del","Auto","Repeat","SEO","Agency","Scale","Final","Decision"], matrix_rows, [350,1600,360,360,420,700,420,460,360,360,380,440,360,450,400,450,890], font_size=6.4, header_fill=PALE_BLUE)
    add_callout(doc, "Interpretation", "A high score is not a go-live approval. K15 and K01 score well because they are narrow and systemizable; K13 is selected as the best balance because it combines recurring core with a controlled high-ticket growth path.", PALE_BLUE, BLUE)

    section_intro(doc, 16, "Analisis berdasarkan Dalio, Kroc, Naval, dan Hormozi", "The names below are analytical lenses only. No quote or personal endorsement is attributed to them.")
    lens_data = [
        ("K01 — A only", "Dalio: likes explicit scope/risk; criticizes missing unit data; add decision log.", "Kroc: likes repeatable workflow; add QA standard.", "Naval: likes templates/media/automation; ensure diagnosis is not owner-only.", "Hormozi: likes urgent mismatch/compliance problem; strengthen deliverable and proof."),
        ("K04/K16 — Partner-based", "Dalio: likes transparent capability boundary; criticizes counterparty risk; add scorecard/backups.", "Kroc: criticizes inconsistent partner execution; standardize work orders and acceptance.", "Naval: likes leverage without payroll; protect brand through systems.", "Hormozi: likes broad outcome access; package around one clear result, not a vendor marketplace."),
        ("K13 — High-ticket boutique", "Dalio: likes balanced risk gates; requires real economics and kill criteria.", "Kroc: likes three-offer system; requires service blueprints.", "Naval: likes media + systems + partner leverage; remove manual status chasing.", "Hormozi: likes high-value corporate problems; make paid diagnostic and outcome clarity strong."),
        ("K14 — Industry/factory", "Dalio: criticizes tail risk and unknown proof; stage-gate every project.", "Kroc: difficult to replicate across sites; pick one geography/vertical.", "Naval: leverage is weak without PMO and partners; media can compound authority.", "Hormozi: likes costly urgent problems and able buyers; offer risk-reduction, not permit guarantee."),
        ("K15 — Compliance retainer", "Dalio: likes continuous monitoring; add obligation register and incident review.", "Kroc: strongest recurring SOP candidate; tier service and train backups.", "Naval: strongest software/calendar/media leverage; automate reminders and reporting.", "Hormozi: strengthen perceived value with avoided disruption, clarity, and response boundaries."),
        ("K18 — Complete project chain", "Dalio: rejects uncontrolled unknowns; needs dedicated risk system.", "Kroc: rejects early complexity and low replicability.", "Naval: too labor/coordination heavy before tooling and bench depth.", "Hormozi: value can be high, but delivery uncertainty weakens a reliable offer."),
    ]
    for title, dalio, kroc, naval, hormozi in lens_data:
        add_heading(doc, title, 3)
        add_label_detail(doc, [("Dalio lens", dalio), ("Kroc lens", kroc), ("Naval lens", naval), ("Hormozi lens", hormozi)], font_size=8.5)

    section_intro(doc, 17, "Layanan yang Dipilih, Diuji, Dimitrakan, Ditunda, dan Dieliminasi", "Portfolio status is a commercial-operational decision. 'Eliminated' primarily means removed from public standalone offers; it may still be referred or bundled when appropriate.")
    priority_rows = []
    for status in ["Lean Launch", "Controlled Growth", "Partner-Based", "Experimental", "Ditunda", "Dieliminasi"]:
        subset = [s for s in SERVICES if s["decision"] == status]
        priority_rows.append([status, "; ".join(f"{s['id']} {s['name']}" for s in subset) or "—", "See service-level gate and source in Sections 7-8 / workbook"])
    add_table(doc, ["Bucket", "Services", "Decision rule"], priority_rows, [1450, 6210, 1700], font_size=7.8, header_fill=PALE_RED)
    add_callout(doc, "Challenge to current prototype", "Do not retain L02/L07/L26/L28/L35/L37/L38/L39 as standalone public offers merely to look complete. Their content and inquiry debt is disproportionate to the current high-ticket strategy.", PALE_RED, BRAND_RED)

    section_intro(doc, 18, "Struktur Tim Lean untuk Skenario Utama", "The launch team should own the client and control system, not attempt to internalize every sector expert.")
    team_rows = [
        ["Owner / Principal", "Portfolio, risk, positioning, proposal exceptions, key consultations, partner governance", "No routine follow-up or document chasing", "~2 hours/day design cap"],
        ["Service / Engagement Lead", "Qualification, scope, service quality, daily decisions, escalation", "Case outcome and owner protection", "Full-time role"],
        ["Regulatory Analyst / Case Manager", "Mapping, research, checklist, submission coordination, evidence log", "Assigned portfolio", "1 role at launch; add by measured WIP"],
        ["Operations / Document Coordinator", "Intake, documents, task stages, updates, renewal calendar, billing admin", "Process integrity", "Full-time or strong hybrid"],
        ["Client & Content Operations", "CRM-like tracking, scheduled updates, content production/reuse, bilingual coordination", "No legal approval", "Hybrid/shared with Kultivate initially"],
        ["External reviewer/partner bench", "Sector expertise, technical work, field visits, legal review", "Own technical work under contract/RACI", "On demand; validated before sale"],
    ]
    add_table(doc, ["Role", "Responsibilities", "Boundary", "Launch model"], team_rows, [1800, 3800, 2200, 1560], font_size=8.1)
    add_callout(doc, "Owner-time rule", "If owner time exceeds the cap for two consecutive review cycles, freeze new B/C work, diagnose the bottleneck, and delegate or remove the triggering service before accepting more.", PALE_YELLOW, BRAND_GOLD)

    section_intro(doc, 19, "Risiko dan Mitigasi", "The main risk is not lack of service breadth; it is promising more breadth than the evidence and operating system can support.")
    add_table(doc, ["Risk", "Severity", "Why it matters", "Mitigation", "Owner"], RISKS, [1500, 800, 2700, 3300, 1060], font_size=7.8, header_fill=PALE_RED)

    section_intro(doc, 20, "Implikasi terhadap Website", "The information architecture must follow: business model → selected scenario → permit types → priority services → target → operating process → content → pages. The current prototype sequence is reversed because it exposes a broad catalog before commercial validation.")
    add_para(doc, "Recommended hierarchy", size=10.5, color=BRAND_RED_DARK, bold=True, after=4, keep=True)
    add_para(doc, "Home\n├── Services\n│   ├── Regulatory Readiness & Permit Roadmap\n│   ├── Annual Regulatory Care\n│   └── Selected Project & Investment Permit Management  [after partner gate]\n├── Profile\n├── Insights\n│   ├── Readiness / KBLI / OSS-RBA\n│   ├── Post-permit compliance\n│   └── Project & investment permits\n├── Contact / Assessment\n├── Privacy Policy\n└── Terms of Use", size=9.5, color=INK, after=8)
    add_table(doc, ["URL", "Page", "Decision", "Purpose/content", "CTA", "Relationship"], WEBSITE_IA, [1200, 1500, 1100, 3200, 1250, 1110], font_size=7.2)
    add_callout(doc, "Navigation", "Launch header: Home • Services • Profile • Insights • Contact/Assessment. Experiences stays hidden until real consented proof exists. FAQ is embedded or deferred until repeated questions exist.", PALE_BLUE, BLUE)

    section_intro(doc, 21, "Strategi SEO, YouTube, dan Social Media", "Media should compound a validated service, not create a second full-time business. Every bilingual page doubles review and update load.")
    add_table(doc, ["Cluster", "Theme", "Intent", "Article priority", "YouTube", "Social", "Maintenance"], CONTENT_STRATEGY, [700, 1550, 1150, 2300, 1250, 1200, 1210], font_size=7.6, header_fill=PALE_BLUE)
    add_bullet(doc, "Review the three existing Indonesian/English topic pairs before launch; source freshness and competent reviewer are mandatory.", bullet_id)
    add_bullet(doc, "Use one reviewed pillar article as the source for one video and several short-form derivatives; do not research each channel independently.", bullet_id)
    add_bullet(doc, "Publish commercial service pages before expanding informational volume; route every piece to one relevant assessment CTA.", bullet_id)
    add_bullet(doc, "Do not create metadata or structured data from dummy team, statistics, sectors, experience, or 15-service prototype content.", bullet_id)

    section_intro(doc, 22, "Roadmap Implementasi Bertahap", "The roadmap uses evidence gates instead of invented calendar dates. Expansion is conditional on operating data, not enthusiasm.")
    add_table(doc, ["Gate", "Actions", "Output", "Exit criterion"], ROADMAP, [1350, 3700, 2100, 2210], font_size=7.8, header_fill=PALE_GOLD)
    add_para(doc, "Decision tree", size=10.5, color=BRAND_RED_DARK, bold=True, after=4, keep=True)
    add_para(doc, DECISION_TREE, size=9, color=INK, after=6)

    section_intro(doc, 23, "Tiga Rekomendasi Skenario Terbaik", "The three options below represent different risk/return envelopes; they are not interchangeable.")
    top_three = [
        ["1 — K15 Compliance Retainer", "Safest operating model", "Recurring, SOP/automation, low catalog burden", "Proof/trust, reviewer, scope creep", "Choose if market validation confirms willingness to retain"],
        ["2 — K13 High-Ticket Boutique", "Best overall balance", "Readiness + recurring care + selective project upside", "Discipline and partner governance", "Recommended primary"],
        ["3 — K14 Industry & Factory", "Highest project/portfolio upside", "High-value visible problem and strong SEO", "Highest delay/field/expert risk", "Pilot only after partner/case evidence"],
    ]
    add_table(doc, ["Option", "Best for", "Strength", "Main risk", "Decision"], top_three, [1550, 1600, 2400, 2250, 1560], font_size=8.2, header_fill=PALE_GREEN)
    add_table(doc, ["Requested lens", "Best choice", "Reason"], FINAL_CHOICES, [1850, 2600, 4910], font_size=8.4, header_fill=PALE_BLUE)

    section_intro(doc, 24, "Satu Rekomendasi Final yang Paling Sesuai", "Choose K13 — High-Ticket Regulatory Boutique, operated under a 2-hour/day default and using K16 as the delivery layer. It is the smallest portfolio that still combines high-value projects, recurring revenue logic, proof-building, and media leverage.")
    add_label_detail(doc, [
        ("Launch first", "L01 Regulatory Readiness & Permit Roadmap; L06 KBLI/OSS alignment as diagnostic; L11 Permit Audit/Remediation; L14 Regulatory Care with L10/L12 modules."),
        ("Growth offer", "L15 Selected Project & Investment Permit Management only after paid discovery and partner gate; choose one vertical, not all sectors."),
        ("Do not offer yet", "Direct healthcare, OJK/BI, mining/energy, full land/environment/building chain, broad long-tail permits, and commodity standalone PT/CV/NIB/HAKI/halal/admin."),
        ("Team", "4-5: owner/principal, service lead, analyst/case manager, ops/document coordinator, client/content hybrid; external reviewers/technical partners."),
        ("Owner limit", "2 hours/day steady state. Use 4 hours only for a time-boxed expansion gate after a service lead owns daily delivery."),
        ("Client limit", "No defensible numeric count exists. Set caps by active stage, obligation count, partner capacity, analyst hours, rework, and owner touch time; do not onboard beyond measured WIP."),
        ("Expansion sequence", "Evidence → operable MVP → small pilot → production website → one B vertical → scale/kill review."),
        ("Add-service gate", "Real demand and ability-to-pay signal; positive unit economics; approved scope/SOP; named reviewer/partner; owner time remains within cap; content reviewer capacity available."),
    ], font_size=8.6)
    add_callout(doc, "Why this is the recommendation", "It preserves the aligned permit-first brand and four-category information framework while refusing to convert every prototype item into an operational promise. It creates a recurring core and a controlled route to high-ticket project work.", PALE_GREEN, "2D6A4F")

    section_intro(doc, 25, "Daftar Perubahan yang Perlu Diterapkan pada File Proyek", "This report does not modify any source file or code. The following is the recommended future change set after business approval.")
    changes = [
        ["Fase 1 Discovery", "Update service priority from four broad categories to three offers + supporting modules; record owner-time and refusal rules", "After business approval"],
        ["Website Brand Blueprint", "Retain permit-first; replace broad scope examples with approved offer architecture and partner disclosure", "After scope approval"],
        ["Inventory workbook", "Mark each service with portfolio bucket, grade, offer/module status, proof gate, reviewer, and maintenance owner", "Immediate documentation"],
        ["Grouping/Architecture", "Create three service-detail routes; merge How We Work initially; hide Experiences; add Privacy/Terms", "Before implementation"],
        ["Action & Routing", "Remove Services self-loop; route every CTA to specific assessment intent; keep Resend-only flow", "Before implementation"],
        ["Dummy register", "Add business-status decision for 15 service items; production-block team/stats/articles/metadata", "Immediate"],
        ["Website data/code", "Only after approval: replace 15-card catalog, hide dummy proof, update navigation/routes, modal thank-you, legal pages", "Not executed in this task"],
        ["Content files", "Review three topic pairs; attach source/effective date/reviewer; publish only mapped clusters", "Before launch"],
        ["Decision log", "Record chosen scenario, services killed/bundled/partnered, capacity method, and expansion gates", "At approval"],
    ]
    add_table(doc, ["File/system", "Recommended change", "Timing/status"], changes, [2100, 5500, 1760], font_size=8.2, header_fill=PALE_RED)

    add_heading(doc, "Appendix A — Source Register", 1)
    source_rows = [[s["id"], s["tier"], s["path"], s["locator"], s["use"]] for s in SOURCE_REGISTER]
    add_table(doc, ["ID", "Tier", "File", "Locator", "Use"], source_rows, [450, 1100, 3100, 1800, 2910], font_size=6.9)

    add_heading(doc, "Appendix B — Interpretation Legend", 1)
    add_table(doc, ["Label", "Meaning"], [
        ["FAKTA", "Directly stated or implemented in project files; source shown."],
        ["ASUMSI ANALISIS", "A reasoned score or operating interpretation created for comparison; not a market fact."],
        ["REKOMENDASI", "A proposed decision with conditions and consequences."],
        ["BELUM TERSEDIA", "The project files do not provide the information."],
        ["PERLU KONFIRMASI", "A decision or evidence item must be approved before use."],
        ["Grade A/B/C", "Internal business-operational classification; not legal classification."],
    ], [2100, 7260], font_size=9)

    # Core properties.
    props = doc.core_properties
    props.title = "Galdino & Partner — Business & Service Portfolio Strategy"
    props.subject = "Business model, service portfolio, scenarios, and website implications"
    props.author = "OpenAI Codex for Galdino & Partner"
    props.keywords = "Galdino & Partner, business strategy, licensing, service portfolio, website architecture"
    props.comments = "Facts use project files only; analytical ratings are explicitly marked."

    doc.save(DOCX_PATH)
    return doc


def export_json():
    payload = {
        "sources": SOURCE_REGISTER,
        "criteria": [{"key": k, "label": l, "direction": d, "weight": w} for k, l, d, w in CRITERIA],
        "services": SERVICES,
        "type_map": TYPE_MAP,
        "scenario_weights": [{"key": k, "label": l, "weight": w} for k, l, w in SCENARIO_WEIGHTS],
        "scenarios": SCENARIOS,
        "conflicts": CONFLICTS,
        "missing": MISSING,
        "risks": RISKS,
        "website_ia": WEBSITE_IA,
        "content_strategy": CONTENT_STRATEGY,
        "roadmap": ROADMAP,
        "final_choices": FINAL_CHOICES,
    }
    JSON_PATH.write_text(json.dumps(payload, ensure_ascii=False, indent=2), encoding="utf-8")


if __name__ == "__main__":
    build_doc()
    export_json()
    print(str(DOCX_PATH))
    print(str(JSON_PATH))

