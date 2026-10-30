// Apply the approved CastDuo purchase structure while keeping Gallery's composition.
(()=>{
 const original=render;
 render=function(o){
  const tpl=document.createElement('template');tpl.innerHTML=original(o);
  const mainCta=tpl.content.querySelector('.purchase-area .primary[data-action="purchase"]');
  const offer=context(o);
  if(mainCta&&offer.trial&&!busyStates.includes(o.state))mainCta.textContent='Try For Free';
  const top=tpl.content.querySelector('.atlas-top');
  if(top){const close=top.querySelector('.close');if(close){close.innerHTML='<img src="assets/close-user.svg" alt="">'}top.querySelector('.top-restore')?.remove()}
  tpl.content.querySelector('.atlas-check')?.remove();
  tpl.content.querySelector('.atlas-message')?.remove();
  tpl.content.querySelector('.atlas-center > svg')?.remove();
  const brand=tpl.content.querySelector('.atlas-wordmark');if(brand)brand.textContent='CastDuo';
  const tag=tpl.content.querySelector('.atlas-center > span');if(tag)tag.textContent='PRO';
  const area=tpl.content.querySelector('.purchase-area');
  if(area&&!['loading','load-error','empty'].includes(o.state)){
   const {trial,p}=context(o);
   const section=document.createElement('section');section.className='gallery-timeline';
   const rows=[
    ['Cast without limits','Your content, one tap away.'],
    ['Share the moment','Enjoy videos and photos on your TV.'],
    trial
     ?['After '+esc(p.trialDuration),`${esc(p.price)}/${esc(p.period)}. Renews unless canceled.`]
     :['Your subscription',`${esc(p.price)}/${esc(p.period)}. Renews unless canceled.`]
   ];
   // Lucide icons, ISC license in assets/timeline-icons/LICENSE.
   const paths=["<rect width=\"18\" height=\"11\" x=\"3\" y=\"11\" rx=\"2\" ry=\"2\" />\n  <path d=\"M7 11V7a5 5 0 0 1 9.9-1\" />", "<circle cx=\"12\" cy=\"12\" r=\"10\" />\n  <path d=\"M12 6v6h4\" />", "\n  <path d=\"m15 9-6 6\" />\n  <path d=\"m9 9 6 6\" />"];
   section.innerHTML=`<h2>Moments on <em>bigger screen</em></h2><ol>${rows.map(([title,body],i)=>`<li><span class="timeline-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths[i]}</svg></span><div><h3>${title}</h3><p>${body}</p></div></li>`).join('')}</ol>`;
   area.before(section);
  }
  return tpl.innerHTML;
 };
 board();
})();
