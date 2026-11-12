/* Find your pathway — "Four Doors". Progressive enhancement: the original list (.fwrap) stays in the DOM, hidden. */
(function(){
'use strict';
var sec=document.getElementById('finder'),old=sec&&sec.querySelector('.fwrap');if(!old)return;
var RM=matchMedia('(prefers-reduced-motion:reduce)').matches,FINE=matchMedia('(hover:hover) and (pointer:fine)').matches;
var ORDER=['harmonia','unveil','rise','orbit'];
var IMG={harmonia:'assets/div-1.webp',unveil:'assets/div-2.webp',rise:'assets/div-3.webp',orbit:'assets/div-4.webp'};
var DATA={
harmonia:{n:'Pulse',who:'Corporate Training & Consultancy',tg:'Better People. Stronger Teams.',ds:'Strengthen leadership, culture, teamwork and professional capability.',chips:['Leadership & management','Team development','Communication & relational intelligence','People & culture','Professional skills','Learning needs & programme design'],acc:'#d9bd7a'},
unveil:{n:'Spark',who:'Children & Youth Development',tg:'Reveal What Is Possible.',ds:'Reveal confidence, creativity, character and future-ready skills.',chips:['Communication & expression','Leadership & character','Creative learning','Future-ready skills','School enrichment','Holiday experiences'],acc:'#f0b84a'},
rise:{n:'Bloom',who:'Lifelong Learning & Development',tg:'Every Season Holds Possibility.',ds:'Find fresh possibilities through every stage and transition of life.',chips:['Personal development','Parenting & family learning','Life transitions','Women’s development','Active ageing','Community learning'],acc:'#efa99f'},
orbit:{n:'Verve',who:'Events, Camps & Experiences',tg:'Experiences That Bring People Together.',ds:'Bring people together through carefully designed conferences, retreats, competitions, camps and celebrations.',chips:['Corporate events','Camps & retreats','Competitions & showcases','Community & public events','Exhibitions & experiences','Hybrid & digital experiences'],acc:'#4cc3cf'}};
var TH0={night:{bg:'#03130d',fade:'rgba(3,19,13,.07)',comp:'lighter',pal:['#d9bd7a','#3fae86','#4cc3cf','#efa99f'],a:.34,lw:1.3},paper:{bg:null,fade:'',comp:'source-over',pal:['#0a3d2f','#1d5f49','#8a6a25','#2a7f8a'],a:.5,lw:1.5},mist:{bg:'#0B3D2E',fade:'rgba(11,61,46,.07)',comp:'lighter',pal:['#e8d29a','#7fd6a8','#9fe0e6','#f2b9ae'],a:.3,lw:1.3}};
if(!sec.dataset.bg)sec.dataset.bg='paper';var TH=TH0[sec.dataset.bg]||TH0.paper;
function txt(e){return e?e.textContent.trim():''}
function lab(k){var b=old.querySelector('.fo[data-d="'+k+'"]');return{who:txt(b&&b.querySelector('.flb'))||DATA[k].who,nm:txt(b&&b.querySelector('.fn'))||DATA[k].n}}
/* ---------- markup ---------- */
var st=document.createElement('div');st.className='pw';
st.innerHTML='<canvas class="pw-cv" aria-hidden="true"></canvas><div class="pw-grid" role="group" aria-label="Who are you bringing together?">'+
ORDER.map(function(k,i){return'<button type="button" class="pw-o" data-k="'+k+'" style="--ac:'+DATA[k].acc+';--i:'+i+'"><span class="pw-mag"><span class="pw-ring"><span class="pw-img" style="background-image:url('+IMG[k]+')"></span><span class="pw-orb"></span></span><span class="pw-num">0'+(i+1)+'</span></span><span class="pw-lb"><span class="pw-who"></span><span class="pw-nm"></span></span></button>'}).join('')+
'</div><div class="pw-scene" role="region" aria-label="Your pathway" aria-hidden="true"><div class="pw-bg"></div><div class="pw-c"></div></div><div class="pw-cur" aria-hidden="true"></div><p class="pw-hint" aria-hidden="true">Choose a door</p>';
var grid=st.querySelector('.pw-grid'),scene=st.querySelector('.pw-scene'),cc=scene.querySelector('.pw-c'),cur=st.querySelector('.pw-cur'),cv=st.querySelector('.pw-cv'),g=cv.getContext('2d');
var orbs=[].slice.call(st.querySelectorAll('.pw-o')),open=null,vis=false,W=0,H=0,D=1,mx=-999,my=-999,cx=-999,cy=-999,t0=0;
function labels(){orbs.forEach(function(o){var l=lab(o.dataset.k);o.querySelector('.pw-who').textContent=l.who;o.querySelector('.pw-nm').textContent=l.nm})}
/* ---------- scene: step 2 (focus) -> step 3 (recommendation) ---------- */
var goals=[],step=2;
function letters(s){return s.split('').map(function(c,i){return'<span class="pw-l" style="--n:'+i+'">'+(c===' '?'&nbsp;':c)+'</span>'}).join('')}
var INT={harmonia:'PULSE (Corporate)',unveil:'SPARK (Youth)',rise:'BLOOM (Lifelong)',orbit:'VERVE (Events)'};
function dock(k){var d=DATA[k],l=lab(k);return'<div class="pw-dock pw-a" style="--d:.05s"><span class="pw-dr"><span class="pw-ph" style="background-image:url('+IMG[k]+')"></span></span><div class="pw-dt"><b class="pw-s1">You’re bringing</b><span class="pw-wh">'+l.who+'</span><span class="pw-nm2">'+d.n+'</span></div></div>'}
function q(k){var d=DATA[k];return dock(k)+'<div class="pw-body"><h3 class="pw-qh pw-a" style="--d:.15s">What would you like to focus on?</h3><p class="pw-hn pw-a" style="--d:.25s">Choose up to three</p><div class="pw-gl" role="group">'+d.chips.map(function(c,i){return'<button type="button" class="pw-g pw-a" aria-pressed="false" style="--d:'+(.3+i*.06).toFixed(2)+'s">'+c+'</button>'}).join('')+'</div><div class="pw-act pw-a" style="--d:.75s"><button type="button" class="pw-go" disabled>Show my pathway →</button></div></div>'}
function route(k){var d=DATA[k];return'<svg class="pw-rt" viewBox="0 0 520 70" aria-hidden="true"><path class="pw-rp" d="M30 36 C 110 6, 170 66, 260 36 S 410 6, 490 36" pathLength="1"/><path class="pw-rf" d="M30 36 C 110 6, 170 66, 260 36 S 410 6, 490 36"/><circle cx="30" cy="36" r="8" fill="#0a3d2f"/><circle cx="260" cy="36" r="8" fill="'+d.acc+'"/><circle cx="490" cy="36" r="13" fill="'+d.acc+'"/><circle class="pw-rg" cx="490" cy="36" r="13" fill="none" stroke="'+d.acc+'"/></svg>'}
function result(k){var d=DATA[k],l=lab(k);
 return dock(k)+'<div class="pw-body"><b class="pw-s1 pw-a" style="--d:.1s">Your pathway</b><h3 class="pw-big" aria-label="'+d.n+'"><span aria-hidden="true">'+letters(d.n.toUpperCase())+'</span></h3><p class="pw-tg pw-a" style="--d:.5s">'+d.tg+'</p><div class="pw-a" style="--d:.6s">'+route(k)+'</div>'+
 '<ul class="pw-why"><li class="pw-a" style="--d:.7s"><b>You’re bringing</b><span>'+l.who+'</span></li><li class="pw-a" style="--d:.8s"><b>Your focus</b><span>'+goals.join(' · ')+'</span></li><li class="pw-a" style="--d:.9s"><b>How we help</b><span>'+d.ds+'</span></li></ul>'+
 '<div class="pw-nx pw-a" style="--d:1s"><b>Next step</b><span>Share your brief, we clarify objectives and scope, then we propose a programme and budget.</span></div>'+
 '<div class="pw-cta pw-a" style="--d:1.1s"><a class="pw-b1" href="proposal.html" data-brief="1">Request a proposal for this →</a><a class="pw-b2" href="'+k+'.html">Explore '+d.n.toUpperCase()+' →</a></div></div>'}
function wire(k){
 var go=cc.querySelector('.pw-go'),gs=[].slice.call(cc.querySelectorAll('.pw-g'));
 gs.forEach(function(b){b.addEventListener('click',function(){var t=b.textContent.trim(),i=goals.indexOf(t);
  if(i>-1){goals.splice(i,1);b.setAttribute('aria-pressed','false')}else if(goals.length<3){goals.push(t);b.setAttribute('aria-pressed','true')}
  if(go)go.disabled=!goals.length;cc.classList.toggle('full',goals.length>=3)})});
 if(go)go.addEventListener('click',function(){showResult(k)});
}
function build(k){cc.innerHTML='<button type="button" class="pw-x"><span>✕</span> Start over</button>'+(step===2?q(k):result(k));cc.querySelector('.pw-x').addEventListener('click',close);wire(k);scene.style.setProperty('--ac',DATA[k].acc)}
var LAST=null;
addEventListener('click',function(e){var a=e.target.closest&&e.target.closest('a[data-brief]');if(!a||!LAST)return;try{sessionStorage.setItem('huron-brief',JSON.stringify({k:LAST.k,interest:INT[LAST.k],audience:lab(LAST.k).who,role:DATA[LAST.k].who,name:DATA[LAST.k].n,goals:LAST.goals}))}catch(x){}},true);
function showResult(k){LAST={k:k,goals:goals.slice()};step=3;scene.classList.remove('go');build(k);void scene.offsetWidth;scene.classList.add('go')}
function ring(k){var o=orbs[ORDER.indexOf(k)],r=o.querySelector('.pw-ring').getBoundingClientRect(),s=st.getBoundingClientRect();return{x:r.left+r.width/2-s.left,y:r.top+r.height/2-s.top,r:r.width/2,w:s.width,h:s.height}}
function openScene(k){var p=ring(k);open=k;step=2;goals=[];st.dataset.open=k;build(k);cur.classList.remove('big');cur.dataset.t='';
 scene.style.setProperty('--cx',p.x+'px');scene.style.setProperty('--cy',p.y+'px');scene.style.setProperty('--r',p.r+'px');
 scene.classList.add('on');scene.setAttribute('aria-hidden','false');void scene.offsetWidth;
 scene.style.setProperty('--r',Math.hypot(Math.max(p.x,p.w-p.x),Math.max(p.y,p.h-p.y))+6+'px');
 setTimeout(function(){scene.classList.add('go');var g1=cc.querySelector('.pw-g');if(g1)g1.focus({preventScroll:true})},RM?0:520)}
function close(){if(!open)return;var p=ring(open),was=open;scene.classList.remove('go');scene.style.setProperty('--cx',p.x+'px');scene.style.setProperty('--cy',p.y+'px');scene.style.setProperty('--r',p.r+'px');
 open=null;goals=[];st.dataset.open='';scene.setAttribute('aria-hidden','true');
 setTimeout(function(){if(!open)scene.classList.remove('on')},RM?0:950);orbs[ORDER.indexOf(was)].focus({preventScroll:true})}
orbs.forEach(function(o){o.addEventListener('click',function(){openScene(o.dataset.k)})});
addEventListener('keydown',function(e){if(open&&e.key==='Escape')close()});
/* ---------- pointer: magnetic doors + custom cursor ---------- */
function rel(e){var s=st.getBoundingClientRect();return[e.clientX-s.left,e.clientY-s.top]}
st.addEventListener('pointermove',function(e){var p=rel(e);mx=p[0];my=p[1];if(FINE){cur.classList.add('on');var t=e.target.closest&&e.target.closest('.pw-o');cur.classList.toggle('big',!!t&&!open);cur.dataset.t=t&&!open?'Enter':'';cur.classList.toggle('sm',!!(open&&e.target.closest('a,button')))}
 if(!RM&&!open)orbs.forEach(function(o){var r=o.querySelector('.pw-ring').getBoundingClientRect(),s=st.getBoundingClientRect(),dx=mx-(r.left+r.width/2-s.left),dy=my-(r.top+r.height/2-s.top),d=Math.hypot(dx,dy),f=d<340?(1-d/340)*.16:0;o.style.setProperty('--mx',(dx*f).toFixed(1)+'px');o.style.setProperty('--my',(dy*f).toFixed(1)+'px')})});
st.addEventListener('pointerleave',function(){mx=my=-999;cur.classList.remove('on','big');orbs.forEach(function(o){o.style.setProperty('--mx','0px');o.style.setProperty('--my','0px')})});
/* ---------- ambient ink flow ---------- */
var P=[];function reset(p,init){p.x=Math.random()*W;p.y=Math.random()*H;p.px=p.x;p.py=p.y;p.c=TH.pal[(Math.random()*4)|0];p.l=80+Math.random()*160;p.age=init?Math.random()*p.l:0}
function size(){D=Math.min(devicePixelRatio||1,1.5);W=st.clientWidth;H=st.clientHeight;cv.width=W*D;cv.height=H*D;g.setTransform(D,0,0,D,0,0);if(TH.bg){g.fillStyle=TH.bg;g.fillRect(0,0,W,H)}else g.clearRect(0,0,W,H);if(!P.length)for(var i=0;i<(W<700?70:140);i++){var p={};reset(p,1);P.push(p)}}
function noise(x,y,t){return Math.sin(x*3.1+t)+Math.cos(y*2.7-t*.8)+Math.sin((x+y)*2.3+t*.5)}
function frame(ts){requestAnimationFrame(frame);if(!vis||!W)return;var t=ts/1000;
 if(FINE){cx+=(mx-cx)*.2;cy+=(my-cy)*.2;if(mx>-900){cur.style.transform='translate('+cx.toFixed(1)+'px,'+cy.toFixed(1)+'px)'}}
 if(RM||open)return;
 if(TH.bg){g.globalCompositeOperation='source-over';g.fillStyle=TH.fade}else{g.globalCompositeOperation='destination-out';g.fillStyle='rgba(0,0,0,.07)'}g.fillRect(0,0,W,H);g.globalCompositeOperation=TH.comp;g.lineWidth=TH.lw;
 for(var i=0;i<P.length;i++){var p=P[i],a=noise(p.x*.0016,p.y*.0016,t*.25)*1.6,vx=Math.cos(a)*1.15,vy=Math.sin(a)*1.15;
  var dx=p.x-mx,dy=p.y-my,d2=dx*dx+dy*dy;if(d2<26000){var f=1-d2/26000;vx+=-dy*.02*f+dx*.006*f;vy+=dx*.02*f+dy*.006*f}
  p.px=p.x;p.py=p.y;p.x+=vx;p.y+=vy;p.age++;g.strokeStyle=p.c;g.globalAlpha=TH.a*Math.sin(Math.PI*Math.min(1,p.age/p.l));g.beginPath();g.moveTo(p.px,p.py);g.lineTo(p.x,p.y);g.stroke();
  if(p.age>p.l||p.x<-10||p.x>W+10||p.y<-10||p.y>H+10)reset(p)}
 g.globalAlpha=1}
window.__pwTheme=function(n){if(!TH0[n])return;sec.dataset.bg=n;TH=TH0[n];P=[];size()};
/* ---------- mount ---------- */
labels();old.classList.add('pw-hide');old.after(st);size();
if('ResizeObserver'in window)new ResizeObserver(function(){size()}).observe(st);else addEventListener('resize',size);
if('IntersectionObserver'in window)new IntersectionObserver(function(e){vis=e[0].isIntersecting;if(vis)st.classList.add('in')},{threshold:.2}).observe(st);else{vis=true;st.classList.add('in')}
requestAnimationFrame(frame);
if(window.MutationObserver){var tm=0,mo=new MutationObserver(function(){clearTimeout(tm);tm=setTimeout(function(){labels()},80)});mo.observe(old,{subtree:true,childList:true,characterData:true})}
})();
