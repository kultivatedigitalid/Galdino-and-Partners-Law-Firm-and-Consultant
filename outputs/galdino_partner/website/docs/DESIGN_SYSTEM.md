# Design System

## Direction

The production direction follows Mockup 1: modern clarity for a premium, decisive, legal-oriented, and business-focused permit-handling practice. Home and Profile use strong sans-serif display typography, controlled editorial asymmetry, monochrome surfaces, brand red, restrained gold, square-edged components, and purposeful motion.

Home and Profile share a brand language without sharing the same composition. Home is service- and conversion-led. Profile is people-led, using a white editorial team banner, company registry, compact three-person directory, and dedicated person-detail layouts.

Avoid glassmorphism, glow, decorative animation, excessive gradients, generic icon grids, repeated identical cards, and unverified claims.

## Brand assets

The approved transparent red-black-gold mark is stored at `public/assets/gp-logo-brand.png` and is used across Header, Footer, branded visuals, and organization schema. The mark is rendered without a background plate so its transparent edge remains visible. A restrained image-only drop shadow may be used on dark surfaces; never add a white or off-white rectangle behind the logo.

The current Home hero layers the supplied `src/assets/home-architecture-supplied.webp` backdrop with `src/assets/home-consultation-supplied-cutout.webp`, a separate monochrome transparent group photograph. Live centered copy uses two headline lines with a red-and-white first phrase, the existing lead and CTA. Thin vertical guides and side notes echo the reference on large screens. Headers start transparent and turn white on scroll; image-led headers switch from light to dark text. See REVISION_2026-10-02-HOME-ARCHITECTURE.md. Earlier assets are retained. The Home experience grid uses `experience-business-licensing.png`, `experience-compliance-review.png`, and `experience-investment-project.png` as replaceable, context-specific placeholders. Profile uses `profile-company-hero-centered.webp` as a generated, replaceable red-black team banner with a centered focal crop. The team directory uses three generated, replaceable portrait assets: `team-kelvin-anata-lian.webp`, `team-maria-indah-putri.webp`, and `team-michael-alvaro.webp`. Replace all concept imagery with approved project and team photography before launch claims are finalized.

## Red brand tokens

Shared brand, typography, spacing, and motion tokens live in `:root`. `.home-redesign` and `.profile-redesign` expose page-specific aliases so compositions remain independent while visual values stay synchronized.

| Role | Home token | Profile token | Value |
|---|---|---|---|
| Primary text / dark surface | `--home-black` | `--profile-black` | `#0b0b0c` |
| White surface | `--home-white` | `--profile-white` | `#ffffff` |
| Page surface | `--home-paper` | `--profile-paper` | `#f4f3f1` |
| Soft neutral surface | shared | shared | `#ecebea` |
| Primary brand red | `--home-red` | `--profile-red` | `#c4142a` |
| Bright focus red | `--home-red-bright` | `--profile-red-bright` | `#ed2942` |
| Deep red surface | `--home-red-deep` | `--profile-red-deep` | `#710d1b` |
| Optional gold accent | `--home-gold` | `--profile-gold` | `#b18a4b` |
| Secondary text | `--home-muted` | `--profile-muted` | `#515156` |
| Border | `--home-line` | `--profile-line` | `#deddda` |
| Strong border | `--home-line-strong` | `--profile-line-strong` | `#b9b8b5` |

Red is reserved for primary actions, active states, focus, and meaningful emphasis. Gold remains optional and secondary.

## Typography and layout

Headings use native Aptos Display, Segoe UI Variable Display, and system sans fallbacks. Body copy uses Aptos, Segoe UI, and system sans. No webfont request is required. Display tracking never goes below `-0.04em`.

The maximum content container is 78rem. Home and Profile use fluid section spacing from 4.5rem on mobile to 7rem on large screens, with the compact Profile team directory intentionally using a tighter 2.25rem to 3rem range so the complete directory fits within a standard desktop viewport. Hero headings use the shared `--brand-type-hero` scale; section headings use `--brand-type-section`. Components are predominantly square-edged and flat; hierarchy comes from layout, rules, typography, imagery, and color rather than shadows or rounded cards.

## Responsive behaviour

On Home, the Header is fixed over the light hero and uses the same paper surface without a separating border. Full-image main heroes retain the dark immersive Header, which transitions to a solid light surface after the top sentinel leaves view. Detail and contact routes retain the solid sticky Header. Desktop navigation balances logo left, links center and language/CTA right, and collapses at 1024px. Profile changes from its white editorial banner to a vertical copy-and-image composition below 900px. The team directory is centered in a compact three-column grid on desktop, uses 5:6 portrait frames and bottom-aligned profile CTAs, fits within a standard desktop viewport, and becomes a native horizontal snap rail below 900px.

The floating WhatsApp dock appears above 768px and is hidden below 768px. On Home, Profile, and every individual team profile it uses an opaque deep-red-to-brand-red gradient; hover must never reduce opacity.

## Motion

- Controls use 140-190ms with `cubic-bezier(.22, 1, .36, 1)`.
- Buttons move by at most 2px on hover and scale to `0.97` on press.
- Arrow feedback moves by 3px.
- Viewport reveals use opacity and a 12px translation over approximately 500-520ms.
- The shared company gallery advances every six seconds only when motion is allowed, pauses during interaction, remains manually draggable, and responds to ArrowLeft/ArrowRight.
- Image hover scales are capped at `1.02`.
- Hover motion is gated to fine pointers.
- `prefers-reduced-motion` removes movement and smooth scrolling.

Motion must clarify hierarchy, state, or interaction. Do not add looping decorative animation, elastic easing, or autoplay carousels beyond the approved company gallery.
