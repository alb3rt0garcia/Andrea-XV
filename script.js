const musicUrl="https://music.youtube.com/watch?v=igIfiqqVHtA&si=yCOIPAK8pCkQwj9H";
function openMusic(){window.open(musicUrl,"_blank","noopener");}
document.getElementById("discover").onclick=()=>{document.getElementById("contenido").scrollIntoView({behavior:"smooth"});openMusic();};
document.getElementById("musicBtn").onclick=openMusic;
document.querySelectorAll("nav button").forEach(b=>b.onclick=()=>document.getElementById(b.dataset.go).scrollIntoView({behavior:"smooth"}));
