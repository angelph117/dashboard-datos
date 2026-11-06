
import datos from "../data/datos.json";

// Función para obtener los datos simulando una petición HTTP
export async function obtenerDatosVisualizacion() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(datos);
    }, 500);
  });
}

// Función para procesar los datos
export function procesarDatos(datos) {
  const estudiantes = datos.estudiantes;

  const totalEstudiantes = estudiantes.length;

  const promedioGeneral =
    estudiantes.reduce(
      (total, estudiante) => total + estudiante.calificacion,
      0
    ) / totalEstudiantes;

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
    )
  };
}
