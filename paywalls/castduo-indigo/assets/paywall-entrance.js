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
  let billingTransition = false;
  addEventListener('message', async event => {
    if (event.source !== parent || event.origin !== location.origin || event.data?.type !== 'paywall-products-ready') return;
    if (typeof FRAME_OPTS === 'undefined' || typeof update !== 'function') return;
    const fig = document.querySelector('#preview figure') || document.querySelector('figure');
    if (!fig) return;
    const screen = fig.querySelector('.screen');
    const option = FRAME_OPTS[+fig.dataset.i];
    if (!screen || !option || option.state !== 'loading' || billingTransition) return;
    billingTransition = true;
    const oldHeights = new Map([...screen.children].map(node => [node.classList[0], node.getBoundingClientRect().height / (fig.querySelector('.phone').getBoundingClientRect().width / fig.querySelector('.phone').offsetWidth)]));
    const oldOffer = screen.querySelector('.purchase-area');
    if (!reduced.matches && oldOffer) {
      oldOffer.classList.add('billing-content-exit');
      await new Promise(resolve => setTimeout(resolve, 140));
    }
    const keep = [...screen.children].filter(node => !node.matches('.purchase-area, .gallery-timeline')); 
    option.state = 'ready';
    update(fig);
    keep.forEach(node => {
      const key = [...node.classList].find(name => name !== 'paywall-entry-item');
      const replacement = [...screen.children].find(candidate => candidate.tagName === node.tagName && key && candidate.classList.contains(key));
      if (replacement) replacement.replaceWith(node);
    });
    if (!reduced.matches) {
      const phone = fig.querySelector('.phone');
      const scale = phone.getBoundingClientRect().width / phone.offsetWidth;
      const resized = [];
      [...screen.children].forEach(node => {
        const before = oldHeights.get(node.classList[0]);
        const after = node.getBoundingClientRect().height / scale;
        if (before == null || Math.abs(before - after) < 1) return;
        const previous = {height:node.style.height, flex:node.style.flex, overflow:node.style.overflow, transition:node.style.transition};
        node.style.height = before + 'px';
        node.style.flex = '0 0 auto';
        node.style.overflow = 'hidden';
        resized.push({node, after, previous});
      });
      const offer = screen.querySelector('.purchase-area');
      offer?.classList.add('billing-content-enter');
      screen.querySelector('.gallery-timeline ol')?.classList.add('billing-content-enter');
      requestAnimationFrame(() => requestAnimationFrame(() => {
        resized.forEach(({node, after, previous}) => {
          node.style.transition = 'height 420ms cubic-bezier(.4, 0, .2, 1)';
          node.style.height = after + 'px';
          setTimeout(() => Object.assign(node.style, previous), 450);
        });
      }));
    }
  });
})();
