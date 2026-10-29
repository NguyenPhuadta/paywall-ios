/* CTA hierarchy from SmartHue 539:32897. Preserve each paywall's visual skin. */
(()=>{
 const previous=render;
 render=function(o){
  const html=previous(o),{trial,p}=context(o);
  const template=document.createElement('template');template.innerHTML=html;
  const area=template.content.querySelector('.purchase-area');
  if(!area)return html;
  const button=area.querySelector('.primary'),legal=area.querySelector('.disclosure'),links=area.querySelector('.utility');
  if(!button||!links)return html;
  const group=document.createElement('div');group.className='cta-structure';
  const main=document.createElement('div');main.className='cta-main';
  if(legal){
   if(legal.textContent.trim()&&!o.locale&&p.type==='subscription'){
    legal.innerHTML=trial?`Try free for ${esc(p.trialDuration)}, then ${esc(p.price)}/${esc(p.period)}.<br>Auto-renews. Cancel anytime.`:`${esc(p.price)}/${esc(p.period)}.<br>Auto-renews. Cancel anytime.`;
   }
   main.append(legal);
  }
  const aura=button.closest('.cta-aura');main.append(aura||button);group.append(main);
  if(trial&&!['loading','load-error','empty'].includes(o.state)){
   const badge=document.createElement('div');badge.className='cta-payment';
   badge.innerHTML='<span class="cta-payment-icon"><img src="assets/cta-payment-check.svg" alt=""></span><span>No payment due now</span>';
   group.append(badge);
  }
  area.classList.add('cta-updated');area.append(group);
  const footer=document.createElement('div');footer.className='utility cta-footer';
  for(const action of ['privacy','terms','restore']){
   const link=links.querySelector(`[data-action="${action}"]`);
   if(link){if(!o.locale)link.textContent=action==='privacy'?'Privacy Policy':action==='terms'?'Terms of Service':o.state==='restoring'?'Restoring…':'Restore';footer.append(link);}
  }
  links.remove();area.append(footer);
  return template.innerHTML;
 };
 board();
})();
