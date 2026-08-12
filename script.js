const eventDate = new Date("2026-10-17T18:00:00-06:00");

function tick(){
  let x = Math.max(0, eventDate - Date.now());
  const s=1000, m=s*60, h=m*60, d=h*24;
  document.querySelector("#d").textContent=String(Math.floor(x/d)).padStart(2,"0");
  document.querySelector("#h").textContent=String(Math.floor((x%d)/h)).padStart(2,"0");
  document.querySelector("#m").textContent=String(Math.floor((x%h)/m)).padStart(2,"0");
  document.querySelector("#s").textContent=String(Math.floor((x%m)/s)).padStart(2,"0");
}
tick();
setInterval(tick,1000);

const msg=encodeURIComponent("Hola, Andrea. Confirmo mi asistencia a tus XV años del 17 de octubre de 2026.");
document.querySelector("#wa1").href=`https://wa.me/525531296988?text=${msg}`;
document.querySelector("#wa2").href=`https://wa.me/525551270188?text=${msg}`;

document.querySelector("#cal").addEventListener("click",()=>{
  const lines=[
    "BEGIN:VCALENDAR","VERSION:2.0","PRODID:-//Andrea XV//ES",
    "BEGIN:VEVENT","DTSTART:20261017T170000","DTEND:20261017T230000",
    "SUMMARY:XV años de Andrea",
    "LOCATION:WTC Mexiquense, Naucalpan de Juárez, Estado de México",
    "DESCRIPTION:Ceremonia religiosa a las 17:00 hrs y recepción a las 18:00 hrs.",
    "END:VEVENT","END:VCALENDAR"
  ];
  const blob=new Blob([lines.join("\\r\\n")],{type:"text/calendar;charset=utf-8"});
  const url=URL.createObjectURL(blob);
  const a=document.createElement("a"); a.href=url; a.download="Andrea-XV-17-octubre-2026.ics";
  document.body.appendChild(a); a.click(); a.remove(); URL.revokeObjectURL(url);
});


// Sprint 4: animaciones al entrar en pantalla
const revealItems = document.querySelectorAll(".reveal");
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
revealItems.forEach(item => observer.observe(item));

// Sprint 4: música con activación manual
const music = document.querySelector("#music");
const musicBtn = document.querySelector("#musicBtn");
const musicStatus = document.querySelector("#musicStatus");

musicBtn?.addEventListener("click", async () => {
  if (!music) return;
  try {
    if (music.paused) {
      await music.play();
      musicBtn.textContent = "❚❚ Pausar música";
      musicStatus.textContent = "Música activada.";
    } else {
      music.pause();
      musicBtn.textContent = "♪ Activar música";
      musicStatus.textContent = "Música pausada.";
    }
  } catch {
    musicStatus.textContent = "Primero agrega el archivo musica.mp3 a la raíz del proyecto.";
  }
});

// Sprint 4: ampliar la invitación en el álbum
const lightbox = document.querySelector("#lightbox");
const lightboxImg = document.querySelector("#lightboxImg");
const lightboxClose = document.querySelector("#lightboxClose");

document.querySelectorAll(".album-card img").forEach(img => {
  img.addEventListener("click", () => {
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    lightbox.classList.add("open");
    lightbox.setAttribute("aria-hidden", "false");
  });
});
lightboxClose?.addEventListener("click", () => {
  lightbox.classList.remove("open");
  lightbox.setAttribute("aria-hidden", "true");
});
lightbox?.addEventListener("click", e => {
  if (e.target === lightbox) lightboxClose.click();
});
