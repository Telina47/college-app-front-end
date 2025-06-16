import axios from './axios';
import type { Subject } from '../models/subject';

const API_URL = 'https://localhost:7040/api/Subjects';

export const subjectService = {
    async getAll(): Promise<Subject[]> {
        const response = await axios.get<Subject[]>(API_URL);
        return response.data;
    },

    async getById(id: number): Promise<Subject> {
        const response = await axios.get<Subject>(`${API_URL}/${id}`);
        return response.data;
    },
    async getByTeacher(teacherid: number): Promise<Subject[]> {
        const response = await axios.get<Subject[]>(`${API_URL}/by-teacher/${teacherid}`);
        return response.data;
    },

    async create(subject: Subject): Promise<Subject> {
        const response = await axios.post<Subject>(API_URL, subject);
        return response.data;
    },

    async update(id: number, subject: Subject): Promise<Subject> {
        const response = await axios.put<Subject>(`${API_URL}/${id}`, subject);
        return response.data;
    },

    async remove(id: number): Promise<void> {
        await axios.delete(`${API_URL}/${id}`);
    }
};
