const smartHueDevices = (() => {
  const sizes = [
    ['440x956', 'iPhone 16 Pro Max, 17 Pro Max'],
    ['420x912', 'iPhone Air'],
    ['430x932', 'iPhone 14 Pro Max, 15 Plus, 15 Pro Max, 16 Plus'],
    ['402x874', 'iPhone 16 Pro, 17, 17 Pro'],
    ['393x852', 'iPhone 14 Pro, 15, 15 Pro, 16'],
    ['390x844', 'iPhone 12, 13, 14, 16e, 17e'],
    ['414x896', 'iPhone 11'],
    ['375x812', 'iPhone 12 mini, 13 mini'],
    ['375x667', 'iPhone SE 2, SE 3'],
  ];
  const defaultDevice = '390x844';
  const picker = document.querySelector('#size');
  const phone = document.querySelector('.phone');
  const dimensions = id => id.split('x').map(Number);
  sizes.forEach(([id, models]) => {
    const option = new Option(`${dimensions(id).join(' × ')} · ${models}`, id);
    picker.add(option);
  });

  function applySize(id) {
    const [width, height] = dimensions(id);
    picker.value = id;
    phone.dataset.device = id === defaultDevice ? 'default' : dimensions(id).join('×');
    phone.classList.toggle('small', id === '375x667');
    phone.style.setProperty('--screen-width', `${width}px`);
    phone.style.setProperty('--screen-height', `${height}px`);
    document.querySelector('main').style.setProperty('--preview-width', `${width}px`);
  }

  const requested = new URLSearchParams(location.search).get('device');
  applySize(sizes.some(([id]) => id === requested) ? requested : defaultDevice);
  picker.addEventListener('change', () => applySize(picker.value));
  return { sizes, dimensions, defaultDevice };
})();

(() => {
  if (document.documentElement.hasAttribute('data-embed')) return;

  const language = document.querySelector('#preview-language');
  const layout = document.querySelector('#countdown-layout');
  const palette = document.querySelector('#palette');
  const sizesGallery = document.querySelector('#device-frames');
  const statesGallery = document.querySelector('#state-frames');
  const { sizes, dimensions, defaultDevice } = smartHueDevices;
  const activeFrames = new Map();
  const observer = new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (entry.isIntersecting) loadFrame(entry.target);
    }
  }, { rootMargin: '280px 0px' });
  const resize = new ResizeObserver(entries => {
    for (const { target, contentRect } of entries) {
      target.style.setProperty('--frame-scale', contentRect.width / Number(target.dataset.width));
    }
  });

  function loadFrame(host) {
    const url = new URL('index.html', location.href);
    url.search = new URLSearchParams({
      embed: '1', board: '1', v: 'frames6', device: host.dataset.device,
      state: host.dataset.state, lang: language.value,
      countdown: layout.value, palette: palette.value,
    });
    activeFrames.get(host).src = url.href;
    observer.unobserve(host);
  }

  function makeFrame(device, state, label, subtitle) {
    const [width, height] = dimensions(device);
    const card = document.createElement('figure');
    const host = document.createElement('div');
    const iframe = document.createElement('iframe');
    const caption = document.createElement('figcaption');
    host.className = 'board-frame';
    Object.assign(host.dataset, { device, state, width });
    host.style.aspectRatio = `${width} / ${height}`;
    iframe.title = label;
    iframe.width = width;
    iframe.height = height;
    caption.textContent = label;
    if (subtitle) {
      const detail = document.createElement('small');
      detail.textContent = subtitle;
      caption.append(detail);
    }
    host.append(iframe);
    card.append(host, caption);
    activeFrames.set(host, iframe);
    resize.observe(host);
    observer.observe(host);
    return card;
  }

  sizesGallery.append(...sizes.map(([id, models]) =>
    makeFrame(id, 'ready', dimensions(id).join(' × '), models)
  ));
  for (const group of document.querySelectorAll('#billing-state optgroup')) {
    const heading = document.createElement('h3');
    const grid = document.createElement('div');
    heading.textContent = group.label;
    grid.className = 'board-grid';
    grid.append(...Array.from(group.children, option =>
      makeFrame(defaultDevice, option.value, option.textContent)
    ));
    statesGallery.append(heading, grid);
  }
  for (const control of [language, layout, palette]) {
    control.addEventListener('change', () => {
      for (const [host, iframe] of activeFrames) {
        if (iframe.hasAttribute('src')) loadFrame(host);
      }
    });
  }
})();
