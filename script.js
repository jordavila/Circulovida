const ctx = document.getElementById('radarChart').getContext('2d');
const nombreInput = document.getElementById('nombre');
const reiniciarBtn = document.getElementById('reiniciar');
const descargarBtn = document.getElementById('descargar');

let valoresIniciales = [3, 4, 2, 5, 3, 4]; // Valores iniciales distintos de cero
let categorias = ['Categoría 1', 'Categoría 2', 'Categoría 3', 'Categoría 4', 'Categoría 5', 'Categoría 6'];

const radarChart = new Chart(ctx, {
  type: 'radar',
  data: {
    labels: categorias,
    datasets: [{
      label: 'Valores',
      data: [...valoresIniciales],
      backgroundColor: 'rgba(105, 201, 185, 0.2)',
      borderColor: '#69c9b9',
      borderWidth: 2,
      pointBackgroundColor: '#69c9b9'
    }]
  },
  options: {
    responsive: true,
    scales: {
      r: {
        min: 0,
        max: 5,
        ticks: { stepSize: 1, color: 'white' },
        grid: { color: 'rgba(255,255,255,0.2)' },
        angleLines: { color: 'rgba(255,255,255,0.4)' },
        pointLabels: {
          color: 'white',
          font: { size: 14, weight: 'bold' }
        }
      }
    },
    plugins: {
      dragData: {
        round: 1,
        onDragEnd: function(e, datasetIndex, index, value) {
          console.log(`Nuevo valor para ${categorias[index]}: ${value}`);
        }
      },
      legend: { display: false },
      watermark: {
        text: '',
        color: 'rgba(255,255,255,0.08)',
        font: 'bold 40px sans-serif'
      }
    }
  },
  plugins: [{
    id: 'watermark',
    beforeDraw(chart) {
      const text = radarChart.options.plugins.watermark.text;
      if (!text) return;
      const ctx = chart.ctx;
      ctx.save();
      ctx.font = radarChart.options.plugins.watermark.font;
      ctx.fillStyle = radarChart.options.plugins.watermark.color;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(text, chart.width / 2, chart.height / 2);
      ctx.restore();
    }
  }]
};

// Actualizar marca de agua al escribir nombre
nombreInput.addEventListener('input', () => {
  radarChart.options.plugins.watermark.text = nombreInput.value;
  radarChart.update();
});

// Reiniciar
reiniciarBtn.addEventListener('click', () => {
  radarChart.data.datasets[0].data = [...valoresIniciales];
  radarChart.options.plugins.watermark.text = '';
  nombreInput.value = '';
  radarChart.update();
});

// Descargar imagen
descargarBtn.addEventListener('click', () => {
  const link = document.createElement('a');
  link.download = 'grafico.png';
  link.href = radarChart.toBase64Image();
  link.click();
});
