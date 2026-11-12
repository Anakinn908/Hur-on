(function(){
 var hero=document.getElementById('top');if(!hero)return;
 var art=hero.querySelector('.art');if(!art)return;
 var sm=function(x,a,b){var t=Math.min(1,Math.max(0,(x-a)/(b-a)));return t*t*(3-2*t)};
 function f(){
  var r=hero.getBoundingClientRect(),tot=(hero.offsetHeight-innerHeight)*.55,p=tot>0?Math.min(1,Math.max(0,-r.top/tot)):0;
  art.style.opacity=(1-sm(p,.1,.42)).toFixed(3);art.style.pointerEvents=p>.4?'none':'';
 }
 addEventListener('scroll',f,{passive:true});addEventListener('resize',f);f();
})();
