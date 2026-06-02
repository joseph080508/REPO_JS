/**
 * 
 * Axios HTTP Client
 * Configuración centralizada Axios.
 */
import axios from 'axios';

/**
 * URL API desde variables de entorno
 * import.meta.env es soportado por Vite
 */
const API_URL = import.meta.env.VITE_AUTHURL;
const CONTENT_TYPE = import.meta.env.VITE_CONTENT_TYPE;
const TIME_OUT = import.meta.env.VITE_TIME_OUT;
/**
 * Instancia global Axios
 */
const httpClient = axios.create({
    baseURL: API_URL,
    timeout: TIME_OUT,
    headers: {
        'Content-Type': CONTENT_TYPE
    }
});

export default httpClient;