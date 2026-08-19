const target=new Date('2026-10-17T17:00:00-06:00').getTime();
function tick(){const n=Math.max(0,Math.floor((target-Date.now())/1000));const v=[Math.floor(n/86400),Math.floor(n%86400/3600),Math.floor(n%3600/60),n%60];['d','h','m','s'].forEach((id,i)=>document.getElementById(id).textContent=String(v[i]).padStart(2,'0'))}tick();setInterval(tick,1000);


// La portada conserva el botón original integrado en la imagen.
// Solo la zona visual del botón responde al toque/clic; no se coloca
// ningún botón HTML encima de la invitación.
const cover = document.getElementById('coverImage');
const buttonArea = { left: 220, top: 908, right: 790, bottom: 1008 };

function openInvitationFromCover(event) {
  const rect = cover.getBoundingClientRect();
  const scaleX = cover.naturalWidth / rect.width;
  const scaleY = cover.naturalHeight / rect.height;
  const x = (event.clientX - rect.left) * scaleX;
  const y = (event.clientY - rect.top) * scaleY;

  if (x >= buttonArea.left && x <= buttonArea.right &&
      y >= buttonArea.top && y <= buttonArea.bottom) {
    startMusic();
    document.getElementById('contenido').scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

cover.addEventListener('click', openInvitationFromCover);

cover.addEventListener('keydown', (event) => {
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault();
    startMusic();
    document.getElementById('contenido').scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
});


// Música: en celulares los navegadores bloquean el autoplay con sonido
// hasta que exista una interacción del usuario. Por eso la iniciamos
// automáticamente en el primer toque de "Descubre mi invitación".
const musicButton = document.getElementById('musicButton');
const musicFrame = document.getElementById('musicFrame');
const youtubeEmbed = 'https://www.youtube.com/embed/igIfiqqVHtA?autoplay=1&loop=1&playlist=igIfiqqVHtA&rel=0&playsinline=1';

function startMusic() {
  if (musicFrame && !musicFrame.src) {
    musicFrame.src = youtubeEmbed;
    musicFrame.setAttribute('allow', 'autoplay; encrypted-media; picture-in-picture');
    if (musicButton) {
      musicButton.textContent = '❚❚ Pausar';
      musicButton.setAttribute('aria-pressed', 'true');
    }
  }
}

function stopMusic() {
  if (musicFrame) musicFrame.src = '';
  if (musicButton) {
    musicButton.textContent = '▶ Reproducir';
    musicButton.setAttribute('aria-pressed', 'false');
  }
}

if (musicButton && musicFrame) {
  musicButton.addEventListener('click', () => {
    const playing = musicButton.getAttribute('aria-pressed') === 'true';
    if (playing) stopMusic(); else startMusic();
  });
}
