(()=>{
 const q=new URLSearchParams(location.search);if(q.get('review')!=='1')return;
 const fig=document.querySelector('#preview figure'),o=FRAME_OPTS[0],phone=fig.querySelector('.phone');
 const device=q.get('device')||'default';const sizes={'440x956':[440,956],'420x912':[420,912],'430x932':[430,932],'402x874':[402,874],'393x852':[393,852],'414x896':[414,896],'375x812':[375,812],'compact':[375,667]};if(sizes[device]){[o.width,o.height]=sizes[device];phone.classList.toggle('compact',o.height<=667)}if(device==='large'){o.scale=2;phone.classList.add('large-type')}
 const eligible=['eligible','ineligible','unknown'].includes(q.get('eligibility'))?q.get('eligibility'):'eligible';o.eligibility=eligible;
 const state=q.get('state')||'ready';const allowed=['ready','loading','load-error','purchasing','pending','cancelled','purchase-error','unverified','success','restoring','restored','restore-empty','restore-error'];o.state=allowed.includes(state)?state:'ready';if(['terms','privacy'].includes(state))o.sheet=state;
 if(eligible==='unknown'&&o.state==='ready')o.state='unknown';phone.style.setProperty('--w',o.width+'px');phone.style.setProperty('--h',o.height+'px');phone.style.setProperty('--scale',o.scale);
 const style=document.createElement('style');style.textContent='.embed .review-tools{display:none!important}';if(q.get('motion')==='off')style.textContent+='.badge-tilt-surface,.badge-tilt-surface:before,.badge-tilt-surface:after{animation:none!important;transform:none!important;filter:none!important}.badge-tilt-surface:before,.badge-tilt-surface:after{opacity:0!important}';document.head.append(style);
 const fit=()=>{const scale=Math.min(1,innerWidth/o.width,innerHeight/o.height);document.documentElement.style.setProperty('--fit',scale);fig.style.width=o.width*scale+'px';fig.style.height=o.height*scale+'px'};update(fig);fit();addEventListener('resize',fit);
})();
