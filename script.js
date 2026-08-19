const target=new Date('2026-10-17T18:00:00-06:00').getTime();
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
    document.getElementById('contenido').scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

cover.addEventListener('click', openInvitationFromCover);

cover.addEventListener('keydown', (event) => {
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault();
    document.getElementById('contenido').scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
});


// Música: se reproduce al tocar el botón para respetar las restricciones
// de reproducción automática de los navegadores móviles.
const musicButton = document.getElementById('musicButton');
const musicFrame = document.getElementById('musicFrame');
const youtubeEmbed = 'https://www.youtube.com/embed/igIfiqqVHtA?autoplay=1&loop=1&playlist=igIfiqqVHtA&rel=0';

if (musicButton && musicFrame) {
  musicButton.addEventListener('click', () => {
    const playing = musicButton.getAttribute('aria-pressed') === 'true';
    if (!playing) {
      musicFrame.src = youtubeEmbed;
      musicButton.textContent = '❚❚ Pausar';
      musicButton.setAttribute('aria-pressed', 'true');
    } else {
      musicFrame.src = '';
      musicButton.textContent = '▶ Reproducir';
      musicButton.setAttribute('aria-pressed', 'false');
    }
  });
}
