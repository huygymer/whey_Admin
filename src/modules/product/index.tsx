import {
  Checkbox,
  Space,
  Tag,
  Button,
  Popconfirm,
  message,
  Spin,
  Col,
  Table,
  Image,
} from "antd";
import { ColumnsType } from "antd/es/table";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import {
  deleteProductApi,
  getProductDetailApi,
  getProductsApi,
} from "../../services/api/product";
import { deleteCategoryApi } from "../../services/api/categories.service";
export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const columns: ColumnsType<any> = [
    {
      title: "name",
      dataIndex: "name",
      sorter: (a, b) => a.title.localeCompare(b.name),
    },
    {
      title: "Image",
      dataIndex: "img",
      render: (value, record) => <Image width={100} src={record.imageUrl} />,
    },
    {
        title: "Price",
        dataIndex: "price",
        sorter: (a, b) => Number(a.price) - Number(b.price),
      },
    {
      title: "Quantity",
      dataIndex: "quantity",
      sorter: (a, b) => Number(a.quantity) - Number(b.quantity),
    },
    {
      title: "Category",
      key: "category",
      render: (value, record) => (
        <Space size={[0, 8]}>{record.category.name}</Space>
      ),
    },

    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <Space size="middle">
          <Link to={"product/" + record.slug}>
            <Button type="text" icon={<EditOutlined />}></Button>
          </Link>
          <Popconfirm
            title="Xác nhận xóa"
            onConfirm={() => handleDelete(record)}
          >
            <Button type="text" icon={<DeleteOutlined />}></Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const getProducts = async () => {
    setLoading(true);
    try {
      const res = await getProductsApi();
      setProducts(res);
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      message.error(error.message);
    }
  };
  const handleDelete = async (record: any) => {
    setLoading(true);
    try {
      await deleteProductApi(record.id);
      await getProducts();
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      message.error(error.message);
    }
  };
  useEffect(() => {
    getProducts();
  }, []);
  return (
    <Spin spinning={loading}>
      <h1> Manage Product </h1>
      <Col span={24} style={{ textAlign: "right" }}>
        <Link to={"products/add"}>
          <Button type="primary" style={{ marginBottom: 16 }}>
            Add New Product 
          </Button>
        </Link>
      </Col>
      <Table columns={columns} rowKey="id" dataSource={products} />
    </Spin>
  );
}
