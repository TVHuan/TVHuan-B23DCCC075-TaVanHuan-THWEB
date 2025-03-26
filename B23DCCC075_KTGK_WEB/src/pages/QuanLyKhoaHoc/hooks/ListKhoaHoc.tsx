import { Table, Button, Popconfirm } from 'antd';
import { Course } from '../../../services/QuanLyKhoaHoc/typing';

interface CourseListProps {
  courses: Course[];
  onEdit: (course: Course) => void;
  onDelete: (id: string) => void;
}

const CourseList = ({ courses, onEdit, onDelete }: CourseListProps) => {
  const columns = [
    { title: 'ID', dataIndex: 'id', key: 'id' },
    { title: 'Tên khóa học', dataIndex: 'name', key: 'name' },
    { title: 'Giảng viên', dataIndex: 'instructor', key: 'instructor' },
    {
      title: 'Số học viên',
      dataIndex: 'studentCount',
      key: 'studentCount',
      sorter: (a: Course, b: Course) => a.studentCount - b.studentCount,
    },
    { title: 'Trạng thái', dataIndex: 'status', key: 'status' },
    {
      title: 'Hành động',
      key: 'action',
      render: (_: any, record: Course) => (
        <>
          <Button onClick={() => onEdit(record)} style={{ marginRight: 8 }}>
            Sửa
          </Button>
          <Popconfirm
            title="Bạn có chắc muốn xóa khóa học này?"
            onConfirm={() => onDelete(record.id)}
            disabled={record.studentCount > 0}
          >
            <Button disabled={record.studentCount > 0}>Xóa</Button>
          </Popconfirm>
        </>
      ),
    },
  ];

  return <Table columns={columns} dataSource={courses} rowKey="id" />;
};

export default CourseList;