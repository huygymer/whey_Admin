import React from "react";
import { Layout, Menu } from "antd";
import Sider from "antd/es/layout/Sider";
import { Content } from "antd/es/layout/layout";
import {
  DashboardOutlined,
  UserOutlined,
  FileOutlined,
  SettingOutlined,
  LogoutOutlined,
  VideoCameraOutlined,
  ReadOutlined,
} from "@ant-design/icons";
import { Link, useLocation, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearToken } from "../redux/auth/authActions";

interface MenuItem {
  key: string;
  title: string;
  icon: React.ReactNode;
  path: string;
}

interface MainLayoutProps {
  children: React.ReactNode;
}

const menuItems: MenuItem[] = [
  {
    key: "products",
    title: "products",
    icon: <DashboardOutlined />,
    path: "/products",
  },
  {
    key: "categories",
    title: "categories",
    icon: <VideoCameraOutlined />,
    path: "/categories",
  },

];

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const history = useHistory();

  const logout = () => {
    localStorage.removeItem("accessToken");
    dispatch(clearToken());
    history.push("/login");
  };

  const getSelectedKeys = () => {
    const currentPath = location.pathname;

    const matchingItems = menuItems.filter((item) =>
      currentPath.includes(item.key)
    );

    return matchingItems.map((item) => item.key);
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider collapsedWidth={0} breakpoint="md" theme="dark" width={200}>
        <Menu
          selectedKeys={getSelectedKeys()}
          theme="dark"
          mode="vertical"
          defaultSelectedKeys={["1"]}
        >
          {menuItems.map((item) => (
            <Menu.Item key={item.key} icon={item.icon}>
              <Link to={item.path}>{item.title}</Link>
            </Menu.Item>
          ))}
          <Menu.Item key="logout" onClick={logout} icon={<LogoutOutlined />}>
            <Link to="/">Logout</Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Content
          style={{
            margin: "16px",
            background: "#00000038",
            borderRadius: 20,
            padding: 15,
          }}
        >
          <div className="container">{children}</div>
        </Content>{" "}
      </Layout>
    </Layout>
  );
};

export default MainLayout;
