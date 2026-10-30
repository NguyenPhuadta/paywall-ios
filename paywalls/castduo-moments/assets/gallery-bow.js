// Julian photo-bow study: both edges follow the same signed curve.
// Original canvas implementation, generated family moments; no reference assets copied.
(()=>{
 const reduce=matchMedia('(prefers-reduced-motion: reduce)');
 const mount=()=>document.querySelectorAll('.atlas-tiles:not([data-bow])').forEach(host=>{
  host.dataset.bow='1';const canvas=document.createElement('canvas');canvas.setAttribute('aria-hidden','true');host.replaceChildren(canvas);
  const photos=['reading','breakfast','play','walk','baking','embrace','together'].map(name=>{const im=new Image();im.onload=()=>{if(reduce.matches&&host.isConnected)paint(performance.now())};im.src='assets/family-moments/'+name+'.jpg';return im});
  const ctx=canvas.getContext('2d');let id=0,last=performance.now(),offset=0,age=0,w=0,h=0,dpr=1,visible=false;
  const resize=()=>{w=host.clientWidth;h=host.clientHeight;dpr=Math.min(devicePixelRatio||1,2);canvas.width=Math.round(w*dpr);canvas.height=Math.round(h*dpr)};new ResizeObserver(resize).observe(host);resize();
  const visibility=new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;if(visible&&!document.hidden&&!id){last=performance.now();id=requestAnimationFrame(paint)}else if(!visible){cancelAnimationFrame(id);id=0}});visibility.observe(host);
  document.addEventListener("visibilitychange",()=>{if(document.hidden){cancelAnimationFrame(id);id=0}else if(visible&&!id){last=performance.now();id=requestAnimationFrame(paint)}});
  // Position, size and starting row, in hero coordinates. Each returns outside the crop.
  const cards=[[-.09,.30,.49,.06],[.74,.28,.36,.03],[.40,.17,.22,.47],[.83,.30,.39,.64],[.01,.22,.29,.79],[.30,.23,.28,1.19],[.65,.18,.24,1.49]];
  function paint(now){
   id=0;if(!host.isConnected){visibility.disconnect();return}if(!visible||document.hidden)return;
   const dt=Math.min((now-last)/1000,.04);last=now;
   if(!w||!h)return;
   ctx.setTransform(dpr,0,0,dpr,0,0);ctx.clearRect(0,0,w,h);
   age+=dt;
   // Repeated scroll flick: strong speed peaks and a continuous soft coast.
   const beat=.5-.5*Math.cos(age*Math.PI/1.3);
   const speed=reduce.matches?0:80+250*Math.pow(beat,2);
   offset+=speed*dt;
   const period=h*2.1;
   cards.forEach(([x,ww,hh,y],i)=>{
    const cw=w*ww*.9,ch=h*hh*.9;
    const py=((h*y-offset)%period+period)%period-ch-24;
    if(py+ch<0||py>h)return;
    const fast=Math.max(0,Math.min(1,(speed-170)/160));
    const bend=reduce.matches?0:cw*.12*fast*fast*(3-2*fast);
    ctx.save();ctx.translate(w*x+w*ww*.05,py);
    ctx.beginPath();ctx.moveTo(0,0);ctx.quadraticCurveTo(cw/2,-2*bend,cw,0);ctx.lineTo(cw,ch);ctx.quadraticCurveTo(cw/2,ch-2*bend,0,ch);ctx.closePath();
    const fill=ctx.createLinearGradient(0,0,cw,0);
    const base=[167,151,184,159,174,145,180][i];
    fill.addColorStop(0,`rgb(${base-18} ${base-18} ${base-16})`);fill.addColorStop(.45,`rgb(${base+8} ${base+8} ${base+10})`);fill.addColorStop(1,`rgb(${base-7} ${base-7} ${base-5})`);
    const im=photos[i];
    if(im.complete&&im.naturalWidth){
     ctx.clip();
     const ratio=cw/ch;let sw=im.naturalWidth,sh=im.naturalHeight,sx=0,sy=0;
     if(sw/sh>ratio){sw=sh*ratio;sx=(im.naturalWidth-sw)/2}else{sh=sw/ratio;sy=(im.naturalHeight-sh)*.35}
     const strips=bend<.1?1:32;
     for(let j=0;j<strips;j++){
      const u=j/strips,m=(j+.5)/strips;
      const displacement=-4*bend*m*(1-m);
      ctx.drawImage(im,sx+sw*u,sy,sw/strips,sh,cw*u,displacement,cw/strips+.4,ch);
     }
    }else{ctx.fillStyle=fill;ctx.fill()}
    ctx.restore();
   });
   if(!reduce.matches)id=requestAnimationFrame(paint);
  }
 });
 new MutationObserver(mount).observe(document.querySelector('#board')||document.querySelector('#preview')||document.body,{childList:true,subtree:true});mount();
})();
