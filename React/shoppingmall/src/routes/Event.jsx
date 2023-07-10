import React from "react";
import { Outlet } from "react-router-dom";

export default function Event() {
  return (
    <div style={{ textAlign: "center", padding: "10px" }}>
      <h1>오늘의 이벤트</h1>
      <Outlet></Outlet>
    </div>
  );
}
