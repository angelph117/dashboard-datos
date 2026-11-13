
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";

function GraficaTemperatura({ datos, categoria }) {

  const mostrarTodas = categoria === "todas";

  const configuracion = {
    temperatura: {
      campo: "temperatura",
      titulo: "Temperatura (°C)",
      color: "#2563eb"
    },
    humedad: {
      campo: "humedad",
      titulo: "Humedad (%)",
      color: "#16a34a"
    },
    lluvia: {
      campo: "probabilidadLluvia",
      titulo: "Probabilidad de lluvia (%)",
      color: "#f59e0b"
    }
  };

  return (
    <section className="grafica-contenedor">

      <h2>Gráfica de datos meteorológicos</h2>

      {datos.length === 0 ? (
        <p>No hay datos para mostrar.</p>
      ) : (

        <ResponsiveContainer width="100%" height={350}>

          <LineChart data={datos}>

            <CartesianGrid strokeDasharray="3 3" />

            <XAxis
              dataKey="hora"
              tick={{ fontSize: 11 }}
            />

            <YAxis />

            <Tooltip />

            <Legend />

            {/* Mostrar las tres líneas */}
            {mostrarTodas && (
              <>
                <Line
                  type="monotone"
                  dataKey="temperatura"
                  name="Temperatura (°C)"
                  stroke="#2563eb"
                  strokeWidth={3}
                  dot={false}
                  connectNulls
                />

                <Line
                  type="monotone"
                  dataKey="humedad"
                  name="Humedad (%)"
                  stroke="#16a34a"
                  strokeWidth={3}
                  dot={false}
                  connectNulls
                />

                <Line
                  type="monotone"
                  dataKey="probabilidadLluvia"
                  name="Probabilidad de lluvia (%)"
                  stroke="#f59e0b"
                  strokeWidth={3}
                  dot={false}
                  connectNulls
                />
              </>
            )}

            {/* Mostrar solamente la categoría seleccionada */}
            {!mostrarTodas && (
              <Line
                type="monotone"
                dataKey={configuracion[categoria].campo}
                name={configuracion[categoria].titulo}
                stroke={configuracion[categoria].color}
                strokeWidth={3}
                dot={false}
                connectNulls
              />
            )}

          </LineChart>

        </ResponsiveContainer>
      )}

    </section>
  );
}

export default GraficaTemperatura;
