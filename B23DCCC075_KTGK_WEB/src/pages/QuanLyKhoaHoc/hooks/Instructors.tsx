import { useState, useEffect } from 'react';

export interface Instructor {
  id: string;
  name: string;
}

const useInstructors = () => {
  const [instructors, setInstructors] = useState<Instructor[]>([]);

  // Lấy danh sách giảng viên từ localStorage khi khởi tạo
  useEffect(() => {
    const savedInstructors = localStorage.getItem('instructors');
    if (savedInstructors) {
      setInstructors(JSON.parse(savedInstructors));
    } else {
      const defaultInstructors: Instructor[] = [
        { id: '1', name: 'Tạ Văn Huấn' },
        { id: '2', name: 'Đồng Nguyễn Trà My' },
        { id: '3', name: 'Nguyễn Thị Thanh Huyền' },
      ];
      setInstructors(defaultInstructors);
      localStorage.setItem('instructors', JSON.stringify(defaultInstructors));
    }
  }, []);

  // Thêm giảng viên mới
  const addInstructor = (name: string) => {
    const trimmedName = name.trim();
    if (!trimmedName) {
      throw new Error('Tên giảng viên không được để trống');
    }
    if (instructors.some((inst) => inst.name === trimmedName)) {
      throw new Error('Tên giảng viên đã tồn tại');
    }

    const newInstructor: Instructor = {
      id: Date.now().toString(),
      name: trimmedName,
    };
    const updatedInstructors = [...instructors, newInstructor];
    setInstructors(updatedInstructors);
    localStorage.setItem('instructors', JSON.stringify(updatedInstructors));
    return newInstructor;
  };

  // Sửa giảng viên
  const updateInstructor = (id: string, name: string) => {
    const trimmedName = name.trim();
    if (!trimmedName) {
      throw new Error('Tên giảng viên không được để trống');
    }
    if (instructors.some((inst) => inst.name === trimmedName && inst.id !== id)) {
      throw new Error('Tên giảng viên đã tồn tại');
    }

    const updatedInstructors = instructors.map((inst) =>
      inst.id === id ? { ...inst, name: trimmedName } : inst
    );
    setInstructors(updatedInstructors);
    localStorage.setItem('instructors', JSON.stringify(updatedInstructors));
  };

  // Xóa giảng viên
  const deleteInstructor = (id: string) => {
    const updatedInstructors = instructors.filter((inst) => inst.id !== id);
    setInstructors(updatedInstructors);
    localStorage.setItem('instructors', JSON.stringify(updatedInstructors));
  };

  // Lấy danh sách tên giảng viên (dùng cho dropdown)
  const getInstructorNames = () => instructors.map((inst) => inst.name);

  return {
    instructors, // Danh sách đầy đủ (id, name)
    addInstructor,
    updateInstructor,
    deleteInstructor,
    getInstructorNames, // Chỉ lấy tên
  };
};

export default useInstructors;