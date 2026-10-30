// Five independent visual compositions, sharing only the purchase simulation engine.
document.documentElement.dataset.style=STYLE.id;
const baseStyleRender=render;
const statusBar=()=>`<div class="ios-status" aria-hidden="true"><div class="ios-time">9:41</div><div class="ios-levels"><img src="assets/status-cellular.svg" width="19.2" height="12.226" alt=""><img src="assets/status-wifi.svg" width="17.142" height="12.328" alt=""><img src="assets/status-battery.svg" width="27.328" height="13" alt=""></div></div>`;
const icon=(name)=>{const paths={phone:'<rect x="8" y="2" width="12" height="24" rx="3"/><path d="M12 22h4"/>',tv:'<rect x="2" y="4" width="24" height="17" rx="3"/><path d="M10 26h8m-4-5v5"/>',cast:'<path d="M3 11V5a2 2 0 0 1 2-2h19a2 2 0 0 1 2 2v17a2 2 0 0 1-2 2h-7M2 16a10 10 0 0 1 10 10M2 21a5 5 0 0 1 5 5"/><circle cx="2" cy="26" r="1" fill="currentColor" stroke="none"/>',check:'<path d="m6 14 5 5L23 7"/>'};return `<svg viewBox="0 0 28 28" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths[name]}</svg>`};
const slot=(content,cls='')=>`<div class="animation-slot ${cls}" data-animation-slot="${STYLE.id}" aria-label="Reserved animation area"><div class="poster" aria-hidden="true">${content}</div><div class="slot-guide" aria-hidden="true">ANIMATION AREA</div></div>`;
const lineArt=()=>`<svg viewBox="0 0 342 208" fill="none" aria-hidden="true"><defs><radialGradient id="halo"><stop stop-color="white" stop-opacity=".16"/><stop offset="1" stop-color="white" stop-opacity="0"/></radialGradient></defs><circle cx="257" cy="78" r="72" fill="url(#halo)"/><circle cx="257" cy="78" r="38" stroke="#ccc" stroke-width="1"/><rect x="70" y="48" width="190" height="112" rx="12" fill="#000" stroke="#ddd" stroke-width="1.3"/><path d="M88 126c26-55 47 10 74-29s41-12 78-28" stroke="#f0f0f0" stroke-width="1.3"/><path d="M148 160v16m-20 0h60" stroke="#bbb"/><rect x="43" y="101" width="44" height="77" rx="7" fill="#050505" stroke="#eee" stroke-width="1.3"/><path d="M56 163h18M53 140c6-14 13 1 23-16" stroke="#bbb"/><path d="M22 185h298" stroke="#333"/><g fill="#aaa"><circle cx="34" cy="68" r="1"/><circle cx="51" cy="44" r="1.5"/><circle cx="301" cy="143" r="1"/><circle cx="294" cy="38" r="1.5"/></g></svg>`;
const devices=()=>`<div class="device-stack"><div class="device back b2"><img src="assets/card-2.png" alt=""></div><div class="device back b1"><img src="assets/card-1.png" alt=""></div><div class="device front"><div class="island"></div><img src="assets/after-hours-hero.png" alt=""><div class="mini-cast">${icon('cast')}<span>CastDuo</span></div></div></div>`;
const superArt=()=>`<div class="spark s1">✦</div><div class="spark s2">✦</div><div class="super-icon">${icon('cast')}</div><div class="light-tail"></div><div class="spark s3">◆</div>`;
const galleryHero=()=>`<section class="atlas-hero"><div class="atlas-tiles" aria-hidden="true"><img class="tile tile-a" src="assets/after-hours-hero.png" alt=""><img class="tile tile-b" src="assets/card-1.png" alt=""><img class="tile tile-c" src="assets/card-0.png" alt=""><img class="tile tile-d" src="assets/after-hours-hero.png" alt=""><img class="tile tile-e" src="assets/card-2.png" alt=""></div><div class="atlas-center">${icon('cast')}<div class="atlas-wordmark">castduo</div><span>PREMIUM</span></div></section>`;
const staticDevices=()=>`<div class="static-art prism-static" aria-label="Phone screen preview"><div class="poster" aria-hidden="true">${devices()}</div></div>`;
TEXT.en.trialLine=p=>`3 days free, then ${p.price}/week. Auto-renews unless canceled at least 24 hours before trial ends.`;
TEXT.en.subLine=p=>`${p.price}/week. Auto-renews unless canceled. Manage or cancel in App Store account settings.`;
render=function(o){
 const {S,p,trial}=context(o);
 if(accessStates.includes(o.state)||o.state==='dismissed')return statusBar()+baseStyleRender(o);
 const unavailable=['loading','load-error','empty'].includes(o.state);
 const tag=trial?'3-day free trial':'Weekly subscription';
 const price=esc(p.price);
 const key={unknown:'unknown',pending:'pending',cancelled:'cancelled','purchase-error':'failed',unverified:'unverified','restore-empty':'restoreEmpty','restore-error':'restoreError',purchasing:'system',restoring:'restoring'}[o.state];
 const message=key?`<div class="status" role="status">${esc(S[key])}</div>`:'';
 const cta=o.state==='loading'?S.loading:o.state==='unknown'?S.checking:o.state==='restoring'?S.restoring:o.state==='purchasing'?S.processing:o.state==='pending'?S.done:o.state==='unverified'?S.retry:unavailable?S.retry:trial?S.trial:S.subscribe;
 const disabled=busyStates.includes(o.state)&&!['pending','unverified'].includes(o.state);
 const action=['load-error','empty'].includes(o.state)?'retry':o.state==='pending'?'dismiss':o.state==='unverified'?'recheck':'purchase';
 const button=`<button class="primary" data-action="${action}" ${disabled?'disabled':''}>${esc(cta)}</button>`;
 const disclosure=unavailable?'':trial?S.trialLine(p):S.subLine(p);
 const legal=`<p class="disclosure">${esc(disclosure)}</p>`;
 const close=`<button class="close" data-action="dismiss" aria-label="${esc(S.close)}">×</button>`;
 const restore=`<button class="top-restore" data-action="restore" ${['purchasing','restoring'].includes(o.state)?'disabled':''}>Restore</button>`;
 const offer=(content)=>unavailable?`<div class="status" role="status">${esc(o.state==='loading'?S.loading:S.loadError)}</div>`:content;
 const rate=`<b>${price}<small>/ week${trial?' after trial':''}</small></b>`;
 let html='';
 switch(STYLE.id){
 case 'cinematic':html=`<div class="photo-backdrop" data-motion-slot="tv-content-and-room-light" aria-hidden="true"><div class="room-scene room-football"></div><div class="room-scene room-action"></div></div><div class="photo-window" aria-hidden="true"></div><section class="cinema-title"><div class="cinema-wordmark"><b class="cinema-brand">CastDuo</b><span class="cinema-plus">Plus</span></div><h2><span class="cinema-lead">Your phone.</span><span class="cinema-payoff">A whole new view.</span></h2></section><section class="purchase-area">${offer(`<div class="cinema-plan"><div><strong>Weekly access</strong><small>${tag}</small></div>${rate}</div>`)}${message}${legal}${button}${utility(S,o)}</section>`;break;
 case 'nocturne':html=`<header class="top"><span></span>${close}</header>${slot(lineArt())}<section class="nocturne-title"><h2>Make room for more.</h2><p>Your phone screen.<br>Your TV.<br>A bigger way to watch.</p></section><section class="purchase-area">${offer(`<div class="trial-strip">${icon('check')}<span>${trial?'Start with 3 days, on us.':'Your screen. A bigger view.'}</span></div><div class="nocturne-plan"><span class="plan-tab">WEEKLY ACCESS</span><div><strong>${price} <span>/ week</span></strong><small>${tag}</small></div><span class="ring-check">✓</span></div>`)}${message}${legal}${button}${utility(S,o)}</section>`;break;
 case 'club':html=`<header class="top atlas-top">${close}${restore}</header>${galleryHero()}<section class="atlas-message"><h2>A new home<br>for your screen.</h2><p>Cast your phone screen to your TV.<br>Make the view a shared one.</p><div class="atlas-route"><span>PHONE</span><span aria-hidden="true">⟶</span><span>TV</span></div></section><section class="purchase-area">${offer(`<div class="atlas-plan"><div><strong>Weekly access</strong><small>${tag}</small></div>${rate}<span class="atlas-check">✓</span></div>`)}${message}${legal}${button}${utility(S,o)}</section>`;break;
 case 'prism':html=`<div class="prism-surface"><header class="top"><span class="pro-tag">${icon('cast')} PRO</span>${close}</header>${staticDevices()}<section class="prism-caption"><h2>From your phone.<br>To the big screen.</h2><p>A bigger home for your phone screen.</p></section><section class="purchase-area">${offer(`<div class="prism-plan"><div><strong>Weekly</strong><small>${tag}</small></div>${rate}<span class="prism-check">✓</span></div>`)}${message}${legal}${button}${utility(S,o)}</section></div>`;break;
 case 'supernova':html=`<header class="top">${close}<span class="super-wordmark">CASTDUO <i>PLUS</i></span></header>${slot(superArt())}<section class="super-title"><h2>${trial?'Get started with a<br><em>3-day free trial.</em>':'Your phone screen.<br><em>Go bigger.</em>'}</h2></section><section class="purchase-area">${offer(`<div class="super-summary">${icon('cast')}<span>Your phone screen, on your TV.</span></div><div class="super-plan"><span class="super-ribbon">${trial?'3 DAYS ON US':'WEEKLY ACCESS'}</span><div><strong>Weekly access</strong><small>${tag}</small></div>${rate}<span class="super-check">✓</span></div>`)}${message}<p class="super-cancel">Manage your plan in the App Store.</p>${button}${utility(S,o)}${legal}</section>`;break;
 }
 return statusBar()+html+policySheet(o,S);
};
board=function(){
 FRAME_OPTS.length=0;
 const rows=[['Preview',[
 frame('01 / '+STYLE.name,{safeTop:0,safeBottom:0}),frame('02 / Compact · 375×667',{width:375,height:667,safeTop:0,safeBottom:0}),frame('03 / Text 200% · scroll',{scale:2,safeTop:0,safeBottom:0})]],
 ['Offer & availability',[frame('No introductory offer',{eligibility:'ineligible'}),frame('Checking offer',{state:'unknown',eligibility:'unknown'}),frame('Loading products',{state:'loading',eligibility:'unknown'}),frame('Load error',{state:'load-error',eligibility:'unknown'})]],
 ['Purchase & restore',[frame('Opening App Store',{state:'purchasing'}),frame('Pending',{state:'pending'}),frame('Canceled',{state:'cancelled'}),frame('Purchase error',{state:'purchase-error'}),frame('Unverified',{state:'unverified'}),frame('Verified success',{state:'success'}),frame('Restoring',{state:'restoring'}),frame('Restored',{state:'restored'}),frame('No purchases',{state:'restore-empty'}),frame('Restore error',{state:'restore-error'})]],
 ['Policy',[frame('Terms URL needed',{sheet:'terms'}),frame('Privacy URL needed',{sheet:'privacy'})]]];
 document.querySelector('#board').innerHTML=(new URLSearchParams(location.search).get('view')==='board'?rows:[[rows[0][0],[rows[0][1][0]]]]).map(([title,frames],i)=>`<section class="row" id="${i===0?'preview':'row-'+i}"><h2>${title}</h2><div class="frames">${frames.join('')}</div></section>`).join('');
 document.querySelector('#notice').innerHTML=`CONCEPT ONLY · $x.xx/week placeholder · purchases simulated · policy/product data unconfirmed. Layout reference: <a href="${STYLE.url}" target="_blank" rel="noopener">${esc(STYLE.ref)} on Mobbin ↗</a>`;
 document.querySelectorAll('figure').forEach(update);
};
if(new URLSearchParams(location.search).get('view')==='single')document.documentElement.classList.add('single');
if(new URLSearchParams(location.search).get('slots')==='1')document.documentElement.classList.add('show-slots');
board();
