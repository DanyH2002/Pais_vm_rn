import axios from "axios";
let authToken: string | null = null;

// Actualiza el token para las peticiones
export const setAuthToken = (token: string | null) => {
    authToken = token;
};

const api = axios.create({
    baseURL: "http://127.0.0.1:8000/api"
});

// Interceptor para agregar el token
api.interceptors.request.use(
    (config) => {
        if (authToken) {
            config.headers.Authorization = `Bearer ${authToken}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export default api;
