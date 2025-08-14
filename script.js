// ===============================
// CONFIGURACIÓN INICIAL
// ===============================

// Categorías y valores iniciales
const categories = [
  { name: "ESPIRITUALIDAD", value: 5 },
  { name: "GESTION ESTRES", value: 5 },
  { name: "FINANZAS", value: 5 },
  { name: "VIDA LABORAL", value: 5 },
  { name: "EDUCACION", value: 5 },
  { name: "ENTORNO", value: 5 },
  { name: "SALUD", value: 5 },
  { name: "ACTIVIDAD FISICA", value: 5 },
  { name: "VIDA SOCIAL", value: 5 },
  { name: "COCINA", value: 5 },
  { name: "RELACIONES", value: 5 },
  { name: "CREATIVIDAD", value: 5 },
  { name: "GESTION DE EMOCIONES", value: 5 }
];

// Elementos del DOM
const canvas = document.getElementById("lifeWheel");
const ctx = canvas.getContext("2d");
const slidersDiv = document.getElementById("sliders");
const nombreInput = document.getElementById("nombre");
const resetBtn = document.getElementById("resetBtn");
const downloadBtn = document.getElementById("downloadBtn");

let centerX, centerY, radius;
let draggingIndex = null;

// ===============================
// FUNCIÓN: Ajustar tamaño del canvas
// ===============================
function resizeCanvas() {
  canvas.width = Math.min(window.innerWidth * 0.9, 500);
  canvas.height = canvas.width;
  centerX = canvas.width / 2;
  centerY = canvas.height / 2;
  radius = canvas.width / 2 - 30;
  drawWheel();
}

// ===============================
// FUNCIÓN: Dibujar el gráfico
// ===============================
function drawWheel() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const step = (Math.PI * 2) / categories.length;

  // Círculos concéntricos
  ctx.strokeStyle = "rgba(0,0,0,0.2)";
  for (let i = 1; i <= 10; i++) {
    ctx.beginPath();
    ctx.arc(centerX, centerY, (radius / 10) * i, 0, Math.PI * 2);
    ctx.stroke();
  }

  // Líneas radiales + etiquetas
  categories.forEach((cat, i) => {
    const angle = i * step - Math.PI / 2;
    const x = centerX + radius * Math.cos(angle);
    const y = centerY + radius * Math.sin(angle);

    ctx.strokeStyle = "rgba(0,0,0,0.3)";
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(x, y);
    ctx.stroke();

    ctx.save();
    ctx.fillStyle = "rgba(0,0,0,0.5)";
    ctx.font = "bold 11px Segoe UI";
    ctx.translate(centerX, centerY);
    ctx.rotate(angle);
    ctx.textAlign = "right";
    ctx.fillText(cat.name, radius, 1);
    ctx.restore();
  });

  // Polígono de valores
  ctx.beginPath();
  categories.forEach((cat, i) => {
    const angle = i * step - Math.PI / 2;
    const valueRadius = (cat.value / 10) * radius;
    const x = centerX + valueRadius * Math.cos(angle);
    const y = centerY + valueRadius * Math.sin(angle);
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  });
  ctx.closePath();
  ctx.fillStyle = "rgba(105, 201, 185, 0.4)";
  ctx.fill();
  ctx.strokeStyle = "#69c9b9";
  ctx.stroke();

  // Nombre en el centro (transparente)
  if (nombreInput.value.trim() !== "") {
    ctx.font = "bold 24px Segoe UI";
    ctx.fillStyle = "rgba(0,0,0,0.15)";
    ctx.textAlign = "center";
    ctx.fillText(nombreInput.value, centerX, centerY);
  }
}

// ===============================
// FUNCIÓN: Crear sliders
// ===============================
function createSliders() {
  slidersDiv.innerHTML = "";
  categories.forEach((cat, i) => {
    const container = document.createElement("div");
    container.className = "slider-container";

    const label = document.createElement("label");
    label.textContent = cat.name;

    const input = document.createElement("input");
    input.type = "range";
    input.min = 0;
    input.max = 10;
    input.value = cat.value;
    input.addEventListener("input", e => {
      categories[i].value = parseInt(e.target.value);
      drawWheel();
    });

    container.appendChild(label);
    container.appendChild(input);
    slidersDiv.appendChild(container);
  });
}

// ===============================
// FUNCIÓN: Obtener índice de categoría según posición
// ===============================
//function getCategoryIndexFromPosition(x, y) {
 // const dx = x - centerX;
 // const dy = y - centerY;
 // let angle = Math.atan2(dy, dx);
 // if (angle < -Math.PI / 2) angle += 2 * Math.PI;
//  let index = Math.floor((angle + Math.PI / 2) / ((Math.PI * 2) / categories.length));
 // return index;
