(function(){
var N=document.getElementById('pnet');if(!N)return;
var RM=matchMedia('(prefers-reduced-motion:reduce)').matches,NS='http://www.w3.org/2000/svg';
var DV={harmonia:['PULSE','Corporate Training & Consultancy','pulse.html','#1b8aa6'],unveil:['SPARK','Children & Youth Development','spark.html','#f47a1f'],rise:['BLOOM','Lifelong Learning & Development','bloom.html','#5f9b2e'],orbit:['VERVE','Events, Camps & Experiences','verve.html','#7b3fc9']};
var nodes=[].slice.call(N.querySelectorAll('.pn')),svg=N.querySelector('svg'),cap=document.getElementById('pcap'),hintEl=cap.innerHTML;
var cl=function(v){return Math.min(1,Math.max(0,v))},ease=function(t){return 1-Math.pow(1-t,3)};
var ang=[-120,-60,0,60,120,180].map(function(a){return a*Math.PI/180}),lines=[],dots=[],act=-1,pin=-1,t0=null,run=false,T=0;
nodes.forEach(function(n,i){var l=document.createElementNS(NS,'line');l.setAttribute('class','ln');svg.appendChild(l);lines.push(l);var d=document.createElementNS(NS,'circle');d.setAttribute('r',4.5);d.setAttribute('class','pd');svg.appendChild(d);dots.push(d);
 n.style.setProperty('--c',DV[n.dataset.d.split(',')[0]][3]);l.style.setProperty('--c',DV[n.dataset.d.split(',')[0]][3]);
 n.addEventListener('pointerenter',function(e){if(e.pointerType==='mouse')set(i)});
 n.addEventListener('pointerleave',function(e){if(e.pointerType==='mouse'&&pin<0)set(-1)});
 n.addEventListener('focus',function(){set(i)});n.addEventListener('blur',function(){if(pin<0)set(-1)});
 n.addEventListener('click',function(){pin=(pin===i)?-1:i;set(pin<0?-1:i)})});
function set(i){act=i;N.classList.toggle('has',i>=0);
 var pb=N.querySelectorAll('.pbg i');nodes.forEach(function(n,k){n.classList.toggle('on',k===i);pb[k].classList.toggle('on',k===i);lines[k].classList.toggle('on',k===i)});
 if(i<0){cap.innerHTML=hintEl}else{var ds=nodes[i].dataset.d.split(',');
  cap.innerHTML='<div class="pwl">Where we meet them</div>'+ds.map(function(k){var v=DV[k];return'<a href="'+v[2]+'" style="--c:'+v[3]+'">'+v[0]+'<span>'+v[1]+'</span></a>'}).join('')}
 if(RM)draw(99)}
function draw(T){
 var W=N.clientWidth,H=N.clientHeight,cx=W/2,cy=H/2,rx=W*.35,ry=H*.36;
 nodes.forEach(function(n,i){
  var e=ease(cl((T-.12*i)/1.3)),fl=RM?0:1,x=cx+Math.cos(ang[i])*rx*e+Math.sin(T*.6+i*1.7)*7*fl,y=cy+Math.sin(ang[i])*ry*e+Math.cos(T*.5+i*2.3)*6*fl;
  n.style.transform='translate('+(x-n.offsetWidth/2).toFixed(1)+'px,'+(y-n.offsetHeight/2).toFixed(1)+'px) scale('+(i===act?1.1:1)+')';
  n.style.opacity=e;
  var l=lines[i];l.setAttribute('x1',cx);l.setAttribute('y1',cy);l.setAttribute('x2',x);l.setAttribute('y2',y);l.style.opacity=e;
  var d=dots[i],k=act>=0?(i===act?(T*.9)%1:-1):((Math.floor(T/1.1)%6===i)?(T%1.1)/1.1:-1);
  if(RM||k<0||e<1){d.style.opacity=0}else{d.setAttribute('cx',cx+(x-cx)*ease(k));d.setAttribute('cy',cy+(y-cy)*ease(k));d.style.opacity=Math.sin(k*Math.PI);d.style.fill=i===act?nodes[i].style.getPropertyValue('--c'):'#1b8aa6'}})}
function loop(now){if(!run)return;if(t0===null)t0=now;T=(now-t0)/1000;draw(T);requestAnimationFrame(loop)}
new IntersectionObserver(function(e){var v=e[0].isIntersecting;if(RM){if(v)draw(99);return}
 if(v&&!run){run=true;if(t0===null)t0=null;requestAnimationFrame(loop)}else if(!v)run=false},{threshold:.2}).observe(N);
})();
