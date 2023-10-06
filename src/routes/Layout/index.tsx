import { Outlet } from "react-router-dom";

import { Navbar } from "../../components";

const Layout = () => {
  return (
    <div style={{ display: "flex" }}>
      <div style={{ position: "fixed", backgroundColor: "white" }}>
        <Navbar />
      </div>
      <div style={{ marginLeft: 270, width: "calc(100% - 250px)" }}>
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
