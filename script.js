const target=new Date("2026-10-17T18:00:00-06:00").getTime();
function tick(){
  let n=Math.max(0,target-Date.now());
  const d=Math.floor(n/86400000); n-=d*86400000;
  const h=Math.floor(n/3600000); n-=h*3600000;
  const m=Math.floor(n/60000); n-=m*60000;
  const s=Math.floor(n/1000);
  [["d",d],["h",h],["m",m],["s",s]].forEach(([id,v])=>{
    const el=document.getElementById(id);
    if(el) el.textContent=String(v).padStart(2,"0");
  });
}
tick(); setInterval(tick,1000);

const audio=document.getElementById("music");
let started=false;
function startMusic(){
  if(!audio) return;
  if(audio.paused){
    audio.volume=.48;
    audio.play().then(()=>{started=true;}).catch(()=>{});
  }
}
function discover(){
  startMusic();
  document.getElementById("contenido").scrollIntoView({behavior:"smooth"});
}
document.getElementById("discoverButton")?.addEventListener("click",discover);
document.getElementById("musicButton")?.addEventListener("click",startMusic);

// Primer toque/clic en cualquier parte de la invitación.
function firstGesture(){
  startMusic();
  document.removeEventListener("pointerdown",firstGesture);
}
document.addEventListener("pointerdown",firstGesture,{passive:true});
