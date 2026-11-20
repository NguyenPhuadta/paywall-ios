(() => {
  if (document.documentElement.hasAttribute('data-embed')) return;

  const button = document.querySelector('#toggle-music');
  const close = document.querySelector('#prototype .close');
  const reopen = document.querySelector('#reopen');
  const music = new Audio('assets/christmas-music.mp3');
  music.loop = true;
  music.preload = 'none';
  music.volume = 0.35;
  music.hidden = true;
  document.body.append(music);
  let enabled = true;
  let closed = false;
  let started = false;

  function updateButton() {
    button.textContent = music.paused ? 'Bật nhạc Giáng sinh' : 'Tắt nhạc Giáng sinh';
    button.setAttribute('aria-pressed', String(!music.paused));
  }

  function playMusic() {
    if (!enabled || closed || document.hidden) return;
    music.play().then(() => {
      started = true;
      updateButton();
    }).catch(updateButton);
  }

  button.addEventListener('click', () => {
    enabled = music.paused;
    if (enabled) playMusic();
    else music.pause();
  });
  document.addEventListener('pointerup', event => {
    if (!started && event.target !== button) playMusic();
  });
  document.addEventListener('keydown', event => {
    if (!started && ['Enter', ' '].includes(event.key) && event.target !== button) playMusic();
  });
  close.addEventListener('click', () => {
    closed = true;
    music.pause();
  });
  reopen.addEventListener('click', () => {
    closed = false;
    playMusic();
  });
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) music.pause();
    else if (started) playMusic();
  });
  music.addEventListener('play', updateButton);
  music.addEventListener('pause', updateButton);
})();
