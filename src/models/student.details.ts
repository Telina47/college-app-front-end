import type { Appreciation } from "./appreciation";
import type { Classroom } from "./classroom";
import type { Grade } from "./grade";

export interface StudentDetail {
    id: number;
    firstName: string;
    lastName: string;
    gender: string;
    classId: number;
    class: Classroom | null;
    grades: Grade[];
    appreciations: Appreciation[];
  }