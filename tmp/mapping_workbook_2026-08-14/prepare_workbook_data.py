import json
from collections import defaultdict
from pathlib import Path

WORK = Path(r"C:\Users\Joshua\OneDrive\Documents\Law\tmp\mapping_workbook_2026-08-14")
content = json.loads((WORK / "content_sheet_data.json").read_text(encoding="utf-8"))
context = json.loads((WORK / "mapping_context.json").read_text(encoding="utf-8"))

ROUTES = {
    "Home": "/{locale}/",
    "Profile": "/{locale}/profile/",
    "Profile Detail": "/{locale}/profile/[slug]/",
    "Services": "/{locale}/services/",
    "Our Experiences": "/{locale}/projects/",
    "Blog": "/{locale}/blog/",
    "Article Detail": "/{locale}/blog/[slug]/",
    "Contact": "/{locale}/contact/",
}

DEFAULTS = {
    "asset": "N/A – NO MEDIA REQUIRED",
    "wireframe": "NO – EXISTING IMPLEMENTATION REFERENCE",
    "wireframe_id": "EXISTING UI",
    "decision": "DIPERTAHANKAN",
    "implementation": "IMPLEMENTED – STRUCTURE EXISTS",
    "mapping_note": "Existing implementation can be used as the structural reference; copy still follows the source approval status.",
}

