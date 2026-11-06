

/* Standalone navigation: the original preview shell provided parent.__go(); on a real host there is no parent, so just navigate. */
function __nav2(h){try{if(parent!==window&&typeof parent.__go==='function'){parent.__go(h);return}}catch(e){}if(window.__nav){window.__nav(h);return}location.href=h}
(function(){
var RM=matchMedia('(prefers-reduced-motion:reduce)').matches,busy=false;
var cl=function(v,a,b){return Math.min(b==null?1:b,Math.max(a==null?0:a,v))},sm=function(v,a,b){v=cl((v-a)/(b-a));return v*v*(3-2*v)};
function run(ox,oy,href,rev){
 busy=true;document.body.classList.add('inking');
 var cv=document.createElement('canvas');cv.id='inkcv';document.body.appendChild(cv);
 var D=Math.min(devicePixelRatio||1,1.5),W=innerWidth,H=innerHeight,g=cv.getContext('2d');cv.width=W*D;cv.height=H*D;
 var tex=document.getElementById('tx'),M=Math.max(W,H);
 var DR=[];for(var i=0;i<18;i++)DR.push({x:((i*.618+.13)%1)*W,y:(.06+((i*.7548+.2)%1)*.88)*H,R:.2+((i*5)%7)/7*.12,k:i});
 DR[0].x=ox;DR[0].y=oy;
 var first=DR[0],rest=DR.slice(1).sort(function(a,b){return Math.hypot(a.x-ox,a.y-oy)-Math.hypot(b.x-ox,b.y-oy)});
 DR=[first].concat(rest);DR.forEach(function(d,i){d.s=i/17*.5});
 function blob(cx,cy,R,k){g.beginPath();for(var j=0;j<=180;j++){var a=j/180*6.2832,r=R*(1+.1*Math.sin(3*a+k)+.06*Math.sin(5*a+2*k)+.02*Math.sin(9*a+k*3)),x=cx+Math.cos(a)*r,y=cy+Math.sin(a)*r;j?g.lineTo(x,y):g.moveTo(x,y)}g.closePath();g.fill()}
 function draw(p,rev){
  g.setTransform(D,0,0,D,0,0);g.clearRect(0,0,W,H);if(p<=.001)return;
  g.fillStyle='#000';g.shadowColor='rgba(0,0,0,.9)';g.shadowBlur=0;
  DR.forEach(function(d){var l=cl((p-d.s)/.32);if(l<=0)return;var X=d.x,Y=d.y,ft=.2;
   if(l<ft){if(rev)return;var t=l/ft,y=-40+(Y+40)*t*t,r=11+(d.k%3)*3;g.beginPath();g.arc(X,y,r,0,6.3);g.moveTo(X-r*.8,y-r*.4);g.lineTo(X,y-r*3.4);g.lineTo(X+r*.8,y-r*.4);g.fill()}
   else{var t2=(l-ft)/(1-ft),e=1-Math.pow(1-t2,3),R=d.R*M*e;blob(X,Y,R+6,d.k);for(var q=0;q<7;q++){var a=q*.9+d.k,dd=R*(1.12+((q*5+d.k)%4)*.1),rr=(2+(q%3)*2.5)*Math.min(1,t2*4);g.beginPath();g.arc(X+Math.cos(a)*dd,Y+Math.sin(a)*dd,rr,0,6.3);g.fill()}}});
  var fl=sm(p,.62,.84);if(fl>0){var by=H*fl*1.1;g.beginPath();g.moveTo(0,0);g.lineTo(W,0);for(var x=W;x>=0;x-=20)g.lineTo(x,by+Math.sin(x/70)*16*(1-fl));g.closePath();g.fill()}
  g.shadowBlur=0;
  if(tex&&tex.naturalWidth){g.globalCompositeOperation='source-in';var k=Math.max(W/tex.naturalWidth,H/tex.naturalHeight),w=tex.naturalWidth*k,h=tex.naturalHeight*k;g.drawImage(tex,(W-w)/2,(H-h)/2,w,h);g.globalCompositeOperation='source-atop';g.fillStyle='rgba(5,18,16,.5)';g.fillRect(0,0,W,H);g.globalCompositeOperation='source-over'}
 }
 var PM=.88,T1=900,HOLD=80,T2=720,t0=performance.now()-(rev?T1+HOLD:0),swapped=false,base=(href==='__top'||rev)?0:4000;
 (function f(now){
  var t=now-t0;
  if(t>=T1&&!swapped&&!rev){swapped=true;if(href==='__top')scrollTo({top:0,behavior:'instant'});else{try{sessionStorage.setItem('huron-ink',JSON.stringify({x:ox/W,y:oy/H,t:Date.now()}))}catch(e){}window.__inkF={x:ox/W,y:oy/H,t:Date.now()};__nav2(href);if(window.__nav)return}}
  if(t<T1){draw(PM*t/T1,false)}
  else if(t<T1+HOLD+base){draw(PM,false)}
  else if(t<T1+HOLD+base+T2){draw(PM*(1-(t-T1-HOLD-base)/T2),true);if(rev)document.documentElement.classList.remove('inkin')}
  else{cv.remove();document.body.classList.remove('inking');busy=false;return}
  requestAnimationFrame(f)
 })(t0);
}
var lockEv=function(e){if(busy&&e.cancelable)e.preventDefault()};
['wheel','touchmove'].forEach(function(t){addEventListener(t,lockEv,{passive:false})});
addEventListener('keydown',function(e){if(busy&&/^(ArrowUp|ArrowDown|PageUp|PageDown|Home|End| )$/.test(e.key))e.preventDefault()});
window.__ink=function(x,y,h){if(busy)return;if(RM){scrollTo(0,0);return}run(x,y,h)};
var PAGE=/^(?![a-z]+:|\/\/|#)[^?#]*\.html(#.*)?$/i;
function samePage(h){var p=h.split('#')[0],cur=(window.__PAGE||'index.html');return p===cur}
document.addEventListener('click',function(e){
 var a=e.target.closest&&e.target.closest('a[href]');
 if(!a||e.metaKey||e.ctrlKey||e.shiftKey||e.button||a.target==='_blank'||a.hasAttribute('download'))return;
 var href=a.getAttribute('href');if(!PAGE.test(href))return;
 var hash=href.indexOf('#')>-1?href.slice(href.indexOf('#')):'';
 var mn=document.getElementById('menu'),fromMenu=mn&&mn.classList.contains('open')&&a.closest('#menu'),bg=document.getElementById('burger');
 e.preventDefault();e.stopImmediatePropagation();
 if(busy)return;
 if(fromMenu&&bg)bg.click();
 var r=a.getBoundingClientRect(),x=e.clientX||r.left+r.width/2,y=e.clientY||r.top+r.height/2;
 if(samePage(href)){
  if(hash){var t=document.getElementById(decodeURIComponent(hash.slice(1)));if(t)setTimeout(function(){t.scrollIntoView({behavior:RM?'auto':'smooth'})},fromMenu?60:0)}
  else if(RM)scrollTo(0,0);else run(x,y,'__top');
  return}
 if(RM){__nav2(href);return}
 run(x,y,href);
},true);
addEventListener('pageshow',function(e){if(e.persisted){var c=document.getElementById('inkcv');if(c)c.remove();document.body.classList.remove('inking');document.documentElement.classList.remove('inkin');busy=false}});
(function arrive(){var f=null;try{f=JSON.parse(sessionStorage.getItem('huron-ink')||'null');sessionStorage.removeItem('huron-ink')}catch(e){}if(!f&&window.__inkF)f=window.__inkF;window.__inkF=null;
 var de=document.documentElement;if(!f||Date.now()-f.t>8000||RM){de.classList.remove('inkin');return}
 var tex=document.getElementById('tx'),started=false;
 function start(){if(started)return;started=true;run(f.x*innerWidth,f.y*innerHeight,'__top',true)}
 if(tex&&!tex.complete)tex.addEventListener('load',start);else start();
 setTimeout(start,1500)})();
})();
