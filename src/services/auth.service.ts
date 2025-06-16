import axios from './axios';
import { ref } from "vue";

const API_URL = 'https://localhost:7040/api/auth';
const isLoggedIn = ref(!!localStorage.getItem('token'));
export const authService = {
    isLoggedIn,
    async login(username: string, password: string): Promise<string> {
        const response = await axios.post(`${API_URL}/login`, { username, password });
        localStorage.setItem('token', response.data.token);
        isLoggedIn.value=true;
        return response.data.token; // On suppose que le backend retourne { token: '...' }
    },

    logout(): void {
        localStorage.removeItem('token');
        isLoggedIn.value = false;
    },

    getToken(): string | null {
        return localStorage.getItem('token');
    },

    isAuthenticated(): boolean {
        return !!localStorage.getItem('token');
    }
};