SPEC = {
    "H-001": ("Hero", "Immersive hero / dual CTA", "src/components/home/HomeHero.astro", "AST-014", "REF-CODE-003", "IMPLEMENTED – STRUCTURE EXISTS", "DIPERBARUI", "NO – EXISTING IMPLEMENTATION REFERENCE", "EXISTING UI – HOME HERO", "Hero and both CTA destinations exist. Final content approval is still required."),
    "H-002": ("Orientation", "Problem orientation band", "NOT FOUND AS A DEDICATED SECTION", "N/A – NO MEDIA REQUIRED", "REF-DOC-001", "NOT IMPLEMENTED – SECTION OMITTED", "TIDAK DITEMUKAN DI WEBSITE", "YES – SECTION DECISION REQUIRED", "WF-HOME-02 – TO CREATE OR REMOVE", "The current Page Specifications explicitly state that the former problem statement is intentionally omitted; keep only after a content/UX decision."),
    "H-003": ("Service Intro", "Four-category framework intro", "src/components/home/ServiceCarousel.astro", "N/A – GENERATED SERVICE VISUAL", "REF-CODE-006", "PARTIAL – WEBSITE USES 15 PROTOTYPE ITEMS", "DIPERBARUI", "YES – 4-CATEGORY STRUCTURE REQUIRED", "WF-HOME-03 – TO CREATE", "Documented four-category framework conflicts with the current 15-item prototype rail."),
    "H-004": ("Service Cards", "Category card 01", "src/components/home/ServiceCarousel.astro", "N/A – GENERATED SERVICE VISUAL", "REF-CODE-006", "PARTIAL – CATEGORY COPY NOT 1:1", "DIPERBARUI", "YES – 4-CATEGORY STRUCTURE REQUIRED", "WF-HOME-04 – TO CREATE", "Map to category-level Pendirian & Legalitas; do not treat detailed prototype items as final services."),
    "H-005": ("Service Cards", "Category card 02", "src/components/home/ServiceCarousel.astro", "N/A – GENERATED SERVICE VISUAL", "REF-CODE-006", "PARTIAL – CATEGORY COPY NOT 1:1", "DIPERBARUI", "YES – 4-CATEGORY STRUCTURE REQUIRED", "WF-HOME-05 – TO CREATE", "Map to category-level Perizinan Berbasis Risiko; sector coverage remains unapproved."),
    "H-006": ("Service Cards", "Category card 03", "src/components/home/ServiceCarousel.astro", "N/A – GENERATED SERVICE VISUAL", "REF-CODE-006", "PARTIAL – CATEGORY COPY NOT 1:1", "DIPERBARUI", "YES – 4-CATEGORY STRUCTURE REQUIRED", "WF-HOME-06 – TO CREATE", "Map to category-level Kepatuhan & Legal Advisory; retainer/SOP/reviewer remain pending."),
    "H-007": ("Service Cards", "Category card 04", "src/components/home/ServiceCarousel.astro", "N/A – GENERATED SERVICE VISUAL", "REF-CODE-006", "PARTIAL – CATEGORY COPY NOT 1:1", "DIPERBARUI", "YES – 4-CATEGORY STRUCTURE REQUIRED", "WF-HOME-07 – TO CREATE", "Map to category-level Perizinan Proyek & Investasi; examples remain pending."),
    "H-008": ("Process", "Four-step process", "src/components/home/PermitProcess.astro", "N/A – NO MEDIA REQUIRED", "REF-CODE-007", "IMPLEMENTED – STRUCTURE EXISTS", "DIPERBARUI", "NO – EXISTING IMPLEMENTATION REFERENCE", "EXISTING UI – PERMIT PROCESS", "The current component and CTA to Contact provide a valid structural reference."),
    "H-009": ("Credibility", "Company positioning / proof discipline", "src/components/home/CompanySnapshot.astro", "AST-006–AST-010", "REF-CODE-005", "PARTIAL – GALLERY/STATS INCLUDE UNVERIFIED DATA", "DIPERBARUI", "YES – PROOF-SAFE STATE REQUIRED", "WF-HOME-09 – ADAPT EXISTING", "Use confirmed legal identity from the aligned workbook; do not expose the four [DATA] statistics as company facts."),
    "H-010": ("Experience Preview", "Featured + two supporting case cards", "src/components/home/ExperienceShowcase.astro", "AST-011–AST-013", "REF-CODE-009", "PROTOTYPE – DUMMY EVIDENCE", "DATA DUMMY", "NO – EXISTING PROTOTYPE REFERENCE", "EXISTING UI – EXPERIENCE SHOWCASE", "High-fidelity prototype only. Remove at launch if approved evidence and consent are unavailable."),
    "H-011": ("Insight Preview", "Latest three article cards", "src/components/home/HomeInsights.astro", "AST-005", "REF-CODE-010", "PREVIEW – ARTICLES PRESENT BUT NOT LAUNCH-READY", "PLACEHOLDER INTERNAL", "NO – EXISTING PREVIEW REFERENCE", "EXISTING UI – HOME INSIGHTS", "Preview-only per project decision; article legal/editorial review remains a launch condition."),
    "H-012": ("Final CTA", "Split CTA / consultation + WhatsApp", "src/components/home/HomeFinalCta.astro", "N/A – NO MEDIA REQUIRED", "REF-CODE-011", "IMPLEMENTED – STRUCTURE EXISTS", "DIPERBARUI", "NO – EXISTING IMPLEMENTATION REFERENCE", "EXISTING UI – FINAL CTA", "Destinations exist; labels remain subject to content approval."),
    "P-001": ("Hero", "Editorial profile hero", "src/components/ProfilePage.astro", "AST-015", "REF-CODE-012", "PROTOTYPE VISUAL – STRUCTURE EXISTS", "PLACEHOLDER INTERNAL", "NO – EXISTING PROTOTYPE REFERENCE", "EXISTING UI – PROFILE HERO", "Generated team-banner concept must be replaced or approved before launch claims are final."),
    "P-002": ("Identity", "Company identity + gallery + registry", "src/components/ProfilePage.astro; src/components/CompanyGallery.astro", "AST-006–AST-010", "REF-CODE-012", "PARTIAL – CODE STILL CONTAINS IDENTITY PLACEHOLDERS", "DIPERBARUI", "YES – CONFIRMED IDENTITY STATE REQUIRED", "WF-PROFILE-02 – ADAPT EXISTING", "Aligned content confirms operator/name/year/location; code placeholders must not override those facts."),
    "P-003": ("Approach", "Company approach narrative", "src/components/ProfilePage.astro", "AST-006–AST-010", "REF-CODE-012", "PARTIAL – EMBEDDED IN COMPANY COPY", "DIPERBARUI", "YES – SECTION SEPARATION DECISION", "WF-PROFILE-03 – ADAPT EXISTING", "Approach exists only inside company paragraphs, not as the documented standalone message block."),
    "P-004": ("Principles", "Principles / boundary block", "NOT FOUND AS A DEDICATED SECTION", "N/A – NO MEDIA REQUIRED", "REF-DOC-001", "NOT IMPLEMENTED – SECTION MISSING", "TIDAK DITEMUKAN DI WEBSITE", "YES – SECTION REQUIRED OR COPY MERGE", "WF-PROFILE-04 – TO CREATE OR MERGE", "Decide whether principles remain standalone or are merged into approach; no silent deletion."),
    "P-005": ("Team Directory", "Three-member card directory", "src/components/profile/TeamCarousel.astro; src/data/profile.ts", "AST-016–AST-018", "REF-CODE-013", "PROTOTYPE / NO VERIFIED TEAM DATA", "DATA DUMMY", "NO – EXISTING PROTOTYPE REFERENCE", "EXISTING UI – TEAM DIRECTORY", "Names, roles, credentials, portraits, contacts, and consent require verification; section must not launch as fact."),
    "P-006": ("Final CTA", "Shared permit-start CTA", "src/components/home/HomeFinalCta.astro", "N/A – NO MEDIA REQUIRED", "REF-CODE-011", "IMPLEMENTED – STRUCTURE EXISTS", "DIPERBARUI", "NO – EXISTING IMPLEMENTATION REFERENCE", "EXISTING UI – FINAL CTA", "Use approved scope boundary; no price or timeline promise."),
    "PD-001": ("Profile Detail", "Person profile hero + overview", "src/components/PersonProfilePage.astro", "AST-016–AST-018", "REF-CODE-014", "PROTOTYPE / NOINDEX", "DATA DUMMY", "NO – EXISTING PROTOTYPE REFERENCE", "EXISTING UI – PERSON PROFILE", "Routes exist and are noindex,follow; do not add Person schema or launch until all identity evidence and consent are verified."),
    "S-001": ("Hero", "Generic inner-page hero", "src/components/ContentPage.astro", "N/A – NO MEDIA REQUIRED", "REF-CODE-015", "IMPLEMENTED – STRUCTURE EXISTS", "DIPERBARUI", "NO – EXISTING IMPLEMENTATION REFERENCE", "EXISTING UI – SERVICES HERO", "Current hero can accept approved four-category positioning."),
    "S-002": ("Decision Guide", "Situation-based decision guide", "NOT FOUND AS A DEDICATED SECTION", "N/A – NO MEDIA REQUIRED", "REF-DOC-001", "NOT IMPLEMENTED – SECTION MISSING", "TIDAK DITEMUKAN DI WEBSITE", "YES – SECTION REQUIRED", "WF-SERVICES-02 – TO CREATE", "Current Services page moves directly from hero to categories; decision guide must be created or intentionally merged."),
    "S-003": ("Service Categories", "Category card 01", "src/components/ContentPage.astro; src/data/site.ts", "N/A – NO MEDIA REQUIRED", "REF-CODE-015", "IMPLEMENTED – CATEGORY GRID", "DIPERBARUI", "NO – EXISTING IMPLEMENTATION REFERENCE", "EXISTING UI – SERVICES GRID", "Indicative-scope placeholder remains and is not a final deliverable list."),
    "S-004": ("Service Categories", "Category card 02", "src/components/ContentPage.astro; src/data/site.ts", "N/A – NO MEDIA REQUIRED", "REF-CODE-015", "IMPLEMENTED – CATEGORY GRID", "DIPERBARUI", "NO – EXISTING IMPLEMENTATION REFERENCE", "EXISTING UI – SERVICES GRID", "Sector coverage must remain bounded until validated."),
    "S-005": ("Service Categories", "Category card 03", "src/components/ContentPage.astro; src/data/site.ts", "N/A – NO MEDIA REQUIRED", "REF-CODE-015", "IMPLEMENTED – CATEGORY GRID", "DIPERBARUI", "NO – EXISTING IMPLEMENTATION REFERENCE", "EXISTING UI – SERVICES GRID", "Retainer/SOP/reviewer details remain outside publishable scope."),
    "S-006": ("Service Categories", "Category card 04", "src/components/ContentPage.astro; src/data/site.ts", "N/A – NO MEDIA REQUIRED", "REF-CODE-015", "IMPLEMENTED – CATEGORY GRID", "DIPERBARUI", "NO – EXISTING IMPLEMENTATION REFERENCE", "EXISTING UI – SERVICES GRID", "Project/sector examples remain pending."),
    "S-007": ("Initial Information", "Assessment preparation checklist", "NOT FOUND AS A DEDICATED SECTION", "N/A – NO MEDIA REQUIRED", "REF-DOC-001", "NOT IMPLEMENTED – SECTION MISSING", "TIDAK DITEMUKAN DI WEBSITE", "YES – SECTION REQUIRED", "WF-SERVICES-07 – TO CREATE", "Initial information currently lives mainly in the Contact form, not on Services."),
    "S-008": ("Scope Boundary", "Scope note + Contact CTA", "src/components/ContentPage.astro", "N/A – NO MEDIA REQUIRED", "REF-CODE-015", "IMPLEMENTED – STRUCTURE EXISTS", "DIPERBARUI", "NO – EXISTING IMPLEMENTATION REFERENCE", "EXISTING UI – SCOPE NOTE", "Keep category-level language and do not imply fixed prices, timelines, or outcome guarantees."),
    "E-001": ("Hero", "Experience page hero", "src/components/ContentPage.astro", "N/A – NO MEDIA REQUIRED", "REF-CODE-015", "PROTOTYPE – PLACEHOLDER DISCLOSURE EXISTS", "PLACEHOLDER INTERNAL", "NO – EXISTING PROTOTYPE REFERENCE", "EXISTING UI – PROJECTS HERO", "The disclosure is useful, but the page remains staging-only and must not launch as fact."),
    "E-002": ("Case Cards", "Three case placeholder cards", "src/components/ContentPage.astro; src/data/site.ts", "AST-011–AST-013 (HOME PREVIEW ONLY)", "REF-CODE-015", "PROTOTYPE – EVIDENCE/CONSENT MISSING", "DATA DUMMY", "NO – EXISTING PROTOTYPE REFERENCE", "EXISTING UI – PROJECT CARDS", "No approved client identity, outcome, proof, or consent is available."),
    "B-001": ("Hero", "Blog index hero + filters", "src/components/BlogIndexPage.astro", "N/A – NO MEDIA REQUIRED", "REF-CODE-019", "PREVIEW – STRUCTURE EXISTS", "PLACEHOLDER INTERNAL", "NO – EXISTING PREVIEW REFERENCE", "EXISTING UI – BLOG INDEX", "Framework is implemented; actual articles remain preview-only until reviewed."),
    "B-002": ("Article Cards", "Filtered article card list", "src/components/BlogIndexPage.astro; src/components/ArticleCard.astro", "AST-005", "REF-CODE-019", "PREVIEW – ARTICLES REQUIRE REVIEW", "PLACEHOLDER INTERNAL", "NO – EXISTING PREVIEW REFERENCE", "EXISTING UI – ARTICLE CARDS", "Do not launch cards or metadata as final legal content without editorial/legal review."),
    "A-001": ("Article Detail", "Article template + disclaimer + related posts", "src/components/BlogPostPage.astro", "AST-005", "REF-CODE-020", "PREVIEW – CONTENT REVIEW MISSING", "PLACEHOLDER INTERNAL", "NO – EXISTING PREVIEW REFERENCE", "EXISTING UI – BLOG POST", "Template exists, but source, reviewer, review date, applicability, and legal sign-off remain required."),
    "C-001": ("Hero", "Contact page hero", "src/components/ContactPage.astro", "N/A – NO MEDIA REQUIRED", "REF-CODE-016", "IMPLEMENTED – STRUCTURE EXISTS", "DIPERBARUI", "NO – EXISTING IMPLEMENTATION REFERENCE", "EXISTING UI – CONTACT HERO", "CTA submits through the existing Contact form."),
    "C-002": ("Preparation", "Form fields + safe-data guidance", "src/components/ContactForm.astro", "N/A – NO MEDIA REQUIRED", "REF-CODE-017", "IMPLEMENTED – STRUCTURE EXISTS", "DIPERBARUI", "NO – EXISTING IMPLEMENTATION REFERENCE", "EXISTING UI – CONTACT FORM", "Name, email, WhatsApp, company, service, message, consent, and honeypot are implemented."),
    "C-003": ("After Inquiry", "Submit state + delivery response", "src/components/ContactForm.astro; src/pages/api/contact.ts", "N/A – NO MEDIA REQUIRED", "REF-CODE-018", "PARTIAL – SUCCESS IS INLINE, POP-UP PENDING", "DIPERBARUI", "YES – THANK-YOU POP-UP STATE", "WF-CONTACT-03 – ADAPT EXISTING", "Resend-only delivery is implemented. Current success message is inline; the confirmed thank-you pop-up has not been implemented."),
    "C-004": ("Request Boundary", "Urgency and sensitive-data notices", "src/components/ContactPage.astro; src/components/ContactForm.astro", "N/A – NO MEDIA REQUIRED", "REF-CODE-016", "IMPLEMENTED – STRUCTURE EXISTS", "DIPERBARUI", "NO – EXISTING IMPLEMENTATION REFERENCE", "EXISTING UI – CONTACT NOTICE", "Same-day emergency warning and sensitive-document warning are present."),
    "C-005": ("Contact Channels", "WhatsApp, email, address", "src/components/ContactPage.astro; src/data/site.ts", "N/A – NO MEDIA REQUIRED", "REF-CODE-016", "IMPLEMENTED – PROJECT/KULTIVATE CONTACT; ADDRESS PLACEHOLDER", "MENUNGGU VERIFIKASI", "YES – LAUNCH CONTACT STATE", "WF-CONTACT-05 – ADAPT EXISTING", "Project/Kultivate contact may be shown for now; public launch contact, address, and privacy route still require approval."),
    "SD1-001": ("Service Detail", "Hero + scope template", "NO ROUTE OR COMPONENT", "N/A – MEDIA UNDECIDED", "REF-DOC-001", "NOT IMPLEMENTED – ROUTE MISSING", "TIDAK DITEMUKAN DI WEBSITE", "YES – FULL PAGE WIREFRAME", "WF-SD-01 – TO CREATE AFTER SCOPE APPROVAL", "Do not create a route until detailed scope and operating model are approved."),
    "SD2-001": ("Service Detail", "Hero + scope template", "NO ROUTE OR COMPONENT", "N/A – MEDIA UNDECIDED", "REF-DOC-001", "NOT IMPLEMENTED – ROUTE MISSING", "TIDAK DITEMUKAN DI WEBSITE", "YES – FULL PAGE WIREFRAME", "WF-SD-02 – TO CREATE AFTER SCOPE APPROVAL", "Do not create sector-specific claims before coverage is validated."),
    "SD3-001": ("Service Detail", "Hero + scope template", "NO ROUTE OR COMPONENT", "N/A – MEDIA UNDECIDED", "REF-DOC-001", "NOT IMPLEMENTED – ROUTE MISSING", "TIDAK DITEMUKAN DI WEBSITE", "YES – FULL PAGE WIREFRAME", "WF-SD-03 – TO CREATE AFTER SCOPE APPROVAL", "Retainer, SOP, reviewer model, and exclusions must be approved first."),
    "SD4-001": ("Service Detail", "Hero + scope template", "NO ROUTE OR COMPONENT", "N/A – MEDIA UNDECIDED", "REF-DOC-001", "NOT IMPLEMENTED – ROUTE MISSING", "TIDAK DITEMUKAN DI WEBSITE", "YES – FULL PAGE WIREFRAME", "WF-SD-04 – TO CREATE AFTER SCOPE APPROVAL", "Project examples, sector boundaries, and dependencies must be approved first."),
    "FAQ-001": ("FAQ", "Expandable question framework", "NO ROUTE OR COMPONENT", "N/A – NO MEDIA REQUIRED", "REF-DOC-002", "NOT IMPLEMENTED – ROUTE/ANSWERS MISSING", "TIDAK DITEMUKAN DI WEBSITE", "YES – PAGE/COMPONENT WIREFRAME", "WF-FAQ-01 – TO CREATE AFTER ANSWER REVIEW", "Questions exist; legal/operational answers do not."),
    "PRIV-001": ("Policy", "Privacy policy gate", "NO ROUTE OR CONTENT", "N/A – NO MEDIA REQUIRED", "REF-DOC-002", "NOT IMPLEMENTED – LAUNCH BLOCKER", "TIDAK BOLEH TAYANG", "YES – LEGAL PAGE TEMPLATE AFTER APPROVAL", "WF-PRIV-01 – AFTER LEGAL DRAFT", "Do not invent processing facts. Confirm actual data flow, controller/contact, retention, third parties, and user rights."),
    "TERM-001": ("Policy", "Terms and disclaimer gate", "NO ROUTE OR CONTENT", "N/A – NO MEDIA REQUIRED", "REF-DOC-002", "NOT IMPLEMENTED – LAUNCH BLOCKER", "TIDAK BOLEH TAYANG", "YES – LEGAL PAGE TEMPLATE AFTER APPROVAL", "WF-TERM-01 – AFTER LEGAL DRAFT", "Do not invent governing terms, liability boundary, jurisdiction, or no-client-relationship language."),
}

