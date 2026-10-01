# Home hero and shared navbar revision — 1 October 2026

## Confirmed direction

The supplied screenshot is a visual reference for placement, not source copy or a claim of awards. The user confirmed a shared navbar layout on every page and a new hero only on Home. Existing bilingual headlines, supporting copy, fonts and the consultation CTA remain. The existing four team portraits are separated from their backgrounds and presented in monochrome. No logo row is added below the hero; the previous Home client-register block is removed from this location.

The desktop navbar balances the logo on the left, the main links in the middle, and language/consultation actions on the right. Its mobile menu and service mega-menu retain keyboard and outside-click behavior. Home uses a light sticky header against the same brand-paper hero background. Other full-image main-page banners retain their existing immersive treatment with the updated navigation arrangement.

Home copy is centered above four independently rendered team cutouts. The title highlights its first phrase in brand red. The hero has one consultation button. Portraits share a bottom composition with small height offsets; mobile reduces the composition height, brings the outer portraits slightly inward to preserve faces and hair, and keeps copy above the portraits. The heading uses the existing shared font and size tokens.

Primary button-style CTAs, including navigation, final CTA, contact form and floating WhatsApp, share a 4px corner radius through one brand token. Text links remain text links.

## Cutout assets and provenance

The built-in imagegen tool edited each portrait independently. Four WebP files are saved in `src/assets/`, retaining the generated alpha and framing. Original portraits remain available for team and individual profile pages. WebP encoding uses quality 90 and alpha quality 100, without resizing or cropping. Each generated PNG has transparent corner pixels and approximately 50% transparent background area.

| Source portrait | Hero asset |
| --- | --- |
| team-hans-galdino.webp | team-hans-galdino-cutout.webp |
| team-kelvin-anata-lian.webp | team-kelvin-anata-lian-cutout.webp |
| team-maria-indah-putri.webp | team-maria-indah-putri-cutout.webp |
| team-michael-alvaro.webp | team-michael-alvaro-cutout.webp |

Absolute asset directory: `C:/Users/Joshua/OneDrive/Documents/Law/outputs/galdino_partner/website/src/assets/`.

The same final prompt was used once per source portrait:

> Use case: identity-preserving-edit and background removal. Edit target: the single supplied professional portrait. Remove ONLY the entire office/studio background and its colored panels. Preserve the exact same person, face, identity, facial expression, hair, suit, body shape, hands, pose, lighting and original photographic framing. Make the isolated person neutral black and white. Keep every part of the person visible in the source; do not crop the hair, shoulders, hands or existing lower edge. Do not invent missing body parts or restyle clothing. Output one clean photorealistic cutout with a genuinely transparent alpha background, natural hair and suit edges, no background, no shadow, no ground, no border, no lettering, no watermark, no checkerboard baked into the image. Maintain the original portrait proportions and source subject scale.

## Verification

The complete QA run passed: Astro check (129 files, zero errors/warnings/hints), 20 unit tests, production build, and validation of 167 bilingual pages. All 40 browser tests passed, including nine responsive widths across 17 representative routes, 13 accessibility scans, mega-menu/keyboard behavior, language switching and local form states. A focused browser review captures both languages at 1440px and 375px and rechecks 320/375/430px after the outer mobile portraits were moved inward. Prices remain provisional and indexing stays disabled.
