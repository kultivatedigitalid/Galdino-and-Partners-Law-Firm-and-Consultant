# Home consultation trio revision - 2 October 2026

The user confirmed that a third consultation participant should be integrated into the existing two-person working scene. The existing bilingual headline stays on one line on desktop; mobile may use two lines. The red box and white text remain on the headline's first phrase. The hero and fixed Home navbar use the following company section's gray-cream surface, #ecebea. The full-width 12px red rule cuts the lower tabletop directly; all faces and hands remain visible.

## Design decisions

Continues the scoped design-taste-frontend and impeccable preserve-mode revision: business licensing for business owners, calm editorial photography and existing Galdino typography. Dials remain DESIGN_VARIANCE 4, MOTION_INTENSITY 2, VISUAL_DENSITY 3. No new dependencies or animation system.

The supplied reference informs centered copy above a group photograph and a continuous lower rule. The existing website's headline, lead, consultation CTA, logo, navigation, rounded buttons and other sections are retained. A slightly wider photographic foreground lets three participants share the same documents. A clipped figure and small downward image translation crop only the bottom table at the red rule. Tablet copy wraps naturally. The original duo asset remains available.

## Image provenance

Mode: built-in imagegen edit, compositing with identity preservation.
Edit target: src/assets/home-licensing-duo-cutout.webp.
Project asset: src/assets/home-licensing-trio-cutout.webp.
Absolute saved path: C:/Users/Joshua/OneDrive/Documents/Law/outputs/galdino_partner/website/src/assets/home-licensing-trio-cutout.webp.
Generated source: C:/Users/Joshua/.codex/generated_images/01a0e792-9517-75e3-815d-bf814cc4d01b/exec-df3c47af-2c93-45e7-b1c7-d6c700f95271.png.

The 1672x941 PNG has real alpha, transparent top corners and approximately 27.8% fully transparent pixels. The tabletop intentionally reaches the bottom edge. Native WebP encoding preserves alpha at quality 100, with image quality 90; no raster resizing or cropping is applied. The website controls the bottom crop in CSS. Astro generates responsive variants including 800px to avoid jumping from 640px directly to 960px on mobile displays.

Final prompt:

Use case: compositing / identity-preserve.
Asset type: transparent editorial photographic cutout for the Galdino & Partner Home hero.
Input image 1 is the edit target: the current grayscale woman and male consultant reviewing permit documents together.
Primary request: add exactly one adult Indonesian business owner on the left, seated and leaning slightly toward their shared documents, so all THREE people are naturally collaborating in one consultation. The added participant wears a dark business-casual blazer and light shirt, listens attentively and looks at the paperwork, not the camera.
Preserve the original woman and male consultant's identities, faces, expressions, clothing, poses, hands, pen, and shared paperwork as closely as possible. Keep photographic realism and consistent light, perspective, and scale.
Composition: wide horizontal approximately 16:9. All three heads and hands fully visible, shoulder silhouettes cleanly separated from the background. The group and shared desk occupy nearly the full width with only small transparent side margins. The lower tabletop/documents extend to the straight bottom canvas edge so the website can crop the bottom desk flush against a red divider; do not create an oval or feathered floating lower edge. Keep all hands safely above this bottom crop.
Color: true monochrome black and white, natural skin and fabric textures, quiet professional mood.
Background: genuinely transparent alpha around all subjects and desk; remove office, backdrop, haze, ambient room shadows and any opaque background mat. No text, logos, buttons, website UI, decorative red line, watermark, extra people or duplicated body parts.

## Verification

Astro: 129 files, zero errors/warnings/hints. Twenty unit tests, production build and 167-page validation passed. Ten focused browser tests passed across six viewport widths, Home accessibility and navigation. The shared-brand test passed again after the final responsive-image change. Desktop/mobile screenshots in both languages confirm an inline desktop heading, two mobile lines, shared background, intact faces/hands and the crop at the rule. Final local Home Lighthouse: performance 83, accessibility 100, best practices 100, SEO 69 (indexing stays blocked), LCP 3.37s, CLS 0, TBT 61ms. Performance remains below target; see QA_REPORT.md for the initial-run variance and practical limits.
