import React, { useState } from "react";
import { AuthService } from "../../services/AuthService";
import "./FamilyTreeUI.scss";
import treeLeft from "../../images/tree left.jpg";
import treeRight from "../../images/tree right.jpg";
import john from "../../images/john.png";

interface Member {
  name: string;
  age: string;
  relation: string;
  mobile: string;
  image: string | null;
  children: Member[];
}

interface FormData {
  name: string;
  age: string;
  relation: string;
  mobile: string;
  image: string | null;
  imageFile: File | null;
}

const FamilyTreeUI = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    age: "",
    relation: "Brother",
    mobile: "",
    image: null,
    imageFile: null,
  });
  const [members, setMembers] = useState<Member[]>([]);
  const [activeParentPath, setActiveParentPath] = useState<number[] | null>(null);

  const openForm = (path: number[] | null = null) => {
    setIsFormOpen(true);
    setActiveParentPath(path);
  };

  const closeForm = () => {
    setIsFormOpen(false);
    setFormData({
      name: "",
      age: "",
      relation: "Brother",
      mobile: "",
      image: null,
      imageFile: null,
    });
    setActiveParentPath(null);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, files } = e.target as HTMLInputElement;
    if (name === "image" && files && files.length > 0) {
      setFormData((prev) => ({
        ...prev,
        image: URL.createObjectURL(files[0]),
        imageFile: files[0],
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const addMemberToPath = (tree: Member[], path: number[], newMember: Member): Member[] => {
    if (path.length === 0) return [...tree, newMember];
    const [index, ...restPath] = path;
    return tree.map((node, i) =>
      i === index
        ? { ...node, children: addMemberToPath(node.children, restPath, newMember) }
        : node
    );
  };

  const handleAddMember = async () => {
    if (!formData.name || !formData.age || !formData.mobile) {
      alert("Please fill all required fields.");
      return;
    }

    // Validation: age must be a number
    if (!/^\d+$/.test(formData.age)) {
      alert("Age must be a number.");
      return;
    }

    // Validation: mobile must be 10-15 digits
    if (!/^\d{10,15}$/.test(formData.mobile)) {
      alert("Mobile number must be 10 to 15 digits.");
      return;
    }

    try {
      const data = new FormData();
      data.append("name", formData.name);
      data.append("age", formData.age);
      data.append("relation", formData.relation);
      data.append("mobile", formData.mobile);
      if (formData.imageFile) {
        data.append("image", formData.imageFile);
      }

      const response = await AuthService.addFamilyMemberWithFormData(data);
      const addedMember: Member = response.data;

      const updatedTree = activeParentPath
        ? addMemberToPath(members, activeParentPath, addedMember)
        : [...members, addedMember];

      setMembers(updatedTree);
      closeForm();
    } catch (error) {
      console.error("API Error:", error);
      alert("Failed to add member.");
    }
  };

  const renderMembers = (members: Member[], path: number[] = []) => {
    return (
      <div className="member-chain">
        {members.map((member, idx) => {
          const currentPath = [...path, idx];
          return (
            <div className="member-node" key={`${member.name}-${idx}`}>
              <div className="user-card">
                {member.image && <img src={member.image} className="user-image" alt={member.name} />}
                <div className="user-name">
                  {member.name} ({member.relation})
                </div>
                <div className="user-age">Age: {member.age}</div>
              </div>
              <div className="plus-button" onClick={() => openForm(currentPath)}>+</div>
              {member.children.length > 0 && renderMembers(member.children, currentPath)}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="family-tree-ui">
      <div className="tree tree-left">
        <img src={treeLeft} alt="Left Tree" />
      </div>
      <div className="tree tree-right">
        <img src={treeRight} alt="Right Tree" />
      </div>

      <div className="center-node">
        <div className="plus-button top" onClick={() => openForm()}>+</div>
        <div className="plus-button left" onClick={() => openForm()}>+</div>
        <div className="plus-button right" onClick={() => openForm()}>+</div>
        <div className="plus-button bottom" onClick={() => openForm()}>+</div>

        <div className="user-card">
          <img src={john} alt="Jack" className="user-image" />
          <div className="user-name">JACK (You)</div>
          <div className="user-age">Age: 35</div>
        </div>
      </div>

      <div className="member-wrapper">{renderMembers(members)}</div>

      {isFormOpen && (
        <div className="form-modal">
          <div className="form-container">
            <h2 className="form-title">Add a new Member</h2>
            <p className="form-subtitle">
              Please enter the following details to add it to<br />your family tree
            </p>

            <label>Member's Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter Member's Name"
              value={formData.name}
              onChange={handleChange}
            />

            <label>Member's Age</label>
            <input
              type="number"
              name="age"
              placeholder="Enter Member's Age"
              value={formData.age}
              onChange={handleChange}
            />

            <label>Member's Relationship</label>
            <select
              name="relation"
              className="members"
              value={formData.relation}
              onChange={handleChange}
            >
              <option>Brother</option>
              <option>Sister</option>
              <option>Mother</option>
              <option>Father</option>
              <option>Son</option>
              <option>Daughter</option>
            </select>

            <label>Member's Mobile No.</label>
            <input
              type="tel"
              name="mobile"
              placeholder="Enter Member's Mobile no."
              value={formData.mobile}
              onChange={handleChange}
            />

            <label className="file-upload">
              Upload Member’s Profile Picture
              <input type="file" name="image" onChange={handleChange} />
            </label>

            <button className="add-member-btn" onClick={handleAddMember}>Add Member</button>
            <span className="close-btn" onClick={closeForm}>×</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default FamilyTreeUI;
