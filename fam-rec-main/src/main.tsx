import { ConfigProvider } from "antd";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "./index.scss";
import { routes } from "./routes/index.tsx";
const componentStyle = {
  Layout: {
    headerHeight: 50,
    // headerPadding: "10px 50px",
  },
};

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ConfigProvider theme={{ components: componentStyle }}>
      <RouterProvider router={routes}></RouterProvider>
    </ConfigProvider>
    <ToastContainer />
  </StrictMode>
);
