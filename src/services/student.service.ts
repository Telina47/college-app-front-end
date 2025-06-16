// 📁 src/services/studentService.ts
import axios from './axios';
import type { Student } from '../models/student';
import type { StudentDetail } from '../models/student.details';

const API_URL = 'https://localhost:7040/api/Students';

export const studentService = {
    async getAll(): Promise<Student[]> {
        const response = await axios.get<Student[]>(API_URL);
        return response.data;
    },

    async getById(id: number): Promise<StudentDetail> {
        const response = await axios.get<StudentDetail>(`${API_URL}/${id}/details`);
        return response.data;
    },

    async getByClass(classId: number): Promise<Student[]> {
        const response = await axios.get<Student[]>(`${API_URL}/by-class/${classId}`);
        return response.data;
    },

    async create(student: Student): Promise<Student> {
        const response = await axios.post<Student>(API_URL, student);
        return response.data;
    },

    async update(id: number, student: Student): Promise<Student> {
        const response = await axios.put<Student>(`${API_URL}/${id}`, student);
        return response.data;
    },

    async remove(id: number): Promise<void> {
        await axios.delete(`${API_URL}/${id}`);
    }
};
