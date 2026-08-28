const target=new Date("2026-10-17T18:00:00-06:00").getTime();
function tick(){let n=Math.max(0,target-Date.now());const d=Math.floor(n/86400000);const h=Math.floor(n%86400000/3600000);const m=Math.floor(n%3600000/60000);const s=Math.floor(n%60000/1000);[["d",d],["h",h],["m",m],["s",s]].forEach(([id,v])=>{const e=document.getElementById(id);if(e)e.textContent=String(v).padStart(2,"0")})}tick();setInterval(tick,1000);
const audio=document.getElementById("music");function startMusic(){if(!audio)return;audio.volume=.5;audio.play().catch(()=>{})}
document.getElementById("discoverButton")?.addEventListener("click",()=>{startMusic();document.getElementById("contenido").scrollIntoView({behavior:"smooth"})});
document.getElementById("musicButton")?.addEventListener("click",startMusic);
function firstGesture(){startMusic();document.removeEventListener("pointerdown",firstGesture)}document.addEventListener("pointerdown",firstGesture,{passive:true});