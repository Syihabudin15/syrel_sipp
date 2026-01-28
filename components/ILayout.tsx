"use client";

import {
  BellOutlined,
  DoubleLeftOutlined,
  DoubleRightOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Badge, Button, Dropdown, Layout, Menu, Modal } from "antd";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "./UserContext";
import { listMenuUI, MenuPermission } from "./IMenu";

const { Header, Content, Sider } = Layout;

export default function ILayout({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const router = useRouter();
  const user = useUser();

  const handleLogout = async () => {
    setLoading(true);
    await fetch("/api/auth", { method: "DELETE" })
      .then((res) => res.json())
      .then(() => {
        window.location.replace("/");
      });
    setLoading(false);
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        breakpoint="xs"
        collapsedWidth={window && window.innerWidth > 600 ? 80 : 0}
        collapsed={collapsed}
        onCollapse={(value: boolean) => setCollapsed(value)}
        width={collapsed ? 80 : 250}
        className={collapsed ? "flex flex-col justify-center items-center" : ""}
      >
        <div
          className="flex gap-3 bg-linear-to-br from-green-500 to-gray-500 rounded p-2 items-center"
          style={{
            margin: 3,
            color: "rgba(255, 255, 255, 0.85)",
            ...(collapsed ? { display: "none" } : { display: "flex" }),
          }}
        >
          <img
            src="https://www.svgrepo.com/show/384674/account-avatar-profile-user-11.svg"
            alt="profile_picture"
            className="w-18 h-18 rounded-full border-2 border-white overflow-hidden"
          />
          <div className="flex-1">
            <div style={{ lineHeight: 1 }}>
              <div className="font-bold">{"Syihabudin Tsani"}</div>
              <div className="opacity-60 italic text-xs">
                <div>@{"username"}</div>
                <div>@{"rolename"}</div>
                <div className="flex justify-end">
                  <Button
                    size="small"
                    type="primary"
                    icon={<DoubleLeftOutlined />}
                    onClick={() => setCollapsed(true)}
                  ></Button>
                </div>
              </div>
            </div>
          </div>
        </div>
        {collapsed && window && window.innerWidth > 600 && (
          <div className="flex justify-center">
            <Button
              size="small"
              icon={<DoubleRightOutlined />}
              onClick={() => setCollapsed(false)}
              className="my-2"
              type="primary"
            ></Button>
          </div>
        )}
        {user && (
          <Menu
            theme="dark"
            mode="inline"
            inlineCollapsed={collapsed}
            style={{
              width: collapsed
                ? window && window.innerWidth > 600
                  ? 80
                  : 0
                : 250,
            }}
            items={MenuPermission(
              listMenuUI,
              JSON.parse(user.Role.permission || "").map((p: any) => p.path)
            )}
            onClick={(e) => router.push(e.key)}
          />
        )}
        {!collapsed && (
          <div className="text-xs italic text-white opacity-50 ms-4 mt-2">
            <div>© Created 2026 by Syrel Teknology</div>
          </div>
        )}
      </Sider>

      <Layout>
        {/* Header */}
        <Header
          style={{
            padding: 0,
            height: 45,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            background: "#fff",
          }}
        >
          <p className="ml-5 font-bold text-xl">
            {process.env.NEXT_PUBLIC_APP_SHORTNAME}
          </p>
          <div className="pr-4 flex gap-4 items-center">
            <Dropdown
              trigger={["hover"]}
              placement="bottomRight"
              popupRender={() => (
                <div
                  style={{
                    width: 250,
                    maxHeight: 300,
                    overflowY: "auto",
                    padding: 10,
                    background: "white",
                    borderRadius: 8,
                    boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                  }}
                  className="flex flex-wrap gap-2 items-center justify-center italic text-xs"
                >
                  Notify
                </div>
              )}
            >
              <Button
                icon={
                  <Badge count={0} size="small" showZero>
                    <BellOutlined style={{ cursor: "pointer" }} />
                  </Badge>
                }
              ></Button>
            </Dropdown>
            <p>{"Syihabudin"}</p>
            <Button
              icon={<LogoutOutlined />}
              danger
              onClick={() => setOpen(true)}
            ></Button>
          </div>
        </Header>

        {/* Konten Utama */}
        <Content style={{ margin: "5px 5px" }}>
          <div
            style={{
              minHeight: 360,
            }}
          >
            {children}
          </div>
        </Content>
      </Layout>
      <Modal
        open={open}
        onCancel={() => setOpen(false)}
        title={"Konfirmasi Logout?"}
        onOk={() => handleLogout()}
        loading={loading}
      >
        <p>Lanjutkan untuk keluar?</p>
      </Modal>
    </Layout>
  );
}
