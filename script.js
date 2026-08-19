const target = new Date('2026-10-17T17:00:00-06:00').getTime();

function tick() {
  const n = Math.max(0, Math.floor((target - Date.now()) / 1000));
  const v = [
    Math.floor(n / 86400),
    Math.floor((n % 86400) / 3600),
    Math.floor((n % 3600) / 60),
    n % 60
  ];
  ['d','h','m','s'].forEach((id, i) => {
    const el = document.getElementById(id);
    if (el) el.textContent = String(v[i]).padStart(2, '0');
  });
}
tick();
setInterval(tick, 1000);

const cover = document.getElementById('coverImage');
const musicButton = document.getElementById('musicButton');
const musicFrame = document.getElementById('musicFrame');
const musicStatus = document.getElementById('musicStatus');

const youtubeEmbed =
  'https://www.youtube-nocookie.com/embed/igIfiqqVHtA' +
  '?autoplay=1&loop=1&playlist=igIfiqqVHtA&playsinline=1&rel=0&controls=1';

let musicStarted = false;

function startMusic() {
  // IMPORTANT: this function is called directly from the user's tap on the cover.
  if (!musicFrame) return;

  if (!musicStarted) {
    musicStarted = true;
    musicFrame.src = youtubeEmbed;
    musicFrame.setAttribute('allow', 'autoplay; encrypted-media; picture-in-picture');
    musicFrame.style.display = 'block';

    if (musicButton) {
      musicButton.textContent = '❚❚ Pausar música';
      musicButton.setAttribute('aria-pressed', 'true');
    }

    if (musicStatus) {
      musicStatus.textContent = 'La música se está iniciando…';
    }

    // If the browser blocks autoplay, the visible control remains available.
    window.setTimeout(() => {
      if (musicStatus) {
        musicStatus.textContent = 'Si tu celular bloquea el sonido automático, toca “Pausar música” y después “Activar música”.';
      }
    }, 2500);
  }
}

function stopMusic() {
  if (!musicFrame) return;
  musicFrame.src = '';
  musicStarted = false;
  musicFrame.style.display = 'none';

  if (musicButton) {
    musicButton.textContent = '▶ Activar música';
    musicButton.setAttribute('aria-pressed', 'false');
  }
  if (musicStatus) musicStatus.textContent = '';
}

// The original "DESCUBRE MI INVITACIÓN" is part of the image.
// To avoid coordinate/scaling problems on phones, any tap on the cover
// opens the invitation and attempts to start the music in the same gesture.
function enterInvitation() {
  startMusic();
  const content = document.getElementById('contenido');
  if (content) content.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

if (cover) {
  cover.addEventListener('click', enterInvitation);
  cover.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      enterInvitation();
    }
  });
}

if (musicButton) {
  musicButton.addEventListener('click', () => {
    if (musicStarted) stopMusic();
    else startMusic();
  });
}
