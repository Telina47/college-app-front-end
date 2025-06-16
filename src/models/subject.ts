import type { TeacherSubject } from "./teacher.subjects";

export interface Subject {
    id: number;
    name: string;
    teacherSubjects: TeacherSubject[]
  }