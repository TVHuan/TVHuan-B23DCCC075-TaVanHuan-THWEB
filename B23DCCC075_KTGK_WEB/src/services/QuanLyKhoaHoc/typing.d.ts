export interface Course {
  id: string;
  name: string;
  instructor: string;
  studentCount: number;
  status: 'OPEN' | 'CLOSED' | 'PAUSED';
  description?: string;
}

export interface Instructor {
  id: string;
  name: string;
}

export interface CourseFilter {
  searchName?: string;
  instructor?: string;
  status?: string;
}