mapping_rows = []
for index, row in enumerate(content["content_id"], start=1):
    cid = row["Content ID"]
    family, variant, component, asset, ref_id, implementation, decision, wireframe, wf_id, note = SPEC[cid]
    route = ROUTES.get(row["Page"], "BACKLOG – ROUTE NOT DEFINED")
    mapping_rows.append({
        "Mapping ID": f"MAP-{index:03d}",
        "Mapping Type": "CONTENT BLOCK",
        "Content ID": cid,
        "Page": row["Page"],
        "Lifecycle": row["Lifecycle"],
        "Locale Coverage": "ID + EN",
        "Route / Target": route,
        "Order": row["Order"],
        "Section / Component": row["Section / Component"],
        "Section Family": family,
        "Variant": variant,
        "Headline / Identifier": row["Headline"],
        "Implemented Component / Location": component,
        "Implementation Status": implementation,
        "Asset ID": asset,
        "Reference ID": ref_id,
        "Structure Note": note,
        "Wireframe Required": wireframe,
        "Wireframe ID": wf_id,
        "Decision Category": decision,
        "Copy Approval Status": row["Review Status"],
        "Publication Status": row["Publication Status"],
        "Primary CTA": row["Primary CTA"],
        "Destination": row["Destination"],
        "UI/UX Review": "NOT REVIEWED",
        "Approval Status": "NOT APPROVED",
        "Source Evidence": f"03_Content_ID::{cid}; {component}; {ref_id}",
    })

