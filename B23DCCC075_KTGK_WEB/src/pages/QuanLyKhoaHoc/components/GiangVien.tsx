import { useState } from 'react';
import { Button, Input, Table, Popconfirm, notification } from 'antd';
import useInstructors, { Instructor } from '../hooks/Instructors';

const InstructorManager = () => {
  const { instructors, addInstructor, updateInstructor, deleteInstructor } = useInstructors();
  const [newInstructorName, setNewInstructorName] = useState('');

  const handleAdd = () => {
    try {
      addInstructor(newInstructorName);
      setNewInstructorName('');
      notification.success({ message: 'Thành công', description: 'Đã thêm giảng viên' });
    } catch (error: any) {
      notification.error({ message: 'Lỗi', description: error.message });
    }
  };

  const columns = [
    { title: 'ID', dataIndex: 'id', key: 'id' },
    { title: 'Tên giảng viên', dataIndex: 'name', key: 'name' },
    {
      title: 'Hành động',
      key: 'action',
      render: (_: any, record: Instructor) => (
        <>
          <Button
            onClick={() => {
              const newName = prompt('Nhập tên mới:', record.name);
              if (newName) updateInstructor(record.id, newName);
            }}
            style={{ marginRight: 8 }}
          >
            Sửa
          </Button>
          <Popconfirm
            title="Bạn có chắc muốn xóa giảng viên này?"
            onConfirm={() => deleteInstructor(record.id)}
          >
            <Button>Xóa</Button>
          </Popconfirm>
        </>
      ),
    },
  ];

  return (
    <div style={{ marginTop: 16 }}>
      <h3>Quản lý giảng viên</h3>
      <Input
        value={newInstructorName}
        onChange={(e) => setNewInstructorName(e.target.value)}
        placeholder="Nhập tên giảng viên"
        style={{ width: 200, marginRight: 8 }}
      />
      <Button type="primary" onClick={handleAdd}>
        Thêm giảng viên
      </Button>
      <Table
        columns={columns}
        dataSource={instructors}
        rowKey="id"
        style={{ marginTop: 16 }}
      />
    </div>
  );
};

export default InstructorManager;