import { Outlet } from "react-router-dom";
import HeaderComponent from "../components/header-component/HeaderComponent";
import FooterComponent from "../components/footer/FooterComponent";

const MainLayout = () => {
  return (
    <>
      <HeaderComponent />
      <Outlet />
      <FooterComponent />
    </>
  );
};

export default MainLayout;
