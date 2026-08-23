// Andrea XV — cuenta regresiva + música instrumental original generada en el navegador.
// No usa YouTube, Spotify, MP3 ni carpetas externas de música.
const target = new Date('2026-10-17T17:00:00-06:00').getTime();
function tick(){
  const diff=Math.max(0,target-Date.now());
  const sec=Math.floor(diff/1000);
  document.getElementById('d').textContent=String(Math.floor(sec/86400)).padStart(2,'0');
  document.getElementById('h').textContent=String(Math.floor(sec%86400/3600)).padStart(2,'0');
  document.getElementById('m').textContent=String(Math.floor(sec%3600/60)).padStart(2,'0');
  document.getElementById('s').textContent=String(sec%60).padStart(2,'0');
}
tick(); setInterval(tick,1000);

let audioCtx=null, master=null, timer=null, running=false, barIndex=0;
const button=document.getElementById('musicButton'), status=document.getElementById('musicStatus');
const notes={C4:261.63,D4:293.66,E4:329.63,F4:349.23,G4:392,A4:440,B4:493.88,C5:523.25,D5:587.33,E5:659.25,F5:698.46,G5:783.99,A5:880};
const bars=[
 ['C4','G4','E4','G4'],
 ['A4','E4','C5','E4'],
 ['F4','C5','A4','C5'],
 ['G4','D5','B4','D5'],
 ['C4','G4','E4','G4'],
 ['F4','C5','A4','C5'],
 ['A4','E4','C5','E5'],
 ['G4','D5','B4','D5']
];
const melody=[
 ['E5','G5','A5','G5','E5','D5','C5','D5'],
 ['E5','A5','G5','E5','D5','C5','B4','C5'],
 ['C5','E5','G5','A5','G5','E5','D5','C5'],
 ['D5','G5','A5','G5','E5','D5','C5','B4']
];
function tone(freq,start,duration,type,gain){
  const o=audioCtx.createOscillator(), g=audioCtx.createGain();
  o.type=type; o.frequency.value=freq;
  g.gain.setValueAtTime(0,start);
  g.gain.linearRampToValueAtTime(gain,start+0.04);
  g.gain.exponentialRampToValueAtTime(0.0001,start+duration);
  o.connect(g); g.connect(master); o.start(start); o.stop(start+duration+0.04);
}
function scheduleBar(at,index){
  const chord=bars[index%bars.length];
  chord.forEach((n,i)=>tone(notes[n],at+i*0.75,1.15,'sine',0.026));
  const line=melody[index%melody.length];
  line.forEach((n,i)=>tone(notes[n],at+i*0.375,0.62,'triangle',0.022));
}
async function startMusic(){
  if(running)return;
  audioCtx=audioCtx||new (window.AudioContext||window.webkitAudioContext)();
  if(audioCtx.state==='suspended') await audioCtx.resume();
  master=audioCtx.createGain(); master.gain.value=.72; master.connect(audioCtx.destination);
  const play=()=>{scheduleBar(audioCtx.currentTime,barIndex++);};
  play(); timer=setInterval(play,3000); running=true;
  button.textContent='❚❚ Pausar música'; button.setAttribute('aria-pressed','true');
  status.textContent='♪ Música instrumental elegante activa · sin anuncios';
}
function stopMusic(){
  if(!running)return;
  clearInterval(timer); timer=null; running=false;
  if(master) master.gain.exponentialRampToValueAtTime(.0001,audioCtx.currentTime+.3);
  button.textContent='▶ Activar música'; button.setAttribute('aria-pressed','false'); status.textContent='Música pausada';
}
button.addEventListener('click',()=>running?stopMusic():startMusic());
const cover=document.getElementById('coverImage');
cover.addEventListener('click',()=>{document.getElementById('contenido').scrollIntoView({behavior:'smooth'}); startMusic();});
cover.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();document.getElementById('contenido').scrollIntoView({behavior:'smooth'});startMusic();}});
