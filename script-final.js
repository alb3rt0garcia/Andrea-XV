// Andrea XV — cuenta regresiva + música instrumental original sin archivos externos.
// La música es una composición original generada con Web Audio API.
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

let audioCtx=null, master=null, compressor=null, timer=null, running=false, barIndex=0;
const button=document.getElementById('musicButton');
const status=document.getElementById('musicStatus');
const cover=document.getElementById('coverImage');

const N={
 C3:130.81,G3:196,A3:220,B3:246.94,
 C4:261.63,D4:293.66,E4:329.63,F4:349.23,G4:392,A4:440,B4:493.88,
 C5:523.25,D5:587.33,E5:659.25,F5:698.46,G5:783.99,A5:880,B5:987.77,
 C6:1046.50,D6:1174.66,E6:1318.51,G6:1567.98
};

// Progresión romántica: Cmaj7 - G6 - Am7 - Fmaj7 - Dm7 - Gsus - Cmaj7 - Fmaj7.
const chords=[
 ['C4','E4','G4','B4'], ['G3','B3','D4','E4'],
 ['A3','C4','E4','G4'], ['F3','A3','C4','E4'],
 ['D4','F4','A4','C5'], ['G3','B3','D4','A4'],
 ['C4','E4','G4','B4'], ['F3','A3','C4','E4']
];
const melody=[
 ['E5','G5','B5','A5','G5','E5','D5','E5'],
 ['D5','G5','B5','A5','G5','E5','D5','B4'],
 ['C5','E5','A5','G5','E5','D5','C5','E5'],
 ['A4','C5','F5','E5','C5','A4','G4','A4'],
 ['A4','C5','D5','F5','E5','D5','C5','A4'],
 ['B4','D5','G5','F5','D5','B4','A4','G4'],
 ['E5','G5','C6','B5','G5','E5','D5','E5'],
 ['A4','C5','F5','G5','F5','E5','C5','A4']
];

function makeVoice(freq,start,duration,type,peak,detune=0){
  const osc=audioCtx.createOscillator();
  const gain=audioCtx.createGain();
  const filter=audioCtx.createBiquadFilter();
  osc.type=type; osc.frequency.value=freq; osc.detune.value=detune;
  filter.type='lowpass'; filter.frequency.value=2400; filter.Q.value=.45;
  gain.gain.setValueAtTime(0.0001,start);
  gain.gain.exponentialRampToValueAtTime(peak,start+0.035);
  gain.gain.exponentialRampToValueAtTime(Math.max(0.0001,peak*.42),start+duration*.55);
  gain.gain.exponentialRampToValueAtTime(0.0001,start+duration);
  osc.connect(filter); filter.connect(gain); gain.connect(master);
  osc.start(start); osc.stop(start+duration+0.05);
}

function scheduleBar(at,index){
  const beat=60/72, step=beat/2;
  const chord=chords[index%chords.length];
  // Soft string/pad bed.
  chord.forEach((n,i)=>{
    makeVoice(N[n],at,beat*4.0,'sine',0.018,i%2?5:-5);
  });
  // Gentle piano-like arpeggio.
  chord.forEach((n,i)=>{
    makeVoice(N[n],at+i*step,beat*0.85,'triangle',0.034);
    makeVoice(N[n],at+i*step+step*2,beat*0.75,'triangle',0.026,-3);
  });
  // Low, warm bass.
  const bass=chord[0].replace('4','3').replace('3','3');
  const bassFreq=N[bass] || N.C3;
  makeVoice(bassFreq,at,beat*1.7,'sine',0.025);
  makeVoice(bassFreq,at+beat*2,beat*1.7,'sine',0.019);
  // Singing upper melody.
  melody[index%melody.length].forEach((n,i)=>{
    makeVoice(N[n],at+i*step,beat*0.9,'sine',0.028, i%2?3:-3);
  });
}

async function startMusic(){
  if(running)return;
  audioCtx=audioCtx||new (window.AudioContext||window.webkitAudioContext)();
  if(audioCtx.state==='suspended') await audioCtx.resume();
  master=audioCtx.createGain();
  master.gain.setValueAtTime(0.0001,audioCtx.currentTime);
  master.gain.exponentialRampToValueAtTime(0.72,audioCtx.currentTime+0.35);
  compressor=audioCtx.createDynamicsCompressor();
  compressor.threshold.value=-20; compressor.knee.value=18; compressor.ratio.value=3; compressor.attack.value=.01; compressor.release.value=.2;
  master.connect(compressor); compressor.connect(audioCtx.destination);
  const schedule=()=>scheduleBar(audioCtx.currentTime+0.08,barIndex++);
  schedule();
  timer=setInterval(schedule,3333);
  running=true;
  button.textContent='❚❚ Pausar música';
  button.setAttribute('aria-pressed','true');
  status.textContent='♪ Vals instrumental elegante · sin anuncios';
}
function stopMusic(){
  if(!running)return;
  clearInterval(timer); timer=null; running=false;
  if(master && audioCtx){
    master.gain.cancelScheduledValues(audioCtx.currentTime);
    master.gain.setValueAtTime(Math.max(master.gain.value,0.0001),audioCtx.currentTime);
    master.gain.exponentialRampToValueAtTime(0.0001,audioCtx.currentTime+0.25);
  }
  button.textContent='▶ Activar música'; button.setAttribute('aria-pressed','false');
  status.textContent='Música pausada';
}
button.addEventListener('click',()=>running?stopMusic():startMusic());
cover.addEventListener('click',()=>{
  document.getElementById('contenido').scrollIntoView({behavior:'smooth'});
  startMusic();
});
cover.addEventListener('keydown',e=>{
  if(e.key==='Enter'||e.key===' '){
    e.preventDefault();
    document.getElementById('contenido').scrollIntoView({behavior:'smooth'});
    startMusic();
  }
});
