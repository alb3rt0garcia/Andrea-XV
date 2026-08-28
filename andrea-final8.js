const target=new Date("2026-10-17T17:00:00-06:00").getTime();
function tick(){let n=Math.max(0,target-Date.now());const d=Math.floor(n/86400000),h=Math.floor(n%86400000/3600000),m=Math.floor(n%3600000/60000),s=Math.floor(n%60000/1000);[["d",d],["h",h],["m",m],["s",s]].forEach(([id,v])=>{const e=document.getElementById(id);if(e)e.textContent=String(v).padStart(2,"0")})}
tick();setInterval(tick,1000);
const audio=document.getElementById("music");let started=false;
async function startMusic(){if(!audio||started)return;audio.volume=.48;try{await audio.play();started=true}catch(e){}}
function openInvitation(e){if(e)e.preventDefault();startMusic();setTimeout(()=>document.getElementById("contenido")?.scrollIntoView({behavior:"smooth"}),80)}
const discover=document.getElementById("discoverButton");
discover?.addEventListener("click",openInvitation);
discover?.addEventListener("touchend",openInvitation,{passive:false});
function firstGesture(){startMusic();document.removeEventListener("pointerdown",firstGesture);document.removeEventListener("touchend",firstGesture)}
document.addEventListener("pointerdown",firstGesture,{passive:true});document.addEventListener("touchend",firstGesture,{passive:true});