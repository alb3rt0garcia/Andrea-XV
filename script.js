const eventDate = new Date("2026-10-17T18:00:00-06:00").getTime();

function actualizarCuentaRegresiva() {
const ahora = new Date().getTime();
const diferencia = eventDate - ahora;

if (diferencia <= 0) {
document.getElementById("dias").textContent = "0";
document.getElementById("horas").textContent = "0";
document.getElementById("minutos").textContent = "0";
document.getElementById("segundos").textContent = "0";
return;
}

const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
const horas = Math.floor(
(diferencia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
);
const minutos = Math.floor(
(diferencia % (1000 * 60 * 60)) / (1000 * 60)
);
const segundos = Math.floor(
(diferencia % (1000 * 60)) / 1000
);

document.getElementById("dias").textContent = dias;
document.getElementById("horas").textContent = horas;
document.getElementById("minutos").textContent = minutos;
document.getElementById("segundos").textContent = segundos;
}

actualizarCuentaRegresiva();
setInterval(actualizarCuentaRegresiva, 1000);

const boton = document.querySelector("#cal");

if (boton) {
boton.onclick = () => {
const numero = "";
const mensaje = encodeURIComponent(
"Hola, confirmo mi asistencia a los XV años de Andrea."
);

window.open(
`https://wa.me/${numero}?text=${mensaje}`,
"_blank"
);
};
}
