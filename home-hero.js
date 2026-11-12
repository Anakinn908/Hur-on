
/* Interactive hero: profile double-exposure + living river. Replace face by drawing your own image in drawFace() if desired. */
(()=>{const cv=document.getElementById('rv');if(!cv)return;const hero=cv.closest('.hero'),g=cv.getContext('2d'),RM=matchMedia('(prefers-reduced-motion:reduce)').matches;
let W=0,H=0,D=1,vis=true,px=-1e3,py=-1e3,tx=px,ty=py,last=-1e5,rip=[],lr=0;
const FP=new Path2D('M.62,.02C.86,.03.98,.22.95,.45C.93,.62.88,.72.82,.8L.86,1L.5,1C.5,.9.5,.84.47,.79C.42,.78.38,.76.36,.72C.33,.71.34,.67.35,.66C.33,.65.33,.63.35,.62C.34,.59.36,.57.35,.55C.31,.54.27,.52.27,.5C.29,.47.33,.45.34,.42C.35,.4.34,.38.35,.35C.33,.28.34,.2.4,.1C.46,.04.54,.02.62,.02Z');
const COL=['#FBF7F2','#C7A068','#9fe0b0','#7fd6c6'],R=Math.random;
const S=Array.from({length:60},(_,i)=>({k:i/29.5-1,c:COL[i%4],sp:40+R()*80,d:[20+R()*40,30+R()*80],ph:R()*6.3,mi:0}));
const HR=Array.from({length:16},(_,i)=>({o:i/15,ph:R()*6.3}));
const ridge=['rgba(190,226,196,.95)','rgba(90,170,138,.95)','rgba(22,96,76,.97)','rgba(6,44,35,1)'];
function size(){D=Math.min(devicePixelRatio||1,2);W=cv.clientWidth;H=cv.clientHeight;cv.width=W*D;cv.height=H*D;g.setTransform(D,0,0,D,0,0);if(RM)draw(0)}
const G=()=>{const m=W<700,s=m?W*.8:Math.min(H*.62,W*.46);return{m,s,ox:m?W*.1:W-s*1.12,oy:H*.05}};
const P=()=>{const{s,ox,oy}=G(),x=ox+s*.66,y=oy+s*.9;return[[x,y],[x-W*.1,y+H*.2],[W*.42,H*.5],[-W*.08,H*.86]]};
function B(u,p){const v=1-u,a=v*v*v,b=3*v*v*u,c=3*v*u*u,d=u*u*u,e=3*v*v,f=6*v*u,h=3*u*u;
const x=a*p[0][0]+b*p[1][0]+c*p[2][0]+d*p[3][0],y=a*p[0][1]+b*p[1][1]+c*p[2][1]+d*p[3][1];
const dx=e*(p[1][0]-p[0][0])+f*(p[2][0]-p[1][0])+h*(p[3][0]-p[2][0]),dy=e*(p[1][1]-p[0][1])+f*(p[2][1]-p[1][1])+h*(p[3][1]-p[2][1]),l=Math.hypot(dx,dy)||1;return[x,y,-dy/l,dx/l]}
function draw(T){g.clearRect(0,0,W,H);const{m,s,ox,oy}=G();
const mx=px>-900?px/W-.5:0,my=px>-900?py/H-.5:0,br=1+Math.sin(T*.8)*.006;
/* face */
g.save();g.translate(ox+s*.55,oy+s*.5);g.rotate(mx*.06+Math.sin(T*.5)*.004);g.scale(s*br,s*br);g.translate(-.55-mx*.015,-.5-my*.01);
g.save();g.clip(FP);const sk=g.createLinearGradient(0,0,0,1);sk.addColorStop(0,'#f6e7bd');sk.addColorStop(.5,'#bfe3c8');sk.addColorStop(1,'#2a7a62');g.fillStyle=sk;g.fillRect(0,0,1.2,1.2);
const sn=g.createRadialGradient(.55-mx*.03,.3,0,.55-mx*.03,.3,.3);sn.addColorStop(0,'rgba(255,250,225,.95)');sn.addColorStop(1,'rgba(255,250,225,0)');g.fillStyle=sn;g.fillRect(0,0,1.2,1.2);
ridge.forEach((c,i)=>{g.beginPath();g.moveTo(0,1.2);for(let x=0;x<=1.2;x+=.02){const y=.5+i*.13-.11*(Math.sin(x*5+i*2+T*.05+mx*(i+1)*.5)+.5*Math.sin(x*11+i*3));g.lineTo(x,y)}g.lineTo(1.2,1.2);g.fillStyle=c;g.fill()});
/* stream inside the face */
g.lineWidth=.006;g.lineCap='round';g.strokeStyle='rgba(255,246,214,.6)';g.setLineDash([.03,.03]);g.lineDashOffset=-T*.08;g.beginPath();g.moveTo(.8,.55);g.bezierCurveTo(.62,.62,.7,.72,.5,.8);g.bezierCurveTo(.44,.84,.5,.9,.5,1);g.stroke();g.setLineDash([]);
g.restore();g.lineWidth=.003;g.strokeStyle='rgba(251,247,242,.35)';g.stroke(FP);
/* hair */
g.globalCompositeOperation='lighter';g.lineWidth=.0022;HR.forEach((h,i)=>{g.strokeStyle=i%3?'rgba(251,247,242,.2)':'rgba(199,160,104,.4)';g.beginPath();for(let u=0;u<=1;u+=.05){const x=.78+u*.62,y=.08+h.o*.4+u*.15*(1+h.o)+Math.sin(u*6-T*1.3+h.ph)*.02*u+my*.03*u;u?g.lineTo(x,y):g.moveTo(x,y)}g.stroke()});g.restore();
/* river */
const p=P(),sg=W*.09;g.globalCompositeOperation='lighter';g.lineCap='round';
g.save();g.globalAlpha=.1;g.strokeStyle='#9fe0b0';g.lineWidth=H*.16;g.setLineDash([]);g.beginPath();for(let j=0;j<=40;j++){const[x,y]=B(j/40,p);j?g.lineTo(x,y):g.moveTo(x,y)}g.stroke();g.restore();
S.forEach(q=>{g.beginPath();let mi=0;for(let j=0;j<=48;j++){const u=j/48,[x,y,nx,ny]=B(u,p),w=H*(.05+.13*u),inf=Math.exp(-((x-px)**2+(y-py)**2)/(2*sg*sg));mi=Math.max(mi,inf);
const o=q.k*w+Math.sin(u*12-T*1.2+q.ph)*H*.008+inf*Math.sin(u*40-T*6)*H*.02*(1+q.k);j?g.lineTo(x+nx*o,y+ny*o):g.moveTo(x+nx*o,y+ny*o)}
q.mi+=(mi-q.mi)*.1;g.setLineDash(q.d);g.lineDashOffset=-T*q.sp*(1+3*q.mi);g.lineWidth=1.4+q.mi*1.8;g.strokeStyle=q.c;g.globalAlpha=Math.min(.32+q.mi*.55,.9);g.stroke()});
g.globalAlpha=1;g.setLineDash([]);
rip=rip.filter(r=>r.a>0);rip.forEach(r=>{r.r+=1.1;r.a-=.011;g.strokeStyle='rgba(251,247,242,'+r.a+')';g.lineWidth=1;g.beginPath();g.ellipse(r.x,r.y,r.r,r.r*.35,-.3,0,6.3);g.stroke()});g.globalCompositeOperation='source-over'}
function onRiver(x,y){const p=P();for(let u=0;u<=1;u+=.05){const[a,b]=B(u,p);if(Math.hypot(a-x,b-y)<H*(.08+.14*u))return 1}return 0}
function loop(ts){requestAnimationFrame(loop);if(!vis||!W)return;const T=ts/1000;
if(ts-last>3000){const[x,y]=B(.5+.42*Math.sin(T*.35),P());tx=x;ty=y}
px+=(tx-px)*.08;py+=(ty-py)*.08;if(ts-lr>130&&onRiver(px,py)&&Math.hypot(tx-px,ty-py)>3){rip.push({x:px,y:py,r:4,a:.6});lr=ts}draw(T)}
hero.addEventListener('pointermove',e=>{const r=cv.getBoundingClientRect();tx=e.clientX-r.left;ty=e.clientY-r.top;last=performance.now()});
new ResizeObserver(size).observe(cv);new IntersectionObserver(e=>vis=e[0].isIntersecting).observe(hero);size();if(!RM)requestAnimationFrame(loop)})();

