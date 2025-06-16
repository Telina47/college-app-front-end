import axios from './axios';
import type { Teacher } from '../models/teacher';

const API_URL = 'https://localhost:7040/api/Teachers';

export const teacherService = {
    async getAll(): Promise<Teacher[]> {
        const response = await axios.get<Teacher[]>(API_URL);
        return response.data;
    },

    async getById(id: number): Promise<Teacher> {
        const response = await axios.get<Teacher>(`${API_URL}/${id}`);
        return response.data;
    },

    async getBySubject(subjectId: number): Promise<Teacher[]> {
        const response = await axios.get<Teacher[]>(`${API_URL}/by-subject/${subjectId}`);
        return response.data;
    },

    async create(teacher: Teacher): Promise<Teacher> {
        const response = await axios.post<Teacher>(API_URL, teacher);
        return response.data;
    },

    async update(id: number, teacher: Teacher): Promise<Teacher> {
        const response = await axios.put<Teacher>(`${API_URL}/${id}`, teacher);
        return response.data;
    },

    async remove(id: number): Promise<void> {
        await axios.delete(`${API_URL}/${id}`);
    }
};