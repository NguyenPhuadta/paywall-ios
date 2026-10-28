TEXT.en.trialLine=p=>`3 days free, then ${p.price}/week. Auto-renews unless canceled at least 24 hours before trial ends.`;
TEXT.en.subLine=p=>`${p.price}/week. Auto-renews unless canceled. Manage or cancel in App Store account settings.`;
render=function(o){
 const {S,p,trial}=context(o);
 if(accessStates.includes(o.state)||o.state==='dismissed')return statusBar()+baseExtraRender(o);
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
 const u={S,p,trial,unavailable,tag,price,rate,close,restore,offer,message,legal,button,utility:utility(S,o),icon,slot};
 return statusBar()+EXTRA_STYLES[STYLE.id](o,u)+policySheet(o,S);
};
board=function(){
 FRAME_OPTS.length=0;
 const rows=[['Preview',[
 frame('01 / '+STYLE.name,{safeTop:0,safeBottom:0}),frame('02 / Compact · 375×667',{width:375,height:667,safeTop:0,safeBottom:0}),frame('03 / Text 200% · scroll',{scale:2,safeTop:0,safeBottom:0})]],
 ['Offer & availability',[frame('No introductory offer',{eligibility:'ineligible'}),frame('Checking offer',{state:'unknown',eligibility:'unknown'}),frame('Loading products',{state:'loading',eligibility:'unknown'}),frame('Load error',{state:'load-error',eligibility:'unknown'})]],
 ['Purchase & restore',[frame('Opening App Store',{state:'purchasing'}),frame('Pending',{state:'pending'}),frame('Canceled',{state:'cancelled'}),frame('Purchase error',{state:'purchase-error'}),frame('Unverified',{state:'unverified'}),frame('Verified success',{state:'success'}),frame('Restoring',{state:'restoring'}),frame('Restored',{state:'restored'}),frame('No purchases',{state:'restore-empty'}),frame('Restore error',{state:'restore-error'})]],
 ['Policy',[frame('Terms URL needed',{sheet:'terms'}),frame('Privacy URL needed',{sheet:'privacy'})]]];
 document.querySelector('#board').innerHTML=rows.map(([title,frames],i)=>`<section class="row" id="${i===0?'preview':'row-'+i}"><h2>${title}</h2><div class="frames">${frames.join('')}</div></section>`).join('');
 document.querySelector('#notice').innerHTML=`CONCEPT ONLY · $x.xx/week placeholder · purchases simulated · policy/product data unconfirmed. LAYOUT ONLY · Visual asset and media type to be chosen by the user.`;
 document.querySelectorAll('figure').forEach(update);
};
if(new URLSearchParams(location.search).get('view')==='single')document.documentElement.classList.add('single');
if(new URLSearchParams(location.search).get('slots')==='1')document.documentElement.classList.add('show-slots');
board();