;

(()=>{const hero=document.getElementById('top'),pg=document.getElementById('pg-home');if(!hero)return;
const st=hero.querySelector('.stage'),cv=document.getElementById('ink'),g=cv.getContext('2d'),rc=document.getElementById('rp'),rg=rc.getContext('2d'),hc=hero.querySelector('.hc'),sc=hero.querySelector('.sc'),tex=document.getElementById('tx'),de=document.documentElement,RM=matchMedia('(prefers-reduced-motion:reduce)').matches;
let W=0,H=0,D=1,p=0,dirty=1,rip=[],lr=0,hadR=0,idn=0;
const cl=(v,a=0,b=1)=>Math.min(b,Math.max(a,v)),sm=(v,a,b)=>{v=cl((v-a)/(b-a));return v*v*(3-2*v)};
const DR=Array.from({length:18},(_,i)=>({s:(i*7%18)/18*.5,x:(i*.618+.13)%1,y:(i*.7548+.2)%1,R:.2+((i*5)%7)/7*.12,k:i}));
function size(){D=Math.min(devicePixelRatio||1,1.5);W=st.clientWidth;H=st.clientHeight;[cv,rc].forEach(c=>{c.width=W*D;c.height=H*D});idn=0;dirty=1}
function blob(cx,cy,R,k){g.beginPath();for(let j=0;j<=180;j++){const a=j/180*6.2832,r=R*(1+.1*Math.sin(3*a+k)+.06*Math.sin(5*a+2*k)+.02*Math.sin(9*a+k*3)),x=cx+Math.cos(a)*r,y=cy+Math.sin(a)*r;j?g.lineTo(x,y):g.moveTo(x,y)}g.closePath();g.fill()}
function ink(){if(p>=.995){if(idn)return;idn=1}else idn=0;g.setTransform(D,0,0,D,0,0);g.clearRect(0,0,W,H);if(p<=.001)return;g.fillStyle='#000';g.shadowColor='rgba(0,0,0,.9)';g.shadowBlur=0;const M=Math.max(W,H);
DR.forEach(d=>{const l=cl((p-d.s)/.32);if(l<=0)return;const X=d.x*W,Y=(.06+d.y*.88)*H,ft=.2;
if(l<ft){const t=l/ft,y=-40+(Y+40)*t*t,r=11+(d.k%3)*3;g.beginPath();g.arc(X,y,r,0,6.3);g.moveTo(X-r*.8,y-r*.4);g.lineTo(X,y-r*3.4);g.lineTo(X+r*.8,y-r*.4);g.fill()}
else{const t=(l-ft)/(1-ft),e=1-Math.pow(1-t,3),R=d.R*M*e;blob(X,Y,R+6,d.k);for(let q=0;q<7;q++){const a=q*.9+d.k,dd=R*(1.12+((q*5+d.k)%4)*.1),rr=(2+(q%3)*2.5)*Math.min(1,t*4);g.beginPath();g.arc(X+Math.cos(a)*dd,Y+Math.sin(a)*dd,rr,0,6.3);g.fill()}}});
const fl=sm(p,.62,.84);if(fl>0){const by=H*fl*1.1;g.beginPath();g.moveTo(0,0);g.lineTo(W,0);for(let x=W;x>=0;x-=20)g.lineTo(x,by+Math.sin(x/70)*16*(1-fl));g.closePath();g.fill()}
g.shadowBlur=0;
if(tex.naturalWidth){g.globalCompositeOperation='source-in';const k=Math.max(W/tex.naturalWidth,H/tex.naturalHeight)*1,w=tex.naturalWidth*k,h=tex.naturalHeight*k;g.drawImage(tex,(W-w)/2,(H-h)/2,w,h);g.globalCompositeOperation='source-atop';g.fillStyle='rgba(5,18,16,.5)';g.fillRect(0,0,W,H);g.globalCompositeOperation='source-over'}}
function upd(){if(pg.hidden){de.classList.remove('ivory');return}
const r=hero.getBoundingClientRect(),tot=(hero.offsetHeight-innerHeight)*.55;p=tot>0?cl(-r.top/tot):0;dirty=1;
hc.style.setProperty('--hco',1-sm(p,.1,.42));hc.style.pointerEvents=p>.4?'none':'';

sc.style.opacity=1-sm(p,.02,.1);de.classList.toggle('ivory',p<.35);st.classList.toggle('show',p>.6);const cov=p>.9;if(cov!==window.__cov){window.__cov=cov;st.classList.toggle('cov',cov)}}
function loop(){requestAnimationFrame(loop);if(pg.hidden||!W)return;if(dirty){ink();dirty=0}
if(rip.length||hadR){rg.setTransform(D,0,0,D,0,0);rg.clearRect(0,0,W,H);rip=rip.filter(r=>r.a>0);rip.forEach(r=>{r.r+=1.3;r.a-=.012;rg.strokeStyle='rgba(23,38,31,'+(r.a*.6)+')';rg.lineWidth=1.2;rg.beginPath();rg.ellipse(r.x,r.y,r.r,r.r*.35,-.25,0,6.3);rg.stroke()});hadR=rip.length}}
let pmq=0,pmx=0,pmy=0;st.addEventListener('pointermove',e=>{const b=st.getBoundingClientRect();pmx=e.clientX-b.left;pmy=e.clientY-b.top;if(pmq)return;pmq=requestAnimationFrame(()=>{pmq=0;if(window.__cov)return;st.style.setProperty('--px',(pmx/W-.5).toFixed(3));st.style.setProperty('--py',(pmy/H-.5).toFixed(3))})},{passive:true});
addEventListener('scroll',rafOnce(upd),{passive:true});addEventListener('resize',()=>{size();upd()});addEventListener('hashchange',()=>setTimeout(()=>{size();upd()},80));
tex.addEventListener('load',()=>dirty=1);const ab2=document.getElementById('about'),abx=hero.querySelector('.ab');if(ab2&&abx){[...ab2.children].slice(0,4).forEach((n,i)=>{n.classList.remove('rv');n.style.removeProperty('--d');if(n.classList.contains('vm')){[...n.children].forEach((c,j)=>{c.classList.remove('rv');c.classList.add('pop');c.style.setProperty('--pd',(1+j*.3)+'s')})}else{n.classList.add('pop');n.style.setProperty('--pd',(i*.35)+'s')}abx.appendChild(n)})}if(ab2){const bg=document.createElement('div');bg.className='abg';bg.style.backgroundImage='linear-gradient(rgba(5,18,16,.5),rgba(5,18,16,.5)),url('+tex.src+')';ab2.prepend(bg);const fit=()=>{const Ha=ab2.offsetHeight;if(!tex.naturalWidth||!W||!Ha)return;const k=Math.max(W/tex.naturalWidth,H/tex.naturalHeight),w=tex.naturalWidth*k,h=tex.naturalHeight*k;bg.style.backgroundRepeat='no-repeat';bg.style.backgroundSize='100% 100%,'+w+'px '+h+'px';bg.style.backgroundPosition='0 0,'+((W-w)/2)+'px '+(Ha-(h+H)/2)+'px'};tex.addEventListener('load',fit);addEventListener('resize',()=>setTimeout(fit,30));addEventListener('hashchange',()=>setTimeout(fit,150));if(window.ResizeObserver)new ResizeObserver(fit).observe(ab2)}size();upd();if(typeof fit==='function')fit();requestAnimationFrame(loop)})();

