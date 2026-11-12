const rafOnce=f=>{let q=0;return(...a)=>{if(q)return;q=1;requestAnimationFrame(()=>{q=0;f(...a)})}};
const $=s=>document.querySelector(s),hero=$('.hero'),nav=$('nav'),still=matchMedia('(prefers-reduced-motion: reduce)').matches;
if(hero)requestAnimationFrame(()=>hero.classList.add('go'));
const els=document.querySelectorAll('.rv,.col');
if('IntersectionObserver' in window){const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.18});els.forEach(e=>io.observe(e))}else els.forEach(e=>e.classList.add('in'));
let ly=scrollY;addEventListener('scroll',()=>{const y=scrollY;if(nav.classList.contains('o')){ly=y;return}nav.classList.toggle('s',y>40);nav.classList.toggle('h',y>ly&&y>300);ly=y},{passive:true});
 
const burger=$('#burger'),menu=$('#menu');
const setMenu=o=>{menu.classList.toggle('open',o);burger.setAttribute('aria-expanded',o);burger.setAttribute('aria-label',o?'Close menu':'Menu');menu.setAttribute('aria-hidden',!o);nav.classList.toggle('o',o);nav.classList.remove('h');document.documentElement.classList.toggle('mo',o);document.documentElement.style.overflow=o?'hidden':'';if(o)setTimeout(()=>menu.querySelector('a').focus({preventScroll:true}),50)};
burger.addEventListener('click',()=>setMenu(!menu.classList.contains('open')));
(()=>{const cap=menu.querySelector('.script'),aside=menu.querySelector('aside'),def=cap.textContent;let tm;
const say=(t,dv)=>{aside.classList.toggle('dv',!!dv);if(cap.textContent===t)return;clearTimeout(tm);cap.style.opacity=0;tm=setTimeout(()=>{cap.textContent=t;cap.style.opacity=''},260)};
const sp=[...aside.querySelectorAll('.sp')],showP=k=>{const has=sp.some(p=>p.dataset.k===k);sp.forEach(p=>p.classList.toggle('on',has?p.dataset.k===k:p.dataset.k==='def'))};showP('def');burger.addEventListener('click',()=>{if(menu.classList.contains('open'))showP('def')});
menu.querySelectorAll('.mm ol a').forEach(a=>{const on=()=>{showP(a.dataset.k||'def');say(a.dataset.cap||def,!!a.dataset.k)},off=()=>say(def,false);a.addEventListener('mouseenter',on);a.addEventListener('focus',on);a.addEventListener('mouseleave',off);a.addEventListener('blur',off)});
menu.addEventListener('pointermove',e=>{menu.style.setProperty('--mxr',(e.clientX/innerWidth-.5).toFixed(3));menu.style.setProperty('--myr',(e.clientY/innerHeight-.5).toFixed(3))},{passive:true})})();
menu.addEventListener('pointermove',e=>{menu.style.setProperty('--mx',e.clientX+'px');menu.style.setProperty('--my',e.clientY+'px')},{passive:true});
menu.addEventListener('click',e=>{if(e.target.closest('a'))setMenu(false)});
addEventListener('keydown',e=>{if(e.key==='Escape'&&menu.classList.contains('open')){setMenu(false);burger.focus()}});
addEventListener('load',()=>{const h=decodeURIComponent(location.hash.slice(1)),t=h&&document.getElementById(h);if(t)t.scrollIntoView()});
document.addEventListener('click',e=>{const a=e.target.closest('a[href^="#"]');if(!a)return;const h=a.getAttribute('href'),t=h.length>1&&document.querySelector(h);if(t){e.preventDefault();t.scrollIntoView()}});
/* ENQUIRY FORM: posted to a Google Apps Script web app (see apps-script.gs), which saves each enquiry to a Google Sheet and emails it.
   Sent as text/plain with no-cors so the browser makes no CORS preflight (Apps Script cannot answer one). The hidden 'website' field is a spam honeypot. */
