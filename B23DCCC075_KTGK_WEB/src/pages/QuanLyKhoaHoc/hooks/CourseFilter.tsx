import { Form, Input, Select, Button } from 'antd';
import { CourseFilter } from '../../../services/QuanLyKhoaHoc/typing'; // Interface

interface CourseFilterProps {
  onFilter: (values: CourseFilter) => void;
  instructors: string[];
}

const CourseFilterComponent = ({ onFilter, instructors }: CourseFilterProps) => {
  const [form] = Form.useForm();

  const handleSubmit = (values: CourseFilter) => {
    onFilter({
      searchName: values.searchName?.trim(),
      instructor: values.instructor,
      status: values.status,
    });
  };

  const handleReset = () => {
    form.resetFields();
    onFilter({});
  };

  return (
    <Form
      form={form}
      layout="inline"
      onFinish={handleSubmit}
      style={{ marginBottom: 16 }}
    >
      <Form.Item name="searchName" label="Tên khóa học">
        <Input placeholder="Tìm kiếm..." allowClear />
      </Form.Item>

      <Form.Item name="instructor" label="Giảng viên">
        <Select allowClear placeholder="Chọn giảng viên" style={{ width: 150 }}>
          {instructors.map((inst) => (
            <Select.Option key={inst} value={inst}>
              {inst}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item name="status" label="Trạng thái">
        <Select allowClear placeholder="Chọn trạng thái" style={{ width: 150 }}>
          <Select.Option value="OPEN">Đang mở</Select.Option>
          <Select.Option value="CLOSED">Đã kết thúc</Select.Option>
          <Select.Option value="PAUSED">Tạm dừng</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Lọc
        </Button>
        <Button onClick={handleReset} style={{ marginLeft: 8 }}>
          Reset
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CourseFilterComponent;