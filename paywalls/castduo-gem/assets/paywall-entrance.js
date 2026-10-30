(() => {
  'use strict';

  // Keep the reveal restrained: opacity only, so existing hero motion and layout stay intact.
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const reveal = () => {
    document.querySelectorAll('.phone .screen').forEach((screen) => {
      [...screen.children]
        .filter((element) => {
          const style = getComputedStyle(element);
          return element.getClientRects().length && style.display !== 'none' && style.visibility !== 'hidden';
        })
        .forEach((element, index) => {
          element.animate(
            [{ opacity: 0 }, { opacity: 1 }],
            {
              duration: 360,
              delay: index * 42,
              easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
              fill: 'both',
            },
          );
        });
    });
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', reveal, { once: true });
  } else {
    reveal();
  }
})();
