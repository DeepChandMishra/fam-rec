import { ForgotPasswordPayload } from "../types/forgot-password-payload.type";
import { LoginPayload } from "../types/login-payload.type";
import { RegisterPayload } from "../types/register-payload.type";
import { ResetPasswordPayloadType } from "../types/reset-password-payload.type";
// import { FamilyTreePayload } from "../types/familyTree-payload.type";
import API from "./Api";

export const AuthService = {
  // Register User
  register: (payload: RegisterPayload) => {
    return API.post("/create", payload);
  },

  // Login
  login: (payload: LoginPayload) => {
    return API.post("/login", payload);
  },

  // Logout
  logout: () => {
    return API.get("/logout");
  },

  // Forgot Password
  forgotPassword: (payload: ForgotPasswordPayload) => {
    return API.post("/forget-password", payload);
  },

  // Reset Password
  resetPassword: (payload: ResetPasswordPayloadType) => {
    return API.post("/reset-password", payload);
  },

  // Add Family Member
  // Add Family Member using FormData
  addFamilyMemberWithFormData: (formData: FormData) => {
    return API.post("/family/add-member", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },

  // Check user is logged in or not
  authenticate: () => {
    return API.get("/authenticate");
  },

  uploadImage: (formData: FormData) => {
    return API.post("/upload-image", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    });
  },
  getAllImages: () => {
    return API.get("/users/images", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    });
  },
  getCurrentUser: () => { 
    return API.get("/me", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    });
  },
  getFamilyMembers:() => {
    return API.get("/family-tree/", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    });
  },
  updateFamilyMember: (id: string, formData: FormData) => {
    return API.put(`/family-tree/member/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    });
  }
};
