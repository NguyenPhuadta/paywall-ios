(() => {
  'use strict';
  const script = document.currentScript;
  const id = script.dataset.paywall;
  if (!id || document.documentElement.hasAttribute('data-embed') ||
      new URLSearchParams(location.search).has('export')) return;

  const placement = document.querySelector(script.dataset.after);
  if (!placement) return;

  const panel = document.createElement('section');
  panel.className = 'paywall-handoff';
  panel.setAttribute('aria-label', 'Bàn giao dev');
  panel.innerHTML = `
    <h2>Bàn giao dev</h2>
    <details>
      <summary>Comment &amp; nhật ký thay đổi</summary>
      <p>Dev và agent có thể xem comment chưa giải quyết theo ngôn ngữ, thiết bị và trạng thái. Mỗi lần sửa paywall, thêm mục vào file nhật ký bên dưới với at (ngày giờ ISO 8601 có múi giờ) và summary (thay đổi thực tế).</p>
      <p><a class="handoff-log-link">Mở nhật ký JSON</a></p>
      <h3>Comment hiện tại</h3>
      <p class="handoff-status"></p>
      <ul class="handoff-comments"></ul>
      <h3>Thay đổi gần đây</h3>
      <ol class="handoff-changes"></ol>
    </details>`;

  const css = document.createElement('link');
  css.rel = 'stylesheet';
  css.href = new URL('paywall-handoff.css', script.src).href;
  document.head.append(css);
  placement.after(panel);

  const status = panel.querySelector('.handoff-status');
  const comments = panel.querySelector('.handoff-comments');
  const changes = panel.querySelector('.handoff-changes');
  const formatter = new Intl.DateTimeFormat('vi-VN', {
    dateStyle: 'short', timeStyle: 'short', timeZone: 'Asia/Ho_Chi_Minh',
  });

  function addTime(row, value) {
    if (!value || Number.isNaN(Date.parse(value))) return;
    const time = document.createElement('time');
    time.dateTime = value;
    time.textContent = formatter.format(new Date(value)) + ' (GMT+7)';
    row.append(time, ' · ');
  }

  function showComments({ comments: entries, state }) {
    const open = entries.filter(entry => !entry.resolved).length;
    status.textContent = {
      connecting: 'Đang tải comment chung…',
      error: 'Chưa tải được comment chung.',
      ready: `${open} chưa giải quyết / ${entries.length} comment`,
    }[state];
    comments.replaceChildren(...entries.map(entry => {
      const row = document.createElement('li');
      addTime(row, entry.updatedAt || entry.createdAt);
      const context = [entry.context?.lang, entry.context?.device, entry.context?.state].filter(Boolean).join(' · ');
      row.append(`${entry.resolved ? 'Đã giải quyết' : 'Chưa giải quyết'}${entry.local ? ' (trên máy)' : ''}${context ? ' · ' + context : ''} — ${entry.text}`);
      return row;
    }));
  }

  const hasComments = script.dataset.comments !== 'off';
  status.textContent = hasComments ? 'Đang tải comment chung…' : 'Trang này chưa có hệ thống comment.';
  if (hasComments) {
    document.addEventListener('paywall:comments', event => {
      if (event.detail.paywall === id) showComments(event.detail);
    });
    document.dispatchEvent(new CustomEvent('paywall:request-comments', { detail: id }));
  }

  const logUrl = new URL(`handoff/${encodeURIComponent(id)}.json`, script.src);
  panel.querySelector('.handoff-log-link').href = logUrl.href;
  changes.textContent = 'Đang tải nhật ký…';
  fetch(logUrl, { cache: 'no-cache' }).then(response => {
    if (!response.ok) throw new Error('Log unavailable');
    return response.json();
  }).then(log => {
    changes.replaceChildren(...log.changes.sort((a, b) => Date.parse(b.at) - Date.parse(a.at)).map(change => {
      const row = document.createElement('li');
      addTime(row, change.at);
      row.append(change.summary);
      return row;
    }));
  }).catch(() => { changes.textContent = 'Chưa tải được nhật ký.'; });
})();
