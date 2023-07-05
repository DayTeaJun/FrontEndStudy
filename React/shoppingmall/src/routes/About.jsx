import React from "react";
import { Outlet } from "react-router-dom";

export default function About() {
  return (
    <div>
      <h4>about 페이지</h4>
      <Outlet></Outlet>
    </div>
  );
}
