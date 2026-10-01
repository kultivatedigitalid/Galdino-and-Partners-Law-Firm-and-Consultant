# Home architectural composition and navbar revision - 2 October 2026

The user supplied a composed visual reference and two separate assets: an architectural backdrop and a transparent photograph of three people consulting over a laptop and documents. The latest reference supersedes the prior one-line desktop headline and the full-width lower red rule: Home now uses two deliberate headline lines and the architectural red accent. The current headline, supporting copy and consultation CTA remain live text and links.

## Composition

Continue the design-taste-frontend and impeccable preserve-mode direction: calm editorial business licensing, existing typography and brand tokens, native Astro/CSS, no new dependencies. Dials remain DESIGN_VARIANCE 4, MOTION_INTENSITY 2, VISUAL_DENSITY 3.

Use the supplied architecture as a centered full-hero background and the supplied group as a separate bottom-aligned image. The title sits above the group, with white text in the red first-phrase box. Thin vertical guides and small side annotations echo the reference; mobile hides these decorative elements. The photograph keeps its proportions and alpha. Desktop uses one viewport with a flexible photo frame; mobile lowers the architectural backdrop behind the group and softly blends its blank upper edge so the CTA remains on a quiet surface.

All website headers are transparent at the top and become solid white after the existing 2rem scroll sentinel leaves the viewport. Home and image-led pages retain their fixed position; other pages retain sticky positioning. Image-led headers keep light text until scrolling, then use dark text on white. The shared IntersectionObserver drives both header families without adding a scroll-event loop. Background/color transitions honor reduced motion.

## Supplied assets

Reference: C:/Users/Joshua/AppData/Local/Temp/codex-clipboard-87977453-2289-49f2-a421-53a9a391283e.png.
Backdrop source: C:/Users/Joshua/Downloads/Minimalist Architectural Skyline with Red Accent.png.
Foreground source: C:/Users/Joshua/Downloads/ChatGPT Image Oct 2, 2026, 01_52_29 AM.png.

Both sources are 1784x882. The foreground has genuine alpha with approximately 45.3% fully transparent pixels. Source files were encoded as WebP (quality 88; alpha quality 100) without raster resizing, cropping or creative editing. No new image generation was needed. Existing earlier hero assets are retained.

Saved backdrop: C:/Users/Joshua/OneDrive/Documents/Law/outputs/galdino_partner/website/src/assets/home-architecture-supplied.webp (32,824 bytes).
Saved foreground: C:/Users/Joshua/OneDrive/Documents/Law/outputs/galdino_partner/website/src/assets/home-consultation-supplied-cutout.webp (140,840 bytes).

src/assets/home-architecture-supplied.webp SHA256 46047122a6097e9415b02d1219383cb55b248b37a72c9c9ad52f2f07b839b19d
src/assets/home-consultation-supplied-cutout.webp SHA256 796010c2b39fe475522846de4b46ef5a047d0264aeebe8bdc57470b1716f6a3b

## Verification

Astro check: 129 files, zero errors/warnings/hints. Twenty unit tests, production build and 167-page validation passed. Ten focused browser tests passed across six viewport widths, Home accessibility and navigation. The shared-brand test passed again after desktop/mobile layout refinements; it exercises transparent-to-white and back-to-transparent transitions on six main pages in both languages, plus Contact. Final production HTML smoke checks confirmed high-priority architecture loading in both Home locales after the last build. Desktop/mobile screenshots cover both languages and scrolled headers. Local Lighthouse: Home 93 performance, 100 accessibility, 100 best practices, 69 SEO (noindex preserved), LCP 2.65s, CLS 0, TBT 17ms; Services 95 performance and Contact 99 performance. Both hero images are eager and high priority. QA_REPORT.md explains audit variability and production limits.
