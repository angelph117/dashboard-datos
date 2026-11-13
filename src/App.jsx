
import { useState, useEffect } from "react";
import "./App.css";
import DashboardLayout from "./components/DashboardLayout";
import { obtenerPrediccion } from "./services/dataService";

function App() {

  // Estado global de los filtros
  const [filtros, setFiltros] = useState({
    categoria: "todas",
    fecha: ""
  });

  // Estado de los registros
  const [datos, setDatos] = useState([]);

  // Estados de carga y errores
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {

    const cargarDatos = async () => {
      try {
        setCargando(true);
        setError("");

        const respuesta = await obtenerPrediccion();

        // Aplicar filtro de fecha
        const datosFiltrados = filtros.fecha
          ? respuesta.filter(
              registro => registro.fecha === filtros.fecha
            )
          : respuesta;

        setDatos(datosFiltrados);

      } catch (err) {
        console.error("Error al obtener datos:", err);

        setError(
          "No fue posible obtener los datos de la API."
        );

        setDatos([]);

      } finally {
        setCargando(false);
      }
    };

    cargarDatos();

  }, [filtros]);

  return (
    <DashboardLayout
      filtros={filtros}
      setFiltros={setFiltros}
      datos={datos}
      cargando={cargando}
      error={error}
    />
  );
}

export default App;
