(()=>{
'use strict';
const host=document.querySelector('#prototype'),reopen=document.querySelector('#reopen');
if(!host||!reopen)return;
const paywall=document.currentScript.dataset.paywall,key='paywall-comments-v1:'+paywall;
let comments=[],localComments=[],active=false,start=null,draft=null,selected=null,returnFocus=null,uid=null,backend=null;
try{const saved=JSON.parse(localStorage.getItem(key)||'[]');if(Array.isArray(saved))comments=saved.filter(c=>c&&typeof c.text==='string'&&c.rect&&['x','y','w','h'].every(k=>Number.isFinite(c.rect[k])&&c.rect[k]>=0&&c.rect[k]<=1)&&c.context).slice(0,500)}catch{}
localComments=comments.map(c=>({...c,local:true}));
const icon='<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M20 11a8 8 0 0 1-8 8H5l-4 3V11a9 9 0 0 1 19 0Z"/><path d="M6 9h9M6 13h6"/></svg>';
const tools=document.createElement('div');tools.className='review-tools';
tools.innerHTML=`<button type="button" class="ob-btn comment-toggle" aria-pressed="false">${icon} Thêm comment</button><p class="comment-help" aria-live="polite">Đang kết nối comment chung…</p><div class="comment-list"></div><button type="button" class="comment-export" hidden>Tải comments JSON</button>`;
reopen.after(tools);
const toggle=tools.querySelector('.comment-toggle'),help=tools.querySelector('.comment-help'),list=tools.querySelector('.comment-list'),exportButton=tools.querySelector('.comment-export');
const layer=document.createElement('div');layer.className='comment-layer';layer.tabIndex=-1;layer.setAttribute('aria-label','Vùng nhận comment, nhấn Enter để ghim ở giữa');host.append(layer);
const selection=document.createElement('div');selection.className='comment-selection';selection.hidden=true;layer.append(selection);
const dialog=document.createElement('dialog');dialog.className='comment-dialog';dialog.setAttribute('aria-labelledby','comment-title');
dialog.innerHTML='<form><header><strong id="comment-title">Thêm comment</strong><button type="button" class="comment-close" aria-label="Đóng comment">×</button></header><label for="comment-text">Nội dung</label><textarea id="comment-text" rows="4" maxlength="4000" required placeholder="Nhập góp ý cho vùng đã chọn…"></textarea><p class="comment-context"></p><p class="comment-error" role="alert"></p><footer><button type="button" class="comment-delete" hidden>Xoá</button><button type="button" class="comment-cancel">Huỷ</button><button type="submit" class="comment-save">Lưu comment</button></footer></form>';
document.body.append(dialog);
const text=dialog.querySelector('textarea'),del=dialog.querySelector('.comment-delete'),error=dialog.querySelector('.comment-error');
function context(){const q=new URL(host.querySelector('iframe').src).searchParams;return{lang:q.get('lang')||'en',device:q.get('device')||'default',eligibility:q.get('eligibility')||'eligible',state:q.get('state')||'ready'}}
function matches(c){const now=context();return['lang','device','eligibility'].every(k=>c.context[k]===now[k])}
function box(r){selection.style.cssText=`left:${r.x*100}%;top:${r.y*100}%;width:${r.w*100}%;height:${r.h*100}%`;selection.hidden=false}
function mode(on){active=on;host.classList.toggle('commenting',on);toggle.setAttribute('aria-pressed',on);toggle.innerHTML=icon+(on?' Thoát comment':' Thêm comment');help.textContent=on?'Kéo chọn vùng hoặc bấm để ghim. Esc để thoát.':(backend?'Comment được chia sẻ với mọi người.':'Đang kết nối comment chung…');if(on){layer.tabIndex=0;layer.focus()}else{layer.tabIndex=-1;if(!dialog.open)selection.hidden=true}}
function saveLocal(){try{localStorage.setItem(key,JSON.stringify(localComments));return true}catch{error.textContent='Chưa lưu được comment trên trình duyệt này.';return false}}
function render(){layer.querySelectorAll('.comment-pin').forEach(p=>p.remove());list.replaceChildren();exportButton.hidden=!comments.length;
comments.forEach((c,i)=>{const item=document.createElement('button');item.type='button';item.className='comment-item';item.textContent=`${i+1}. ${c.local?'[Trên máy] ':''}${c.text}`;item.onclick=()=>{if(!matches(c)){help.textContent=`Comment ở ${c.context.lang} · ${c.context.device} · ${c.context.eligibility}. Đổi preview để xem đúng vị trí.`}open(c,null,item)};list.append(item);
if(!matches(c))return;const pin=document.createElement('button');pin.type='button';pin.className='comment-pin';pin.textContent=i+1;pin.title=c.text;pin.setAttribute('aria-label',`Comment ${i+1}: ${c.text}`);pin.style.left=Math.min(.94,c.rect.x+c.rect.w)*100+'%';pin.style.top=Math.min(.97,c.rect.y)*100+'%';pin.onclick=e=>{e.stopPropagation();open(c,{x:e.clientX,y:e.clientY},pin)};layer.append(pin)})}
function open(c,point,origin){selected=c?.id||null;draft=c||draft;returnFocus=origin||toggle;error.textContent='';text.value=c?.text||'';const editable=!c||c.local||c.owner===uid;text.readOnly=!editable;dialog.querySelector('.comment-save').hidden=!editable;del.hidden=!c||!editable;dialog.querySelector('#comment-title').textContent=c?(editable?'Sửa comment':'Xem comment'):'Thêm comment';const ctx=draft.context;dialog.querySelector('.comment-context').textContent=`${ctx.lang} · ${ctx.device==='default'?'390×844':ctx.device} · ${ctx.state} · ${c?.local?'Chỉ trên trình duyệt này':'Comment chung'}`;if(matches(draft))box(draft.rect);dialog.showModal();const b=host.getBoundingClientRect(),x=point?.x??b.right+12,y=point?.y??b.top+80;dialog.style.left=Math.max(8,Math.min(x+12,innerWidth-dialog.offsetWidth-8))+'px';dialog.style.top=Math.max(8,Math.min(y+12,innerHeight-dialog.offsetHeight-8))+'px';text.focus()}
function close(){dialog.close();draft=null;selected=null;selection.hidden=true;returnFocus?.focus()}
toggle.onclick=()=>mode(!active);
function point(e){const b=layer.getBoundingClientRect();return{x:Math.max(0,Math.min(1,(e.clientX-b.left)/b.width)),y:Math.max(0,Math.min(1,(e.clientY-b.top)/b.height))}}
layer.addEventListener('pointerdown',e=>{if(!active||e.target.closest('.comment-pin')||e.button!==0)return;e.preventDefault();start=point(e);layer.setPointerCapture(e.pointerId);box({...start,w:0,h:0})});
layer.addEventListener('pointermove',e=>{if(!start)return;const p=point(e);box({x:Math.min(p.x,start.x),y:Math.min(p.y,start.y),w:Math.abs(p.x-start.x),h:Math.abs(p.y-start.y)})});
layer.addEventListener('pointerup',e=>{if(!start)return;const p=point(e),rect={x:Math.min(p.x,start.x),y:Math.min(p.y,start.y),w:Math.abs(p.x-start.x),h:Math.abs(p.y-start.y)};start=null;layer.releasePointerCapture(e.pointerId);draft={id:crypto.randomUUID(),rect,context:context(),createdAt:new Date().toISOString()};open(null,{x:e.clientX,y:e.clientY})});
layer.addEventListener('pointercancel',()=>{start=null;selection.hidden=true});
layer.addEventListener('keydown',e=>{if(active&&e.target===layer&&(e.key==='Enter'||e.key===' ')){e.preventDefault();draft={id:crypto.randomUUID(),rect:{x:.5,y:.5,w:0,h:0},context:context(),createdAt:new Date().toISOString()};open(null)}});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!dialog.open)mode(false)});
dialog.addEventListener('cancel',e=>{e.preventDefault();close()});
dialog.querySelector('.comment-close').onclick=close;dialog.querySelector('.comment-cancel').onclick=close;
dialog.querySelector('form').onsubmit=async e=>{e.preventDefault();const value=text.value.trim();if(!value){text.setCustomValidity('Nhập nội dung comment nhé.');text.reportValidity();return}if(!selected&&!backend){error.textContent='Chưa kết nối được. Kiểm tra mạng rồi tải lại trang.';return}const button=dialog.querySelector('.comment-save');button.disabled=true;try{if(draft.local){localComments=localComments.map(c=>c.id===selected?{...c,text:value,updatedAt:new Date().toISOString()}:c);if(!saveLocal())return;comments=comments.map(c=>c.id===selected?localComments.find(x=>x.id===selected):c)}else{const entry={text:value,rect:draft.rect,context:draft.context,createdAt:draft.createdAt,updatedAt:new Date().toISOString(),owner:uid};await backend.set(draft.id,entry)}mode(false);render();close()}catch(e){error.textContent='Chưa lưu được comment. Kiểm tra mạng rồi thử lại.'}finally{button.disabled=false}};text.oninput=()=>text.setCustomValidity('');
del.onclick=async()=>{try{if(draft.local){localComments=localComments.filter(c=>c.id!==selected);if(!saveLocal())return;comments=comments.filter(c=>c.id!==selected)}else{if(!backend)throw Error();await backend.remove(selected)}render();close()}catch(e){error.textContent='Chưa xoá được comment. Kiểm tra mạng rồi thử lại.'}};
exportButton.onclick=()=>{const blob=new Blob([JSON.stringify({paywall,comments},null,2)],{type:'application/json'}),href=URL.createObjectURL(blob),a=document.createElement('a');a.href=href;a.download=paywall+'-comments.json';a.click();setTimeout(()=>URL.revokeObjectURL(href),1000)};
new MutationObserver(()=>{start=null;if(!dialog.open)selection.hidden=true;render()}).observe(host.querySelector('iframe'),{attributes:true,attributeFilter:['src']});
render();
(async()=>{try{
 const [app,auth,fs]=await Promise.all([import('https://www.gstatic.com/firebasejs/12.5.0/firebase-app.js'),import('https://www.gstatic.com/firebasejs/12.5.0/firebase-auth.js'),import('https://www.gstatic.com/firebasejs/12.5.0/firebase-firestore.js')]);
 const firebase=app.initializeApp({apiKey:'AIzaSyAHcdPjbyq30VSVXYfQfN30zKrtx1d7mnE',authDomain:'paywall-ios-comments.firebaseapp.com',projectId:'paywall-ios-comments',appId:'1:645119442675:web:d13dc65ce5d9936ce44186'});
 const identity=auth.getAuth(firebase);const user=(await auth.signInAnonymously(identity)).user;uid=user.uid;
 const db=fs.getFirestore(firebase,'comments'),entries=fs.collection(db,'comments',paywall,'entries');
 backend={set:(id,data)=>fs.setDoc(fs.doc(entries,id),data),remove:id=>fs.deleteDoc(fs.doc(entries,id))};
 fs.onSnapshot(fs.query(entries,fs.limit(500)),snapshot=>{comments=[...localComments,...snapshot.docs.map(d=>({id:d.id,...d.data()})).sort((a,b)=>a.createdAt.localeCompare(b.createdAt))];help.textContent='Comment được chia sẻ với mọi người.';render()},()=>{backend=null;help.textContent='Không kết nối được comment chung. Thử tải lại trang.'});
 }catch(e){console.error('Comment connection failed:',e);help.textContent='Không kết nối được comment chung. Thử tải lại trang.'}
})();
})();
