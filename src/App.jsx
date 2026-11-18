
import { useState, useEffect, useMemo } from "react";
import "./App.css";

import DashboardLayout from "./components/DashboardLayout";
import { obtenerPrediccion } from "./services/dataService";

function App() {
  // Estado global de los filtros
  const [filtros, setFiltros] = useState({
    categoria: "todas",
    fecha: "",
  });

  // Almacenar los datos originales de la API
  const [datosOriginales, setDatosOriginales] = useState([]);

  // Estados de carga y errores
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  // Consultar la API una sola vez al iniciar
  useEffect(() => {
    const cargarDatos = async () => {
      try {
        setCargando(true);
        setError("");

        const respuesta = await obtenerPrediccion();

        setDatosOriginales(
          Array.isArray(respuesta) ? respuesta : []
        );
      } catch (err) {
        console.error("Error al obtener datos:", err);

        setError(
          "No fue posible obtener los datos de la API."
        );

        setDatosOriginales([]);
      } finally {
        setCargando(false);
      }
    };

    cargarDatos();
  }, []);

  // Aplicar el filtro de fecha sin volver a consultar la API
  const datosFiltrados = useMemo(() => {
    if (!filtros.fecha) {
      return datosOriginales;
    }

    return datosOriginales.filter(
      (registro) => registro.fecha === filtros.fecha
    );
  }, [datosOriginales, filtros.fecha]);

  return (
    <DashboardLayout
      filtros={filtros}
      setFiltros={setFiltros}
      datos={datosFiltrados}
      cargando={cargando}
      error={error}
    />
  );
}

export default App;
