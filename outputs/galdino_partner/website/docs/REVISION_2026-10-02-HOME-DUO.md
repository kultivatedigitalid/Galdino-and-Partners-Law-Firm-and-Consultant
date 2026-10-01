# Home consultation hero revision - 2 October 2026

The user requested the two consultants from the original Home banner, isolated from the office background and rendered in black and white. The hero retains the current bilingual headline, supporting copy and consultation destination. “Pengurusan Izin” receives a solid brand-red box with white type; a full-width 12px red rule closes the hero. The Home navbar overlays the same light surface without a separating border. Shared navigation positions and the 4px CTA radius remain.

## Design decisions

Design read: a business licensing landing page for business owners, with calm, precise, editorial photography in the existing Galdino brand. Applied design-taste-frontend and impeccable as a scoped preserve-mode redesign. Dials: DESIGN_VARIANCE 4, MOTION_INTENSITY 2, VISUAL_DENSITY 3. Use the existing Astro/CSS architecture and shared tokens; no new dependencies or animation system.

Audit: the prior centered light Home had four portrait cutouts and a visible header divider. The original consultation scene shows the actual service activity more clearly. Preserve the logo, Aptos/Segoe typography, red #c4142a, paper #f4f3f1, existing routes and CTA text. Replace the four hero portraits with one extracted working scene. Other sections retain the user-approved brand composition and darker sections. Existing page-wide kicker, typography, radius and theme choices take precedence over greenfield skill defaults.

The title uses two intentional lines, with breathing room between the highlight and its continuation. On small English screens, the longer translated highlight uses a slightly smaller relative size so the phrase stays inside its box. The lead and CTA remain centered. The photograph uses contain with its entire foreground visible and is bottom-aligned above the red rule. Mobile uses the natural 3:2 image proportions. No crop, office background, logo strip or new proof claims are introduced.

Existing CTA hover/press/focus feedback is retained and follows reduced-motion settings. No decorative entrance or looping animation is added.

## Image provenance

Built-in imagegen edit, using the original src/assets/home-licensing-hero.webp as the edit target. Saved project asset: src/assets/home-licensing-duo-cutout.webp.

Absolute saved path: C:/Users/Joshua/OneDrive/Documents/Law/outputs/galdino_partner/website/src/assets/home-licensing-duo-cutout.webp.

The generated 1536x1024 PNG has true alpha, zero-alpha corner pixels and approximately 44.7% fully transparent pixels. Native WebP encoding uses quality 90 and alpha quality 100; no resize or crop is applied. The original and previous portrait assets are retained.

Final prompt:

> Use case: background-extraction. Asset type: transparent foreground photograph for the Galdino & Partner homepage hero. Edit target: the supplied original photograph of a woman and a man reviewing and writing on permit paperwork at a table. Primary request: extract this exact pair and their immediate working foreground, convert it to neutral black and white. Remove the entire office background: all walls, windows, skyline, lights, red panels, background furniture and empty space on the left. Preserve both people's exact faces, hair, expressions, clothes, gestures, hands and positions relative to each other. Preserve the pen and nearby papers/documents that make their activity understandable; include only the directly adjacent foreground tabletop beneath those documents, not the large empty table. Keep the pair together as ONE coherent photographic cutout, centered within a horizontal transparent canvas and occupying most of its width. Show both complete heads and natural outer shoulder contours; minimally reconstruct only a clipped outer jacket edge if needed to avoid a hard vertical cutoff, with no new body parts, people or changed poses. Natural detailed alpha around hair, shoulders, hands and foreground objects. Color palette: strictly grayscale, natural contrast and realistic photographic texture. No opaque rectangular background or mat, no office remnants, no cast shadow, no decorative effects, no text, no logo, no watermark, and no checkerboard baked in. True transparent alpha everywhere outside the extracted foreground. Output a horizontal composition suitable for placement below centered headline text, around 3:2 proportions.

## Verification

Checks cover Astro diagnostics, unit tests, production build and route/link validation. Browser review focuses on the changed Home, shared navigation and responsive behavior; screenshots cover both languages on desktop and mobile. A Lighthouse run checks the production preview. Detailed outcomes are recorded in QA_REPORT.md and reports/.
