// Andrea XV v5 — vals instrumental original, generado en el navegador.
// Sin Spotify, YouTube, anuncios, MP3 ni carpetas de música.
const target = new Date('2026-10-17T17:00:00-06:00').getTime();
function tick(){
  const diff=Math.max(0,target-Date.now()), sec=Math.floor(diff/1000);
  document.getElementById('d').textContent=String(Math.floor(sec/86400)).padStart(2,'0');
  document.getElementById('h').textContent=String(sec%86400/3600|0).padStart(2,'0');
  document.getElementById('m').textContent=String(sec%3600/60|0).padStart(2,'0');
  document.getElementById('s').textContent=String(sec%60).padStart(2,'0');
}
tick(); setInterval(tick,1000);

let ctx=null, master=null, timer=null, running=false, nextBar=0;
const button=document.getElementById('musicButton'), status=document.getElementById('musicStatus');
const N={C3:130.81,G3:196,E3:164.81,A3:220,F3:174.61,D3:146.83,B2:123.47,C4:261.63,D4:293.66,E4:329.63,F4:349.23,G4:392,A4:440,B4:493.88,C5:523.25,D5:587.33,E5:659.25,F5:698.46,G5:783.99,A5:880,B5:987.77};
const bars=[
  {b:['C3','G3','E3'],m:['E4','G4','A4','G4','E4','D4']},
  {b:['A3','E3','C4'],m:['E4','A4','B4','A4','G4','E4']},
  {b:['F3','C4','A3'],m:['A4','C5','D5','C5','A4','G4']},
  {b:['G3','D3','B2'],m:['B4','D5','E5','D5','B4','A4']},
  {b:['C3','G3','E3'],m:['G4','A4','C5','B4','A4','G4']},
  {b:['A3','E3','C4'],m:['E4','G4','A4','B4','C5','B4']},
  {b:['F3','C4','A3'],m:['A4','C5','E5','D5','C5','A4']},
  {b:['G3','D3','B2'],m:['B4','D5','G5','E5','D5','B4']}
];
function env(node,g,start,dur,peak){
  g.gain.setValueAtTime(0,start); g.gain.linearRampToValueAtTime(peak,start+0.05);
  g.gain.setTargetAtTime(0.0001,start+dur-0.18,0.12); node.start(start); node.stop(start+dur+0.2);
}
function playTone(freq,start,dur,type,peak,filterFreq){
  const o=ctx.createOscillator(), g=ctx.createGain(), f=ctx.createBiquadFilter();
  o.type=type; o.frequency.value=freq; f.type='lowpass'; f.frequency.value=filterFreq;
  o.connect(f); f.connect(g); g.connect(master); env(o,g,start,dur,peak);
}
function scheduleBar(at,i){
  const bar=bars[i%bars.length], beat=0.8;
  // Vals: bajo en el primer tiempo y acorde ligero en los dos siguientes.
  playTone(N[bar.b[0]],at,1.9,'sine',0.035,900);
  playTone(N[bar.b[1]],at+beat,0.72,'sine',0.018,1200);
  playTone(N[bar.b[2]],at+2*beat,0.72,'sine',0.018,1200);
  bar.m.forEach((name,k)=>playTone(N[name],at+k*(beat/2),0.65,'triangle',0.020,2200));
}
async function startMusic(){
  if(running)return;
  const AC=window.AudioContext||window.webkitAudioContext;
  if(!AC){status.textContent='Tu navegador no permite esta música.';return;}
  ctx=ctx||new AC();
  if(ctx.state==='suspended') await ctx.resume();
  master=ctx.createGain(); master.gain.value=.55; master.connect(ctx.destination);
  const loop=()=>scheduleBar(ctx.currentTime,nextBar++);
  loop(); timer=setInterval(loop,4800); running=true;
  button.textContent='❚❚ Pausar música'; button.setAttribute('aria-pressed','true'); status.textContent='♪ Vals instrumental elegante activo · sin anuncios';
}
function stopMusic(){
  if(!running)return; clearInterval(timer); timer=null; running=false;
  if(master&&ctx) master.gain.setTargetAtTime(0.0001,ctx.currentTime,0.08);
  button.textContent='▶ Activar música'; button.setAttribute('aria-pressed','false'); status.textContent='Música pausada';
}
button.addEventListener('click',()=>running?stopMusic():startMusic());
const cover=document.getElementById('coverImage');
async function enterInvitation(){ document.getElementById('contenido').scrollIntoView({behavior:'smooth'}); try{await startMusic();}catch(e){status.textContent='Toca Activar música para iniciar.';} }
cover.addEventListener('click',enterInvitation);
cover.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();enterInvitation();}});
