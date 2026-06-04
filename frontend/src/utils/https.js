import axios from 'axios';

// Lee las URLs y configuracion HTTP desde variables de entorno de Vite.
const API_AUTHURL = import.meta.env.VITE_AUTH_API_URL;
const API_DATAURL = import.meta.env.VITE_DATA_API_URL;
const CONTENT_TYPE = import.meta.env.VITE_CONTENT_TYPE;
const TIME_OUT = import.meta.env.VITE_TIME_OUT;

// Cliente axios para autenticacion y usuarios.
export const authClient = axios.create({
    baseURL: API_AUTHURL,
    timeout: TIME_OUT,
    headers: {
        'Content-Type': CONTENT_TYPE
    }
});

// Cliente axios para tickets y datos de la aplicacion.
export const dataClient = axios.create({
    baseURL: API_DATAURL,
    timeout: TIME_OUT,
    headers: {
        'Content-Type': CONTENT_TYPE
    }
});
