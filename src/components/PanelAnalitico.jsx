
import { useState } from "react";
import { obtenerPrediccion } from "../services/dataService";

function PanelAnalitico() {

  // Estado para almacenar los datos de la API
  const [datos, setDatos] = useState([]);

  // Estado para indicar si la petición está en curso
  const [cargando, setCargando] = useState(false);

  // Estado para almacenar posibles errores
  const [error, setError] = useState("");

  // Función para consultar la API
  const consultarDatos = async () => {

    // Activar indicador de carga
    setCargando(true);

    // Limpiar errores anteriores
    setError("");

    try {

      // Consumir el servicio
      const resultado = await obtenerPrediccion();

      // Guardar los datos recibidos
      setDatos(resultado);

    } catch (err) {

      // Capturar el error
      console.error("Error al consultar la API:", err);

      setError(
        err.response?.data?.reason ||
        err.message ||
        "No fue posible obtener los datos."
      );

    } finally {

      // Finalizar el estado de carga
      setCargando(false);

    }
  };

  // Calcular promedio de temperatura
  const promedioTemperatura = datos.length
    ? (
        datos.reduce(
          (total, registro) => total + registro.temperatura,
          0
        ) / datos.length
      ).toFixed(1)
    : "0";

  // Calcular promedio de humedad
  const promedioHumedad = datos.length
    ? (
        datos.reduce(
          (total, registro) => total + registro.humedad,
          0
        ) / datos.length
      ).toFixed(1)
    : "0";

  return (
    <section style={estilos.contenedor}>

      <h2>Panel Analítico Meteorológico</h2>

      <p>
        Consulta información meteorológica mediante una API externa.
      </p>

      <button
        onClick={consultarDatos}
        disabled={cargando}
        style={estilos.boton}
      >
        {cargando ? "Consultando..." : "Obtener datos analíticos"}
      </button>

      {/* ESTADO DE CARGA */}
      {cargando && (
        <div style={estilos.cargando}>
          Analizando datos, por favor espera...
        </div>
      )}

      {/* ESTADO DE ERROR */}
      {error && (
        <div style={estilos.error}>
          <strong>Error en la consulta:</strong>
          <p>{error}</p>
          <p>Verifica tu conexión e inténtalo nuevamente.</p>
        </div>
      )}

      {/* RESULTADOS */}
      {datos.length > 0 && !cargando && (

        <div>

          <h3>Resultados del análisis</h3>

          <div style={estilos.tarjetas}>

            <div style={estilos.tarjeta}>
              <h4>Temperatura promedio</h4>
              <p>{promedioTemperatura} °C</p>
            </div>

            <div style={estilos.tarjeta}>
              <h4>Humedad promedio</h4>
              <p>{promedioHumedad} %</p>
            </div>

            <div style={estilos.tarjeta}>
              <h4>Registros obtenidos</h4>
              <p>{datos.length}</p>
            </div>

          </div>

          <h3>Datos meteorológicos por hora</h3>

          <div style={{ overflowX: "auto" }}>
            <table style={estilos.tabla}>

              <thead>
                <tr>
                  <th>Hora</th>
                  <th>Temperatura (°C)</th>
                  <th>Humedad (%)</th>
                  <th>Probabilidad de lluvia (%)</th>
                </tr>
              </thead>

              <tbody>
                {datos.map((registro) => (
                  <tr key={registro.id}>
                    <td>{registro.hora.replace("T", " ")}</td>
                    <td>{registro.temperatura}</td>
                    <td>{registro.humedad}</td>
                    <td>{registro.probabilidadLluvia ?? "No disponible"}</td>
                  </tr>
                ))}
              </tbody>

            </table>
          </div>

        </div>
      )}

    </section>
  );
}

// Estilos del componente
const estilos = {

  contenedor: {
    padding: "25px",
    backgroundColor: "#f5f7fb",
    borderRadius: "12px",
    margin: "20px auto",
    maxWidth: "1100px",
    color: "#222",
  },

  boton: {
    padding: "12px 20px",
    backgroundColor: "#2563eb",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    margin: "15px 0",
  },

  cargando: {
    padding: "15px",
    backgroundColor: "#dbeafe",
    color: "#1e40af",
    borderRadius: "8px",
    margin: "15px 0",
  },

  error: {
    padding: "15px",
    backgroundColor: "#fee2e2",
    color: "#b91c1c",
    borderRadius: "8px",
    margin: "15px 0",
  },

  tarjetas: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
    gap: "15px",
    margin: "20px 0",
  },

  tarjeta: {
    backgroundColor: "white",
    padding: "18px",
    borderRadius: "10px",
    textAlign: "center",
    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
  },

  tabla: {
    width: "100%",
    borderCollapse: "collapse",
    backgroundColor: "white",
    textAlign: "center",
  },

};

export default PanelAnalitico;