;
(function(){var i=document.getElementById('rvimg'),e=document.querySelector('#top .ext');if(i&&e)e.style.setProperty('--bgimg','url('+i.src+')')})()
;

(function(){
const img=document.getElementById('rvimg'),bimg=document.getElementById('rvbase'),rimg=document.getElementById('rvriver');
if(!img||!bimg||!rimg||matchMedia('(prefers-reduced-motion:reduce)').matches)return;
function go(){
const cv=document.createElement('canvas');cv.width=bimg.naturalWidth;cv.height=bimg.naturalHeight;cv.className='l1';cv.setAttribute('aria-hidden','true');
const gl=cv.getContext('webgl',{antialias:false,alpha:false});if(!gl)return;
const vs='attribute vec2 p;varying vec2 uv;void main(){uv=p*.5+.5;gl_Position=vec4(p,0.,1.);}';
const fs='#ifdef GL_FRAGMENT_PRECISION_HIGH\nprecision highp float;\n#else\nprecision mediump float;\n#endif\n'+
'varying vec2 uv;uniform sampler2D bs,rv;uniform float t,ma;uniform vec2 mp;'+
'void main(){'+
/* swells + finer ripples: ONLY the river layer is displaced; the base artwork stays still */
'vec2 w=vec2(sin(uv.y*13.+t*.9+sin(uv.x*6.+t*.5)*1.6),cos(uv.x*11.-t*.8+sin(uv.y*7.-t*.4)*1.6))*.0075;'+
'w+=vec2(sin(uv.x*46.-t*2.4+uv.y*19.),cos(uv.y*40.+t*2.1-uv.x*17.))*.0032;'+
'vec2 dm=uv-mp;dm.x*=1.79;float r=length(dm);w+=normalize(dm+1e-4)*sin(r*60.-t*6.)*exp(-r*5.)*ma*.012;'+
'vec4 q=texture2D(rv,clamp(uv-w,.001,.999));vec3 c=q.rgb;'+
'float l=dot(c,vec3(.3,.59,.11));float stroke=1.-smoothstep(.5,.93,l);'+
'float sw=sin(dot(uv,vec2(1.,-.6))*8.-t*1.05)*.5+.5;float sw2=sin(dot(uv,vec2(.7,.9))*13.+t*.7)*.5+.5;'+
'float sh=smoothstep(.62,1.,sw)*.6+smoothstep(.7,1.,sw2)*.35;'+
'c=mix(c,vec3(1.),sh*stroke*.4);'+
'c*=1.-.05*(sin(uv.x*20.-t*1.5+uv.y*10.)*.5+.5);'+
'gl_FragColor=vec4(mix(texture2D(bs,uv).rgb,c,q.a),1.);}';
function sh(ty,src){const o=gl.createShader(ty);gl.shaderSource(o,src);gl.compileShader(o);return o}
const pr=gl.createProgram();gl.attachShader(pr,sh(gl.VERTEX_SHADER,vs));gl.attachShader(pr,sh(gl.FRAGMENT_SHADER,fs));gl.linkProgram(pr);
if(!gl.getProgramParameter(pr,gl.LINK_STATUS))return;gl.useProgram(pr);
const bf=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,bf);gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,1,1]),gl.STATIC_DRAW);
const ap=gl.getAttribLocation(pr,'p');gl.enableVertexAttribArray(ap);gl.vertexAttribPointer(ap,2,gl.FLOAT,false,0,0);
function tex(unit,src){const o=gl.createTexture();gl.activeTexture(gl.TEXTURE0+unit);gl.bindTexture(gl.TEXTURE_2D,o);
[[gl.TEXTURE_MIN_FILTER,gl.LINEAR],[gl.TEXTURE_MAG_FILTER,gl.LINEAR],[gl.TEXTURE_WRAP_S,gl.CLAMP_TO_EDGE],[gl.TEXTURE_WRAP_T,gl.CLAMP_TO_EDGE]].forEach(a=>gl.texParameteri(gl.TEXTURE_2D,a[0],a[1]));
gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL,true);gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL,false);gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,gl.RGBA,gl.UNSIGNED_BYTE,src)}
tex(0,bimg);tex(1,rimg);
gl.uniform1i(gl.getUniformLocation(pr,'bs'),0);gl.uniform1i(gl.getUniformLocation(pr,'rv'),1);
const ut=gl.getUniformLocation(pr,'t'),um=gl.getUniformLocation(pr,'mp'),ua=gl.getUniformLocation(pr,'ma');
let mx=.5,my=.5,ma=0;
addEventListener('pointermove',e=>{const r=cv.getBoundingClientRect();if(!r.width)return;mx=(e.clientX-r.left)/r.width;my=1-(e.clientY-r.top)/r.height;ma=1},{passive:true});
img.parentNode.insertBefore(cv,img.nextSibling);
let vis=true,first=true;new IntersectionObserver(e=>vis=e[0].isIntersecting).observe(cv);
function fr(){requestAnimationFrame(fr);if(document.hidden||!vis||window.__cov)return;ma*=.97;
gl.viewport(0,0,cv.width,cv.height);gl.uniform1f(ut,performance.now()/1000);gl.uniform2f(um,mx,my);gl.uniform1f(ua,ma);gl.drawArrays(gl.TRIANGLE_STRIP,0,4);
if(first){first=false;img.style.visibility='hidden'}}
fr()}
const all=[img,bimg,rimg];function ready(){if(all.every(i=>i.complete&&i.naturalWidth))go()}
all.forEach(i=>i.addEventListener('load',ready));ready()})();
