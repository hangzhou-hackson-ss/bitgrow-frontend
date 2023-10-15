import React, { ReactNode,  useState } from "react";
import type { MenuProps } from "antd";
import { Breadcrumb, Button, Layout, Menu, theme, Space } from "antd";
import { BellOutlined } from "@ant-design/icons";
import Logo from "../logo";
import { Content } from "antd/es/layout/layout";
import { useLocation, useNavigate } from "react-router-dom";

const { Header, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem("任务管理", "/admin/task-management"),
  getItem("KOL 清单", "/admin/kol"),
  getItem("成效分析", "/admin/analysis"),
  getItem("发布任务", "/admin/create-task"),
];

const _Layout: React.FC<{
  children: ReactNode | ReactNode[] | undefined;
}> = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const location = useLocation();
  const selectedItem = items.find((item) => {
    if (location.pathname === "/") {
      return item?.key === "/overview";
    }
    return item?.key === location.pathname;
  });
  const navigate = useNavigate();

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <Logo />
        <hr className=" opacity-25" />
        <Menu
          theme="dark"
          onClick={(e) => {
            navigate(e.key === "/overview" ? "/" : e.key);
          }}
          defaultSelectedKeys={[selectedItem?.key as any]}
          mode="inline"
          items={items}
        />
      </Sider>

      <Layout>
        <Header
          rootClassName="items-end"
          style={{ background: colorBgContainer }}
        >
          <div className="w-full h-full flex flex-row justify-end items-center">
            <button>
              <BellOutlined className="ml-6 text-xl" />
            </button>
            <div className="ml-6">
              <w3m-button />
            </div>
          </div>
        </Header>
        <Content style={{ margin: "0 16px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>{(selectedItem as any).label}</Breadcrumb.Item>
          </Breadcrumb>
          {children}
        </Content>
        <Footer style={{ textAlign: "center" }}>
          BitGrow Inc ©{new Date().getFullYear()}
        </Footer>
      </Layout>
    </Layout>
  );
};

export default _Layout;
