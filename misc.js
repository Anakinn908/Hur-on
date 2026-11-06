
(function(){
var RM=matchMedia('(prefers-reduced-motion:reduce)').matches;
/* 5 back to top */
var tt=document.getElementById('totop');
if(tt){addEventListener('scroll',function(){tt.classList.toggle('on',scrollY>innerHeight*1.2)},{passive:true});
tt.addEventListener('click',function(){var r=tt.getBoundingClientRect();window.__ink?__ink(r.left+r.width/2,r.top+r.height/2,'__top'):scrollTo(0,0)})}
/* 1 form ink */
window.formInk=function(f,delivered){
 /* success popup (replaces the old ink-wipe panel) */
 var L=(document.documentElement.lang||'en').slice(0,2),
  T={en:['Submitted successfully','Thank you for contacting HUR-ON. Your enquiry has been received. Our team will review your message and respond using the contact details provided.','Close'],
     zh:['提交成功','感谢您联系 HUR-ON。我们已收到您的信息，团队会审阅后通过您提供的联系方式回复您。','关闭'],
     ms:['Berjaya dihantar','Terima kasih kerana menghubungi HUR-ON. Pertanyaan anda telah diterima. Pasukan kami akan menyemak mesej anda dan membalas menggunakan butiran hubungan yang diberikan.','Tutup']}[L]||null;
 if(!T)T=['Submitted successfully','Thank you for contacting HUR-ON. Your enquiry has been received. Our team will review your message and respond using the contact details provided.','Close'];
 var prev=document.getElementById('subpop');if(prev)prev.remove();
 if(!document.getElementById('subpop-css')){var st=document.createElement('style');st.id='subpop-css';
  st.textContent='#subpop{position:fixed;inset:0;z-index:99999;display:grid;place-items:center;padding:20px;background:rgba(6,38,29,.55);-webkit-backdrop-filter:blur(6px);backdrop-filter:blur(6px);opacity:0;transition:opacity .35s ease}'+
  '#subpop.on{opacity:1}#subpop .sp{width:100%;max-width:440px;background:#FBF8F0;border-radius:24px;padding:42px 32px 32px;text-align:center;box-shadow:0 30px 80px -20px rgba(0,0,0,.55),0 0 0 1px rgba(199,160,104,.45);transform:translateY(18px) scale(.96);transition:transform .45s cubic-bezier(.2,.8,.2,1)}'+
  '#subpop.on .sp{transform:none}#subpop .ck{width:76px;height:76px;margin:0 auto 20px;border-radius:50%;background:#0B3D2E;display:grid;place-items:center;box-shadow:0 0 0 6px rgba(199,160,104,.28)}'+
  '#subpop .ck svg{width:38px;height:38px}#subpop .ck path{fill:none;stroke:#FBF8F0;stroke-width:3.4;stroke-linecap:round;stroke-linejoin:round;stroke-dasharray:30;stroke-dashoffset:30}'+
  '#subpop.on .ck path{animation:spck .6s .25s ease forwards}@keyframes spck{to{stroke-dashoffset:0}}'+
  '#subpop h3{margin:0 0 12px;font:600 30px/1.2 "Playfair Display","Times New Roman",serif;color:#0B3D2E}'+
  '#subpop p{margin:0 0 26px;font:400 15px/1.7 "Poppins",system-ui,sans-serif;color:#2c3f37}#subpop small{display:block;margin:-12px 0 22px;color:#8a6a25;font:12px "Poppins",sans-serif}'+
  '#subpop button{border:0;cursor:pointer;padding:13px 38px;border-radius:999px;background:#0B3D2E;color:#fff;font:600 14px "Poppins",system-ui,sans-serif;letter-spacing:.04em}'+
  '#subpop button:hover{background:#145a43}#subpop button:focus-visible{outline:3px solid #C7A068;outline-offset:3px}'+
  '@media(prefers-reduced-motion:reduce){#subpop,#subpop .sp{transition:none}#subpop .ck path{animation:none;stroke-dashoffset:0}}';
  document.head.appendChild(st)}
 var o=document.createElement('div');o.id='subpop';o.setAttribute('role','dialog');o.setAttribute('aria-modal','true');o.setAttribute('aria-labelledby','subpop-t');
 o.innerHTML='<div class="sp"><div class="ck" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg></div><h3 id="subpop-t"></h3><p></p>'+(delivered?'':'<small>Preview only: enquiry delivery is not connected yet.</small>')+'<button type="button"></button></div>';
 o.querySelector('h3').textContent=T[0];o.querySelector('p').textContent=T[1];
 var btn=o.querySelector('button');btn.textContent=T[2];
 var sb=f&&f.querySelector('button[type=submit]'),ov=document.documentElement.style.overflow;
 document.documentElement.style.overflow='hidden';document.body.appendChild(o);
 function close(){o.classList.remove('on');document.documentElement.style.overflow=ov;removeEventListener('keydown',key,true);setTimeout(function(){o.remove()},RM?0:360);if(sb)try{sb.focus({preventScroll:true})}catch(e){}}
 function key(e){if(e.key==='Escape'){close()}else if(e.key==='Tab'){e.preventDefault();btn.focus()}}
 addEventListener('keydown',key,true);
 btn.addEventListener('click',close);o.addEventListener('click',function(e){if(e.target===o)close()});
 requestAnimationFrame(function(){o.classList.add('on');btn.focus({preventScroll:true})});
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
 
