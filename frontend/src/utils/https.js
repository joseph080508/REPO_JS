import axios from 'axios'

export const authApi = axios.create({
    baseURL: import.meta.env.VITE_AUTH_API_URL
})

export const dataApi = axios.create({
    baseURL: import.meta.env.VITE_DATA_API_URL
})