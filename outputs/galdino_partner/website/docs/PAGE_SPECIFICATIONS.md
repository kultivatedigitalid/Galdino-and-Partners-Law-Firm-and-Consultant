# Page Specifications

## Homepage

Home is the first completed page in the approved monochrome/red redesign. Its positioning is permit handling first, supported by legal and regulatory capability; copy must not present the business as an hourly legal-consultation practice.

Section order:

1. Immersive fixed Header with Home, Profile, Services, Our Experiences, Blog, a scroll-preserving language switcher, and one consultation CTA. It begins with a black-to-transparent hero gradient and becomes a solid blurred white surface after scroll.
2. One-viewport photographic hero with a direct business-permit promise, concise explanatory copy, consultation CTA, services CTA, and credibility indicators.
3. Static client register immediately after the hero. Six visibly labelled dummy marks test the composition; real identities require publication consent.
4. Complete company positioning statement including clearly marked founding-year and record placeholders, a Profile CTA aligned with the section label, a compact five-image gallery, and four clearly unverified statistics.
5. Fifteen-category service carousel with a category-relevant visual, description, price/estimate, detail link, and full Services CTA. Four cards are visible at desktop width; the former problem statement is intentionally omitted.
6. Four-step process explaining assessment, requirement mapping, document filing, progress, and follow-up. Its label and heading are left-aligned.
7. Art-directed company-video placeholder that does not expose a non-functional play control. At desktop width the section is capped near one viewport.
8. Confidentiality-safe Our Experiences editorial image grid with one featured and two supporting case-study cards, concise metadata, clearly marked year/image placeholders, and a link to the complete page.
9. Editorial preview of the three latest published Markdown articles.
10. Specific final CTA for starting a permit-needs assessment, with consultation and WhatsApp paths.

Home uses the transparent `gp-logo-brand.png` mark in its header, company-film placeholder, schema, and footer.

## Profile

Profile is a dedicated people-first page within the monochrome/red design system. It does not reuse the generic inner-page hero or the old forest/sage card system.

Section order:

1. Centered red-black editorial team banner with a concise team-and-licensing promise, one anchor CTA, and a clearly labelled generated placeholder visual.
2. A visible company label, the two-line heading "Kami Hadir Membantu / Bisnis Anda", an enlarged version of the accessible five-image gallery used on Home aligned to the company-description column, two complete company paragraphs, and a registry for legal name, founding year, registration, and address placeholders.
3. A compact three-member directory for Kelvin Anata Lian, Maria Indah Putri, and Michael Alvaro, using generated 5:6 concept portraits, name, position, expertise, and bottom-aligned CTAs to each bilingual person route. The full directory fits within a standard desktop viewport; each person detail page exposes email, domicile, and phone placeholders in the opening viewport.
4. The same permit-start CTA used immediately above the Home footer.

Profile content lives in `src/data/profile.ts`. The three supplied member names are present, while generated concept portraits, personal contacts, credentials, founding year, registration, and office address remain clearly replaceable until verified. Person detail pages exist at `/id/profile/[slug]/` and `/en/profile/[slug]/`; they stay `noindex,follow` and do not emit Person schema until identities are verified.
## Services

Four initial service categories with an indicative-scope placeholder. Final deliverables, exclusions, timelines, and authority boundaries require business approval. The Home service rail may present the broader centralized list while the full page awaits its dedicated redesign.

## Projects

Three experience structures without client identity or invented outcomes. Client logos and testimonials require written publication consent.

## Blog

Index provides category filters and tags. Detail includes breadcrumbs/back navigation, author/date/tags, disclaimer, translated equivalent, and related articles.

## Contact

Direct WhatsApp/email, office placeholder, urgency warning, accessible form, consent, status feedback, and server delivery. It remains accessible through consultation CTAs even though Contact is not a navbar item.

## Routing matrix

Every content page exists at both `/id/{path}/` and `/en/{path}/`, including three static person-detail routes under `/profile/[slug]/`. Blog detail slugs may differ by locale but share `translationKey`. The language switcher uses the matching path for fixed pages and the paired article for blog detail. Scroll position is preserved for language switches when the destination matches the stored path and the saved value is recent. Home is `/id/` or `/en/`, and only the exact locale root receives the active Home state.
