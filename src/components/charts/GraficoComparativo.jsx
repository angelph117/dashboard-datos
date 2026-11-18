
import { Bar } from "react-chartjs-2";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function GraficoComparativo({
  datos,
  titulo = "Comparación meteorológica",
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

        backgroundColor: [
          "#2563eb",
          "#0ea5e9",
          "#14b8a6",
          "#8b5cf6",
          "#f59e0b",
          "#ec4899",
          "#64748b",
        ],

        borderColor: "#ffffff",
        borderWidth: 1,
        borderRadius: 6,
      },
    ],
  };

  const opciones = {
    responsive: true,
    maintainAspectRatio: false,

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
            `Promedio: ${context.parsed.y} ${unidad}`,
        },
      },
    },

    scales: {
      y: {
        beginAtZero: unidad !== "°C",
        max: unidad === "%" ? 100 : undefined,

        title: {
          display: true,
          text: unidad,
        },
      },

      x: {
        title: {
          display: true,
          text: "Fecha",
        },
      },
    },
  };

  return (
    <div className="grafico-card">
      <h2>Gráfico comparativo</h2>

      {hayDatos ? (
        <div className="grafico-contenedor">
          <Bar data={informacion} options={opciones} />
        </div>
      ) : (
        <p className="grafico-sin-datos">
          No hay datos disponibles para comparar.
        </p>
      )}
    </div>
  );
}

export default GraficoComparativo;
