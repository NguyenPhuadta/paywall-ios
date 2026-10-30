(() => {
  'use strict';
  const html = document.documentElement;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const screens = [...document.querySelectorAll('.phone .screen')];
  let started = false;
  function reveal() {
    if (started) return;
    started = true;
    if (!reduced.matches) screens.forEach(screen => {
      [...screen.children].forEach((element, index) => {
        element.style.setProperty('--paywall-entry-delay', Math.min(index, 4) * 32 + 'ms');
        element.classList.add('paywall-entry-item');
        element.addEventListener('animationend', event => {
          if (event.target === element && event.animationName === 'paywall-fade-in') element.classList.remove('paywall-entry-item');
        });
      });
    });
    requestAnimationFrame(() => requestAnimationFrame(() => html.classList.add('paywall-revealed')));
  }
  const images = [...document.querySelectorAll('.phone img')].map(img => {
    if (typeof img.decode === 'function') return img.decode().catch(() => {});
    return Promise.resolve();
  });
  Promise.race([
    Promise.all([document.fonts ? document.fonts.ready : Promise.resolve(), ...images]),
    new Promise(resolve => setTimeout(resolve, 1200))
  ]).then(reveal);

  // Product loading updates the offer in place, without reloading the iframe or hero.
  addEventListener('message', event => {
    if (event.source !== parent || event.origin !== location.origin || event.data?.type !== 'paywall-products-ready') return;
    if (typeof FRAME_OPTS === 'undefined' || typeof update !== 'function') return;
    const fig = document.querySelector('#preview figure') || document.querySelector('figure');
    if (!fig) return;
    const screen = fig.querySelector('.screen');
    const option = FRAME_OPTS[+fig.dataset.i];
    if (!screen || !option || option.state !== 'loading') return;
    const keep = [...screen.children].filter(node => !node.matches('.purchase-area, .gallery-timeline')); 
    option.state = 'ready';
    update(fig);
    keep.forEach(node => {
      const key = [...node.classList].find(name => name !== 'paywall-entry-item');
      const replacement = [...screen.children].find(candidate => candidate.tagName === node.tagName && key && candidate.classList.contains(key));
      if (replacement) replacement.replaceWith(node);
    });
  });
})();
