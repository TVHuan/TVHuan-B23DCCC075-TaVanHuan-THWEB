import { useState, useEffect } from 'react';
import { Button, notification, Modal } from 'antd';
import CourseList from '../hooks/ListKhoaHoc';
import CourseForm from '../hooks/Form';
import CourseFilterComponent from '../hooks/CourseFilter';
import useInstructors from '../hooks/Instructors'; // Import hook mới
import { Course, CourseFilter } from '../../../services/QuanLyKhoaHoc/typing';
import { courseService } from '../../../models/khoahoc';

const CourseManagement = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | undefined>();

  // Sử dụng hook quản lý giảng viên
  const { getInstructorNames } = useInstructors();
  const instructors = getInstructorNames();

  useEffect(() => {
    const savedCourses = courseService.getCourses();
    setCourses(savedCourses);
    setFilteredCourses(savedCourses);
  }, []);

  const applyFilter = (filter: CourseFilter) => {
    let result = [...courses];

    if (filter.searchName) {
      result = result.filter((c) =>
        c.name.toLowerCase().includes((filter.searchName ?? '').toLowerCase())
      );
    }
    if (filter.instructor) {
      result = result.filter((c) => c.instructor === filter.instructor);
    }
    if (filter.status) {
      result = result.filter((c) => c.status === filter.status);
    }

    setFilteredCourses(result);
  };

  const handleAddEditCourse = (values: Course) => {
    let updatedCourses: Course[];
    if (values.id && courses.some((c) => c.id === values.id)) {
      updatedCourses = courses.map((c) => (c.id === values.id ? values : c));
    } else {
      updatedCourses = [...courses, values];
    }

    setCourses(updatedCourses);
    setFilteredCourses(updatedCourses);
    courseService.saveCourses(updatedCourses);
    setIsModalVisible(false);
    setSelectedCourse(undefined);
    notification.success({
      message: 'Thành công',
      description: `Khóa học đã được ${values.id ? 'cập nhật' : 'thêm mới'}`,
    });
  };

  const handleDeleteCourse = (id: string) => {
    const updatedCourses = courses.filter((c) => c.id !== id);
    setCourses(updatedCourses);
    setFilteredCourses(updatedCourses);
    courseService.saveCourses(updatedCourses);
    notification.success({
      message: 'Thành công',
      description: 'Khóa học đã được xóa',
    });
  };

  return (
    <div style={{ padding: 24 }}>
      <Button
        type="primary"
        onClick={() => setIsModalVisible(true)}
        style={{ marginBottom: 16 }}
      >
        Thêm khóa học
      </Button>

      <CourseFilterComponent onFilter={applyFilter} instructors={instructors} />

      <CourseList
        courses={filteredCourses}
        onEdit={(course) => {
          setSelectedCourse(course);
          setIsModalVisible(true);
        }}
        onDelete={handleDeleteCourse}
      />

      <Modal
        title={selectedCourse ? 'Chỉnh sửa khóa học' : 'Thêm khóa học'}
        visible={isModalVisible} // Giữ nguyên "visible" như code của bạn
        onCancel={() => {
          setIsModalVisible(false);
          setSelectedCourse(undefined);
        }}
        footer={null}
      >
        <CourseForm
          course={selectedCourse}
          instructors={instructors}
          onSubmit={handleAddEditCourse}
          onCancel={() => setIsModalVisible(false)}
          existingCourses={courses}
        />
      </Modal>
    </div>
  );
};

export default CourseManagement;