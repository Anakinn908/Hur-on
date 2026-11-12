/* Rhythm · Artistry · Flow — three overlapping ink circles (replaces the vertical 3-step list). Progressive enhancement: the original markup stays in the DOM, visually hidden. */
(function(){
var RM=matchMedia('(prefers-reduced-motion:reduce)').matches,ACC=['#7fd6a8','#e8c77e','#7fdadb'],CX=[205,355,280],CY=[205,205,335],R=170;
function split(t){var p=String(t||'').split(/\s*[—–]\s*/),w=(p[0]||'').trim();return[w.charAt(0).toUpperCase()+w.slice(1).toLowerCase(),(p[1]||'').trim()]}
function wave(y){var d='M -60 '+y,i;for(i=0;i<8;i++)d+=i?' t 80 0':' q 40 -24 80 0';return d}
function svg(){
 var g='<defs>',k;
 var G=[['#2fae7f','#0a3d2f'],['#e2bd6c','#7a5d1f'],['#4fc3c4','#0b4650']];
 for(k=0;k<3;k++)g+='<radialGradient id="tg'+k+'" cx="40%" cy="35%" r="75%"><stop offset="0" stop-color="'+G[k][0]+'" stop-opacity=".95"/><stop offset="1" stop-color="'+G[k][1]+'" stop-opacity=".9"/></radialGradient><clipPath id="tc'+k+'"><circle cx="'+CX[k]+'" cy="'+CY[k]+'" r="'+R+'"/></clipPath>';
 g+='</defs>';
 var deco=[
  [0,1,2,3].map(function(i){return'<circle class="tr-ring" cx="205" cy="205" r="170" style="animation-delay:'+(i*-1)+'s"/>'}).join('')+'<circle cx="205" cy="205" r="5" fill="#d9ffe9"/>',
  '<g class="tr-rot" style="transform-origin:355px 205px"><path d="M355 85A120 120 0 0 1 475 205" stroke="#fff3cf" stroke-width="5" fill="none" stroke-linecap="round" opacity=".8"/><path d="M355 325A120 120 0 0 1 235 205" stroke="#fff3cf" stroke-width="3" fill="none" stroke-linecap="round" opacity=".6"/></g><g class="tr-rot2" style="transform-origin:355px 205px"><path d="M355 125A80 80 0 0 1 435 205" stroke="#fff3cf" stroke-width="9" fill="none" stroke-linecap="round" opacity=".55"/><circle cx="355" cy="205" r="140" fill="none" stroke="#fff3cf" stroke-width="2" stroke-dasharray="6 16" opacity=".6"/></g>',
  [300,330,360,390].map(function(y,i){return'<path class="tr-wv" d="'+wave(y)+'" style="animation-delay:'+(i*-1.4)+'s"/>'}).join('')
 ];
 for(k=0;k<3;k++)g+='<g class="tr-c tc'+k+'" data-k="'+k+'" style="animation-delay:'+(k*-3)+'s"><circle cx="'+CX[k]+'" cy="'+CY[k]+'" r="'+R+'" fill="url(#tg'+k+')"/><g clip-path="url(#tc'+k+')">'+deco[k]+'</g><circle cx="'+CX[k]+'" cy="'+CY[k]+'" r="'+R+'" fill="none" stroke="rgba(255,255,255,.35)" stroke-width="1.3"/></g>';
 var lx=[148,412,280],ly=[168,168,418];
 for(k=0;k<3;k++)g+='<g class="tr-lb tl'+k+'"><text class="w" x="'+lx[k]+'" y="'+ly[k]+'" text-anchor="middle"></text><text class="v" x="'+lx[k]+'" y="'+(ly[k]+26)+'" text-anchor="middle"></text></g>';
 return'<svg viewBox="0 0 560 540" role="img" aria-label="Rhythm, Artistry and Flow as three overlapping circles">'+g+'</svg>'}
function build(read){
 var root=document.createElement('div');root.className='tri';root.dataset.a='0';
 root.innerHTML='<div class="tri-viz">'+svg()+'</div><div class="tri-panel"><div class="tri-tabs" role="tablist"></div><div class="tri-body" aria-live="polite"></div><div class="tri-bar"><i></i><i></i><i></i></div></div>';
 var tabs=root.querySelector('.tri-tabs'),body=root.querySelector('.tri-body'),bars=root.querySelectorAll('.tri-bar i'),K=0,auto=!RM,vis=false,items=read();
 function paint(redo){
  items=read();
  items.forEach(function(it,k){
   var w=root.querySelector('.tl'+k+' .w'),v=root.querySelector('.tl'+k+' .v');if(w)w.textContent=it.word;if(v)v.textContent=it.verb.toUpperCase();
   var b=tabs.children[k];if(!b){b=document.createElement('button');b.type='button';b.setAttribute('role','tab');b.addEventListener('click',function(){set(k,1)});tabs.appendChild(b)}
   b.innerHTML='<b>'+it.n+'</b> '+it.word;b.setAttribute('aria-selected',k===K?'true':'false');b.style.setProperty('--ac',ACC[k]);b.className=k===K?'on':''});
  var it=items[K];
  if(redo||!body.firstChild){body.innerHTML='<div class="tri-in"><b class="tn" style="-webkit-text-stroke-color:'+ACC[K]+'">'+it.n+'</b><h3><span style="color:'+ACC[K]+'">'+it.word+'</span> <span class="tv">— '+it.verb+'</span></h3><p></p></div>'}
  else{var h=body.querySelector('h3');h.firstChild.textContent=it.word;h.lastChild.textContent='— '+it.verb}
  body.querySelector('p').textContent=it.text;
  for(var j=0;j<3;j++){bars[j].className=j===K?'on'+(auto?' run':''):j<K?'done':'';}
 }
 function set(n,user){K=(n+3)%3;root.dataset.a=K;if(user)auto=false;paint(1);
  bars.forEach(function(b){b.style.animation='none';void b.offsetWidth;b.style.animation=''})}
 root.querySelectorAll('.tr-c').forEach(function(c){var k=+c.dataset.k;c.addEventListener('pointerenter',function(e){if(e.pointerType==='mouse')set(k,1)});c.addEventListener('click',function(){set(k,1)})});
 tabs.addEventListener('keydown',function(e){if(e.key==='ArrowRight'||e.key==='ArrowLeft'){set(K+(e.key==='ArrowRight'?1:-1),1);tabs.children[K].focus();e.preventDefault()}});
 setInterval(function(){if(auto&&vis)set(K+1)},6500);
 if('IntersectionObserver'in window)new IntersectionObserver(function(e){vis=e[0].isIntersecting},{threshold:.35}).observe(root);else vis=true;
 root.__paint=function(){paint(0)};paint(1);return root}
function watch(nodes,root){if(!window.MutationObserver)return;var t=0;var mo=new MutationObserver(function(){clearTimeout(t);t=setTimeout(function(){root.__paint()},60)});nodes.forEach(function(n){mo.observe(n,{subtree:true,childList:true,characterData:true})})}
/* home: <ol class="steps three"> */
var ol=document.querySelector('ol.steps.three');
if(ol){var rd=function(){return[].map.call(ol.querySelectorAll('li'),function(li){var s=split(li.querySelector('h3').textContent);return{n:li.querySelector('b').textContent,word:s[0],verb:s[1],text:li.querySelector('p').textContent}})};
 var r=build(rd);r.classList.add('tri-home');ol.after(r);ol.classList.add('sr');watch([ol],r)}
/* Our approach page: three stacked sections -> one stage */
var s1=document.getElementById('our-approach-s1'),s2=document.getElementById('our-approach-s2'),s3=document.getElementById('our-approach-s3');
if(s1&&s2&&s3){var S=[s1,s2,s3],rd2=function(){return S.map(function(s,i){var h=split(s.querySelector('h2').textContent);return{n:'0'+(i+1),word:h[0],verb:h[1],text:s.querySelector('p.t').textContent}})};
 var sec=document.createElement('section');sec.className='pb pad dk tri-sec';sec.id='our-approach-viz';var r2=build(rd2);sec.appendChild(r2);
 var note=s3.querySelector('.note');if(note){note.classList.remove('rv');sec.appendChild(note)}
 s1.before(sec);S.forEach(function(s){s.classList.add('sr')});watch(S,r2)}
})();
