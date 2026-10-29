(()=>{
 let runtime,resources;
 const load=()=>runtime??=new Promise((resolve,reject)=>{const script=document.createElement('script');script.src='assets/skottie/canvaskit.js';script.onload=()=>CanvasKitInit({locateFile:()=>new URL('assets/skottie/canvaskit.wasm',location.href).href}).then(resolve,reject);script.onerror=reject;document.head.append(script)});
 const assets=()=>resources??=(async()=>{const json=await fetch('assets/indigo-motion/lottie.json?v=10').then(r=>r.text());const files={};await Promise.all(JSON.parse(json).assets.filter(a=>a.p).map(async a=>{files[a.p]=new Uint8Array(await fetch('assets/indigo-motion/'+a.p+'?v=v11').then(r=>r.arrayBuffer()))}));return [json,files]})();
 const seen=new WeakSet();
 const observer=new IntersectionObserver(entries=>entries.forEach(async({target:host,isIntersecting})=>{
 if(!isIntersecting||seen.has(host))return;seen.add(host);
 try{
 const [ck,[json,files]]=await Promise.all([load(),assets()]);if(!host.isConnected)return;
 const canvas=host.querySelector('canvas'),dpr=Math.min((devicePixelRatio||1)*1.3,3);canvas.width=360*dpr;canvas.height=240*dpr;
 const surface=ck.MakeCanvasSurface(canvas),animation=ck.MakeManagedAnimation(json,files);if(!surface||!animation)throw Error('Animation unavailable');
 const ctx=surface.getCanvas(),duration=animation.duration(),reduce=matchMedia('(prefers-reduced-motion: reduce)');let start;
 const tick=ms=>{if(!host.isConnected){animation.delete();surface.delete();return}start??=ms;const progress=reduce.matches?.38:((ms-start)/1000%duration)/duration;animation.seek(progress);ctx.clear(ck.TRANSPARENT);animation.render(ctx,ck.XYWHRect(0,0,canvas.width,canvas.height));surface.flush();host.dataset.ready='true';host.dataset.frame=String(Math.floor(progress*198));if(!reduce.matches)requestAnimationFrame(tick)};
 requestAnimationFrame(tick);
 }catch(e){host.dataset.ready='error';console.error(e)}
 }),{threshold:.1});
 const discover=()=>document.querySelectorAll('.indigo-motion').forEach(el=>{if(!seen.has(el))observer.observe(el)});discover();new MutationObserver(discover).observe(document.querySelector('#board')||document.body,{childList:true,subtree:true});
})();
