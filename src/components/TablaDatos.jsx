
import "./Componentes.css";

function TablaDatos({ estudiantes }) {
  return (
    <div className="contenedor-tabla">
      <h2>Registro de estudiantes</h2>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Edad</th>
            <th>Género</th>
            <th>Calificación</th>
            <th>Carrera</th>
          </tr>
        </thead>

        <tbody>
          {estudiantes.map((estudiante) => (
            <tr key={estudiante.id}>
              <td>{estudiante.id}</td>
              <td>{estudiante.nombre}</td>
              <td>{estudiante.edad}</td>
              <td>{estudiante.genero}</td>
              <td>{estudiante.calificacion}</td>
              <td>{estudiante.carrera}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TablaDatos;
