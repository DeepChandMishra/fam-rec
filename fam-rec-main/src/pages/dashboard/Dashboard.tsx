// import { Flex } from "antd";
import { Outlet } from "react-router-dom";

import HeaderComponent from "../../components/header-component/HeaderComponent";

function Dashboard() {
  return (
    <div>
      <HeaderComponent ></HeaderComponent>
      {/* <Flex
        justify="center"
        align="center"
        style={{ height: "calc(100vh - 200px)" }}
      >
        <h1>We are coming soon...</h1>
      </Flex> */}
       <Outlet />
    </div>
  );
}

export default Dashboard;
