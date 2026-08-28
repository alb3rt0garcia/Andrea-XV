const target=new Date("2026-10-17T18:00:00-06:00").getTime();
function tick(){let n=Math.max(0,target-Date.now());const d=Math.floor(n/86400000),h=Math.floor(n%86400000/3600000),m=Math.floor(n%3600000/60000),s=Math.floor(n%60000/1000);[["d",d],["h",h],["m",m],["s",s]].forEach(([id,v])=>{const e=document.getElementById(id);if(e)e.textContent=String(v).padStart(2,"0")})}
tick();setInterval(tick,1000);

const audio=document.getElementById("music");
const btn=document.getElementById("musicButton");
let ready=false;

function setIcon(){if(btn)btn.textContent=audio && !audio.paused?"❚❚":"▶"}

function prepareAudio(){
  if(!audio)return;
  if(!ready){
    audio.volume=.55;
    audio.load();
    ready=true;
  }
}

async function playMusic(){
  if(!audio)return;
  prepareAudio();
  try{
    await audio.play();
  }catch(e){
    // Segundo intento dentro del mismo gesto de usuario, útil en Safari iOS.
    try{
      audio.muted=true;
      await audio.play();
      audio.muted=false;
      audio.volume=.55;
    }catch(_){}
  }
  setIcon();
}

function toggleMusic(){
  prepareAudio();
  if(audio.paused)playMusic();else{audio.pause();setIcon()}
}

function openInvitation(e){
  if(e)e.preventDefault();
  playMusic();
  setTimeout(()=>document.getElementById("contenido")?.scrollIntoView({behavior:"smooth"}),80);
}

const discover=document.getElementById("discoverButton");
discover?.addEventListener("click",openInvitation);
discover?.addEventListener("touchend",openInvitation,{passive:false});
btn?.addEventListener("click",toggleMusic);
audio?.addEventListener("play",setIcon);
audio?.addEventListener("pause",setIcon);

// Primer toque real en cualquier parte de la invitación.
document.addEventListener("touchend",function once(){playMusic();document.removeEventListener("touchend",once)},{passive:true});
document.addEventListener("click",function onceClick(){playMusic();document.removeEventListener("click",onceClick)},{passive:true});
setIcon();