website_only = [
    {
        "Mapping ID": "MAP-W01", "Mapping Type": "WEBSITE-ONLY", "Content ID": "WEB-H-001", "Page": "Home", "Lifecycle": "CURRENT PROTOTYPE", "Locale Coverage": "ID + EN", "Route / Target": "/{locale}/", "Order": "2A", "Section / Component": "Client register", "Section Family": "Credibility", "Variant": "Six dummy client marks", "Headline / Identifier": "Dummy client register", "Implemented Component / Location": "src/components/home/ClientRegister.astro; src/data/home.ts", "Implementation Status": "PROTOTYPE – DUMMY CLIENT MARKS", "Asset ID": "N/A – TYPOGRAPHIC MARKS", "Reference ID": "REF-CODE-004", "Structure Note": "Implemented after the Home hero but absent from the 44 content-block sheet. Real client identity requires written publication consent.", "Wireframe Required": "NO – EXISTING PROTOTYPE REFERENCE", "Wireframe ID": "EXISTING UI – CLIENT REGISTER", "Decision Category": "DITEMUKAN DI WEBSITE TETAPI BELUM ADA DI DOKUMEN", "Copy Approval Status": "BLOCKED – CONSENT/EVIDENCE", "Publication Status": "PLACEHOLDER – STAGING ONLY", "Primary CTA": "—", "Destination": "—", "UI/UX Review": "NOT REVIEWED", "Approval Status": "NOT APPROVED", "Source Evidence": "src/components/home/ClientRegister.astro; src/data/home.ts; docs/PAGE_SPECIFICATIONS.md"
    },
    {
        "Mapping ID": "MAP-W02", "Mapping Type": "WEBSITE-ONLY", "Content ID": "WEB-H-002", "Page": "Home", "Lifecycle": "CURRENT PROTOTYPE", "Locale Coverage": "ID + EN", "Route / Target": "/{locale}/", "Order": "7A", "Section / Component": "Company video placeholder", "Section Family": "Brand / Media", "Variant": "Art-directed non-interactive film placeholder", "Headline / Identifier": "Company film placeholder", "Implemented Component / Location": "src/components/home/CompanyVideo.astro", "Implementation Status": "PROTOTYPE – NON-FUNCTIONAL MEDIA PLACEHOLDER", "Asset ID": "AST-001", "Reference ID": "REF-CODE-008", "Structure Note": "Implemented between process and experience; absent from the 44 content-block sheet. It intentionally exposes no fake play control.", "Wireframe Required": "NO – EXISTING PROTOTYPE REFERENCE", "Wireframe ID": "EXISTING UI – COMPANY VIDEO", "Decision Category": "DITEMUKAN DI WEBSITE TETAPI BELUM ADA DI DOKUMEN", "Copy Approval Status": "BLOCKED – MEDIA/CONTENT DECISION", "Publication Status": "PLACEHOLDER – STAGING ONLY", "Primary CTA": "—", "Destination": "—", "UI/UX Review": "NOT REVIEWED", "Approval Status": "NOT APPROVED", "Source Evidence": "src/components/home/CompanyVideo.astro; docs/PAGE_SPECIFICATIONS.md"
    },
]
mapping_rows.extend(website_only)

