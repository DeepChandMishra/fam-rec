import { useState, useEffect } from "react";
import {
  RightOutlined,
  CloseOutlined,
  DownOutlined,
  SettingOutlined,
  BellOutlined,
  LogoutOutlined,
  UserOutlined,
} from "@ant-design/icons";
import "./index.scss";
import { AuthService } from "../../services/AuthService";
import { useNavigate } from "react-router-dom";


type Member = {
  id: number;
  name: string;
  email: string;
  avatar: string;
  mobile?: string;
  location: string;
  ageGender: string;
};

const Profile = () => {
  const [theme] = useState("Light");
  const [language] = useState("Eng");
  const [showSettingsCard, setShowSettingsCard] = useState(false);
  const [showProfileCard, setShowProfileCard] = useState(false);
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [editableMember, setEditableMember] = useState<Member | null>(null);
  const [members, setMembers] = useState<Member[]>([]);
  const [newAvatarFile, setNewAvatarFile] = useState<File | null>(null);

  const storedUserStr = localStorage.getItem("userData");
  const storedUser = storedUserStr ? JSON.parse(storedUserStr) : null;
  const navigate = useNavigate();

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      const response = await AuthService.getFamilyMembers();
      const apiMembers = response.data.members.map((m: any) => ({
        id: m.id,
        name: m.name,
        email: "deep@yopmail.com",
        avatar: m.image_path,
        mobile: m.mobile_number,
        location: "dehradun",
        ageGender: `${m.age} / ${m.relation_type}`,
      }));
      setMembers(apiMembers);
    } catch (error) {
      console.error("Failed to fetch members:", error);
    }
  };

  const handleMemberClick = (member: Member) => {
    setSelectedMember(member);
    setEditableMember({ ...member });
    setNewAvatarFile(null); // reset avatar file
    setShowProfileCard(true);
    setShowSettingsCard(false);
  };

  const handleMyProfileClick = () => {
    console.log("My Profile Clicked", storedUser);
    if (storedUser) {
      const myProfileMember: Member = {
        id: storedUser.id || 0, // assuming storedUser has an id
        name: storedUser.username || "Me",
        email: storedUser.email || "N/A",
        avatar: storedUser.avatar || "/api/placeholder/80/80",
        mobile: storedUser.phone_number || "Not set",
        location: storedUser.location || "Not specified",
        ageGender: storedUser.ageGender || "N/A",
      };
      setSelectedMember(myProfileMember);
      setEditableMember({ ...myProfileMember });
      setNewAvatarFile(null);
      setShowProfileCard(true);
      setShowSettingsCard(false);
    }
  };

  const handleSettingsClick = () => {
    setShowSettingsCard(true);
    setShowProfileCard(false);
    setSelectedMember(null);
  };

  const closeProfileModal = () => {
    setShowProfileCard(false);
    setSelectedMember(null);
    setEditableMember(null);
    setNewAvatarFile(null);
  };

  const handleInputChange = (field: keyof Member, value: string) => {
    if (editableMember) {
      setEditableMember({ ...editableMember, [field]: value });
    }
  };

  const handleAvatarClick = () => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "image/*";
    fileInput.onchange = (e: Event) => {
      const target = e.target as HTMLInputElement;
      if (target.files && target.files[0]) {
        const file = target.files[0];
        setNewAvatarFile(file);
        // show preview immediately
        const reader = new FileReader();
        reader.onload = () => {
          if (editableMember) {
            setEditableMember({
              ...editableMember,
              avatar: reader.result as string,
            });
          }
        };
        reader.readAsDataURL(file);
      }
    };
    fileInput.click();
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const handleSave = async () => {
    if (!editableMember) return;

    const formData = new FormData();
    formData.append("name", editableMember.name);
    formData.append("mobile_number", editableMember.mobile || "");
    formData.append("email", editableMember.email);
    formData.append("location", editableMember.location);
    formData.append("age_gender", editableMember.ageGender);

    if (newAvatarFile) {
      formData.append("image", newAvatarFile);
    }

    try {
      await AuthService.updateFamilyMember(editableMember.id.toString(), formData);
      alert("Member updated successfully!");
      fetchMembers();
      closeProfileModal();
    } catch (error) {
      console.error("Update failed:", error);
      alert("Failed to update member.");
    }
  };

  return (
    <>
      <div className={`member-management ${showProfileCard ? "shift-right" : ""}`}>
        {/* Left Panel */}
        <div className="left-panel">
          <div className="profile-header">
            <div className="profile-info">
              <img src={storedUser?.avatar || "/api/placeholder/80/80"} alt={storedUser?.username} />
            </div>
            <div className="profile-info">
              <h3>{storedUser?.username}</h3>
              <p>{storedUser?.email}</p>
            </div>
          </div>

          {/* Navigation */}
          <div className="navigation">
            <div className="nav-item" onClick={handleMyProfileClick}>
              <div className="menu-item-left">
                <UserOutlined className="nav-icon" />
                <span className="nav-label">My Profile</span>
              </div>
              <div className="menu-item-right">
                <RightOutlined className="nav-arrow" />
              </div>
            </div>
            <div className="nav-item" onClick={handleSettingsClick}>
              <div className="menu-item-left">
                <SettingOutlined className="nav-icon" />
                <span className="nav-label">Settings</span>
              </div>
              <div className="menu-item-right">
                <RightOutlined className="nav-arrow" />
              </div>
            </div>
            <div className="nav-item">
              <div className="menu-item-left">
                <BellOutlined className="nav-icon" />
                <span className="nav-label">Notifications</span>
              </div>
              <div className="menu-item-right">
                <span className="notification-status">Allow</span>
              </div>
            </div>
            <div className="nav-item" onClick={handleLogout}>
              <div className="menu-item-left">
                <LogoutOutlined className="nav-icon" />
                <span className="nav-label">Log Out</span>
              </div>
              <div className="menu-item-right">
                <RightOutlined className="nav-arrow" />
              </div>
            </div>
          </div>
        </div>

        {/* Settings Card */}
        {showSettingsCard && (
          <div className="settings-card">
            <div className="settings-header">
              <span>Settings</span>
              <CloseOutlined className="collapse-icon" onClick={() => setShowSettingsCard(false)} />
            </div>
            <div className="settings-body">
              <div className="setting-row">
                <span>Theme</span>
                <div className="setting-control">
                  <span>{theme}</span>
                  <DownOutlined className="dropdown-icon" />
                </div>
              </div>
              <div className="setting-row">
                <span>Language</span>
                <div className="setting-control">
                  <span>{language}</span>
                  <DownOutlined className="dropdown-icon" />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Profile Card */}
        {showProfileCard && editableMember && (
          <div className="profile-card">
            <div className="profile-header">
              <div className="profile-info">
                <img
                  src={editableMember.avatar}
                  alt={editableMember.name}
                  style={{ cursor: "pointer" }}
                  onClick={handleAvatarClick}
                />
                <div className="text-info">
                  <h3>{editableMember.name}</h3>
                  <p>{editableMember.email}</p>
                </div>
              </div>
              <CloseOutlined onClick={closeProfileModal} />
            </div>
            <div className="profile-body">
              <div className="form-row">
                <span className="field-label">Name</span>
                <input
                  type="text"
                  className="field-input"
                  value={editableMember.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  placeholder="Your name"
                />
              </div>
              <div className="form-row">
                <span className="field-label">Email</span>
                <input
                  type="email"
                  className="field-input"
                  value={editableMember.email || "deep@yopmail.com"}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  placeholder="yourname@gmail.com"
                />
              </div>
              <div className="form-row">
                <span className="field-label">Mobile number</span>
                <input
                  type="text"
                  className="field-input"
                  value={editableMember.mobile || ""}
                  onChange={(e) => handleInputChange("mobile", e.target.value)}
                  placeholder="Add number"
                />
              </div>
              <div className="form-row">
                <span className="field-label">Location</span>
                <input
                  type="text"
                  className="field-input"
                  value={editableMember.location}
                  onChange={(e) => handleInputChange("location", e.target.value)}
                  placeholder="Location"
                />
              </div>
              <div className="form-row">
                <span className="field-label">Age/Gender</span>
                <input
                  type="text"
                  className="field-input"
                  value={editableMember.ageGender}
                  onChange={(e) => handleInputChange("ageGender", e.target.value)}
                  placeholder="31 / Male"
                />
              </div>
              <button className="save-button" onClick={handleSave}>
                Save Change
              </button>
            </div>
          </div>
        )}

        {/* Right Panel */}
        <div className="right-panel">
          <h1 className="panel-title">Manage Your Members</h1>
          <div className="members-list">
            {members.map((member) => (
              <div
                key={member.id}
                className={`member-item ${selectedMember?.id === member.id ? "selected" : ""}`}
              >
                <div className="member-info">
                  <div className="member-avatar">
                    <img src={member.avatar} alt={member.name} />
                  </div>
                  <div className="member-details">
                    <h3 className="member-name">{member.name}</h3>
                    <p className="member-email">{member.email}</p>
                  </div>
                </div>
                <button
                  className="edit-button"
                  onClick={() => handleMemberClick(member)}
                >
                  Edit Details
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
