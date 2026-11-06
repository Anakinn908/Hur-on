
(function(){
var RM=matchMedia('(prefers-reduced-motion:reduce)').matches;
/* 5 back to top */
var tt=document.getElementById('totop');
if(tt){addEventListener('scroll',function(){tt.classList.toggle('on',scrollY>innerHeight*1.2)},{passive:true});
tt.addEventListener('click',function(){var r=tt.getBoundingClientRect();window.__ink?__ink(r.left+r.width/2,r.top+r.height/2,'__top'):scrollTo(0,0)})}
/* 1 form ink */
window.formInk=function(f,delivered){
 var old=f.querySelector('.fink');if(old)old.remove();
 var W=f.clientWidth,H=f.clientHeight,o=document.createElement('div');o.className='fink';
 var gl=document.createElement('div');gl.className='gl';o.appendChild(gl);
 var msg=document.createElement('div');msg.className='msg';
 msg.innerHTML='<h3>Thank you.</h3><p>Thank you for contacting HUR-ON. Your enquiry has been received. Our team will review your message and respond using the contact details provided.</p>'+(delivered?'':'<small>Preview only: enquiry delivery is not connected yet.</small>')+'<button type="button">Send another enquiry</button>';
 o.appendChild(msg);f.appendChild(o);
 var sb=f.querySelector('button[type=submit]'),r0=sb?sb.getBoundingClientRect():null,fr=f.getBoundingClientRect(),ox=r0?r0.left-fr.left+r0.width/2:W/2,oy=r0?r0.top-fr.top+r0.height/2:H/2;
 var N=9;
 for(var i=0;i<N;i++)(function(i){var k=i/(N-1),dia=90+Math.random()*100+k*Math.max(W,H)*.35,b=document.createElement('span');b.className='b';
  b.style.cssText='left:'+(i?Math.random()*W:ox)+'px;top:'+(i?Math.random()*H:oy)+'px;width:'+dia+'px;height:'+dia+'px';gl.appendChild(b);
  setTimeout(function(){b.classList.add('go')},RM?0:60+i*85)})(i);
 var big=document.createElement('span');big.className='b';var m=Math.hypot(W,H);big.style.cssText='left:'+ox+'px;top:'+oy+'px;width:'+(m*2.2)+'px;height:'+(m*2.2)+'px';gl.appendChild(big);
 setTimeout(function(){big.classList.add('go')},RM?0:700);
 setTimeout(function(){o.classList.add('done')},RM?50:1250);
 msg.querySelector('button').addEventListener('click',function(){o.classList.add('out');f.reset();setTimeout(function(){o.remove()},520)});
};
/* 2 programmes filter */
document.addEventListener('click',function(e){
 var b=e.target.closest&&e.target.closest('.chips button[data-f]');if(!b)return;
 var box=b.closest('section'),f=b.dataset.f,n=0;
 box.querySelectorAll('.chips button').forEach(function(x){x.setAttribute('aria-pressed',x===b)});
 box.querySelectorAll('.pcard').forEach(function(c){var ok=f==='all'||c.dataset.tags.split(' ').indexOf(f)>-1;c.hidden=!ok;if(ok)n++});
 var none=box.querySelector('.pnone');if(none)none.hidden=n>0;
});
/* 3a card hover ink */
if(!RM&&matchMedia('(hover:hover)').matches){
 document.querySelectorAll('.card .art').forEach(function(a){
  var cur=null;
  a.parentNode.addEventListener('pointerenter',function(e){
   var r=a.getBoundingClientRect(),d=Math.hypot(r.width,r.height)*1.3,i=document.createElement('i');i.className='inkh';
   i.style.cssText='width:'+d+'px;height:'+d+'px;left:'+(e.clientX-r.left-d/2)+'px;top:'+(e.clientY-r.top-d/2)+'px';
   a.appendChild(i);cur=i;i.animate([{transform:'scale(0)'},{transform:'scale(1)'}],{duration:900,easing:'cubic-bezier(.2,.7,.2,1)',fill:'forwards'})});
  a.parentNode.addEventListener('pointerleave',function(){var i=cur;cur=null;if(!i)return;var an=i.animate([{opacity:.5},{opacity:0}],{duration:600,fill:'forwards'});an.onfinish=function(){i.remove()}})})}
/* 3b click ink blot */
if(!RM)document.addEventListener('pointerdown',function(e){
 if(e.target.closest&&e.target.closest('a,button,input,select,textarea,label,summary,#menu,.fink'))return;
 var el=document.elementFromPoint(e.clientX,e.clientY),c='',n=el;
 while(n&&n!==document.documentElement){var bg=getComputedStyle(n).backgroundColor;if(bg&&bg!=='rgba(0, 0, 0, 0)'&&bg!=='transparent'){c=bg;break}n=n.parentNode}
 var m=(c.match(/[\d.]+/g)||[244,241,232]).map(Number),lum=.299*m[0]+.587*m[1]+.114*m[2],dark=lum<110;
 var b=document.createElement('i');b.className='ib';b.style.left=e.clientX+'px';b.style.top=e.clientY+'px';b.style.background=dark?'rgba(251,247,242,.5)':'rgba(2,8,6,.5)';
 document.body.appendChild(b);
 var an=b.animate([{transform:'scale(0) rotate(0deg)',opacity:.9},{transform:'scale(1) rotate(25deg)',opacity:.55,offset:.35},{transform:'scale(1.5) rotate(40deg)',opacity:0}],{duration:1100,easing:'cubic-bezier(.2,.7,.2,1)'});an.onfinish=function(){b.remove()}
},{passive:true});
})();