asset_status = {
    "public/assets/gp-logo-brand.png": ("Brand mark", "Header; Footer; schema; company video; regulatory map", "GLOBAL", "DIPERTAHANKAN – CURRENT MASTER", "Project asset; ownership/source record not included", "KEEP – CURRENT MASTER ASSET", "Logo alt remains decorative where adjacent brand text exists", "NO", "docs/DESIGN_SYSTEM.md; docs/COMPONENT_GUIDELINES.md", "CURRENT PROJECT ASSET"),
    "public/assets/gp-logo-home.png": ("Legacy/alternate brand asset", "No code usage found", "UNUSED", "MENUNGGU VERIFIKASI – UNUSED", "Not documented", "DO NOT USE UNTIL ROLE IS CONFIRMED", "N/A", "YES / ARCHIVE DECISION", "codebase-wide import/path scan", "NOT APPROVED"),
    "public/assets/gp-logo.png": ("Legacy/alternate brand asset", "No code usage found", "UNUSED", "MENUNGGU VERIFIKASI – UNUSED", "Not documented", "DO NOT USE UNTIL ROLE IS CONFIRMED", "N/A", "YES / ARCHIVE DECISION", "codebase-wide import/path scan", "NOT APPROVED"),
    "public/favicon.svg": ("Favicon", "BaseLayout", "GLOBAL", "DIPERTAHANKAN", "Project-generated vector; source record not included", "KEEP – VERIFY FINAL BRAND MATCH", "Decorative browser icon", "NO", "src/layouts/BaseLayout.astro", "PROVISIONAL"),
    "public/og-default.svg": ("Open Graph / article placeholder", "BaseLayout; 6 preview articles", "GLOBAL / BLOG", "PLACEHOLDER INTERNAL", "Project-generated vector", "REPLACE OR VALIDATE PLATFORM SUPPORT BEFORE LAUNCH", "Metadata image; no alt field", "YES", "docs/SEO_GUIDELINES.md; src/content/blog/**", "NOT APPROVED"),
    "src/assets/company-carousel-01.webp": ("Company gallery image", "CompanyGallery", "HOME / PROFILE", "MENUNGGU VERIFIKASI", "Source/rights not documented", "VERIFY SOURCE, RIGHTS, AND FINAL ROLE", "Alt copy is set in CompanyGallery", "MAYBE", "src/components/CompanyGallery.astro", "NOT APPROVED"),
    "src/assets/company-carousel-02.webp": ("Company gallery image", "CompanyGallery", "HOME / PROFILE", "MENUNGGU VERIFIKASI", "Source/rights not documented", "VERIFY SOURCE, RIGHTS, AND FINAL ROLE", "Alt copy is set in CompanyGallery", "MAYBE", "src/components/CompanyGallery.astro", "NOT APPROVED"),
    "src/assets/company-carousel-03.webp": ("Company gallery image", "CompanyGallery", "HOME / PROFILE", "MENUNGGU VERIFIKASI", "Source/rights not documented", "VERIFY SOURCE, RIGHTS, AND FINAL ROLE", "Alt copy is set in CompanyGallery", "MAYBE", "src/components/CompanyGallery.astro", "NOT APPROVED"),
    "src/assets/company-carousel-04.webp": ("Company gallery image", "CompanyGallery", "HOME / PROFILE", "MENUNGGU VERIFIKASI", "Source/rights not documented", "VERIFY SOURCE, RIGHTS, AND FINAL ROLE", "Alt copy is set in CompanyGallery", "MAYBE", "src/components/CompanyGallery.astro", "NOT APPROVED"),
    "src/assets/company-carousel-05.webp": ("Company gallery image", "CompanyGallery", "HOME / PROFILE", "MENUNGGU VERIFIKASI", "Source/rights not documented", "VERIFY SOURCE, RIGHTS, AND FINAL ROLE", "Alt copy is set in CompanyGallery", "MAYBE", "src/components/CompanyGallery.astro", "NOT APPROVED"),
    "src/assets/experience-business-licensing.png": ("Experience concept image", "ExperienceShowcase", "HOME", "DATA DUMMY / REPLACEABLE", "No approved case evidence/consent", "STAGING ONLY; REMOVE OR REPLACE BEFORE LAUNCH", "Current alt/caption must not imply a real case", "YES", "docs/DESIGN_SYSTEM.md; 05_Proof_Placeholders", "BLOCKED"),
    "src/assets/experience-compliance-review.png": ("Experience concept image", "ExperienceShowcase", "HOME", "DATA DUMMY / REPLACEABLE", "No approved case evidence/consent", "STAGING ONLY; REMOVE OR REPLACE BEFORE LAUNCH", "Current alt/caption must not imply a real case", "YES", "docs/DESIGN_SYSTEM.md; 05_Proof_Placeholders", "BLOCKED"),
    "src/assets/experience-investment-project.png": ("Experience concept image", "ExperienceShowcase", "HOME", "DATA DUMMY / REPLACEABLE", "No approved case evidence/consent", "STAGING ONLY; REMOVE OR REPLACE BEFORE LAUNCH", "Current alt/caption must not imply a real case", "YES", "docs/DESIGN_SYSTEM.md; 05_Proof_Placeholders", "BLOCKED"),
    "src/assets/home-licensing-hero.webp": ("Hero concept image", "HomeHero", "HOME", "PLACEHOLDER INTERNAL / CONCEPT", "Source/rights not documented", "VERIFY OR REPLACE BEFORE FINAL LAUNCH CLAIMS", "Alt text exists in component", "YES", "docs/DESIGN_SYSTEM.md; src/components/home/HomeHero.astro", "NOT APPROVED"),
    "src/assets/profile-company-hero-centered.webp": ("Profile hero concept image", "ProfilePage", "PROFILE", "PLACEHOLDER INTERNAL / GENERATED", "Generated concept; official team photo/consent missing", "REPLACE BEFORE LAUNCH", "Caption explicitly identifies concept visual", "YES", "docs/DESIGN_SYSTEM.md; docs/PAGE_SPECIFICATIONS.md", "BLOCKED"),
    "src/assets/team-kelvin-anata-lian.webp": ("Team concept portrait", "TeamCarousel; PersonProfilePage", "PROFILE", "DATA DUMMY / GENERATED", "Identity/photo consent not verified", "STAGING ONLY; REPLACE OR REMOVE BEFORE LAUNCH", "Concept portrait alt text in src/data/profile.ts", "YES", "docs/DESIGN_SYSTEM.md; src/data/profile.ts", "BLOCKED"),
    "src/assets/team-maria-indah-putri.webp": ("Team concept portrait", "TeamCarousel; PersonProfilePage", "PROFILE", "DATA DUMMY / GENERATED", "Identity/photo consent not verified", "STAGING ONLY; REPLACE OR REMOVE BEFORE LAUNCH", "Concept portrait alt text in src/data/profile.ts", "YES", "docs/DESIGN_SYSTEM.md; src/data/profile.ts", "BLOCKED"),
    "src/assets/team-michael-alvaro.webp": ("Team concept portrait", "TeamCarousel; PersonProfilePage", "PROFILE", "DATA DUMMY / GENERATED", "Identity/photo consent not verified", "STAGING ONLY; REPLACE OR REMOVE BEFORE LAUNCH", "Concept portrait alt text in src/data/profile.ts", "YES", "docs/DESIGN_SYSTEM.md; src/data/profile.ts", "BLOCKED"),
}

