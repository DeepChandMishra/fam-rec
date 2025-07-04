import { createBrowserRouter, Navigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";

import Login from "../pages/login/Login";
import Signup from "../pages/signup/Signup";
import ForgotPassword from "../pages/forgot-password/ForgotPassword";
import ResetPassword from "../pages/reset-password/ResetPassword";

import Albums from "../pages/albums/Albums";
import FamilyTree from "../pages/family-Tree/familyTree";
import Explore from "../pages/explore/explore";
import AboutUsContact from "../pages/About-Us/about";
import Memories from "../pages/memories/memory";
import Profile from "../pages/Profile/profile";

const routes = createBrowserRouter([
  { path: "/", element: <Navigate to="/landing" replace /> },
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <Signup /> },
  { path: "/forget-password", element: <ForgotPassword /> },
  { path: "/reset-password", element: <ResetPassword /> },

  {
    path: "",
    element: <MainLayout />,  // <<< this automatically wraps these routes
    children: [
      { path: "landing", element: <Explore /> },
      { path: "albums", element: <Albums /> },
      { path: "family-tree", element: <FamilyTree /> },
      { path: "explore-pages", element: <Explore /> },
      { path: "about-us", element: <AboutUsContact /> },
      { path: "memories", element: <Memories /> },
      { path: "profile", element: <Profile /> },
    ],
  },
]);

export { routes };
