import React, { useState } from "react";
import { Form, Input, Button, Card, Spin, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import "../../assets/Login.scss";
import { setToken } from "../../redux/auth/authActions";
import { useHistory } from 'react-router-dom';
import { loginApi } from "../../services/api/common.service";
const Login = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const onFinish = async (values: any) => {
    try {
      setLoading(true);
      const res = await loginApi(values);
      const { accessToken } = res;
      if (!accessToken) {
        message.error(res.message);
      } else {
        localStorage.setItem("accessToken", accessToken);
        dispatch(setToken(accessToken));
        history.push('/products');
      }
      setLoading(false);
    } catch (error: any) {
      message.error(error.message);
      setLoading(false);
    }
  };

  return (
    <Spin spinning={loading}>
      <div className="login-container">
        <Card className="login-card">
          <h1 className="login-title">Login</h1>
          <Form
            name="login-form"
            initialValues={{ remember: true }}
            onFinish={onFinish}
          >
            <Form.Item
              name="email"
              rules={[
                { required: true, message: "Please enter your email!" },
              ]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Username"
              />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Please enter your password!" },
              ]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                Log in
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </Spin>
  );
};
export default Login;
