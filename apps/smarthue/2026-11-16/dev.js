(() => {
  const device = document.querySelector('#dev-device');
  const state = document.querySelector('#dev-state');
  const language = document.querySelector('#dev-language');
  const measureMode = document.querySelector('#dev-measure');
  const frame = document.querySelector('#dev-phone');
  const stage = frame.parentElement;
  const preview = frame.querySelector('iframe');
  const highlight = stage.querySelector('.dev-highlight');
  const panel = document.querySelector('#dev-content');
  const tabs = [...document.querySelectorAll('[data-dev]')];
  const initial = new URLSearchParams(location.search);
  let active = 'pack';
  let screen;
  let strings;
  let measured;
  let motion = false;
  let width = 390;
  let height = 844;
  let previewReady = false;

  const staticPanels = {
    pack: '<h3>Gói dev SmartHue</h3><ul><li>HTML, CSS và JavaScript của paywall và Dev.</li><li>Ảnh Giáng sinh, ba pha màu đèn, hoa tuyết và biểu tượng hệ thống.</li><li>Nhạc Giáng sinh bắt buộc: assets/christmas-music.mp3, phát lặp liên tục khi paywall mở, âm lượng mặc định 35%.</li><li>Font Inter, giấy phép và hướng dẫn chạy bằng máy chủ cục bộ.</li></ul><p>Billing, giá và liên kết pháp lý trong preview dùng dữ liệu mô phỏng.</p>',
    animation: '<h3>Đèn, tuyết và countdown</h3><p>Đèn chuyển màu qua ba pha trong vòng 8 giây. Các màn DUO dùng một ảnh nền cố định và lấy màu đèn từ hai lớp còn lại. Snowfall chạy bằng CSS và tắt khi bật Reduce Motion. Countdown hiển thị tổng số giờ, phút và giây đến thời điểm hết ưu đãi. Giờ có thể lớn hơn 24.</p><h3>Nhạc Giáng sinh · Bắt buộc khi triển khai</h3><p>Dùng file <a href="assets/christmas-music.mp3" download>christmas-music.mp3</a> trong gói handoff. Phát lặp liên tục trong thời gian paywall mở, âm lượng mặc định 35%. Có điều khiển bật/tắt nhạc. Dừng khi đóng paywall hoặc app ra nền, phát tiếp khi mở lại nếu người dùng đang bật nhạc. Bản web bắt đầu phát sau tương tác đầu tiên theo giới hạn của trình duyệt.</p><button type="button" class="ob-btn" data-motion></button>',
    lottie: '<h3>Lottie</h3><p>SmartHue dùng ảnh và CSS cho chuyển động. Các ảnh và CSS có trong gói dev.</p>',
    layers: '<h3>Layer trên preview</h3><p>Rê chuột để làm nổi bật. Bấm tên để đo hoặc bỏ chọn để ẩn layer.</p><div data-layer-list></div>',
    measure: '<h3>Đo phần tử</h3><p>Bật “Bấm vào preview để đo” hoặc chọn một layer. Kết quả dùng CSS px ở kích thước gốc.</p>',
    font: '<h3>Typography</h3><p>Preview dùng Inter Variable. Gói dev kèm font và giấy phép OFL. Chọn layer chữ để xem cỡ, weight và line-height theo màn hình và ngôn ngữ hiện tại.</p>',
    strings: '<h3>Chuỗi · English, Deutsch và Dansk</h3><p>Giá trong các chuỗi là giá demo.</p>',
    changelog: '<h3>Changelog</h3><ul class="changelog"><li>Cập nhật content trial MKT: badge 3 Days FREE Trial, giá hôm nay và sau trial, Weekly không có trial; CTA Start My 3-Day Free Trial và điều khoản dưới CTA. Có bản dịch Đức/Đan Mạch.</li><li>Trial fullscreen giữ hai gói Yearly/Weekly, thẻ cao tối thiểu 72 px. Trial demo áp dụng cho Yearly; chọn Weekly cập nhật CTA và điều khoản theo giá thường.</li><li>Trial dialog dùng một dòng giá 12 px thường, không highlight và không lặp dòng gia hạn.</li><li>Thêm tab Dev với bản thử, đo layer và gói tải về.</li><li>Giữ phối Giáng sinh xanh thông–burgundy và countdown dạng số trên tiêu đề.</li><li>Thêm ba cách mở DUO: Inner Landscape, Partially Folded và Outer Folded.</li></ul>',
  };

  function fitPreview() {
    const scale = Math.min(1, stage.clientWidth / width);
    frame.style.width = `${width * scale}px`;
    frame.style.height = `${height * scale}px`;
    preview.style.width = `${width}px`;
    preview.style.height = `${height}px`;
    preview.style.transform = `scale(${scale})`;
    highlight.hidden = true;
  }

  function loadPreview() {
    screen = null;
    measured = null;
    previewReady = false;
    highlight.hidden = true;
    const query = new URLSearchParams({
      embed: '1', board: '1', inspect: '1', v: 'smarthue-dev1',
      device: device.value || initial.get('device') || '390x844',
      state: state.value || initial.get('state') || 'ready',
      lang: language.value || initial.get('lang') || 'en',
    });
    if (motion) query.set('motion', '1');
    preview.src = 'index.html?' + query;
    renderPanel(active);
  }

  function geometry(element) {
    const bounds = element.getBoundingClientRect();
    const origin = screen.getBoundingClientRect();
    const scale = origin.width / width || 1;
    return {
      x: Math.round((bounds.left - origin.left) / scale),
      y: Math.round((bounds.top - origin.top) / scale),
      width: Math.round(bounds.width / scale),
      height: Math.round(bounds.height / scale),
    };
  }

  function showHighlight(element) {
    const box = geometry(element);
    const scale = frame.clientWidth / width;
    for (const [property, value] of Object.entries({
      left: box.x, top: box.y, width: box.width, height: box.height,
    })) highlight.style[property] = `${value * scale}px`;
    highlight.hidden = false;
  }

  function showMeasure(element) {
    measured = element;
    renderPanel('measure');
    showHighlight(element);
  }

  function renderLayers() {
    const list = panel.querySelector('[data-layer-list]');
    if (!previewReady) {
      list.textContent = 'Đang tải preview…';
      return;
    }
    const selector = '.visual, .room-photo, .duo-photo, .intro, .timer, h2, .plan, .terms, .cta, .links button, .close, .status, .billing-sheet';
    for (const element of screen.querySelectorAll(selector)) {
      const { width: w, height: h } = geometry(element);
      if (!w || !h) continue;
      const name = element.classList[0] || element.tagName.toLowerCase();
      const detail = element.getAttribute('aria-label') || element.textContent.trim().replace(/\s+/g, ' ');
      const row = document.createElement('div');
      row.className = 'layer-row';
      const visible = document.createElement('input');
      visible.type = 'checkbox';
      visible.checked = element.style.visibility !== 'hidden';
      visible.setAttribute('aria-label', 'Hiện layer ' + name);
      visible.onchange = () => { element.style.visibility = visible.checked ? '' : 'hidden'; };
      const button = document.createElement('button');
      button.type = 'button';
      button.textContent = detail ? `${name} · ${detail.slice(0, 80)}` : name;
      button.onmouseenter = () => showHighlight(element);
      button.onmouseleave = () => { highlight.hidden = true; };
      button.onclick = () => showMeasure(element);
      const size = document.createElement('small');
      size.textContent = `${w} × ${h}`;
      row.append(visible, button, size);
      list.append(row);
    }
  }

  function renderMeasure() {
    if (!measured) return;
    const css = measured.ownerDocument.defaultView.getComputedStyle(measured);
    const data = {
      ...geometry(measured), padding: css.padding, margin: css.margin,
      font: `${css.fontFamily} · ${css.fontSize} / ${css.lineHeight} · ${css.fontWeight}`,
      color: css.color, background: css.backgroundColor, radius: css.borderRadius,
    };
    const result = document.createElement('dl');
    result.className = 'measure-output';
    for (const [k, value] of Object.entries(data)) {
      const term = document.createElement('dt');
      const definition = document.createElement('dd');
      term.textContent = k;
      definition.textContent = value;
      result.append(term, definition);
    }
    panel.append(result);
  }

  function renderStrings() {
    if (!strings) {
      panel.append('Đang tải chuỗi…');
      return;
    }
    const download = document.createElement('a');
    download.className = 'download';
    download.textContent = 'Tải strings.json';
    download.download = 'smarthue-strings.json';
    download.href = 'data:application/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(strings, null, 2));
    const wrap = document.createElement('div');
    wrap.className = 'table-wrap';
    const table = document.createElement('table');
    table.className = 'data-table';
    const head = table.createTHead().insertRow();
    for (const label of ['Key', 'English', 'Deutsch', 'Dansk']) {
      const cell = document.createElement('th');
      cell.scope = 'col';
      cell.textContent = label;
      head.append(cell);
    }
    const body = table.createTBody();
    for (const key of Object.keys(strings.en)) {
      const row = body.insertRow();
      for (const value of [key, strings.en[key], strings.de[key], strings.da[key]]) {
        row.insertCell().textContent = value;
      }
    }
    wrap.append(table);
    panel.append(download, wrap);
  }

  function renderPanel(id) {
    active = id;
    for (const tab of tabs) {
      const selected = tab.dataset.dev === id;
      tab.setAttribute('aria-selected', String(selected));
      tab.tabIndex = selected ? 0 : -1;
    }
    panel.setAttribute('aria-labelledby', 'tab-' + id);
    panel.innerHTML = staticPanels[id];
    if (id === 'layers') renderLayers();
    if (id === 'measure') renderMeasure();
    if (id === 'strings') renderStrings();
    if (id === 'animation') {
      const button = panel.querySelector('[data-motion]');
      button.textContent = motion ? 'Dừng chuyển động' : 'Phát chuyển động';
      button.onclick = () => {
        motion = !motion;
        loadPreview();
        panel.querySelector('[data-motion]').focus();
      };
    }
  }

  preview.addEventListener('load', () => {
    const doc = preview.contentDocument;
    screen = doc.querySelector('.phone');
    if (!screen) return;
    for (const [control, selector] of [[device, '#size'], [state, '#billing-state'], [language, '#preview-language']]) {
      const source = doc.querySelector(selector);
      control.replaceChildren(...Array.from(source.children, child => child.cloneNode(true)));
      control.value = source.value;
    }
    width = screen.offsetWidth;
    height = screen.offsetHeight;
    strings = preview.contentWindow.smartHuePreviewStrings;
    previewReady = true;
    const viewQuery = new URLSearchParams({ device: device.value, lang: language.value });
    document.querySelector('#view-link').href = './?' + viewQuery;
    fitPreview();
    doc.addEventListener('click', event => {
      if (!measureMode.checked || !screen?.contains(event.target)) return;
      event.preventDefault();
      event.stopImmediatePropagation();
      showMeasure(event.target);
    }, true);
    renderPanel(active);
  });

  for (const control of [device, state, language]) control.addEventListener('change', loadPreview);
  measureMode.addEventListener('change', () => {
    if (measureMode.checked) renderPanel('measure');
    else highlight.hidden = true;
  });
  tabs.forEach(tab => tab.addEventListener('click', () => renderPanel(tab.dataset.dev)));
  tabs[0].parentElement.addEventListener('keydown', event => {
    const current = tabs.indexOf(document.activeElement);
    if (current < 0) return;
    const target = {
      ArrowLeft: (current + tabs.length - 1) % tabs.length,
      ArrowRight: (current + 1) % tabs.length,
      Home: 0,
      End: tabs.length - 1,
    }[event.key];
    if (target === undefined) return;
    event.preventDefault();
    tabs[target].click();
    tabs[target].focus();
  });

  new ResizeObserver(fitPreview).observe(stage);
  fitPreview();
  loadPreview();
})();
