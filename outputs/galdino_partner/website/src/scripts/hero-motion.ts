// Content is visible without JavaScript. Animate only a hero near the viewport
// top, so browser scroll restoration never replays an offscreen entrance.
function startHeroMotion() {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches || document.hidden) return;
  document.querySelectorAll<HTMLElement>('[data-hero-motion="ready"]').forEach(hero => {
    const bounds = hero.getBoundingClientRect();
    if (bounds.top < -80 || bounds.top >= innerHeight) return;
    hero.dataset.heroMotion = 'playing';
    // Restore natural button hover/press transforms after entrance completes.
    window.setTimeout(() => {
      hero.dataset.heroMotion = 'complete';
    }, 1250);
  });
}
startHeroMotion();
document.addEventListener('astro:page-load', startHeroMotion);
