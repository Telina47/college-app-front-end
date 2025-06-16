import axios from 'axios';
import { triggerSnackbar } from '../composables/usesnackbar';


const instance = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:7040/api',
});

instance.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

instance.interceptors.response.use(
    (response) => {
        // ✅ Si le backend retourne un message textuel explicite, l'afficher
        if (
            response.config.method !== 'get' &&
            typeof response.data === 'string' &&
            response.data.length < 200
        ) {
            triggerSnackbar(response.data, 'success');
        }
        return response;
    },
    (error) => {
        const message =
            error.response?.data?.message ||
            error.response?.data ||
            'Erreur lors de l’appel réseau';
        triggerSnackbar(message, 'error');
        return Promise.reject(error);
    }
);

export default instance;
