const target=new Date("2026-10-17T18:00:00-06:00").getTime();
function tick(){
  let n=Math.max(0,target-Date.now());
  const d=Math.floor(n/86400000),h=Math.floor(n%86400000/3600000),m=Math.floor(n%3600000/60000),s=Math.floor(n%60000/1000);
  [["d",d],["h",h],["m",m],["s",s]].forEach(([id,v])=>{const e=document.getElementById(id);if(e)e.textContent=String(v).padStart(2,"0")});
}
tick();setInterval(tick,1000);

const audio=document.getElementById("music");
const musicButton=document.getElementById("musicButton");
function syncMusicButton(){ if(musicButton) musicButton.textContent=audio && !audio.paused ? "❚❚" : "▶"; }
function startMusic(){
  if(!audio)return;
  audio.volume=.48;
  audio.play().then(syncMusicButton).catch(()=>syncMusicButton());
}
function toggleMusic(){
  if(!audio)return;
  if(audio.paused) startMusic(); else {audio.pause();syncMusicButton();}
}
document.getElementById("discoverButton")?.addEventListener("click",()=>{
  startMusic();
  document.getElementById("contenido")?.scrollIntoView({behavior:"smooth"});
});
musicButton?.addEventListener("click",toggleMusic);
audio?.addEventListener("play",syncMusicButton);
audio?.addEventListener("pause",syncMusicButton);

// Mobile browsers require a user gesture; the first tap anywhere is enough.
function firstGesture(){
  startMusic();
  document.removeEventListener("pointerdown",firstGesture);
}
document.addEventListener("pointerdown",firstGesture,{passive:true});
syncMusicButton();