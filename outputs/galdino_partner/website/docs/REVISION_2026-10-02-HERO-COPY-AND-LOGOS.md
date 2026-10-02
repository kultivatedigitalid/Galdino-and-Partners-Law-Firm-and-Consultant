# Hero copy, photography and Home logo strip — 2 October 2026

The user confirmed the latest Services mockup supplies photographic composition only: use the requested live copy and remove the label above the headline. All five main heroes must still fit one desktop viewport. Mobile may grow with its text. The Home strip reuses the existing project wordmarks.

## Copy and hierarchy

LayeredHero omits the kicker on Services, Industries, Our Experiences, Insight and About Us. The red title highlight, black continuation, shared display font and existing CTA destinations remain consistent with Home.

| Page | Indonesian headline | English headline |
| --- | --- | --- |
| Services | **Layanan Jasa** yang Dibutuhkan Bisnis Anda | **Business Services** for Your Business Needs |
| Industries | **Cakupan Industri** yang kami Dukung | **Industry Sectors** We Support |
| Our Experiences | **Pengalaman Kami** dalam Berbagai Kebutuhan | **Our Experience** Across Business Needs |
| Insight | **Informasi Relevan** untuk Bisnis Anda | **Relevant Information** for Your Business |

The experience lead is “Pengalaman yang membantu kami memahami kebutuhan bisnis Anda.” Its translation is “Experience that helps us understand your business needs.” About Us keeps its current title and lead. Services uses the new reference's concise explanation of mapping requirements, preparing documents and following up on the permit process.

## Separate photographic layers

Services now uses the four-person document-review composition from `ChatGPT Image Oct 2, 2026, 05_30_35 PM.png`, with a restrained architectural backdrop, left red block and right blueprint motif. The built-in image generation tool extracted a transparent monochrome people/desk layer and a separate background. Navbar, copy, buttons and annotations remain HTML; the reference screenshot is not used as the page background.

The built-in image generation tool also repaired the outer coat contours of the About Us cutout. A narrow CSS edge feather softens the remaining side transition. Faces, poses and hands remain visible. Our Experiences retains the explicitly approved industrial -9 backdrop.

The five photographs are enlarged by excluding unused transparent top padding from their layout measurements. Each cutout has a measured photoTop value, leaving an 8px source-image reserve before the first visible pixel. CSS preserves the image proportions; the frame remains below the CTA and shrinks to the available height. Only transparent upper pixels extend outside the frame. Desktop heroes retain 100svh and Home's 76rem maximum photograph width; shorter screens use tighter gaps. Mobile uses the same visible-image aspect ratio in its natural stack.

Saved assets and their original generated PNG paths, dimensions, hashes and format-conversion provenance are in `reports/hero-assets-v3.json`. WebP conversion only encodes the generated output; no raster crop or resize is applied. The final edit prompts are recorded in `reports/hero-v3-prompts.json`. Older assets remain available.

## Home brand strip

ClientMarquee appears immediately after HomeHero, before the company introduction. It uses the existing six HOME_CLIENTS monograms and names in white on the shared brand red. These are existing provisional portfolio wordmarks, not newly verified client logos or new client claims.

The duplicated track moves right to left in a seamless 36-second CSS loop. The duplicate is hidden from assistive technology. Movement runs only while the strip is in view, pauses on hover or keyboard focus, and has an explicit pause/resume button with localized accessible labels. Reduced-motion preferences and JavaScript-disabled browsers show all six wordmarks in a static responsive grid; there is no horizontal page overflow. No additional dependency is required.

## Review

The production build, Astro check, 20 unit tests and 167-page validation pass. The browser review covers all nine responsive widths across 17 representative routes, Home plus the five main-page WCAG scans, shared navbar/type checks, both languages, five short laptop viewports and 375px mobile framing. The photo-alpha check confirms the excluded top area contains no visible person pixels. Additional tests verify movement, hover/focus pause, explicit pause/resume, reduced motion and JavaScript-disabled mobile output.

The review verifies 25 unique focused browser cases across the broad run and final targeted follow-up, with 64 saved screenshots. Final mobile Lighthouse scores are Home 93, Services 96 and About Us 94 for performance, and 100 for accessibility and best practices on all three. Initial Home measurements and the contrast correction remain recorded for context.

Final browser counts, screenshots and Lighthouse results are recorded in `reports/hero-v3-review.json`, `reports/hero-v3-performance.json` and `docs/QA_REPORT.md`. Earlier compact-hero and complete browser reports are historical baselines; this revision replaces their headline and photograph framing decisions. Home's approved hero, transparent-to-white navbar behavior and CTA destinations remain intact.
