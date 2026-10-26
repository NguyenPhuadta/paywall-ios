// Shared context for the five additional compositions. Original styles remain untouched.
const EXTRA_STYLES={};
const baseExtraRender=render;
document.documentElement.dataset.style=STYLE.id;
const statusBar=()=>`<div class="ios-status" aria-hidden="true"><div class="ios-time">9:41</div><div class="ios-levels"><img src="assets/status-cellular.svg" width="19.2" height="12.226" alt=""><img src="assets/status-wifi.svg" width="17.142" height="12.328" alt=""><img src="assets/status-battery.svg" width="27.328" height="13" alt=""></div></div>`;
const icon=(name)=>{const paths={phone:'<rect x="8" y="2" width="12" height="24" rx="3"/><path d="M12 22h4"/>',tv:'<rect x="2" y="4" width="24" height="17" rx="3"/><path d="M10 26h8m-4-5v5"/>',cast:'<path d="M3 11V5a2 2 0 0 1 2-2h19a2 2 0 0 1 2 2v17a2 2 0 0 1-2 2h-7M2 16a10 10 0 0 1 10 10M2 21a5 5 0 0 1 5 5"/><circle cx="2" cy="26" r="1" fill="currentColor" stroke="none"/>',check:'<path d="m6 14 5 5L23 7"/>'};return `<svg viewBox="0 0 28 28" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths[name]}</svg>`};
const slot=(content,cls='')=>`<div class="media-placeholder ${cls}" aria-label="Unassigned visual area"><span>VISUAL</span><div class="slot-guide" aria-hidden="true">VISUAL AREA · UNASSIGNED</div></div>`;
