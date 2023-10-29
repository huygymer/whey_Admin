import React, { useState } from 'react'
import ProductForm from './components/ProductForm';
import { message, Spin } from 'antd';
import { useHistory } from 'react-router-dom';
import { UploadFileApi } from '../../services/api/common.service';
import { addNewProductApi } from '../../services/api/product';

export default function AddProduct() {
    const [loading, setLoading] = useState(false);
    const history = useHistory();
    const onAdd = async (formValue: any) => {
      setLoading(true);
      const { values, thumbnail } = formValue;
      try {
        if (thumbnail) {
          const fileUrl = await UploadFileApi(thumbnail);
          values.imageUrl = fileUrl;
        }
        await addNewProductApi(values)
        setLoading(false);
        history.push("/products");
      } catch (error: any) {
        setLoading(false);
        message.error(error.message);
      }
    };
    return (
      <>
        <Spin spinning={loading}>
          <h1>Thêm mới bài viết</h1>
          <ProductForm
            submit={onAdd}
            initialValues={{
              title: "",
            }}
          />
        </Spin>
      </>
    );
}
