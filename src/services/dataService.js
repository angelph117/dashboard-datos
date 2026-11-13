
import apiClient from "./apiClient";
import datos from "../data/datos.json";

// ==========================================
// 1. OBTENER DATOS SIMULANDO UNA PETICIÓN HTTP
// ==========================================

export async function obtenerDatosVisualizacion() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(datos);
    }, 500);
  });
}

// ==========================================
// 2. PROCESAR LOS DATOS DE ESTUDIANTES
// ==========================================

export function procesarDatos(datos) {
  const estudiantes = datos.estudiantes;

  const totalEstudiantes = estudiantes.length;

  const promedioGeneral =
    totalEstudiantes > 0
      ? estudiantes.reduce(
          (total, estudiante) =>
            total + estudiante.calificacion,
          0
        ) / totalEstudiantes
      : 0;

  const totalMasculino = estudiantes.filter(
    (estudiante) => estudiante.genero === "Masculino"
  ).length;

  const totalFemenino = estudiantes.filter(
    (estudiante) => estudiante.genero === "Femenino"
  ).length;

  return {
    totalEstudiantes,
    promedioGeneral: promedioGeneral.toFixed(2),
    totalMasculino,
    totalFemenino,

    estudiantes: estudiantes.filter(
      (estudiante) =>
        estudiante.nombre &&
        typeof estudiante.calificacion === "number"
    ),
  };
}

// ==========================================
// 3. OBTENER DATOS METEOROLÓGICOS
// DESDE LA API OPEN-METEO
// ==========================================

export const obtenerPrediccion = async () => {

  // Realizar petición GET a la API
  const respuesta = await apiClient.get("/forecast", {
    params: {
      latitude: 19.4326,
      longitude: -99.1332,

      hourly:
        "temperature_2m,relative_humidity_2m,precipitation_probability",

      forecast_days: 7,

      timezone: "America/Mexico_City",
    },
  });

  // Extraer los datos de la respuesta
  const datosAPI = respuesta.data;

  // Transformar la información para utilizarla
  // fácilmente en nuestros componentes
  const datosLimpios = datosAPI.hourly.time.map(
    (hora, indice) => ({
      id: indice + 1,

      fecha: hora.split("T")[0],

      hora: hora.split("T")[1],

      temperatura:
        datosAPI.hourly.temperature_2m[indice],

      humedad:
        datosAPI.hourly.relative_humidity_2m[indice],

      probabilidadLluvia:
        datosAPI.hourly.precipitation_probability[indice],
    })
  );

  // Devolver los datos procesados
  return datosLimpios;
};
