// 📁 src/services/classroomService.ts
import axios from './axios';
import type { Classroom } from '../models/classroom';

const API_URL = 'https://localhost:7040/api/Classroom';

export const classroomService = {
    async getAll(): Promise<Classroom[]> {
        const response = await axios.get<Classroom[]>(`${API_URL}/with-principal`);
        return response.data;
    },

    async getById(id: number): Promise<Classroom> {
        const response = await axios.get<Classroom>(`${API_URL}/${id}`);
        return response.data;
    },

    async create(data: Classroom): Promise<Classroom> {
        const response = await axios.post<Classroom>(API_URL, data);
        return response.data;
    },

    async update(id: number, data: Classroom): Promise<Classroom> {
        const response = await axios.put<Classroom>(`${API_URL}/${id}`, data);
        return response.data;
    },

    async remove(id: number): Promise<void> {
        await axios.delete(`${API_URL}/${id}`);
    }
};