asset_rows = []
for index, item in enumerate(context["assets"], start=1):
    role, used_by, page, classification, rights, launch, alt, replace, evidence, approval = asset_status[item["file"]]
    asset_rows.append({
        "Asset ID": f"AST-{index:03d}", "File Path": item["file"], "Format": item["extension"].lstrip(".").upper(),
        "Dimensions": f'{int(item["width"])} × {int(item["height"])}' if item["width"] and item["height"] else "UNKNOWN",
        "Size KB": round(item["size"] / 1024, 1), "Used By": used_by, "Page / Section": page, "Current Role": role,
        "Classification": classification, "Rights / Consent": rights, "Launch Decision": launch, "Alt Text / Copy Source": alt,
        "Replacement Required": replace, "Source Evidence": evidence, "Approval Status": approval,
    })

references = [
    ("REF-SHEET-001", "Workbook source", "GP_Fase2_Website_Content_Sheet_Final_Aligned_2026-08-06.xlsx", "All 9 original sheets", "All content IDs", "Approved working copy, questions, dependencies, QA, actions, and source hierarchy", "GLOBAL", "PRIMARY", "CURRENT SOURCE", "Copy is not yet approved or mapped"),
    ("REF-CODE-001", "Data/config", "src/data/site.ts", "Identity, navigation, contact, 4 service categories, project placeholders", "GLOBAL; Services; Contact; Experiences", "Actual centralized website data", "GLOBAL", "PRIMARY", "IMPLEMENTED WITH PLACEHOLDERS", "Legal name/domain/address/registration remain placeholder in code"),
    ("REF-CODE-002", "Composition", "src/components/HomePage.astro", "Home section order", "H-001–H-012; WEB-H-001–002", "Actual Home component composition", "HOME", "PRIMARY", "IMPLEMENTED", "Two implemented website-only prototype sections"),
    ("REF-CODE-003", "Component", "src/components/home/HomeHero.astro", "Hero image, copy, Contact and Services CTAs", "H-001", "Home hero structural reference", "HOME HERO", "PRIMARY", "IMPLEMENTED", "Uses concept hero asset"),
    ("REF-CODE-004", "Component/data", "src/components/home/ClientRegister.astro; src/data/home.ts", "Six labelled dummy client marks", "WEB-H-001", "Website-only client register", "HOME", "SECONDARY", "PROTOTYPE", "No publication consent/evidence"),
    ("REF-CODE-005", "Component", "src/components/home/CompanySnapshot.astro; src/components/CompanyGallery.astro", "Company positioning, gallery, statistics", "H-009; P-002", "Credibility/identity layout reference", "HOME / PROFILE", "PRIMARY", "PARTIAL", "Statistics and some identity data are placeholders"),
    ("REF-CODE-006", "Component/data", "src/components/home/ServiceCarousel.astro; src/data/home.ts", "15-item prototype service rail", "H-003–H-007", "Existing carousel interaction and mismatch evidence", "HOME SERVICES", "PRIMARY", "PROTOTYPE / MISMATCH", "Does not match the approved 4-category content structure"),
    ("REF-CODE-007", "Component", "src/components/home/PermitProcess.astro", "Four-step process and Contact CTA", "H-008", "Process structure reference", "HOME", "PRIMARY", "IMPLEMENTED", "Operational detail depends on engagement scope"),
    ("REF-CODE-008", "Component", "src/components/home/CompanyVideo.astro", "Non-interactive company film placeholder", "WEB-H-002", "Website-only media placeholder", "HOME", "SECONDARY", "PROTOTYPE", "No final video/media content"),
    ("REF-CODE-009", "Component/data", "src/components/home/ExperienceShowcase.astro; src/data/site.ts", "Experience grid and placeholder metadata", "H-010; E-002", "Prototype experience reference", "HOME / EXPERIENCES", "PRIMARY", "PROTOTYPE", "Evidence and consent missing"),
    ("REF-CODE-010", "Component/content", "src/components/home/HomeInsights.astro; src/content/blog/**", "Latest article preview", "H-011; B-002", "Article preview structure", "HOME / BLOG", "PRIMARY", "PREVIEW", "Articles require editorial/legal review"),
    ("REF-CODE-011", "Component", "src/components/home/HomeFinalCta.astro", "Shared final CTA", "H-012; P-006", "Shared CTA reference", "HOME / PROFILE", "PRIMARY", "IMPLEMENTED", "Labels still need content approval"),
    ("REF-CODE-012", "Component/data", "src/components/ProfilePage.astro; src/data/profile.ts", "Profile hero, company, identity, team composition", "P-001–P-005", "Actual Profile structure and data", "PROFILE", "PRIMARY", "PARTIAL / PROTOTYPE", "Identity/team placeholders remain in code"),
    ("REF-CODE-013", "Component/data", "src/components/profile/TeamCarousel.astro; src/data/profile.ts", "Three person cards and routes", "P-005", "Prototype team directory reference", "PROFILE", "PRIMARY", "PROTOTYPE", "Team identities/credentials/photos/consent not verified"),
    ("REF-CODE-014", "Component", "src/components/PersonProfilePage.astro", "Person hero, contacts, overview, noindex", "PD-001", "Profile-detail prototype reference", "PROFILE DETAIL", "PRIMARY", "PROTOTYPE / NOINDEX", "No Person schema until verification"),
    ("REF-CODE-015", "Component/data", "src/components/ContentPage.astro; src/data/site.ts", "Services and Projects page implementation", "S-001–S-008; E-001–E-002", "Actual category/project structures", "SERVICES / EXPERIENCES", "PRIMARY", "PARTIAL / PROTOTYPE", "Services lacks S-002/S-007; projects are placeholders"),
    ("REF-CODE-016", "Component/data", "src/components/ContactPage.astro; src/data/site.ts", "Direct channels, address, urgency boundary", "C-001; C-004; C-005", "Contact page structure", "CONTACT", "PRIMARY", "PARTIAL", "Address/privacy/legal contact remain unresolved for launch"),
    ("REF-CODE-017", "Component", "src/components/ContactForm.astro", "Fields, consent, validation, inline status", "C-002; C-003; C-004", "Inquiry form UI and current status behavior", "CONTACT", "PRIMARY", "IMPLEMENTED / POP-UP PENDING", "Success state is inline, not the confirmed pop-up"),
    ("REF-CODE-018", "API", "src/pages/api/contact.ts; .env.example", "Validation, rate limiting, Resend delivery, dry-run", "C-003", "Inquiry delivery flow", "CONTACT API", "PRIMARY", "IMPLEMENTED / ENV PENDING", "Requires production Resend/domain environment values"),
    ("REF-CODE-019", "Component/content", "src/components/BlogIndexPage.astro; src/components/ArticleCard.astro; src/content/blog/**", "Blog hero, filters, cards", "B-001–B-002", "Blog listing implementation", "BLOG", "PRIMARY", "PREVIEW", "Substantive articles are not launch-approved"),
    ("REF-CODE-020", "Component/content", "src/components/BlogPostPage.astro; src/content/blog/**", "Article template, disclaimer, translation, related posts", "A-001", "Article detail implementation", "ARTICLE DETAIL", "PRIMARY", "PREVIEW", "Legal/editorial review metadata remains required"),
    ("REF-DOC-001", "Documentation", "docs/PAGE_SPECIFICATIONS.md", "Page orders, routes, placeholder rules", "All current page mappings", "Expected structure and explicit prototype behavior", "GLOBAL", "PRIMARY", "CURRENT DOC", "Some specs do not match implemented content sheet sections"),
    ("REF-DOC-002", "Documentation", "docs/REQUIREMENTS.md", "Functional, non-functional, content integrity, definition of done", "Global; FAQ; Privacy; Terms", "Build/launch requirements", "GLOBAL", "PRIMARY", "CURRENT DOC", "Privacy/Terms remain absent"),
    ("REF-DOC-003", "Documentation", "docs/DESIGN_SYSTEM.md", "Brand assets and replaceable concept imagery", "Asset register", "Asset classification and visual governance", "GLOBAL", "PRIMARY", "CURRENT DOC", "Source/rights evidence is not embedded"),
    ("REF-DOC-004", "Documentation", "docs/SEO_GUIDELINES.md", "Schema, noindex, metadata and launch checks", "Profile Detail; Blog; Global", "Indexing and metadata governance", "GLOBAL", "PRIMARY", "CURRENT DOC", "Production domain and raster social image remain open"),
    ("REF-AUDIT-001", "Generated audit", "codebase audit 2026-08-14", "91 text files + 18 assets + 21 routes", "All mapping/register rows", "Completeness evidence for the codebase scan", "GLOBAL", "PRIMARY", "COMPLETE READ-ONLY AUDIT", "Generated from the current local codebase; no code was modified"),
    ("REF-CTX-001", "Project decision context", "User confirmations in current project context", "Operator/year/location; dummy high-fidelity; 4 categories; preview-only articles; domain pending; Kultivate contact; pop-up; Resend-only", "Global; Home; Contact; Blog", "Resolves implementation labels without inventing facts", "GLOBAL", "PRIMARY", "CONFIRMED CONTEXT", "Registration number, public launch contacts, final domain, policies and approvals remain open"),
]

