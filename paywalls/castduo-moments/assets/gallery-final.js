// Final state-specific presentation after the shared CTA adapter.
(()=>{
 const previous=render;
 render=function(o){
  const tpl=document.createElement('template');tpl.innerHTML=previous(o);
  const headings={unknown:'Checking your offer…',pending:'Your purchase is pending.',unverified:'Checking your access…',restoring:'Restoring your purchases…'};
  const timeline=tpl.content.querySelector('.gallery-timeline');
  if(timeline&&o.state!=='ready'){
   timeline.classList.add('timeline-status');timeline.querySelector('ol')?.remove();
   if(headings[o.state])timeline.querySelector('h2').textContent=headings[o.state];
  }
  if(!['ready','cancelled','purchase-error','restore-empty','restore-error'].includes(o.state))tpl.content.querySelector('.cta-payment')?.remove();
  if(o.eligibility==='unknown'){
   const tag=tpl.content.querySelector('.atlas-plan > div small');if(tag)tag.textContent='Checking available offer';
   tpl.content.querySelector('.cta-main > .disclosure')?.remove();
  }
  if(['success','active','restored','dismissed'].includes(o.state)){
   const close=tpl.content.querySelector('.close');if(close)close.innerHTML='<img src="assets/close-user.svg" alt="">';
  }
  return tpl.innerHTML;
 };
 board();
})();
