import type { Teacher } from "./teacher";

export interface Classroom {
    id: number;
    levelName: string; // ex : "Cinquième"
    principalTeacherId: number;
    principalTeacher:Teacher|null;
  }