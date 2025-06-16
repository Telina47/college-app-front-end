// 📁 src/services/gradeService.ts
import axios from './axios';
import type { Grade } from '../models/grade';

const GRADE_API = 'https://localhost:7040/api/Grades';

export const gradeService = {
    async getByStudent(studentId: number): Promise<Grade[]> {
        const response = await axios.get<Grade[]>(`${GRADE_API}/student/${studentId}`);
        return response.data;
    },

    async create(grade: Grade): Promise<Grade> {
        const response = await axios.post<Grade>(GRADE_API, grade);
        return response.data;
    },

    async update(id: number, grade: Grade): Promise<Grade> {
        const response = await axios.put<Grade>(`${GRADE_API}/${id}`, grade);
        return response.data;
    },

    async remove(id: number): Promise<void> {
        await axios.delete(`${GRADE_API}/${id}`);
    }
};