//}
function getCategoryIndexFromPosition(x, y) {
  const step = (Math.PI * 2) / categories.length;
  const tolerance = 20; // tolerancia en píxeles para seleccionar el punto exacto

  for (let i = 0; i < categories.length; i++) {
    const angle = i * step - Math.PI / 2;
    const valueRadius = (categories[i].value / 10) * radius;

    const px = centerX + valueRadius * Math.cos(angle);
    const py = centerY + valueRadius * Math.sin(angle);

    // Distancia entre clic y punto real
    const distToPoint = Math.sqrt(Math.pow(x - px, 2) + Math.pow(y - py, 2));

    if (distToPoint <= tolerance) {
      return i; // Encontramos la categoría tocada
    }
  }

  return null; // Ninguna categoría fue tocada
}
// ===============================
// FUNCIÓN: Actualizar valor desde posición
// ===============================
function updateValueFromPosition(index, x, y) {
  const dx = x - centerX;
  const dy = y - centerY;
  const dist = Math.sqrt(dx * dx + dy * dy);
  let newValue = Math.round((dist / radius) * 10);
  newValue = Math.max(0, Math.min(10, newValue));
  categories[index].value = newValue;
  document.querySelectorAll("#sliders input")[index].value = newValue;
  drawWheel();
}

// ===============================
// EVENTOS DE INTERACCIÓN
// ===============================

// Mouse
canvas.addEventListener("mousedown", e => {
  draggingIndex = getCategoryIndexFromPosition(e.offsetX, e.offsetY);
});
canvas.addEventListener("mousemove", e => {
  if (draggingIndex !== null) {
    updateValueFromPosition(draggingIndex, e.offsetX, e.offsetY);
  }
});
canvas.addEventListener("mouseup", () => draggingIndex = null);

// Touch
canvas.addEventListener("touchstart", e => {
  const rect = canvas.getBoundingClientRect();
  const touch = e.touches[0];
  draggingIndex = getCategoryIndexFromPosition(touch.clientX - rect.left, touch.clientY - rect.top);
});
canvas.addEventListener("touchmove", e => {
  if (draggingIndex !== null) {
    const rect = canvas.getBoundingClientRect();
    const touch = e.touches[0];
    updateValueFromPosition(draggingIndex, touch.clientX - rect.left, touch.clientY - rect.top);
  }
});
canvas.addEventListener("touchend", () => draggingIndex = null);

// Input nombre → redibuja con transparencia
nombreInput.addEventListener("input", drawWheel);

// Botón Reset
resetBtn.addEventListener("click", () => {
  categories.forEach(cat => cat.value = 5);
  createSliders();
  drawWheel();
  nombreInput.value = "";
});

// Botón Descargar
downloadBtn.addEventListener("click", () => {
  const headerImg = new Image();
  headerImg.src = "HEADER.jpg"; // Ruta del header

  headerImg.onload = () => {
    const headerOriginalHeight = headerImg.height;
    const headerOriginalWidth = headerImg.width;

    const titleHeight = 40; // altura reservada para el título

    // Ajustar altura del header proporcional al ancho del canvas
    const headerHeight = (canvas.width / headerOriginalWidth) * headerOriginalHeight;

    // Canvas temporal con espacio para header + título + gráfico
    const tempCanvas = document.createElement("canvas");
    tempCanvas.width = canvas.width;
    tempCanvas.height = headerHeight + titleHeight + canvas.height;
    const tempCtx = tempCanvas.getContext("2d");

    // Fondo sólido
    tempCtx.fillStyle = "#faf0e6";
    tempCtx.fillRect(0, 0, tempCanvas.width, tempCanvas.height);

    // Dibujar el header escalado al ancho del canvas
    tempCtx.drawImage(headerImg, 0, 0, tempCanvas.width, headerHeight);

    // Dibujar título
    tempCtx.font = "bold 16px Segoe UI";
    tempCtx.fillStyle = "#0f111e";
    tempCtx.textAlign = "center";
    tempCtx.textBaseline = "middle";
    tempCtx.fillText("Círculo de la Vida", tempCanvas.width / 2, headerHeight + titleHeight / 2);

    // Dibujar el canvas principal debajo del título
    tempCtx.drawImage(canvas, 0, headerHeight + titleHeight);

    // Añadir fecha y hora en la esquina inferior derecha
    const now = new Date();
    const fechaHora = now.toLocaleString();
    tempCtx.font = "8px Segoe UI";
    tempCtx.fillStyle = "rgba(0,0,0,0.6)";
    tempCtx.textAlign = "right";
    tempCtx.textBaseline = "bottom";
    tempCtx.fillText(fechaHora, tempCanvas.width - 10, tempCanvas.height - 10);

    // Preparar nombre del archivo usando el nombre ingresado
    const nombreArchivo = nombreInput.value.trim() || "circulo_de_la_vida";
    const link = document.createElement("a");
    link.download = `${nombreArchivo}.png`;
    link.href = tempCanvas.toDataURL();
    link.click();
  };
});

// Ajuste de tamaño
window.addEventListener("resize", resizeCanvas);

// ===============================
// INICIALIZACIÓN
// ===============================
createSliders();
resizeCanvas();
