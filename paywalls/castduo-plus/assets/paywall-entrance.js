(() => {
  'use strict';

  // Keep the reveal restrained: opacity only, so existing hero motion and layout stay intact.
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  // This script is loaded after the first screen is rendered; start before its first paint.
  document.querySelectorAll('.phone .screen').forEach((screen) => {
    [...screen.children]
      .filter((element) => {
        const style = getComputedStyle(element);
        return element.getClientRects().length && style.display !== 'none' && style.visibility !== 'hidden';
      })
      .forEach((element, index) => element.style.setProperty('--paywall-entry-index', index));
    screen.classList.add('paywall-entrance');
  });
})();
