import { MenuOutlined } from "@ant-design/icons";
import {
  Avatar,
  Button,
  Divider,
  Flex,
  Layout,
  Menu,
  MenuProps,
  Space,
  Typography,
  message,
  theme,
  Dropdown,
} from "antd";
import { Header } from "antd/es/layout/layout";
import React, { useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ICONS_PATH } from "../../constants/icons-path";
import "./HeaderComponent.scss";
import ProfileDropdown from "../../pages/user-settings/settings";

const { useToken } = theme;

function HeaderComponent() {
  const { token } = useToken();
  const navigate = useNavigate();
  const location = useLocation();
  const [messageApi, contextHolder] = message.useMessage();
  const [showUserSettings, setShowUserSettings] = useState(false);
  const settingsRef = useRef<HTMLDivElement | null>(null);

  const isUserLoggedIn = !!localStorage.getItem("refresh_token");

  const storedUserStr = localStorage.getItem("userData");
  const storedUser = storedUserStr ? JSON.parse(storedUserStr) : null;

  const currentPath = location.pathname.split("/")[1];

  const userName = storedUser?.username || "Guest";
  const userInitials = userName
    .split(" ")
    .map((n: string) => n[0])
    .join("")
    .toUpperCase();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  const items1: MenuProps["items"] = [
    {
      key: "family-tree",
      label: (
        <span
          onClick={() =>
            isUserLoggedIn
              ? navigate("/family-tree")
              : messageApi.warning("Please login first")
          }
        >
          Family Tree
        </span>
      ),
    },
    {
      key: "albums",
      label: (
        <span
          onClick={() =>
            isUserLoggedIn
              ? navigate("/albums")
              : messageApi.warning("Please login first")
          }
        >
          Albums
        </span>
      ),
    },
    {
      key: "memories",
      label: (
        <span
          onClick={() =>
            isUserLoggedIn
              ? navigate("/memories")
              : messageApi.warning("Please login first")
          }
        >
          Memories
        </span>
      ),
    },
    {
      key: "explore-pages",
      label: (
        <span
          onClick={() =>
            isUserLoggedIn
              ? navigate("/explore-pages")
              : messageApi.warning("Please login first")
          }
        >
          Explore
        </span>
      ),
    },
    {
      key: "about-us",
      label: (
        <span
          onClick={(e) => {
            if (!isUserLoggedIn) {
              e.preventDefault();
              messageApi.warning("Please login first");
            } else {
              navigate("/about-us");
            }
          }}
        >
          About Us
        </span>
      ),
      title: "About Us",
    },
  ];

  const headerStyle: React.CSSProperties = {
    backgroundColor: "#fff",
    borderBottom: "1px solid #e0e0e0",
    position: "sticky",
    top: 0,
    zIndex: 1,
    width: "100%",
    display: "flex",
    alignItems: "center",
    padding: "0 24px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.05)",
  };

  const handleProfileClick = () => {
    setShowUserSettings(!showUserSettings);
  };

  return (
    <Layout>
      {contextHolder}
      <Header style={headerStyle}>
        <Flex justify="space-between" align="center" style={{ width: "100%" }}>
          <img
            src={ICONS_PATH.FAMREC_LOGO}
            height={40}
            width={90}
            alt="Logo"
            onClick={() => navigate("/landing")}
            style={{ cursor: "pointer" }}
          />

          <Menu
            mode="horizontal"
            items={items1}
            selectedKeys={[currentPath]}
            style={{ flex: 1, justifyContent: "center" }}
            className="desktop-menu"
          />

          <Flex align="center" className="desktop-buttons" gap={10}>
            {!isUserLoggedIn ? (
              <>
                <Link to="/signup">
                  <Button shape="round">Signup</Button>
                </Link>
                <Link to="/login">
                  <Button shape="round">Login</Button>
                </Link>
              </>
            ) : (
              <div ref={settingsRef} className="user-settings-wrapper">
                <div
                  className="user-info"
                  onClick={handleProfileClick}
                >
                  <Avatar style={{ backgroundColor: "#87d068" }}>
                    {userInitials}
                  </Avatar>
                  <Typography.Text strong>{userName}</Typography.Text>
                </div>

                {showUserSettings && (
                  <div className="dropdown-wrapper">
                    <ProfileDropdown
                      user={storedUser}
                      onClose={() => setShowUserSettings(false)}
                      onSelectItem={() => {
                        setShowUserSettings(false);
                        navigate("/profile");
                      }}
                    />
                  </div>
                )}
              </div>
            )}
          </Flex>

          <Dropdown
            menu={{ items: items1, selectable: true }}
            trigger={["click"]}
            className="mobile-menu-dropdown"
            dropdownRender={(menu: any) => (
              <div
                style={{
                  backgroundColor: token.colorBgElevated,
                  borderRadius: token.borderRadiusLG,
                  boxShadow: token.boxShadowSecondary,
                }}
              >
                {React.cloneElement(menu, { style: { boxShadow: "none" } })}
                <Divider style={{ margin: 0 }} />
                <Space style={{ padding: 8 }}>
                  {!isUserLoggedIn ? (
                    <>
                      <Link to="/signup">
                        <Button shape="round">Signup</Button>
                      </Link>
                      <Link to="/login">
                        <Button shape="round">Login</Button>
                      </Link>
                    </>
                  ) : (
                    <Button shape="round" onClick={handleLogout}>
                      Logout
                    </Button>
                  )}
                </Space>
              </div>
            )}
          >
            <MenuOutlined style={{ fontSize: "20px", cursor: "pointer" }} />
          </Dropdown>
        </Flex>
      </Header>
    </Layout>
  );
}

export default HeaderComponent;
