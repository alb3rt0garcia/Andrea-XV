// Cuenta regresiva + música instrumental generada en el navegador.
const target = new Date('2026-10-17T17:00:00-06:00').getTime();
function tick(){const diff=Math.max(0,target-Date.now());const sec=Math.floor(diff/1000);document.getElementById('d').textContent=String(Math.floor(sec/86400)).padStart(2,'0');document.getElementById('h').textContent=String(Math.floor(sec%86400/3600)).padStart(2,'0');document.getElementById('m').textContent=String(Math.floor(sec%3600/60)).padStart(2,'0');document.getElementById('s').textContent=String(sec%60).padStart(2,'0')}tick();setInterval(tick,1000);

let audioCtx=null, master=null, timer=null, running=false;
const button=document.getElementById('musicButton'), status=document.getElementById('musicStatus');
const notes={C4:261.63,D4:293.66,E4:329.63,F4:349.23,G4:392,A4:440,B4:493.88,C5:523.25,D5:587.33,E5:659.25,G5:783.99,A5:880};
const progression=[['C4','E4','G4','C5'],['A4','C5','E5','A5'],['F4','A4','C5','E5'],['G4','B4','D5','G5']];
function tone(freq,start,duration,type='sine',gain=.045){const o=audioCtx.createOscillator(),g=audioCtx.createGain();o.type=type;o.frequency.value=freq;g.gain.setValueAtTime(0,start);g.gain.linearRampToValueAtTime(gain,start+.05);g.gain.exponentialRampToValueAtTime(.0001,start+duration);o.connect(g);g.connect(master);o.start(start);o.stop(start+duration+.03)}
function scheduleBar(at,bar){bar.forEach((n,i)=>tone(notes[n],at+i*.42,.9,'sine',.035)); const melody=['E5','G5','A5','G5','E5','D5','C5','E5']; melody.forEach((n,i)=>tone(notes[n],at+i*.21,.5,'triangle',.025));}
function startMusic(){if(running)return; audioCtx=audioCtx||new (window.AudioContext||window.webkitAudioContext)(); if(audioCtx.state==='suspended')audioCtx.resume(); master=audioCtx.createGain();master.gain.value=.55;master.connect(audioCtx.destination); let bar=0; const play=()=>{scheduleBar(audioCtx.currentTime,progression[bar%progression.length]);bar++}; play(); timer=setInterval(play,3350);running=true;button.textContent='❚❚ Pausar música';button.setAttribute('aria-pressed','true');status.textContent='♪ Música instrumental activa · sin anuncios';}
function stopMusic(){if(!running)return;clearInterval(timer);timer=null;running=false;if(master)master.gain.exponentialRampToValueAtTime(.0001,audioCtx.currentTime+.3);button.textContent='▶ Activar música';button.setAttribute('aria-pressed','false');status.textContent='Música pausada';}
button.addEventListener('click',()=>running?stopMusic():startMusic());
document.getElementById('coverImage').addEventListener('click',()=>{document.getElementById('contenido').scrollIntoView({behavior:'smooth'});startMusic()});
document.getElementById('coverImage').addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();document.getElementById('contenido').scrollIntoView({behavior:'smooth'});startMusic()}});
