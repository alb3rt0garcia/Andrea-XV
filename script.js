const t=new Date("2026-10-17T18:00:00-06:00").getTime();
function tick(){let x=Math.max(0,t-Date.now()),n=Math.floor(x/1000),v=[Math.floor(n/86400),Math.floor(n%86400/3600),Math.floor(n%3600/60),n%60];
["d","h","m","s"].forEach((id,i)=>document.getElementById(id).textContent=String(v[i]).padStart(2,"0"))}tick();setInterval(tick,1000);