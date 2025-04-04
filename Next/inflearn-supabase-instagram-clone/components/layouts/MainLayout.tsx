import React from "react";
import SideBar from "../sidebar";

function MainLayout({ children }) {
  return (
    <main className="w-full h-screen flex justify-center items-center">
      <SideBar />
      {children}
    </main>
  );
}

export default MainLayout;
