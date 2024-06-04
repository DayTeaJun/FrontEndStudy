import React from "react";
import { FiMusic } from "react-icons/fi";
import { FiBarChart } from "react-icons/fi";
import { FiSmile } from "react-icons/fi";

const CategoryMenu = ({ icon, label }) => {
  return (
    <div className="w-full h-[56px] py-4 px-[24px] flex gap-4 items-center bg-neutral-700 text-[20px] cursor-pointer rounded-sm hover:bg-neutral-800 transition">
      {icon}
      {label}
    </div>
  );
};

function Category() {
  return (
    <div className="flex flex-col gap-4 w-full lg:flex-row">
      <CategoryMenu label={"최신음악"} icon={<FiMusic color="#AAA" />} />
      <CategoryMenu label={"차트"} icon={<FiBarChart color="#AAA" />} />
      <CategoryMenu label={"분위기 및 장르"} icon={<FiSmile color="#AAA" />} />
    </div>
  );
}

export default Category;
