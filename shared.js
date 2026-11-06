/* shared behaviours */
(function(){var raf=requestAnimationFrame.bind(window),st=scrollTo.bind(window),oMO=window.MutationObserver;
var cur=scrollY,tgt=scrollY,run=0,last=0,TAU=.085;
function max(){return Math.max(0,document.documentElement.scrollHeight-innerHeight)}
function step(t){var dt=Math.min(.05,(t-last)/1000||.007);last=t;
 cur+=(tgt-cur)*(1-Math.exp(-dt/TAU));
 if(Math.abs(tgt-cur)<.4){cur=tgt;run=0}
 st({top:cur,left:0,behavior:'instant'});
 if(run)raf(step)}
addEventListener('scroll',function(){if(Math.abs(scrollY-cur)>2.5){cur=tgt=scrollY;run=0}},{passive:true});
addEventListener('wheel',function(e){
 if(e.ctrlKey||e.defaultPrevented||e.deltaMode===0&&(Math.abs(e.deltaY)<50||e.deltaY%1))return;
 if(Math.abs(e.deltaX)>Math.abs(e.deltaY))return;
 var b=getComputedStyle(document.body).overflowY,h=getComputedStyle(document.documentElement).overflowY;
 if(b==='hidden'||h==='hidden')return;
 for(var n=e.target;n&&n!==document.body&&n.nodeType===1;n=n.parentNode){var o=getComputedStyle(n).overflowY;if((o==='auto'||o==='scroll')&&n.scrollHeight>n.clientHeight+2)return}
 e.preventDefault();
 if(!run){cur=tgt=scrollY}
 tgt=Math.max(0,Math.min(max(),tgt+e.deltaY*(e.deltaMode===1?32:1)));
 if(!run){run=1;last=performance.now();raf(step)}
},{passive:false});
var q=0;function dec(){q=0;document.querySelectorAll('img:not([decoding=async])').forEach(function(i){i.decoding='async'})}
new oMO(function(){if(!q){q=1;raf(dec)}}).observe(document.documentElement,{childList:true,subtree:true});
})();
;
(function(){
var R=document.querySelector&&0;
function clamp(x){return x<0?0:x>1?1:x}
function upd(){
 var lis=document.querySelectorAll('#approach ol.steps.three li');
 if(!lis.length)return;
 var vh=innerHeight,atEnd=(innerHeight+scrollY>=document.documentElement.scrollHeight-4);
 lis.forEach(function(li,i){
  var t=li.getBoundingClientRect().top;
  var p=clamp((vh*0.97-t-i*vh*0.06)/(vh*0.42));
  if(atEnd&&t<vh)p=1;
  var st=li.style;
  st.setProperty('transition','opacity .14s linear,transform .14s linear,box-shadow .3s,border-color .3s','important');
  st.setProperty('opacity',p.toFixed(3),'important');
  st.setProperty('transform','translateY('+((1-p)*56).toFixed(1)+'px)','important');
 });
}
(function(){var f=0;addEventListener('scroll',function(){if(f)return;f=1;requestAnimationFrame(function(){f=0;upd()})},{passive:true,capture:true})})();
addEventListener('resize',upd);
setInterval(upd,300);upd();
})();
;
(function(){function o(){document.querySelectorAll('#divisions-s1 details:not([data-o])').forEach(function(d){d.open=true;d.setAttribute('data-o','1')})}new MutationObserver(o).observe(document.documentElement,{childList:true,subtree:true});o()})();
;
(function(){var S='#divisions-s1 .art';document.addEventListener('pointermove',function(e){var a=e.target.closest&&e.target.closest(S);if(!a)return;var r=a.getBoundingClientRect(),px=(e.clientX-r.left)/r.width,py=(e.clientY-r.top)/r.height;a.style.setProperty('--ry',((px-.5)*12).toFixed(2)+'deg');a.style.setProperty('--rx',(-(py-.5)*12).toFixed(2)+'deg');a.style.setProperty('--gx',(px*100).toFixed(1)+'%');a.style.setProperty('--gy',(py*100).toFixed(1)+'%');a.style.setProperty('--mx',((px-.5)*2).toFixed(2));a.style.setProperty('--my',((py-.5)*2).toFixed(2))});document.addEventListener('pointerout',function(e){var a=e.target.closest&&e.target.closest(S);if(!a||a.contains(e.relatedTarget))return;a.style.setProperty('--rx','0deg');a.style.setProperty('--ry','0deg');a.style.setProperty('--mx','0');a.style.setProperty('--my','0')})})();
;
try{if(matchMedia("(prefers-reduced-motion:reduce)").matches)document.querySelectorAll("svg").forEach(function(v){v.pauseAnimations&&v.pauseAnimations()})}catch(e){}
;
(function(){var w=document.getElementById("hflow");if(!w)return;var f=w.querySelector(".f"),d=w.querySelector(".d"),q=0;function u(){q=0;var e=document.scrollingElement||document.documentElement,m=e.scrollHeight-e.clientHeight;if(m<40){w.classList.remove("on");return}var p=Math.max(0,Math.min(1,e.scrollTop/m));w.classList.add("on");w.style.setProperty("--p",p)}function r(){if(!q)q=requestAnimationFrame(u)}addEventListener("scroll",r,{passive:true});addEventListener("resize",r);try{new ResizeObserver(r).observe(document.body)}catch(x){}u()})();
;
function hrStrip(){if(!document.getElementById('hrs-css')){var st=document.createElement('style');st.id='hrs-css';st.textContent=".hrs{position:relative;z-index:2;overflow:hidden;pointer-events:none;--g:#b08d3c;background-color:#fbf8ec;padding:clamp(22px,2.6vw,32px) 0;background-image:linear-gradient(var(--g),var(--g)),linear-gradient(var(--g),var(--g)),linear-gradient(var(--g),var(--g)),linear-gradient(var(--g),var(--g));background-repeat:no-repeat;background-size:100% 1px;background-position:0 0,0 4px,0 calc(100% - 4px),0 100%}body .hrs-t{display:flex;align-items:center;width:max-content;animation:hrs-s 80s linear infinite;will-change:transform}body .hrs-t span{flex:none;padding-right:clamp(28px,3.4vw,48px);white-space:nowrap;font-family:'Playfair Display',Georgia,serif;font-weight:500;font-size:clamp(20px,2.3vw,31px);line-height:1.2;letter-spacing:.08em;text-transform:uppercase;color:#1f3d31}body .hrs-t span:nth-child(3n+2){color:#c4a255;font-weight:700}body .hrs-t span:nth-child(3n){font-style:italic;text-transform:none;letter-spacing:.01em;font-weight:500;font-size:clamp(32px,3.7vw,52px);color:#a07e2c}@keyframes hrs-s{to{transform:translate3d(-50%,0,0)}}@media(prefers-reduced-motion:reduce){body .hrs-t{animation:none}}";document.head.appendChild(st)}var old=document.getElementById('hrs');if(old)old.remove();if(document.getElementById('pg-home'))return;var w=document.createElement('div');w.id='hrs';w.className='hrs';w.setAttribute('aria-hidden','true');var t=document.createElement('div');t.className='hrs-t';var h='';for(var i=0;i<16;i++){h+='<span>Rhythm.</span><span>Artistry.</span><span>Flow.</span>'}t.innerHTML=h;w.appendChild(t);document.body.appendChild(w)}

;(function(){function go(){try{hrStrip()}catch(e){}}if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",go);else go()})();
