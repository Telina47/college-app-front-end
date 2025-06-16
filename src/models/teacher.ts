import type { TeacherSubject } from "./teacher.subjects";

export interface Teacher {
    id: number;
    firstName: string;
    lastName: string;
    gender: 'M' | 'F';
    teacherSubjects:TeacherSubject[];
  }