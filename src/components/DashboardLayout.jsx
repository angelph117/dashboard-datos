
import Navbar from "./Navbar";
import PanelFiltros from "./PanelFiltros";
import TarjetaMetrica from "./TarjetaMetrica";
import TablaDatos from "./TablaDatos";
import GraficaTemperatura from "./GraficaTemperatura";

function DashboardLayout({
  filtros,
  setFiltros,
  datos,
  cargando,
  error
}) {

  const calcularPromedio = (campo) => {
    const valores = datos
      .map(registro => registro[campo])
      .filter(valor =>
        typeof valor === "number" && Number.isFinite(valor)
      );

    if (valores.length === 0) return "N/D";

    const promedio =
      valores.reduce((total, valor) => total + valor, 0) /
      valores.length;

    return promedio.toFixed(1);
  };

  return (
    <div className="dashboard-layout">

      <aside className="barra-lateral">
        <h2>DataWeather</h2>
        <p>Panel de control</p>

        <nav>
          <a href="#inicio">Inicio</a>
          <a href="#metricas">Métricas</a>
          <a href="#grafica">Gráficas</a>
          <a href="#tabla">Registros</a>
        </nav>
      </aside>

      <main className="contenido-dashboard" id="inicio">

        <Navbar />

        <header className="titulo-dashboard">
          <div>
            <h1>Dashboard Interactivo</h1>
            <p>Panel de análisis meteorológico</p>
          </div>
        </header>

        <PanelFiltros
          filtros={filtros}
          setFiltros={setFiltros}
        />

        {cargando && (
          <p className="mensaje">
            Cargando información meteorológica...
          </p>
        )}

        {error && (
          <p className="mensaje error">
            {error}
          </p>
        )}

        {!cargando && !error && (
          <>
            <section className="contenedor-metricas" id="metricas">

              <TarjetaMetrica
                titulo="Temperatura promedio"
                valor={`${calcularPromedio("temperatura")} °C`}
                descripcion="Promedio del periodo seleccionado"
              />

              <TarjetaMetrica
                titulo="Humedad promedio"
                valor={`${calcularPromedio("humedad")} %`}
                descripcion="Humedad relativa"
              />

              <TarjetaMetrica
                titulo="Probabilidad de lluvia"
                valor={`${calcularPromedio("probabilidadLluvia")} %`}
                descripcion="Probabilidad promedio"
              />

            </section>

            <section id="grafica">
              <GraficaTemperatura
                datos={datos}
                categoria={filtros.categoria}
              />
            </section>

            <section id="tabla" className="seccion-tabla">
              <h2>Tabla de registros meteorológicos</h2>

              <TablaDatos estudiantes={datos} />
            </section>
          </>
        )}

      </main>
    </div>
  );
}

export default DashboardLayout;
