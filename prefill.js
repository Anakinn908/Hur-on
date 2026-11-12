/* Pre-fill the proposal form from the "Find your pathway" choice (stored in sessionStorage). */
(function(){
var form=document.getElementById('prop');if(!form)return;
var raw;try{raw=sessionStorage.getItem('huron-brief')}catch(e){}
if(!raw)return;var b;try{b=JSON.parse(raw)}catch(e){return}
var sel=document.getElementById('p-int'),aud=document.getElementById('p-size'),msg=document.getElementById('p-msg');
if(sel&&b.interest){for(var i=0;i<sel.options.length;i++)if(sel.options[i].text===b.interest||sel.options[i].value===b.interest){sel.selectedIndex=i;break}}
if(aud&&!aud.value&&b.audience)aud.value=b.audience;
if(msg&&!msg.value){msg.value='Pathway: '+b.name+(b.role?' ('+b.role+')':'')+'\nFocus: '+(b.goals||[]).join(', ')+'\n\nAdditional details: '}
if(!document.getElementById('pf-st')){var st=document.createElement('style');st.id='pf-st';st.textContent='#pg-proposal .pr{flex-wrap:wrap!important;align-items:flex-start!important}#pg-proposal .pr>.fm{flex:1 1 100%!important;min-width:0}#pg-proposal .pr>.pf-note{flex:0 0 100%;box-sizing:border-box;margin:0 0 clamp(22px,2.6vw,34px)!important;padding:12px 18px;border-radius:14px;border-left:3px solid #C7A068;background:rgba(199,160,104,.14);color:#0B3D2E;font:500 15px/1.45 Poppins,sans-serif}';document.head.appendChild(st)}if(msg)msg.style.setProperty('min-height','190px','important');var note=document.createElement('p');note.className='pf-note';note.textContent='Pre-filled from your pathway choice. Edit anything you like.';form.parentNode.insertBefore(note,form);
try{sessionStorage.removeItem('huron-brief')}catch(e){}
})();
