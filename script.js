const fechaEvento = new Date("October 17, 2026 17:00:00").getTime();

const dias = document.getElementById("dias");
const horas = document.getElementById("horas");
const minutos = document.getElementById("minutos");
const segundos = document.getElementById("segundos");

function actualizarContador() {

const ahora = new Date().getTime();

const diferencia = fechaEvento - ahora;

if (diferencia <= 0) {

dias.textContent = "0";
horas.textContent = "0";
minutos.textContent = "0";
segundos.textContent = "0";

return;

}

dias.textContent = Math.floor(diferencia / (1000 * 60 * 60 * 24));

horas.textContent = Math.floor(
(diferencia % (1000 * 60 * 60 * 24)) /
(1000 * 60 * 60)
);

minutos.textContent = Math.floor(
(diferencia % (1000 * 60 * 60)) /
(1000 * 60)
);

segundos.textContent = Math.floor(
(diferencia % (1000 * 60)) /
1000
);

}

setInterval(actualizarContador,1000);

actualizarContador();

const boton = document.querySelector("button");

boton.addEventListener("click",()=>{

const mensaje = encodeURIComponent(
"Hola, confirmo mi asistencia a los XV años de Andrea."
);

window.open(
"https://wa.me/?text="+mensaje,
"_blank"
);

});
