import React from "react";
import Logo from "./elements/Logo";
import Navigator from "./elements/Navigator";

function Sidebar({ children }) {
  return (
    <div className="flex flex-row h-full">
      <nav className="hidden lg:block w-[240px] border-r-[1px] border-neutral-600">
        <div className="p-[24px]">
          <Logo />
        </div>
        <div>
          <Navigator />
        </div>
      </nav>
      {/* 위 240px를 제외한 나머지 부분 width 가져감 (flex-1) */}
      <div className="w-full lg:w-[calc(100%-240px)]">{children}</div>
    </div>
  );
}

export default Sidebar;
