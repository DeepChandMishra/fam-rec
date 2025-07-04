import React from "react";
import { useNavigate } from "react-router-dom";
import { Avatar, Typography, Divider } from "antd";
import {
  UserOutlined,
  SettingOutlined,
  BellOutlined,
  LogoutOutlined,
  RightOutlined,
} from "@ant-design/icons";
import "./index.scss";

const { Text } = Typography;

type ProfileDropdownProps = {
  user: {
    id: number;
    username: string;
    email: string;
    phone_number: string;
  } | null;
  onClose: () => void;
  onSelectItem: () => void;
};

const ProfileDropdown: React.FC<ProfileDropdownProps> = ({
  user,
  onClose,
  onSelectItem,
}) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
    onClose();
  };

  const menuItems = [
    {
      icon: <UserOutlined />,
      label: "My Profile",
      hasArrow: true,
      onClick: onSelectItem,
    },
    {
      icon: <SettingOutlined />,
      label: "Settings",
      hasArrow: true,
      onClick: onSelectItem,
    },
    {
      icon: <BellOutlined />,
      label: "Notification",
      hasArrow: false,
      rightText: "Allow",
      onClick: onSelectItem,
    },
    {
      icon: <LogoutOutlined />,
      label: "Log Out",
      hasArrow: false,
      onClick: handleLogout,
    },
  ];

  return (
    <div className="profile-dropdown-container">
      <div className="profile-header">
        <Avatar
          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=60&h=60&fit=crop&crop=face"
          size={48}
        />
        <div className="profile-info">
          <Text strong className="name">
            {user?.username || "Guest"}
          </Text>
          <Text type="secondary" className="email">
            {user?.email || "guest@example.com"}
          </Text>
        </div>
      </div>

      <Divider style={{ margin: "16px 0" }} />

      <div className="menu-items">
        {menuItems.map((item, index) => (
          <div
            key={index}
            className="menu-item"
            onClick={() => {
              item.onClick();
              if (item.label !== "Log Out") onClose();
            }}
          >
            <div className="menu-item-left">
              <span className="menu-icon">{item.icon}</span>
              <span className="menu-label">{item.label}</span>
            </div>
            <div className="menu-item-right">
              {item.rightText && (
                <span className="right-text">{item.rightText}</span>
              )}
              {item.hasArrow && <RightOutlined className="arrow-icon" />}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfileDropdown;
