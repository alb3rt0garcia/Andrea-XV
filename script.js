const target = new Date('2026-10-17T17:00:00-06:00').getTime();
function tick(){
  const n=Math.max(0,Math.floor((target-Date.now())/1000));
  const v=[Math.floor(n/86400),Math.floor((n%86400)/3600),Math.floor((n%3600)/60),n%60];
  ['d','h','m','s'].forEach((id,i)=>{const el=document.getElementById(id);if(el)el.textContent=String(v[i]).padStart(2,'0')});
}
tick();setInterval(tick,1000);

const cover=document.getElementById('coverImage');
function enterInvitation(){
  const content=document.getElementById('contenido');
  if(content)content.scrollIntoView({behavior:'smooth',block:'start'});
}
if(cover){
  cover.addEventListener('click',enterInvitation,{passive:true});
  cover.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();enterInvitation()}});
}
