import { Form, Input, Select, Button, notification } from 'antd';
import { Course } from '../../../services/QuanLyKhoaHoc/typing';
import { useEffect } from 'react';

interface CourseFormProps {
  course?: Course;
  instructors: string[];
  onSubmit: (values: Course) => void;
  onCancel: () => void;
  existingCourses: Course[];
}

const CourseForm = ({ course, instructors, onSubmit, onCancel, existingCourses }: CourseFormProps) => {
  const [form] = Form.useForm();

  // Đảm bảo form luôn cập nhật khi course thay đổi
  useEffect(() => {
    if (course) {
      form.setFieldsValue(course); // Cập nhật lại giá trị của form khi course thay đổi
    }
  }, [course, form]);

  const handleSubmit = (values: any) => {
    // Kiểm tra tên khóa học có bị trùng không
    const isDuplicate = existingCourses.some(
      (c) => c.name === values.name && c.id !== (course?.id || '')
    );
    if (isDuplicate) {
      notification.error({
        message: 'Lỗi',
        description: 'Tên khóa học đã tồn tại',
      });
      return;
    }

    // Thêm số lượng sinh viên (nếu không có thì mặc định là 0)
    onSubmit({
      ...course,
      ...values,
      id: course?.id || Date.now().toString(),
      studentCount: values.studentCount || 0,  // Thêm số lượng sinh viên
    });
    form.resetFields();
  };

  return (
    <Form
      form={form}
      onFinish={handleSubmit}
      layout="vertical"
    >
      <Form.Item
        name="name"
        label="Tên khóa học"
        rules={[
          { required: true, message: 'Vui lòng nhập tên khóa học' },
          { max: 100, message: 'Tên khóa học tối đa 100 ký tự' },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="instructor"
        label="Giảng viên"
        rules={[{ required: true, message: 'Vui lòng chọn giảng viên' }]}
      >
        <Select>
          {instructors.map((inst) => (
            <Select.Option key={inst} value={inst}>
              {inst}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item name="description" label="Mô tả">
        <Input.TextArea />
      </Form.Item>

      <Form.Item
        name="status"
        label="Trạng thái"
        rules={[{ required: true, message: 'Vui lòng chọn trạng thái' }]}
      >
        <Select>
          <Select.Option value="OPEN">Đang mở</Select.Option>
          <Select.Option value="CLOSED">Đã kết thúc</Select.Option>
          <Select.Option value="PAUSED">Tạm dừng</Select.Option>
        </Select>
      </Form.Item>

      {/* Thêm trường số lượng sinh viên */}
      <Form.Item
        name="studentCount"
        label="Số lượng sinh viên"
        rules={[{ required: true, message: 'Vui lòng nhập số lượng sinh viên' }]}>
        <Input type="number" min={0} />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          {course ? 'Cập nhật' : 'Thêm mới'}
        </Button>
        <Button onClick={onCancel} style={{ marginLeft: 8 }}>
          Hủy
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CourseForm;
