# Accessibility Guidelines

Target WCAG 2.2 AA fundamentals.

- Preserve semantic landmarks, heading order, labels, list structure, and native controls.
- All navigation and form actions must work by keyboard. Focus indicators use a high-contrast gold outline.
- Minimum interactive target is approximately 44×44px.
- Colour never carries the only meaning; status messages include text and use `aria-live`.
- The mobile menu exposes `aria-expanded` and controls the navigation element.
- FAQ uses native `details`/`summary`.
- Form inputs have visible labels, required semantics, autocomplete, length constraints, and server validation.
- Decorative shapes are ignored; meaningful visuals have an accessible label and explanatory caption.
- Team/project placeholder images are text surfaces until real assets receive descriptive alt text.
- `prefers-reduced-motion` disables non-essential animation and smooth scrolling.

Manual checks before release: tab from the address bar through every control; operate menu, filters, disclosures, language switch, and form; zoom to 200%; test 320px width; inspect heading structure; confirm contrast after any brand-colour change; run screen-reader smoke tests in ID and EN.
