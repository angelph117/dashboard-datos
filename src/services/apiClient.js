
import axios from "axios";

// Obtenemos la dirección de la API
// desde las variables de entorno de Vite.
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,

  timeout: 15000,

  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Exportamos el cliente para utilizarlo
// desde nuestros servicios.
export default apiClient;
