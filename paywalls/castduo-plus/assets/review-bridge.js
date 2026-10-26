(()=>{
 const q=new URLSearchParams(location.search);if(q.get('review')!=='1')return;
 const fig=document.querySelector('#preview figure'),o=FRAME_OPTS[0],phone=fig.querySelector('.phone');
 const device=q.get('device')||'default';if(device==='compact'){o.width=375;o.height=667;phone.classList.add('compact')}if(device==='large'){o.scale=2;phone.classList.add('large-type')}
 const eligible=['eligible','ineligible','unknown'].includes(q.get('eligibility'))?q.get('eligibility'):'eligible';o.eligibility=eligible;
 const state=q.get('state')||'ready';const allowed=['ready','loading','load-error','purchasing','pending','cancelled','purchase-error','unverified','success','restoring','restored','restore-empty','restore-error'];o.state=allowed.includes(state)?state:'ready';if(['terms','privacy'].includes(state))o.sheet=state;
 if(eligible==='unknown'&&o.state==='ready')o.state='unknown';phone.style.setProperty('--w',o.width+'px');phone.style.setProperty('--h',o.height+'px');phone.style.setProperty('--scale',o.scale);
 const style=document.createElement('style');style.textContent='.embed .review-tools{display:none!important}';if(q.get('motion')==='off')style.textContent+='.room-scene{animation:none!important;opacity:0!important}'+'.badge-tilt-surface,.badge-tilt-surface:before,.badge-tilt-surface:after{animation:none!important;transform:none!important;filter:none!important}.badge-tilt-surface:before,.badge-tilt-surface:after{opacity:0!important}';document.head.append(style);
 const fit=()=>{const scale=Math.min(1,innerWidth/o.width,innerHeight/o.height);document.documentElement.style.setProperty('--fit',scale);fig.style.width=o.width*scale+'px';fig.style.height=o.height*scale+'px'};update(fig);fit();addEventListener('resize',fit);
})();
