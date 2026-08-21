const target = new Date('2026-10-17T17:00:00-06:00').getTime();
function tick(){
  const n=Math.max(0,Math.floor((target-Date.now())/1000));
  const v=[Math.floor(n/86400),Math.floor((n%86400)/3600),Math.floor((n%3600)/60),n%60];
  ['d','h','m','s'].forEach((id,i)=>{const el=document.getElementById(id);if(el)el.textContent=String(v[i]).padStart(2,'0')});
}
tick();setInterval(tick,1000);

const cover=document.getElementById('coverImage');
const musicButton=document.getElementById('musicButton');
const musicAudio=document.getElementById('musicAudio');
const musicStatus=document.getElementById('musicStatus');
let musicStarted=false;

async function startMusic(){
  if(!musicAudio)return false;
  try{
    musicAudio.muted=false;
    await musicAudio.play();
    musicStarted=true;
    if(musicButton){musicButton.textContent='❚❚ Pausar música';musicButton.setAttribute('aria-pressed','true')}
    if(musicStatus)musicStatus.textContent='Música activa · audio local · sin anuncios.';
    return true;
  }catch(err){
    musicStarted=false;
    if(musicStatus)musicStatus.textContent='El navegador bloqueó el inicio automático. Toca “Activar música”.';
    return false;
  }
}
function stopMusic(){
  if(!musicAudio)return;
  musicAudio.pause();musicAudio.currentTime=0;musicStarted=false;
  if(musicButton){musicButton.textContent='▶ Activar música';musicButton.setAttribute('aria-pressed','false')}
  if(musicStatus)musicStatus.textContent='';
}
function enterInvitation(){
  startMusic();
  const content=document.getElementById('contenido');
  if(content)content.scrollIntoView({behavior:'smooth',block:'start'});
}
if(cover){
  cover.addEventListener('click',enterInvitation,{passive:true});
  cover.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();enterInvitation()}});
}
if(musicButton)musicButton.addEventListener('click',()=>musicStarted?stopMusic():startMusic());
