import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "https://krona-backend-77345390046.southamerica-east1.run.app",
});

export default API;