const FORM_ENDPOINT='https://script.google.com/macros/s/AKfycbxvq_iI-pFBFO5q_h_nEXg_nHby6DvJzPjczsSdOZpojGzfkccr2cufFFDPShcNRb4c/exec';
document.addEventListener('submit',e=>{const f=e.target.closest('#enq,#prop');if(!f)return;e.preventDefault();
const m=f.querySelector('[role=status]'),btn=f.querySelector('[type=submit]'),d=Object.fromEntries(new FormData(f));
if(d.website)return;delete d.website;
if(!FORM_ENDPOINT){if(window.formInk)formInk(f,false);else if(m)m.textContent='Preview only: enquiry delivery is not connected yet.';return}
if(btn)btn.disabled=true;if(m)m.textContent='Sending…';
const payload=Object.assign({form:f.id==='prop'?'proposal':'enquiry',page:location.href,sent:new Date().toISOString()},d);
fetch(FORM_ENDPOINT,{method:'POST',mode:'no-cors',headers:{'Content-Type':'text/plain;charset=utf-8'},body:JSON.stringify(payload)})
.then(()=>{if(m)m.textContent='';window.formInk?formInk(f,true):(m&&(m.textContent='Thank you for contacting HUR-ON. Your enquiry has been received.'));f.reset()})
.catch(er=>{console.error('Enquiry send failed',er);if(m)m.textContent='Sorry, we could not send your enquiry. Please try again or WhatsApp us.'})
.finally(()=>{if(btn)btn.disabled=false});});
const hov=matchMedia('(hover:hover)').matches;
document.querySelectorAll('h1,h2').forEach(h=>{if(h.querySelector('*'))return;let i=0;h.innerHTML=h.textContent.trim().split(/\s+/).map(w=>'<span class="wd"><span style="--i:'+(i++)+'">'+w.replace(/&/g,'&amp;')+'</span></span>').join(' ')});
let sh=0;const rsh=()=>{sh=document.documentElement.scrollHeight-innerHeight};if(window.ResizeObserver)new ResizeObserver(rsh).observe(document.body);addEventListener('resize',rsh);addEventListener('load',rsh);rsh();
let tk2=false;addEventListener('scroll',()=>{if(tk2)return;tk2=true;requestAnimationFrame(()=>{tk2=false;const y=scrollY,h=sh;$('#prog').style.transform='scaleX('+(h>0?y/h:0)+')';
if(!still){if(hero&&y<innerHeight*1.2){hero.style.setProperty('--sy',(-y*.12)+'px');hero.style.setProperty('--so',Math.max(0,1-y/(innerHeight*.75)).toFixed(3));hero.style.setProperty('--fy',(y*.2)+'px')}
const ph=document.querySelector('.page:not([hidden]) .ph');if(ph)ph.style.setProperty('--py',y+'px')}})},{passive:true});
if(!still){addEventListener('pointerdown',e=>{const r=document.createElement('i');r.className='rp';r.style.left=e.clientX+'px';r.style.top=e.clientY+'px';r.addEventListener('animationend',()=>r.remove());document.body.appendChild(r)});
const mt=$('.mt');if(mt){mt.innerHTML+=mt.innerHTML;let x=0,v=0,ly2=scrollY,w=0,mv=false;const mw=()=>{w=mt.scrollWidth/2};mw();addEventListener('resize',mw);addEventListener('load',mw);new IntersectionObserver(es=>{mv=es[0].isIntersecting;if(mv)mw()}).observe(mt.parentElement||mt);(function(){var sy=scrollY;addEventListener('scroll',function(){sy=scrollY},{passive:true});(function f(){if(mv&&w){const dy=sy-ly2;ly2=sy;v+=(Math.min(Math.abs(dy),60)*.25-v)*.08;x-=.7+v;if(x<-w)x+=w;mt.style.transform='translate3d('+x+'px,0,0)'}else ly2=sy;requestAnimationFrame(f)})()})()}}
if(hov&&!still){const g=$('#glow');let tx=0,ty=0,gx=0,gy=0;addEventListener('pointermove',e=>{tx=e.clientX;ty=e.clientY;g.style.opacity=1});(function f(){requestAnimationFrame(f);const dx=tx-gx,dy=ty-gy;if(dx*dx+dy*dy<.25)return;gx+=dx*.12;gy+=dy*.12;g.style.transform='translate3d('+(gx-210)+'px,'+(gy-210)+'px,0)'})();
document.addEventListener('pointermove',e=>{const b=e.target.closest&&e.target.closest('.btn');if(!b)return;const r=b.getBoundingClientRect();b.style.transform='translate('+((e.clientX-r.left-r.width/2)*.22)+'px,'+((e.clientY-r.top-r.height/2)*.3)+'px)'});
document.addEventListener('pointerout',e=>{const b=e.target.closest&&e.target.closest('.btn');if(b&&!b.contains(e.relatedTarget))b.style.transform=''});
document.querySelectorAll('.card').forEach(c=>{const a=c.querySelector('.art');c.addEventListener('pointermove',e=>{const r=a.getBoundingClientRect(),px=(e.clientX-r.left)/r.width,py=(e.clientY-r.top)/r.height;a.style.setProperty('--ry',(px-.5)*14+'deg');a.style.setProperty('--rx',-(py-.5)*14+'deg');a.style.setProperty('--gx',px*100+'%');a.style.setProperty('--gy',py*100+'%')});c.addEventListener('pointerleave',()=>{a.style.setProperty('--ry','0deg');a.style.setProperty('--rx','0deg')})})}
const cio=new IntersectionObserver(es=>es.forEach(e=>{if(!e.isIntersecting)return;cio.unobserve(e.target);if(still)return;const el=e.target,n=+el.textContent,t0=performance.now();(function f(t){const k=Math.min(1,(t-t0)/1200);el.textContent=Math.round(n*(1-Math.pow(1-k,3)));if(k<1)requestAnimationFrame(f)})(t0)}),{threshold:.6});
document.querySelectorAll('.stats b').forEach(b=>{if(/^\d+$/.test(b.textContent))cio.observe(b)});
const FD={harmonia:['PULSE','Corporate Training &amp; Consultancy','Better People. Stronger Teams.','Strengthen leadership, culture, teamwork and professional capability.','#116f8a','#1b8aa6'],unveil:['SPARK','Children &amp; Youth Development','Reveal What Is Possible.','Reveal confidence, creativity, character and future-ready skills.','#d9560a','#f47a1f'],rise:['BLOOM','Lifelong Learning &amp; Development','Every Season Holds Possibility.','Find fresh possibilities through every stage and transition of life.','#3f7a1c','#5f9b2e'],orbit:['VERVE','Events, Camps &amp; Experiences','Experiences That Bring People Together.','Bring people together through carefully designed conferences, retreats, competitions, camps and celebrations.','#5c2fa5','#7b3fc9']};
document.querySelectorAll('.fz button').forEach(b=>b.addEventListener('click',()=>{document.querySelectorAll('.fz button').forEach(x=>x.setAttribute('aria-pressed',x===b));const d=FD[b.dataset.d];$('#fres').innerHTML='<div class="fr"><div class="fa" style="--c1:'+d[4]+';--c2:'+d[5]+'"><span>'+d[0][0]+'</span></div><div><h3>'+d[0]+'</h3><div class="who">'+d[1]+'</div><div class="tg">'+d[2]+'</div><p>'+d[3]+'</p><div class="ctas" style="margin-top:22px"><a class="btn" href="'+b.dataset.d+'.html">Explore '+(d[0]==='VERVE'?'Events':d[0])+' →</a><a class="btn" href="proposal.html">Request a Proposal</a></div></div></div>'}));
 
 
 
