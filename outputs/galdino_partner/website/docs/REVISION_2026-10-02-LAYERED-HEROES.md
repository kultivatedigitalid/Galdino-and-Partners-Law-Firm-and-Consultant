# Supplied layered main-page heroes - 2 October 2026

The user supplied five complete visual references and ten separate photographic assets. The references govern layout and copy; embedded mockup navbar/text/buttons are not flattened into the website. Home retains its previously approved architecture/trio composition. Changes cover Services, Industries, Our Experiences, Insight and About Us, in Indonesian and English. Sections below the heroes and individual professional profiles retain their approved layouts.

## Composition and source mapping

Continue design-taste-frontend and impeccable preserve mode, with DESIGN_VARIANCE 4, MOTION_INTENSITY 2 and VISUAL_DENSITY 3. Use the existing brand font, hero-size token, red/white title emphasis, dark remaining lines, centered lead, and rounded CTA. The About Us reference deliberately has three title lines. Photography remains a separate proportional bottom-aligned layer; color cutouts render in monochrome via CSS. Each light background includes its own architectural/industrial red accents and guides. Side annotations echo the supplied references and disappear on small screens. Mobile stacks text and the complete cutout, and lowers the background artwork behind the photograph.

| Page | Background asset timestamp | Cutout timestamp | Reference timestamp | CTA destination |
| --- | --- | --- | --- | --- |
| Services | 11_54_43 AM-5 | 11_54_45 AM-6 | 11_11_37 AM | Contact |
| Industries | 11_54_46 AM-7 | 11_54_48 AM-8 | 11_11_27 AM | Contact |
| Our Experiences | 11_54_50 AM-9 | 11_54_52 AM-10 | 11_11_13 AM | Experience directory |
| Insight | 11_54_40 AM-3 | 11_54_42 AM-4 | 11_15_30 AM | Latest articles |
| About Us | 11_54_36 AM-1 | 11_54_38 AM-2 | 11_15_47 AM | Team directory |

All filenames begin with “ChatGPT Image Oct 2, 2026, ” and end in .png, supplied from C:/Users/Joshua/Downloads. The user explicitly selected the supplied industrial -9 background for Our Experiences, despite the construction scene in that reference. Services uses the supplied five-person monochrome cutout rather than inventing an unavailable four-person photograph. Asset provenance, dimensions, transparency, byte sizes and output hashes are recorded in reports/layered-hero-assets.json. All originals are 1784x882. Outputs are WebP quality 88, alpha quality 100, without cropping or resizing. Earlier assets remain available.

## Shared implementation

LayeredHero.astro renders both images, live h1/lead/CTA and optional kicker from bilingual layered-heroes.ts. BaseLayout's overlayHeader option keeps the light heroes under the fixed navbar while immersive=false selects dark foreground text. Existing scroll-sentinel behavior changes the transparent initial navbar to white on scroll, and back again at the top. Detail and Contact navigation retain their prior behavior. Anchored CTA destinations account for the fixed header. Minimal CTA movement honors reduced motion.

## Verification

Results are recorded in docs/QA_REPORT.md, reports/browser-summary.json and reports/performance.json after the final production build. Astro check covers 131 files with zero errors, warnings or hints; 20 unit tests, the production build and 167-page validation pass. All 41 browser tests pass, including nine widths, 13 axe pages, both locales, proportional photo framing, live CTA destinations and transparent/white navbar states. Thirty-one current screenshots are saved. Four new main pages score 94–98 performance; About Us varies from 85 to 95 on identical-build local audits. All five score 100 accessibility and best practices. The observed About Us audit variation is retained in the performance report; no unrelated layout change was made to chase a score.
