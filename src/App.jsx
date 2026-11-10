
import PanelAnalitico from "./components/PanelAnalitico";
import { useState, useEffect } from "react";

import {
  obtenerDatosVisualizacion,
  procesarDatos
} from "./services/dataService";

import TarjetaMetrica from "./components/TarjetaMetrica";
import TablaDatos from "./components/TablaDatos";

import "./App.css";

function App() {
  const [datos, setDatos] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function cargarDatos() {
      try {
        const respuesta = await obtenerDatosVisualizacion();

        const datosProcesados = procesarDatos(respuesta);

        setDatos(datosProcesados);
      } catch (error) {
        console.error("Error al obtener los datos:", error);
        setError("No fue posible cargar la información.");
      } finally {
        setCargando(false);
      }
    }

    cargarDatos();
  }, []);

  if (cargando) {
    return <h2 className="mensaje">Cargando información...</h2>;
  }

  if (error) {
    return <h2 className="mensaje">{error}</h2>;
  }

  return (
    <div className="dashboard">
      <header className="encabezado">
        <h1>Dashboard de Ciencia de Datos</h1>
        <p>Visualización y análisis de estudiantes</p>
      </header>

      <section className="contenedor-metricas">

        <TarjetaMetrica
          titulo="Total de estudiantes"
          valor={datos.totalEstudiantes}
          descripcion="Registros analizados"
        />

        <TarjetaMetrica
          titulo="Promedio general"
          valor={datos.promedioGeneral}
          descripcion="Promedio de calificaciones"
        />

        <TarjetaMetrica
          titulo="Hombres"
          valor={datos.totalMasculino}
          descripcion="Estudiantes masculinos"
        />

        <TarjetaMetrica
          titulo="Mujeres"
          valor={datos.totalFemenino}
          descripcion="Estudiantes femeninos"
        />

      </section>

      <TablaDatos estudiantes={datos.estudiantes} />
      <PanelAnalitico />

      <footer className="pie-pagina">
        <p>Práctica 2 - Unidad 3 | Estructuración de Componentes y Servicios</p>
      </footer>
    </div>
  );
}

export default App;
