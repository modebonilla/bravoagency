// ===== CONFIGURACIÓN DE CONTACTO =====
// Escribe aquí el WhatsApp de Bravo (solo números con clave de país, ej. "522281234567").
// Mientras esté vacío, los botones "Agenda tu cita" llevan al Instagram de la agencia.
const CONTACTO = {
  whatsapp: "522286146358",
  instagram: "somosbravoagency"
};
// =====================================
document.querySelectorAll("[data-cta]").forEach(a=>{
  const base=a.getAttribute("data-cta")||"Hola, me gustaría agendar una cita.";
  const msg=base+" (Origen: "+(document.body.dataset.origen||"Sitio web")+")";
  if(CONTACTO.whatsapp){
    a.href="https://wa.me/"+CONTACTO.whatsapp+"?text="+encodeURIComponent(msg);
  }else{
    a.href="https://instagram.com/"+CONTACTO.instagram;
  }
  a.target="_blank"; a.rel="noopener";
});

const root=document.documentElement; root.classList.add("js");
const reduce=matchMedia("(prefers-reduced-motion:reduce)").matches;
const fine=matchMedia("(pointer:fine)").matches;
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
// menú móvil
const b=document.querySelector(".burger"),u=document.querySelector(".nav ul");
if(b){b.addEventListener("click",()=>{const o=u.classList.toggle("open");b.setAttribute("aria-expanded",o)});
 u.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>u.classList.remove("open")));}
// aparición al hacer scroll
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add("in");io.unobserve(e.target)}}),{threshold:.15});
document.querySelectorAll("[data-reveal]").forEach((el,i)=>{el.style.transitionDelay=(i%3)*90+"ms";io.observe(el)});
// contadores
const co=new IntersectionObserver(es=>es.forEach(e=>{if(!e.isIntersecting)return;co.unobserve(e.target);
 const el=e.target,end=+el.dataset.count,pre=el.dataset.prefix||"";
 if(reduce){el.textContent=pre+end;return}
 const t0=performance.now();(function f(t){const p=clamp((t-t0)/1700,0,1),v=Math.round(end*(1-Math.pow(1-p,3)));el.textContent=pre+v;if(p<1)requestAnimationFrame(f)})(t0)}),{threshold:.6});
document.querySelectorAll("[data-count]").forEach(el=>co.observe(el));
// seguimiento del cursor (parallax, toro, busto)
if(!reduce){
 document.querySelectorAll("[data-track]").forEach(sec=>{
  sec.addEventListener("pointermove",e=>{const r=sec.getBoundingClientRect();
   sec.style.setProperty("--nx",((e.clientX-r.left)/r.width-.5)*2);sec.style.setProperty("--ny",((e.clientY-r.top)/r.height-.5)*2)});
  sec.addEventListener("pointerleave",()=>{sec.style.setProperty("--nx",0);sec.style.setProperty("--ny",0)});
 });
 // scroll: parallax y manos que se acercan
 const adans=[...document.querySelectorAll("[data-adan]")];
 let tick=false;
 function onScroll(){tick=false;root.style.setProperty("--sy",scrollY);
  const vh=innerHeight;
  adans.forEach(el=>{const r=el.getBoundingClientRect();const p=clamp((vh*.95-r.top)/(vh*.62),0,1);
   el.style.setProperty("--p",p.toFixed(3));el.classList.toggle("touch",p>.985)});}
 addEventListener("scroll",()=>{if(!tick){tick=true;requestAnimationFrame(onScroll)}},{passive:true});onScroll();
}else{document.querySelectorAll("[data-adan]").forEach(el=>el.style.setProperty("--p",1))}
// tarjetas 3D
if(fine&&!reduce)document.querySelectorAll("[data-tilt]").forEach(c=>{
 c.addEventListener("pointermove",e=>{const r=c.getBoundingClientRect();
  c.style.setProperty("--ry",(((e.clientX-r.left)/r.width-.5)*10).toFixed(2)+"deg");c.style.setProperty("--rx",(((e.clientY-r.top)/r.height-.5)*-8).toFixed(2)+"deg")});
 c.addEventListener("pointerleave",()=>{c.style.setProperty("--rx","0deg");c.style.setProperty("--ry","0deg")});});
// confeti
function confetti(box){if(reduce||!box)return;const cols=["#D6FE5D","#23225E","#FFFFFF","#A9ABF0","#797CE6"];
 for(let i=0;i<46;i++){const p=document.createElement("i");p.style.background=cols[i%cols.length];box.appendChild(p);
  const a=Math.random()*Math.PI*2,d=120+Math.random()*220;
  p.animate([{transform:"translate(0,0) rotate(0)",opacity:1},{transform:`translate(${Math.cos(a)*d}px,${Math.sin(a)*d-80}px) rotate(${Math.random()*720}deg)`,opacity:1,offset:.6},{transform:`translate(${Math.cos(a)*d*1.15}px,${Math.sin(a)*d+120}px) rotate(${Math.random()*900}deg)`,opacity:0}],{duration:1300+Math.random()*700,easing:"cubic-bezier(.2,.7,.3,1)"}).onfinish=()=>p.remove();}}
document.querySelectorAll("[data-clap]").forEach(c=>{const bx=c.querySelector(".burst");
 new IntersectionObserver((es,o)=>es.forEach(e=>{if(e.isIntersecting){confetti(bx);o.unobserve(c)}}),{threshold:.6}).observe(c);
 c.addEventListener("click",()=>confetti(bx));
 const btn=c.closest("section").querySelector("[data-confetti]");if(btn)btn.addEventListener("mouseenter",()=>confetti(bx));});
// cursor lima
if(fine&&!reduce){const cur=document.createElement("div");cur.className="cur";document.body.appendChild(cur);
 let x=0,y=0,tx=0,ty=0;addEventListener("pointermove",e=>{tx=e.clientX;ty=e.clientY;cur.classList.add("on")});
 document.addEventListener("pointerover",e=>cur.classList.toggle("big",!!e.target.closest("a,button")));
 (function loop(){x+=(tx-x)*.2;y+=(ty-y)*.2;cur.style.left=x+"px";cur.style.top=y+"px";requestAnimationFrame(loop)})();}

// notificación rotatoria
document.querySelectorAll("[data-rot]").forEach(el=>{const m=["¡Venta cerrada!","Nuevo cliente","Cita agendada","Pago recibido"];let i=0;
 if(reduce)return;setInterval(()=>{el.classList.add("out");setTimeout(()=>{i=(i+1)%m.length;el.textContent=m[i];el.classList.remove("out")},260)},2300)});
