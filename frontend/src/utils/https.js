import axios from 'axios';

/**
 * URL API desde variables de entorno
 * import.meta.env es soportado por Vite
 */
const API_AUTHURL = import.meta.env.VITE_AUTH_API_URL;
const API_DATAURL = import.meta.env.VITE_DATA_API_URL;
const CONTENT_TYPE = import.meta.env.VITE_CONTENT_TYPE;
const TIME_OUT = import.meta.env.VITE_TIME_OUT;
/**
 * Instancia 1 de axios para Autenticación
 */
export const authClient = axios.create({
    baseURL: API_AUTHURL,
    timeout: TIME_OUT,
    headers: {
        'Content-Type': CONTENT_TYPE
    }
});

/**
 * Instancia 2 de axios para Datos de la aplicación
 */
export const dataClient = axios.create({
    baseURL: API_DATAURL,
    timeout: TIME_OUT,
    headers: {
        'Content-Type': CONTENT_TYPE
    }
});
