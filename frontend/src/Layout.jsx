import React from "react";
import Footer from "./Footer.jsx";
import Header from "./Header.jsx";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className=" flex-grow mt-[100px]">
        {" "}
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
