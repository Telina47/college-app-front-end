import axios from './axios';
import type { Appreciation } from '../models/appreciation';

const APPRECIATION_API = 'https://localhost:7040/api/Appreciation';

export const appreciationService = {

    async create(app: Appreciation): Promise<Appreciation> {
        const response = await axios.post<Appreciation>(APPRECIATION_API, app);
        return response.data;
    },

    async update(id: number, app: Appreciation): Promise<Appreciation> {
        const response = await axios.put<Appreciation>(`${APPRECIATION_API}/${id}`, app);
        return response.data;
    },

    async remove(id: number): Promise<void> {
        await axios.delete(`${APPRECIATION_API}/${id}`);
    }
};
