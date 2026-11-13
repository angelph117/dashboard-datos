
function PanelFiltros({ filtros, setFiltros }) {

  const actualizarFiltro = (campo, valor) => {
    setFiltros({
      ...filtros,
      [campo]: valor
    });
  };

  return (
    <section className="panel-filtros">
      <h2>Panel de filtros</h2>

      <div className="grupo-filtro">
        <label>Categoría de datos</label>

        <select
          value={filtros.categoria}
          onChange={(e) =>
            actualizarFiltro("categoria", e.target.value)
          }
        >
          <option value="todas">Todas las categorías</option>
          <option value="temperatura">Temperatura</option>
          <option value="humedad">Humedad</option>
          <option value="lluvia">Probabilidad de lluvia</option>
        </select>
      </div>

      <div className="grupo-filtro">
        <label>Fecha de consulta</label>

        <input
          type="date"
          value={filtros.fecha}
          onChange={(e) =>
            actualizarFiltro("fecha", e.target.value)
          }
        />
      </div>

      <button
        className="boton-limpiar"
        onClick={() =>
          setFiltros({
            categoria: "todas",
            fecha: ""
          })
        }
      >
        Limpiar filtros
      </button>
    </section>
  );
}

export default PanelFiltros;
