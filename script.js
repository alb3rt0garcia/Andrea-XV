const musicUrl="https://music.youtube.com/watch?v=igIfiqqVHtA&si=yCOIPAK8pCkQwj9H";

function discover(){
  document.getElementById("contenido").scrollIntoView({behavior:"smooth"});
  window.open(musicUrl,"_blank","noopener");
}
document.getElementById("discoverArea").addEventListener("click",discover);
document.getElementById("musicButton").addEventListener("click",()=>window.open(musicUrl,"_blank","noopener"));

const target=new Date("2026-10-17T17:00:00-06:00").getTime();
function tick(){
  let n=Math.max(0,target-Date.now());
  const d=Math.floor(n/86400000); n-=d*86400000;
  const h=Math.floor(n/3600000); n-=h*3600000;
  const m=Math.floor(n/60000); n-=m*60000;
  const s=Math.floor(n/1000);
  document.getElementById("d").textContent=String(d).padStart(2,"0");
  document.getElementById("h").textContent=String(h).padStart(2,"0");
  document.getElementById("m").textContent=String(m).padStart(2,"0");
  document.getElementById("s").textContent=String(s).padStart(2,"0");
}
tick();setInterval(tick,1000);
