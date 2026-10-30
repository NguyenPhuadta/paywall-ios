(()=>{
'use strict';
const catalog=window.PAYWALL_TRANSLATIONS,params=new URLSearchParams(location.search);
const aliases={zh:'zh-Hans','zh-CN':'zh-Hans',tl:'fil'};
let lang=aliases[params.get('lang')]||params.get('lang')||'en';
if(!catalog.locales.some(l=>l.id===lang))lang='en';
document.documentElement.lang=lang;
function translate(source){
 const trimmed=source.trim(),price=trimmed.match(/\$[\dx.,]+/i)?.[0];
 const key=price?trimmed.replace(price,'{price}'):trimmed;
 const entry=catalog.strings[trimmed]||catalog.strings[key];
 if(!entry)return source;
 const value=entry[lang].replace('{price}',price||'{price}');
 return source.slice(0,source.length-source.trimStart().length)+value+source.slice(source.trimEnd().length);
}
const originals=new WeakMap();
function visit(root){
 if(root.nodeType===3){
  if(root.parentElement?.closest('script,style,textarea,.language-picker'))return;
  const last=originals.get(root),current=root.nodeValue;
  const source=last&&last.output===current?last.source:current;
  const output=translate(source); originals.set(root,{source,output});if(output!==current)root.nodeValue=output;return;
 }
 if(root.nodeType!==1&&root.nodeType!==9)return;
 for(const child of [...root.childNodes])visit(child);
 if(root.nodeType===1)for(const attr of ['aria-label','title','alt'])if(root.hasAttribute(attr)){
  const value=root.getAttribute(attr),out=translate(value);if(out!==value)root.setAttribute(attr,out);
 }
}
let queued=false;const observer=new MutationObserver(()=>{if(queued)return;queued=true;queueMicrotask(()=>{queued=false;observer.disconnect();visit(document.body);observe()})});
function observe(){observer.observe(document.body,{childList:true,subtree:true,characterData:true})}
const css=document.createElement('style');css.textContent=`.language-picker{position:fixed;right:20px;top:16px;z-index:50;font:13px system-ui;color:#eee}.language-picker select{background:#24242a;color:#fff;padding:8px;border:0;border-radius:8px;min-height:44px}.phone h2{overflow-wrap:normal}.phone .viewport{overflow-x:hidden}.phone .purchase-area strong{overflow-wrap:normal}.phone .utility{flex-wrap:wrap}.phone .cta-footer>*{white-space:normal}html[lang=es] .phone .go-heading h2,html[lang=fil] .phone .go-heading h2{font-size:36px}html[lang=vi] .phone .go-heading h2{font-size:32px}html:not([lang=en]) .phone .pro-badge-visual{height:244px}html:not([lang=en]) .phone .go-plan strong{font-size:18px}html:not([lang=en]) .phone .gallery-timeline{padding-bottom:12px}html[lang=zh-Hans] .phone{font-stretch:normal}`;document.head.append(css);
if(params.get('embed')!=='1'){
 const picker=document.createElement('label');picker.className='language-picker';picker.innerHTML='<select aria-label="Language">'+catalog.locales.map(l=>`<option value="${l.id}" ${l.id===lang?'selected':''}>${l.label}</option>`).join('')+'</select>';
 picker.querySelector('select').onchange=e=>{const u=new URL(location.href);u.searchParams.set('lang',e.target.value);location.href=u.href};document.body.append(picker);
}
visit(document.body);observe();
window.PAYWALL_I18N={lang,translate};
})();
