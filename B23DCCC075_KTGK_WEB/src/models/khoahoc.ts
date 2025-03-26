import { Course } from '../services/QuanLyKhoaHoc/typing';


export const courseService = {
  getCourses: (): Course[] => {
    const courses = localStorage.getItem('courses');
    return courses ? JSON.parse(courses) : [];
  },

  saveCourses: (courses: Course[]) => {
    localStorage.setItem('courses', JSON.stringify(courses));
  },

  getInstructors: (): string[] => {
    return ['Tạ Văn Huấn', 'Đồng Nguyễn Trà My', 'Nguyễn Thị Thanh Huyền']; 
  },
};