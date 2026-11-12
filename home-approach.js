
/* About's ink background dissolves patch by patch, revealing "Our approach" underneath */
(()=>{const ap=document.getElementById('approach'),ab=document.getElementById('about'),tex=document.getElementById('tx'),st=document.querySelector('#top .stage'),pg=document.getElementById('pg-home');if(!ap||!ab||!tex||!st)return;
const RM=matchMedia('(prefers-reduced-motion:reduce)').matches,mk=(t,c)=>{const e=document.createElement(t);if(c)e.className=c;return e};
const wr=mk('div'),stg=mk('div','apstage'),cv=mk('canvas'),apc=mk('div','apc'),g=cv.getContext('2d'),off=mk('canvas'),o=off.getContext('2d');wr.id='apx';
[...ap.children].slice(0,3).forEach(n=>{n.classList.remove('rv');n.style.removeProperty('--d');apc.appendChild(n)});
stg.append(mk('div','apbg'),apc,cv);wr.appendChild(stg);ap.before(wr);
let W=0,H=0,D=1,P=0,PT=0,dirty=1,ok=0;
const cl=(v,a=0,b=1)=>Math.min(b,Math.max(a,v)),sm=(v,a,b)=>{v=cl((v-a)/(b-a));return v*v*(3-2*v)};
const DR=Array.from({length:20},(_,i)=>({s:(i*7%20)/20*.5,x:(i*.618+.13)%1,y:(.06+((i*.7548+.2)%1)*.88),R:.18+((i*5)%7)/7*.12,k:i}));
/* ink layer = the About texture continuing (mirrored) from About's bottom edge, so the join is invisible */
function build(){const sw=st.clientWidth,sh=st.clientHeight,Ha=ab.offsetHeight;W=stg.clientWidth;H=stg.clientHeight;if(!tex.naturalWidth||!sw||!sh||!Ha||!W||!H){ok=0;return}
D=1;cv.width=off.width=Math.round(W*D);cv.height=off.height=Math.round(H*D);
const k=Math.max(sw/tex.naturalWidth,sh/tex.naturalHeight),w=tex.naturalWidth*k,h=tex.naturalHeight*k,yb=(h+sh)/2,x=(sw-w)/2+(W-sw)/2,gap=Ha-yb;
o.setTransform(D,0,0,D,0,0);o.clearRect(0,0,W,H);
if(gap>2){/* About is taller than the screen (phones): its bottom edge is flat dark, so start flat and let the texture fade in */
o.fillStyle='#0a1f2a';o.fillRect(0,0,W,H);let pos=0,fl=0;while(pos<H){o.save();o.beginPath();o.rect(0,pos,W,h);o.clip();if(fl){o.translate(0,pos+h);o.scale(1,-1);o.drawImage(tex,x,0,w,h)}else{o.drawImage(tex,x,pos,w,h)}o.restore();pos+=h;fl=!fl}
const fh=Math.min(H*.5,320),gr=o.createLinearGradient(0,0,0,fh);gr.addColorStop(0,'rgba(10,31,42,1)');gr.addColorStop(1,'rgba(10,31,42,0)');o.fillStyle=gr;o.fillRect(0,0,W,fh)}
else{const a=cl(h-(yb-Ha),0,h);if(a>0){o.save();o.beginPath();o.rect(0,0,W,a);o.clip();o.drawImage(tex,x,Ha-yb,w,h);o.restore()}
let pos=a,fl=1;while(pos<H){o.save();o.beginPath();o.rect(0,pos,W,h);o.clip();if(fl){o.translate(0,pos+h);o.scale(1,-1);o.drawImage(tex,x,0,w,h)}else{o.drawImage(tex,x,pos,w,h)}o.restore();pos+=h;fl=!fl}}
o.fillStyle='rgba(5,18,16,.5)';o.fillRect(0,0,W,H);ok=1;dirty=1}
function blob(cx,cy,R,k){g.beginPath();for(let j=0;j<=180;j++){const a=j/180*6.2832,r=R*(1+.1*Math.sin(3*a+k)+.06*Math.sin(5*a+2*k)+.02*Math.sin(9*a+k*3)),x=cx+Math.cos(a)*r,y=cy+Math.sin(a)*r;j?g.lineTo(x,y):g.moveTo(x,y)}g.closePath();g.fill()}
function draw(){g.setTransform(1,0,0,1,0,0);g.globalCompositeOperation='source-over';g.clearRect(0,0,cv.width,cv.height);const p=Math.pow(cl(P/.97),1.5);cv.style.visibility=p>=1?'hidden':'visible';if(!ok||p>=1)return;g.drawImage(off,0,0);if(p<=.001)return;g.setTransform(D,0,0,D,0,0);g.globalCompositeOperation='destination-out';g.fillStyle='#000';g.shadowColor='#000';g.shadowBlur=0;const M=Math.max(W,H);
DR.forEach(d=>{const l=cl((p-d.s)/.5);if(l<=0)return;const e=1-Math.pow(1-l,3),R=d.R*M*e*1.6;blob(d.x*W,d.y*H,R,d.k);for(let q=0;q<6;q++){const a=q*1.1+d.k,dd=R*(1.15+((q*5+d.k)%4)*.12),rr=(2+(q%3)*2.5)*Math.min(1,l*4);g.beginPath();g.arc(d.x*W+Math.cos(a)*dd,d.y*H+Math.sin(a)*dd,rr,0,6.3);g.fill()}});
const f=sm(p,.85,1);if(f>0){g.shadowBlur=0;g.globalAlpha=f;g.fillRect(0,0,W,H);g.globalAlpha=1}
g.globalCompositeOperation='source-over';g.shadowBlur=0}
let lastP=-1,lastF=-1,tcOn=-1;
function upd(){if(pg.hidden)return;const vh=innerHeight,r=wr.getBoundingClientRect(),ar=ab.getBoundingClientRect();
if(ar.bottom>-40&&ar.top<vh*2){const fo=RM?1:1-sm(cl((vh-ar.bottom)/(vh*.7)),0,1);if(fo!==lastF){lastF=fo;[...ab.children].forEach(n=>{if(!n.classList.contains('abg'))n.style.opacity=fo<1?fo:''})}}
if(r.top>vh*1.2||r.bottom<-vh*.2){PT=r.top>0?0:1;if(P!==PT){P=PT;dirty=1}return}
const tot=(wr.offsetHeight-vh)*.92;PT=RM?1:cl(-r.top/tot);if(RM)P=PT}
function txt(){const on=P>.5?1:0;if(on!==tcOn){tcOn=on;apc.style.transition='opacity .6s,transform .6s cubic-bezier(.2,.7,.2,1)';apc.style.opacity=on;apc.style.transform='translateY(calc(-50% + '+((1-on)*24)+'px))'}}
/* Approach video: plays once when the ink starts to dissolve, holds the last frame; skipped on phones, reduced motion and data saver (the poster shows instead) */
const vOK=!RM&&matchMedia('(min-width:801px)').matches&&!(navigator.connection&&navigator.connection.saveData);let vd=null,vst=0;
function vid(){if(!vOK||pg.hidden)return;const vh=innerHeight,r=wr.getBoundingClientRect();
if(!vd&&r.top<vh*1.6&&r.bottom>-vh*.3){vd=mk('video');vd.muted=true;vd.defaultMuted=true;vd.playsInline=true;vd.setAttribute('playsinline','');vd.setAttribute('aria-hidden','true');vd.tabIndex=-1;vd.preload='auto';vd.src=vd.canPlayType('video/mp4; codecs="avc1.42E01E"')?"assets/approach.mp4":"assets/approach.webm";stg.querySelector('.apbg').appendChild(vd)}
if(!vd)return;
if(PT>.06){if(!vst){vst=1;const pr=vd.play();if(pr&&pr.catch)pr.catch(()=>{vst=0})}}else if(PT<.02&&vst){vd.pause();try{vd.currentTime=0}catch(e){}vst=0}}
function all(){build();upd();P=PT;txt();vid()}
(function loop(){requestAnimationFrame(loop);if(pg.hidden)return;if(P!==PT){const d=PT-P;P=Math.abs(d)<.0008?PT:P+d*.05;dirty=1;txt()}if(dirty){draw();dirty=0}})();
addEventListener('scroll',rafOnce(()=>{upd();vid()}),{passive:true});addEventListener('resize',()=>setTimeout(all,40));addEventListener('hashchange',()=>setTimeout(all,160));tex.addEventListener('load',all);if(window.ResizeObserver)new ResizeObserver(all).observe(ab);all();
})();