reference_rows = []
for item in references:
    ref_id, ref_type, source, section, used, purpose, scope, priority, status, limitation = item
    reference_rows.append({
        "Reference ID": ref_id, "Reference Type": ref_type, "Source / Path": source, "Relevant Section": section,
        "Used By": used, "Purpose": purpose, "Reuse Scope": scope, "Priority": priority, "Status": status,
        "Known Limitation": limitation, "Last Verified": "2026-08-14", "Owner / Reviewer": "Project Lead / UI-UX / Legal as applicable",
    })

qa_pages = [
    ("GLOBAL", "CURRENT", "N/A", "N/A", "N/A", "PARTIAL – SITE.TS PLACEHOLDERS; LEGAL PAGES ABSENT", "LEGAL/CONTACT/DOMAIN OPEN", "Confirm launch contacts, domain, Privacy, Terms, and approved global labels."),
    ("Home", "CURRENT + PROTOTYPE/PREVIEW", "/id/", "/en/", "EXISTS", "PARTIAL – H-002 MISSING; 4/15 SERVICE MISMATCH; 2 WEBSITE-ONLY PROTOTYPES", "COPY/EVIDENCE/UI-UX OPEN", "Resolve problem-section decision, convert service rail to four categories, and gate dummy previews."),
    ("Profile", "CURRENT + PROTOTYPE", "/id/profile/", "/en/profile/", "EXISTS", "PARTIAL – P-004 MISSING; TEAM/IDENTITY PLACEHOLDERS", "TEAM/IDENTITY/UI-UX OPEN", "Apply confirmed identity, decide P-003/P-004 structure, and remove/replace dummy team before launch."),
    ("Profile Detail", "CURRENT PROTOTYPE / NOINDEX", "/id/profile/[slug]/", "/en/profile/[slug]/", "EXISTS / NOINDEX", "PROTOTYPE – DUMMY IDENTITIES", "VERIFICATION/CONSENT OPEN", "Keep noindex; replace with verified professionals or remove routes."),
    ("Services", "CURRENT", "/id/services/", "/en/services/", "EXISTS", "PARTIAL – S-002 AND S-007 MISSING", "COPY/UI-UX/SCOPE OPEN", "Create or merge decision guide and initial-information blocks; retain category-level scope boundary."),
    ("Our Experiences", "CURRENT PROTOTYPE", "/id/projects/", "/en/projects/", "EXISTS / PROTOTYPE", "PROTOTYPE – NO APPROVED CASES", "EVIDENCE/CONSENT OPEN", "Remove from launch or populate only approved, confidentiality-safe cases."),
    ("Blog", "CURRENT PREVIEW", "/id/blog/", "/en/blog/", "EXISTS / PREVIEW", "PREVIEW – ARTICLES NOT APPROVED", "EDITORIAL/LEGAL REVIEW OPEN", "Keep preview-only until articles are reviewed; exclude from launch if review is incomplete."),
    ("Article Detail", "CURRENT PREVIEW", "/id/blog/[slug]/", "/en/blog/[slug]/", "EXISTS / PREVIEW", "PREVIEW – REVIEW METADATA MISSING", "EDITORIAL/LEGAL REVIEW OPEN", "Require source, reviewer, review date, applicability and legal sign-off for each article."),
    ("Contact", "CURRENT", "/id/contact/", "/en/contact/", "EXISTS", "PARTIAL – INLINE SUCCESS; ADDRESS/PRIVACY/LAUNCH CONTACT OPEN", "LEGAL/UI/ENV OPEN", "Implement thank-you pop-up, confirm launch channels/address/privacy, and configure production Resend/domain values."),
    ("Service Details", "BACKLOG", "MISSING", "MISSING", "ROUTES MISSING", "NOT IMPLEMENTED", "BUSINESS SCOPE/COPY/WIREFRAME OPEN", "Do not implement until each category scope, exclusions, deliverables, reviewer model, and examples are approved."),
    ("FAQ", "BACKLOG", "MISSING", "MISSING", "ROUTE MISSING", "NOT IMPLEMENTED – ANSWERS MISSING", "LEGAL/OPERATIONAL REVIEW OPEN", "Draft and review answers before creating the route/component."),
    ("Privacy Policy", "BACKLOG / LAUNCH BLOCKER", "MISSING", "MISSING", "ROUTE/CONTENT MISSING", "NOT IMPLEMENTED – LAUNCH BLOCKER", "DATA-FLOW/LEGAL APPROVAL OPEN", "Confirm actual data flow and obtain approved policy before public launch."),
    ("Terms & Disclaimer", "BACKLOG / LAUNCH BLOCKER", "MISSING", "MISSING", "ROUTE/CONTENT MISSING", "NOT IMPLEMENTED – LAUNCH BLOCKER", "LEGAL DRAFT/APPROVAL OPEN", "Obtain approved terms/disclaimer before public launch."),
]

qa_rows = []
for index, item in enumerate(qa_pages, start=1):
    page, lifecycle, route_id, route_en, route_status, implementation, blocker, action = item
    qa_rows.append({
        "QA ID": f"MQA-{index:02d}", "Page": page, "Lifecycle": lifecycle, "Route ID": route_id, "Route EN": route_en,
        "Route Status": route_status, "Implementation Match": implementation, "Wireframe State": "NOT REVIEWED / SEE MAPPING",
        "UI/UX Review": "NOT REVIEWED", "Approval Status": "NOT APPROVED", "Open Blocker": blocker,
        "Recommended Action": action,
    })

output = {
    "mappingRows": mapping_rows,
    "assetRows": asset_rows,
    "referenceRows": reference_rows,
    "qaRows": qa_rows,
    "auditCoverage": context["coverage"],
    "sourceCounts": {key: len(value) for key, value in content.items()},
}
(WORK / "workbook_data.json").write_text(json.dumps(output, ensure_ascii=False, indent=2), encoding="utf-8")
print(json.dumps({key: len(value) for key, value in output.items() if isinstance(value, list)}, indent=2))
