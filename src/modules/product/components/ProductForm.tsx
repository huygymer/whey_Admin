import React, { useEffect, useState } from "react";
import { UploadFileApi } from "../../../services/api/common.service";
import { UploadOutlined } from "@ant-design/icons";
import slugify from "react-slugify";
import {
  Form,
  Input,
  Button,
  Select,
  InputNumber,
  Tag,
  Space,
  Col,
  Upload,
  Image,
  Typography,
  Switch,
} from "antd";

import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import ImageUploader from "quill-image-uploader";
import { getCategoriesApi } from "../../../services/api/categories.service";
Quill.register("modules/imageUploader", ImageUploader);
const { Option } = Select;
const { TextArea } = Input;

const modules = {
  toolbar: {
    container: [
      [{ header: "1" }, { header: "2" }, { font: [] }],
      [{ size: [] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image"],
      ["clean"],
    ],
  },
  imageUploader: {
    upload: (file: any) => {
      return new Promise(async (resolve, reject) => {
        const url = await UploadFileApi(file);
        resolve(url);
      });
    },
  },
};

const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "imageBlot",
];
export default function ProductForm({ initialValues, submit }: any) {
    console.log('initialValues:',initialValues);
    
  const [categories, setCategories] = useState<any>([]);
  const [form] = Form.useForm();
  const [localFile, setLocalFile] = useState<any>(null);
  const [description, setDescription] = useState(initialValues.description);

  const getCategories = async () => {
    try {
      const res = await getCategoriesApi();
      setCategories(res);
    } catch (error) {}
  };

  useEffect(() => {
    getCategories();
  }, []);

  const handleChange = (info: any) => {
    setLocalFile(info.fileList[0].originFileObj);
  };
  const handleFormChange = (changedValues: any, values: any) => {
    if ("name" in changedValues) {
      const slug = slugify(`${values.name}`);
      form.setFieldsValue({ slug });
    }
  };

  const onContentChange = (value: any) => {
    setDescription(value);
  };

  const quillModules = {
    toolbar: {
      container: [
        [{ header: "1" }, { header: "2" }, { font: [] }],
        [{ size: [] }],
        ["bold", "italic", "underline", "strike", "blockquote"],
        [
          { list: "ordered" },
          { list: "bullet" },
          { indent: "-1" },
          { indent: "+1" },
        ],
        ["link", "image", "video"],
        ["clean"],
      ],
    },
    clipboard: {
      // toggle to add extra line breaks when pasting HTML:
      matchVisual: false,
    },
  };

  const onFinish = (values: any) => {
    submit({
      values: { ...values, description },
      thumbnail: localFile,
    });
  };
  return (
    <Form
      name="doctor_form"
      onFinish={onFinish}
      initialValues={initialValues}
      style={{ marginTop: 20 }}
      layout="vertical"
      onValuesChange={handleFormChange}
      form={form}
    >
      <Form.Item
        label="Name"
        name="name"
        rules={[{ required: true, message: "Please enter a name" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Slug"
        name="slug"
        rules={[{ required: true, message: "Please enter a slug" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="quantity"
        name="quantity"
        rules={[{ required: true, message: "Please enter the quantity" }]}
      >
        <InputNumber style={{ width: "100%" }} />
      </Form.Item>

      <Form.Item
        label="Price"
        name="price"
        rules={[{ required: true, message: "Please enter the price" }]}
      >
        <InputNumber style={{ width: "100%" }} />
      </Form.Item>

      <Form.Item
        label="Old Price"
        name="oldPrice"
        rules={[{ required: true, message: "Please enter the oldPrice" }]}
      >
        <InputNumber style={{ width: "100%" }} />
      </Form.Item>
      <Form.Item
        label="Category"
        name="categoryId"
        rules={[{ required: true, message: "Please select a category" }]}
      >
        <Select>
          {categories.map((category: any) => (
            <Option key={category.id} value={category.id}>
              {category.name}
            </Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item label="Image">
        <Upload
          customRequest={() => {}}
          showUploadList={false}
          onChange={handleChange}
          fileList={[]}
          accept="image/*" // Allow only image files
          beforeUpload={() => false}
          maxCount={1}
          listType="picture"
        >
          <Button style={{ marginRight: 20 }} icon={<UploadOutlined />}>
            Select Image
          </Button>
        </Upload>
        {localFile ? (
          <Image
            src={URL.createObjectURL(localFile)}
            alt="Preview"
            width={200}
          />
        ) : (
          <Image
            src={initialValues.imageUrl || "../default.png"}
            alt="Preview"
            width={200}
          />
        )}
      </Form.Item>

      <Form.Item label="Description">
        <ReactQuill
          value={description}
          onChange={onContentChange}
          modules={modules}
          formats={formats}
          style={{ height: 300, marginBottom: 40 }}
        />
      </Form.Item>
      <Col span={24} style={{ textAlign: "right" }}>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Col>
    </Form>
  );
}
