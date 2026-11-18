
import { Line } from "react-chartjs-2";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function GraficoTendencia({
  datos,
  titulo = "Evolución meteorológica",
  unidad = "",
}) {
  const hayDatos =
    datos &&
    datos.labels?.length > 0 &&
    datos.values?.length > 0;

  const informacion = {
    labels: hayDatos ? datos.labels : [],
    datasets: [
      {
        label: `${titulo} (${unidad})`,
        data: hayDatos ? datos.values : [],
        borderColor: "#2563eb",
        backgroundColor: "rgba(37, 99, 235, 0.15)",
        borderWidth: 2,
        pointBackgroundColor: "#2563eb",
        pointRadius: 3,
        pointHoverRadius: 7,
        fill: true,
        tension: 0.35,
      },
    ],
  };

  const opciones = {
    responsive: true,
    maintainAspectRatio: false,

    interaction: {
      intersect: false,
      mode: "index",
    },

    plugins: {
      legend: {
        display: true,
        position: "top",
      },

      title: {
        display: true,
        text: titulo,
      },

      tooltip: {
        enabled: true,
        callbacks: {
          label: (context) =>
            `${context.parsed.y} ${unidad}`,
        },
      },
    },

    scales: {
      y: {
        beginAtZero: false,
        title: {
          display: true,
          text: unidad,
        },
      },

      x: {
        title: {
          display: true,
          text: "Fecha y hora",
        },

        ticks: {
          maxTicksLimit: 10,
        },
      },
    },
  };

  return (
    <div className="grafico-card">
      <h2>Gráfico de tendencia</h2>

      {hayDatos ? (
        <div className="grafico-contenedor">
          <Line data={informacion} options={opciones} />
        </div>
      ) : (
        <p className="grafico-sin-datos">
          No hay datos disponibles para mostrar.
        </p>
      )}
    </div>
  );
}

export default GraficoTendencia;
