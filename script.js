const target = new Date('2026-10-17T17:00:00-06:00').getTime();
function tick(){
  const n=Math.max(0,Math.floor((target-Date.now())/1000));
  const v=[Math.floor(n/86400),Math.floor((n%86400)/3600),Math.floor((n%3600)/60),n%60];
  ['d','h','m','s'].forEach((id,i)=>{const el=document.getElementById(id);if(el)el.textContent=String(v[i]).padStart(2,'0')});
}
tick();setInterval(tick,1000);

const cover=document.getElementById('coverImage');
const musicButton=document.getElementById('musicButton');
const musicStatus=document.getElementById('musicStatus');
const youtubeWrap=document.getElementById('youtubePlayerWrap');
let musicStarted=false;
const youtubeVideoId='igIfiqqVHtA';

function startMusic(){
  if(!youtubeWrap)return false;
  if(!youtubeWrap.querySelector('iframe')){
    const iframe=document.createElement('iframe');
    iframe.src=`https://www.youtube-nocookie.com/embed/${youtubeVideoId}?autoplay=1&playsinline=1&rel=0`;
    iframe.title='Enchanted · Taylor Swift';
    iframe.allow='autoplay; encrypted-media; picture-in-picture';
    iframe.allowFullscreen=true;
    youtubeWrap.appendChild(iframe);
  }
  youtubeWrap.style.display='block';
  musicStarted=true;
  if(musicButton){musicButton.textContent='♪ Enchanted activa';musicButton.setAttribute('aria-pressed','true')}
  if(musicStatus)musicStatus.textContent='Enchanted · reproducción oficial de YouTube.';
  return true;
}
function stopMusic(){
  if(youtubeWrap){youtubeWrap.innerHTML='';youtubeWrap.style.display='none';}
  musicStarted=false;
  if(musicButton){musicButton.textContent='▶ Escuchar Enchanted';musicButton.setAttribute('aria-pressed','false')}
  if(musicStatus)musicStatus.textContent='Toca el botón para iniciar la canción.';
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
