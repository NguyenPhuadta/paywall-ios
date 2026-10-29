(()=>{
 const before=render;
 render=function(o){
  const tpl=document.createElement('template');tpl.innerHTML=before(o);
  if(!['ready','cancelled','purchase-error','restore-empty','restore-error'].includes(o.state))tpl.content.querySelector('.cta-payment')?.remove();
  if(o.eligibility==='unknown'){
   const tag=tpl.content.querySelector('.in-offer>div>small');if(tag)tag.textContent='Checking available offer';
   tpl.content.querySelector('.cta-main>.disclosure')?.remove();
  }
  if(o.state!=='ready')tpl.content.querySelector('.in-intro')?.classList.add('in-state');
  const close=tpl.content.querySelector('.close');if(close)close.innerHTML='<img src="assets/close-user.svg" alt="">';
  return tpl.innerHTML;
 };
 board();
})();
