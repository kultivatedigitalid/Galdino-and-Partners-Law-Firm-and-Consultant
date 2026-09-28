# Home Editorial Hover Feedback

Commit: `UNBORN` (repository has no initial commit)

## Goal

Add restrained, reactive hover feedback to the Home page's Our Experiences and Insight Terbaru content without changing their layout, copy, or information hierarchy. Motion must communicate relationship and interactivity while remaining appropriate for a premium legal-services brand.

## Audit Finding

**Category:** Missed opportunity / motion cohesion  
**Priority:** Medium

- `src/components/home/ExperienceShowcase.astro`: the experience rows only move the decorative arrow, so the hovered row does not feel like one responsive unit.
- `src/components/home/HomeInsights.astro`: article links have text decoration feedback, but the featured story and supporting rows lack a coordinated container response.
- The codebase already defines `--home-ease: cubic-bezier(.22, 1, .36, 1)` and honors `prefers-reduced-motion`; the new motion should extend those conventions.

## Boundaries

- Change only motion-related CSS in:
  - `src/components/home/ExperienceShowcase.astro`
  - `src/components/home/HomeInsights.astro`
- Do not change layout dimensions, content, routing, markup, or JavaScript.
- Do not add a dependency.
- Do not add autoplay, parallax, or scroll-triggered motion.

## Implementation

### 1. Experience rows

**Location:** `src/components/home/ExperienceShowcase.astro`, scoped style block for `.experience-ledger article`, its heading, and `.experience-ledger__arrow`.

Add:

```css
.experience-ledger article {
  transition:
    transform 180ms var(--home-ease),
    background-color 170ms ease;
}

.experience-ledger h3 {
  transition: color 170ms ease;
}

.experience-ledger__arrow {
  transition:
    color 170ms ease,
    transform 160ms var(--home-ease);
}
```

Under `@media (hover: hover) and (pointer: fine)`:

```css
.experience-ledger article:hover {
  background: rgb(196 20 42 / 0.035);
  transform: translateX(4px);
}

.experience-ledger article:hover h3 {
  color: var(--home-red-deep);
}

.experience-ledger article:hover .experience-ledger__arrow {
  color: var(--home-red);
  transform: translate(4px, -4px);
}
```

This row is not a link, so use only a subtle four-pixel directional response and no pointer cursor, shadow, or exaggerated lift.

### 2. Featured insight

**Location:** `src/components/home/HomeInsights.astro`, scoped style block for `.insight-feature`, `.insight-feature__copy h3 a`, and the existing feature visual treatment.

Add:

```css
.insight-feature {
  transition: transform 180ms var(--home-ease);
}

.insight-feature__copy h3 a {
  transition: color 170ms ease;
}
```

Under `@media (hover: hover) and (pointer: fine)`:

```css
.insight-feature:hover,
.insight-feature:focus-within {
  transform: translateY(-4px);
}

.insight-feature:hover .insight-feature__copy h3 a,
.insight-feature:focus-within .insight-feature__copy h3 a {
  color: var(--home-red-deep);
}
```

Keep the visual geometry static so the headline remains the primary feedback target.

### 3. Supporting insight rows

**Location:** `src/components/home/HomeInsights.astro`, scoped style block for `.insight-supporting article` and its arrow link.

Add:

```css
.insight-supporting article {
  transition:
    transform 180ms var(--home-ease),
    background-color 170ms ease;
}

.insight-supporting article > a {
  transition:
    color 170ms ease,
    transform 160ms var(--home-ease);
}
```

Under `@media (hover: hover) and (pointer: fine)`:

```css
.insight-supporting article:hover,
.insight-supporting article:focus-within {
  background: rgb(196 20 42 / 0.035);
  transform: translateX(4px);
}

.insight-supporting article:hover > a,
.insight-supporting article:focus-within > a {
  color: var(--home-red-deep);
  transform: translate(3px, -3px);
}
```

### 4. Reduced motion

Extend each component's `@media (prefers-reduced-motion: reduce)` block so all new transforms are disabled:

```css
.experience-ledger article,
.experience-ledger__arrow,
.insight-feature,
.insight-supporting article,
.insight-supporting article > a {
  transform: none !important;
}
```

Retain the background and color feedback because it does not create spatial motion.

## Verification

1. Run `npm run check`.
2. At desktop pointer widths:
   - Hover each experience row; the row shifts right 4 px, heading and arrow respond together.
   - Hover/focus the featured insight; it rises 4 px and its headline changes color.
   - Hover/focus supporting insight rows; the row and arrow respond as one unit.
3. At touch widths:
   - No hover-only transform remains stuck after tapping.
4. With `prefers-reduced-motion: reduce`:
   - No row or article translates.
   - Color/background feedback remains legible.
5. Confirm no content reflow, clipping, horizontal overflow, or focus-ring regression.

## Feel Check

The response should feel immediate and editorial, not playful: no bounce, no spring overshoot, no shadow bloom, and no delay. All interaction durations remain below 200 ms.
