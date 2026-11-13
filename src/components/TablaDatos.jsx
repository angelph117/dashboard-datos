
import "./Componentes.css";

function TablaDatos({ estudiantes }) {
  return (
    <div className="contenedor-tabla">
      <h2>Registro de datos meteorológicos</h2>

      <div className="tabla-responsive">
        {estudiantes.length === 0 ? (
          <p>No hay registros disponibles para los filtros seleccionados.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Fecha</th>
                <th>Hora</th>
                <th>Temperatura (°C)</th>
                <th>Humedad (%)</th>
                <th>Probabilidad de lluvia (%)</th>
              </tr>
            </thead>

            <tbody>
              {estudiantes.map((registro) => (
                <tr key={registro.id}>
                  <td>{registro.id}</td>
                  <td>{registro.fecha}</td>
                  <td>{registro.hora}</td>
                  <td>
                    {registro.temperatura ?? "N/D"}
                  </td>
                  <td>
                    {registro.humedad ?? "N/D"}
                  </td>
                  <td>
                    {registro.probabilidadLluvia ?? "N/D"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default TablaDatos;
