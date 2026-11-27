const smartHueDevices = (() => {
  const duoDevice = '951x669';
  const foldedDevice = 'duo-partially-folded';
  const outerDevice = '466x678';
  const ipadPortrait = '820x1180';
  const ipadLandscape = '1180x820';
  const dialogDevice = '329x510';
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
    [ipadPortrait, 'iPad · Dọc'],
    [ipadLandscape, 'iPad · Ngang'],
    [duoDevice, 'DUO Inner Display · Landscape'],
    [foldedDevice, 'DUO Inner Display · Partially Folded'],
    [outerDevice, 'DUO Outer Display · Folded'],
    [dialogDevice, 'Dialog Giáng sinh · 1 gói'],
  ];
  const defaultDevice = '390x844';
  const picker = document.querySelector('#size');
  const backdropPicker = document.querySelector('#dialog-backdrop');
  const phone = document.querySelector('.phone');
  const host = document.querySelector('#prototype');
  const preview = document.querySelector('main');
  const dimensions = id => (id === foldedDevice ? duoDevice : id).split('x').map(Number);
  const isDuoLandscape = id => id === duoDevice || id === foldedDevice;
  const iphoneSizes = sizes.filter(([, models]) => models.startsWith('iPhone '));
  const query = new URLSearchParams(location.search);
  const requestedBackdrop = query.get('backdrop');
  const embedded = document.documentElement.hasAttribute('data-embed');
  function scalePreviewFrame() {
    const frame = host.classList.contains('dialog-on-iphone') ? backdropPicker.value : picker.value;
    host.style.setProperty('--duo-scale', Math.min(1, host.clientWidth / dimensions(frame)[0]));
  }
  sizes.forEach(([id, models]) => {
    const option = new Option(`${dimensions(id).join(' × ')} · ${models}`, id);
    picker.add(option);
  });
  for (const [id, models] of iphoneSizes) {
    backdropPicker.add(new Option(`${dimensions(id).join(' × ')} · ${models}`, id));
  }
  const validBackdrop = iphoneSizes.some(([id]) => id === requestedBackdrop);
  backdropPicker.value = validBackdrop ? requestedBackdrop : defaultDevice;

  function applySize(id) {
    const [width, height] = dimensions(id);
    const ipad = id === ipadPortrait || id === ipadLandscape;
    const landscape = isDuoLandscape(id);
    const tabletLandscape = id === ipadLandscape;
    const outer = id === outerDevice;
    const dialog = id === dialogDevice;
    const onIphone = dialog && (!embedded || validBackdrop);
    const [frameWidth, frameHeight] = onIphone ? dimensions(backdropPicker.value) : [width, height];
    picker.value = id;
    phone.dataset.device = id === foldedDevice ? id : id === defaultDevice ? 'default' : dimensions(id).join('×');
    phone.classList.toggle('ipad', ipad);
    phone.classList.toggle('ipad-landscape', tabletLandscape);
    phone.classList.toggle('small', id === '375x667');
    phone.classList.toggle('duo', landscape || outer);
    phone.classList.toggle('duo-outer', outer);
    phone.classList.toggle('duo-folded', id === foldedDevice);
    phone.classList.toggle('christmas-dialog', dialog);
    host.classList.toggle('duo-frame', landscape || outer || dialog || ipad);
    host.classList.toggle('dialog-on-iphone', onIphone);
    backdropPicker.closest('.preview-control').hidden = !onIphone;
    preview.classList.toggle('duo-layout', landscape || ipad);
    host.style.setProperty('--duo-ratio', `${frameWidth} / ${frameHeight}`);
    host.style.setProperty('--iphone-width', `${frameWidth}px`);
    host.style.setProperty('--frame-content-width', `${width}px`);
    host.style.setProperty('--frame-content-height', `${height}px`);
    phone.style.setProperty('--screen-width', `${width}px`);
    phone.style.setProperty('--screen-height', `${height}px`);
    preview.style.setProperty('--preview-width', `${frameWidth}px`);
    scalePreviewFrame();
  }

  const requested = query.get('device');
  applySize(sizes.some(([id]) => id === requested) ? requested : defaultDevice);
  new ResizeObserver(scalePreviewFrame).observe(host);
  function updatePreview() {
    applySize(picker.value);
    const url = new URL(location.href);
    if (picker.value === defaultDevice) url.searchParams.delete('device');
    else url.searchParams.set('device', picker.value);
    if (picker.value === dialogDevice && backdropPicker.value !== defaultDevice) {
      url.searchParams.set('backdrop', backdropPicker.value);
    } else {
      url.searchParams.delete('backdrop');
    }
    history.replaceState(history.state, '', url);
  }
  picker.addEventListener('change', updatePreview);
  backdropPicker.addEventListener('change', updatePreview);
  return { sizes, dimensions, defaultDevice, isDuoLandscape, iphoneSizes, dialogDevice };
})();

(() => {
  if (document.documentElement.hasAttribute('data-embed')) return;

  const language = document.querySelector('#preview-language');
  const sizesGallery = document.querySelector('#device-frames');
  const dialogGallery = document.querySelector('#dialog-frames');
  const statesGallery = document.querySelector('#state-frames');
  const { sizes, dimensions, defaultDevice, isDuoLandscape, iphoneSizes, dialogDevice } = smartHueDevices;
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
      embed: '1', board: '1', v: 'dialog2', device: host.dataset.device,
      state: host.dataset.state, lang: language.value,
    });
    if (host.dataset.backdrop) url.searchParams.set('backdrop', host.dataset.backdrop);
    activeFrames.get(host).src = url.href;
    observer.unobserve(host);
  }

  function makeFrame(device, state, label, subtitle, backdrop) {
    const [width, height] = dimensions(backdrop ?? device);
    const card = document.createElement('figure');
    const host = document.createElement('div');
    const iframe = document.createElement('iframe');
    const caption = document.createElement('figcaption');
    if (isDuoLandscape(device) || device === '1180x820') card.className = 'duo-example';
    host.className = 'board-frame';
    Object.assign(host.dataset, { device, state, width });
    if (backdrop) host.dataset.backdrop = backdrop;
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
  dialogGallery.append(...iphoneSizes.map(([id, models]) =>
    makeFrame(dialogDevice, 'ready', dimensions(id).join(' × '), models, id)
  ));
  const dialogHeading = document.createElement('h3');
  dialogHeading.textContent = 'Dialog · Gói giá';
  const dialogStates = document.createElement('div');
  dialogStates.className = 'board-grid';
  dialogStates.append(
    makeFrame(dialogDevice, 'ready', 'Yearly · Không trial', '329 × 510', defaultDevice),
    makeFrame(dialogDevice, 'trial', 'Yearly · Dùng thử 3 ngày', '329 × 510', defaultDevice),
    makeFrame(dialogDevice, 'weekly', 'Weekly · Không trial', '329 × 510', defaultDevice),
    makeFrame(dialogDevice, 'weekly-trial', 'Weekly · Dùng thử 3 ngày', '329 × 510', defaultDevice),
    makeFrame(dialogDevice, 'weekly-intro', 'Weekly · Tuần đầu $0.99', 'Sau đó $4.99/tuần · 329 × 510', defaultDevice)
  );
  statesGallery.append(dialogHeading, dialogStates);
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
  language.addEventListener('change', () => {
    for (const [host, iframe] of activeFrames) {
      if (iframe.hasAttribute('src')) loadFrame(host);
    }
  });
})();
