import React, { useEffect, useState } from 'react'
import ProductForm from './components/ProductForm';
import { message, Spin } from 'antd';
import { useHistory, useParams } from 'react-router-dom';
import { UploadFileApi } from '../../services/api/common.service';
import { addNewProductApi, getProductDetailApi, updateProductApi } from '../../services/api/product';

export default function UpdateProduct() {
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState<any>(null);
  const params: any = useParams();
  const history = useHistory();

  const getProductDetail = async (slug:any) => {
    setLoading(true);
    try {
      const res = await getProductDetailApi(slug);
      setProduct(res);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };
  useEffect(() => {
    getProductDetail(params.slug);
  }, []);
  const onUpdate = async (formValue: any) => {
    setLoading(true);
    const { values, thumbnail } = formValue;
    try {
      if (thumbnail) {
        const thumbnailUrl = await UploadFileApi(thumbnail);
        values.imageUrl = thumbnailUrl;
      }
      await updateProductApi(product.id, values);
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
        <h1>{product?.name}</h1>
        {product && (
          <ProductForm
            submit={onUpdate}
            initialValues={product}
          />
        )}
      </Spin>
    </>
  );
}
