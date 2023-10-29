import React, { useEffect, useState } from "react";
import {
  addNewCategoryApi,
  deleteCategoryApi,
  getCategoriesApi,
  updateCategoryApi,
} from "../../services/api/categories.service";
import {
  Space,
  Button,
  Popconfirm,
  Form,
  Spin,
  Col,
  Input,
  Modal,
  Select,
  Table,
  message,
} from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
export default function Categories() {
  const [categories, setCategories] = useState<any>([]);
  const [loading, setLoading] = useState(false);

  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<any>(null);
  const [form] = Form.useForm();

  const getCategories = async () => {
    setLoading(true);
    try {
      const res = await getCategoriesApi();
      setCategories(res);
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
    }
  };
  const onEdit = (item: any) => {
    setSelectedCategory(item);
    setIsEditModalVisible(true);
    form.setFieldsValue(item);
  };
  const onDelete = async (item: any) => {
    try {
      setLoading(true);
      await deleteCategoryApi(item.id);
      getCategories();

      setLoading(false);
    } catch (error: any) {
      message.error(error.message);
    }
  };
  const handleAdd = async () => {
    if (loading) return;
    try {
      setLoading(true);
      const values = await form.validateFields();
      await addNewCategoryApi(values);
      getCategories();
      setLoading(false);
      setIsAddModalVisible(false);
    } catch (error: any) {
      setLoading(false);
      message.error(error.message);
    }
  };
  const handleEdit = async () => {
    try {
      setLoading(true);
      const values = await form.validateFields();
      await updateCategoryApi(selectedCategory?.id, values);
      getCategories();
      setLoading(false);
      setIsEditModalVisible(false);
      setSelectedCategory(null);
    } catch (error: any) {
      setLoading(false);
      message.error(error.message);
    }
  };
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "",
      key: "action",
      render: (_: any, item: any) => (
        <Space size="middle">
          <Button
            type="text"
            onClick={() => onEdit(item)}
            icon={<EditOutlined />}
          ></Button>

          <Popconfirm title="Xác nhận xóa" onConfirm={() => onDelete(item)}>
            <Button type="text" icon={<DeleteOutlined />}></Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];
  useEffect(() => {
    getCategories();
  }, []);
  useEffect(() => {
    form.resetFields();
  }, [isAddModalVisible]);
  return (
    <Spin spinning={loading}>
      <Col
        span={24}
        style={{ textAlign: "right", marginTop: 40, marginBottom: 40 }}
      >
        <Button type="primary" onClick={() => setIsAddModalVisible(true)}>
          Add new
        </Button>
      </Col>
      <Table dataSource={categories} columns={columns} rowKey="id" />

      {/* Add  Modal */}
      <Modal
        title="New Category "
        visible={isAddModalVisible}
        onOk={handleAdd}
        onCancel={() => setIsAddModalVisible(false)}
        destroyOnClose={true}
      >
        <Spin spinning={loading}>
          <Form form={form} name="addForm" layout="vertical">
            <Form.Item
              label="Name"
              name="name"
              rules={[{ required: true, message: "Please enter name" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item label="Slug" name="slug">
              <Input />
            </Form.Item>
          </Form>
        </Spin>
      </Modal>

      {/* Edit  Modal */}
      <Modal
        title="Edit Category"
        visible={isEditModalVisible}
        onOk={handleEdit}
        onCancel={() => setIsEditModalVisible(false)}
        destroyOnClose={true}
      >
        <Spin spinning={loading}>
          <Form form={form} name="editForm" layout="vertical">
            <Form.Item
              label="Name"
              name="name"
              rules={[{ required: true, message: "Please enter name" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item label="Slug" name="slug">
              <Input />
            </Form.Item>
          </Form>
        </Spin>
      </Modal>
    </Spin>
  );
}
