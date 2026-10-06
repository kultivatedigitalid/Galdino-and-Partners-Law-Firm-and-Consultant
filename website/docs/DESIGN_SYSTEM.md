# Design System

## Direction

“Modern clarity”: premium, calm, legal-oriented, and business-focused. Use editorial asymmetry, controlled whitespace, visible hierarchy, and process diagrams. Avoid gradients, glassmorphism, glow, generic icon grids, excessive cards, and decorative animation.

## Tokens

Defined in `src/styles/global.css` through Tailwind `@theme`.

| Role | Token | Value |
|---|---|---|
| Text | `ink` | `#14201c` |
| Primary | `forest` | `#173f35` |
| Deep primary | `forest-deep` | `#0d2d26` |
| Soft accent | `sage` | `#d9e2dc` |
| Page | `paper` | `#f7f5ef` |
| Surface | `white` | `#fffefa` |
| Brand accent/decorative | `gold` | `#b08340` |
| Borders | `line` | `#d9d8d0` |
| Secondary text | `muted` | `#5e6964` |

`src/styles/contrast.css` supplies WCAG-safe functional variants when gold is used as small text: `#755018` on light surfaces and `#d9b878` on forest surfaces. Gold section backgrounds use `#c79b57` so deep-green copy remains AA. Keep the base brand accent for borders, rules, and non-text decoration.

Headings use the system Georgia stack; body uses a native sans stack. No font download is required. Container maximum is 76rem. Section spacing scales from 4.25rem mobile to 8rem. Cards use a 1.25rem radius and a soft shadow only where elevation communicates hierarchy.

## Responsive behaviour

Mobile-first. Single columns become two or four columns at Tailwind `md`/`lg`. Navigation collapses below `md`. Touch targets are at least 44px. Hero typography uses `clamp`.

## Motion

Durations are 180ms for controls and 600–700ms for entry. Reveal occurs once, enhances hierarchy, and respects `prefers-reduced-motion`.
