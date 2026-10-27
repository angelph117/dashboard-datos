
import Navbar from "./components/Navbar";
import "./App.css";

function App() {
  return (
    <>
      <Navbar />

      <main className="contenido">
        <h2>Bienvenido a mi Dashboard</h2>
        <p>
          Entorno frontend preparado para la futura
          integración y visualización de modelos de
          ciencia de datos.
        </p>
      </main>
    </>
  );
}

export default App;
