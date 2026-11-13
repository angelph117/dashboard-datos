
import "./Componentes.css";


function TarjetaMetrica({ titulo, valor, descripcion }) {
  return (
    <article className="tarjeta-metrica">
      <h3>{titulo}</h3>
      <h2>{valor}</h2>
      <p>{descripcion}</p>
    </article>
  );
}

export default TarjetaMetrica;
