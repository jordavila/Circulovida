<script>
(() => {
  const categories = [
    'Salud', 'Finanzas', 'Carrera/Trabajo', 'Familia/Amigos',
    'Amor/Pareja', 'Crecimiento Personal', 'Diversión/Ocio', 'Entorno/Hogar'
  ];
  
  // Íconos: puedes poner emojis o rutas de imágenes
  const categoryIcons = [
    '💪', '💰', '💼', '👨‍👩‍👧‍👦',
    '❤️', '📚', '🎉', '🏡'
  ];

  const MAX = 10;
  const values = new Array(categories.length).fill(5);
  let draggingIndex = -1;

  const canvas = document.getElementById('wheel');
  const ctx = canvas.getContext('2d');
  const slidersContainer = document.querySelector('.sliders');
  const nombreInput = document.getElementById('nombre');

  function resizeCanvas() {
    const vw = Math.min(window.innerWidth, 820) - 28;
    const vh = window.innerHeight * 0.65;
    const size = Math.max(300, Math.min(vw, vh));
    const dpr = window.devicePixelRatio || 1;
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    canvas.style.width = size + 'px';
    canvas.style.height = size + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    draw();
  }

  const LABEL_PAD = 85;
  function geom() {
    const w = canvas.width / (window.devicePixelRatio || 1);
    const h = canvas.height / (window.devicePixelRatio || 1);
    const cx = w / 2;
    const cy = h / 2 + 12;
    const r = Math.min(w, h) / 2 - LABEL_PAD;
    return { w, h, cx, cy, r };
  }
  function angleFor(i) {
    return (Math.PI * 2 * i / categories.length) - Math.PI / 2;
  }
  function polarToXY(ratio, ang) {
    const { cx, cy, r } = geom();
    return { x: cx + Math.cos(ang) * r * ratio, y: cy + Math.sin(ang) * r * ratio };
  }

  function draw() {
    const { w, h, cx, cy, r } = geom();
    const g = ctx.createRadialGradient(cx, cy, r * 0.05, cx, cy, r * 1.2);
    g.addColorStop(0, '#161b3b');
    g.addColorStop(1, '#0f1220');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, w, h);

    ctx.strokeStyle = '#25307a';
    ctx.lineWidth = 1;
    for (let i = 1; i <= MAX; i++) {
      ctx.globalAlpha = i % 5 === 0 ? 0.75 : 0.35;
      ctx.beginPath();
      ctx.arc(cx, cy, r * i / MAX, 0, Math.PI * 2);
      ctx.stroke();
    }
    ctx.globalAlpha = 1;

    ctx.fillStyle = '#ffffff';
    ctx.font = `${Math.max(20, r * 0.12)}px system-ui`;
    ctx.textBaseline = 'middle';

    categories.forEach((_, i) => {
      const ang = angleFor(i);
      const pOut = polarToXY(1, ang);

      ctx.strokeStyle = '#2a3280';
      ctx.globalAlpha = 0.6;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(pOut.x, pOut.y);
      ctx.stroke();
      ctx.globalAlpha = 1;

      const labelRatio = 1.15;
      const labelPos = polarToXY(labelRatio, ang);
      ctx.save();
      ctx.translate(labelPos.x, labelPos.y);
      ctx.rotate(ang + Math.PI / 2);
      ctx.textAlign = 'center';
      ctx.fillText(categoryIcons[i], 0, 0); // Dibujar el ícono
      ctx.restore();
    });

    const pts = categories.map((_, i) => polarToXY(Math.max(0.1, values[i] / MAX), angleFor(i)));
    ctx.beginPath();
    pts.forEach((p, i) => (i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y)));
    ctx.closePath();
    ctx.fillStyle = 'rgba(109, 211, 255, 0.22)';
    ctx.fill();
    ctx.lineWidth = 2;
    ctx.strokeStyle = '#6dd3ff';
    ctx.stroke();

    pts.forEach((p) => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, 8, 0, Math.PI * 2);
      ctx.fillStyle = '#8ef6a0';
      ctx.fill();
      ctx.strokeStyle = '#0e1330';
      ctx.lineWidth = 2;
      ctx.stroke();
    });
  }

  function pointerXY(evt) {
    const rect = canvas.getBoundingClientRect();
    return { x: evt.clientX - rect.left, y: evt.clientY - rect.top };
  }
  function nearestAxisIndex(x, y) {
    const { cx, cy } = geom();
    const dx = x - cx, dy = y - cy;
    let ang = Math.atan2(dy, dx) + Math.PI / 2;
    if (ang < 0) ang += Math.PI * 2;
    const seg = (Math.PI * 2) / categories.length;
    return Math.round(ang / seg) % categories.length;
  }
  function valueAlongAxisFromXY(index, x, y) {
    const { cx, cy, r } = geom();
    const ang = angleFor(index);
    const ax = Math.cos(ang), ay = Math.sin(ang);
    const vx = x - cx, vy = y - cy;
    const t = vx * ax + vy * ay;
    const ratio = Math.max(0, Math.min(1, t / r));
    return Math.max(1, Math.min(10, Math.round(ratio * MAX)));
  }
  function hitPointIndex(x, y) {
    for (let i = 0; i < categories.length; i++) {
      const p = polarToXY(Math.max(0.1, values[i] / MAX), angleFor(i));
      if (Math.hypot(x - p.x, y - p.y) <= 14) return i;
    }
    return -1;
  }

  canvas.addEventListener('pointerdown', (e) => {
    canvas.setPointerCapture(e.pointerId);
    const { x, y } = pointerXY(e);
    const hit = hitPointIndex(x, y);
    if (hit >= 0) {
      draggingIndex = hit;
    } else {
      const idx = nearestAxisIndex(x, y);
      values[idx] = valueAlongAxisFromXY(idx, x, y);
      updateSliders();
      draw();
    }
  });
  canvas.addEventListener('pointermove', (e) => {
    if (draggingIndex < 0) return;
    const { x, y } = pointerXY(e);
    values[draggingIndex] = valueAlongAxisFromXY(draggingIndex, x, y);
    updateSliders();
    draw();
  });
  window.addEventListener('pointerup', () => draggingIndex = -1);
  window.addEventListener('pointercancel', () => draggingIndex = -1);

  function createSliders() {
    categories.forEach((cat, i) => {
      const container = document.createElement('div');
      container.className = 'slider-container';
      const label = document.createElement('label');
      label.htmlFor = 'slider-' + i;
      label.textContent = cat;
      container.appendChild(label);
      const slider = document.createElement('input');
      slider.type = 'range';
      slider.min = 1;
      slider.max = MAX;
      slider.value = values[i];
      slider.id = 'slider-' + i;
      container.appendChild(slider);
      slider.addEventListener('input', (e) => {
        values[i] = Number(e.target.value);
        draw();
      });
      slidersContainer.appendChild(container);
    });
  }
  function updateSliders() {
    categories.forEach((_, i) => {
      const slider = document.getElementById('slider-' + i);
      if (slider && Number(slider.value) !== values[i]) {
        slider.value = values[i];
      }
    });
  }

  document.getElementById('download').addEventListener('click', () => {
    const nombre = nombreInput.value.trim();
    if (!nombre) {
      alert('Por favor ingresa el nombre.');
      nombreInput.focus();
      return;
    }

    const dpr = window.devicePixelRatio || 1;
    const baseW = canvas.width / dpr;
    const baseH = canvas.height / dpr;

    // Espacios dinámicos
    const headerH = Math.round(baseW * 0.35);
    const footerH = Math.round(baseW * 0.15);

    const out = document.createElement('canvas');
    out.width = canvas.width;
    out.height = Math.floor(headerH + baseH + footerH) * dpr;
    const octx = out.getContext('2d');
    octx.setTransform(dpr, 0, 0, dpr, 0, 0);

    octx.fillStyle = '#0f1220';
    octx.fillRect(0, 0, out.width, out.height);

    const cx = baseW / 2;
    let ty = 40;
    octx.textAlign = 'center';
    octx.fillStyle = '#ffffff';

    octx.font = '800 ' + Math.round(baseW * 0.08) + 'px system-ui';
    octx.fillText('CIRCULO DE LA VIDA', cx, ty);
    ty += Math.round(baseW * 0.1);

    octx.font = '600 ' + Math.round(baseW * 0.045) + 'px system-ui';
    octx.fillText('Programa Raiz Viva', cx, ty);
    ty += Math.round(baseW * 0.07);

    octx.font = '600 ' + Math.round(baseW * 0.04) + 'px system-ui';
    octx.fillText('by: Karen Valencia - Health Couch', cx, ty);

    octx.drawImage(canvas, 0, headerH, baseW, baseH);

    octx.font = '600 ' + Math.round(baseW * 0.045) + 'px system-ui';
    octx.fillStyle = '#8ef6a0';
    octx.fillText(nombre, cx, headerH + baseH + footerH * 0.5);

    const safeName = nombre.replace(/\s+/g, '_').replace(/[^\w_-]/g, '');
    out.toBlob((blob) => {
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `Circulo_de_la_Vida_${safeName}.png`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    }, 'image/png');
  });

  createSliders();
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);
})();
</script>
