import { Input } from "@material-tailwind/react";
import React from "react";

function SearchComponent({ searchInput, setSearchInput }) {
  return (
    <Input
      value={searchInput}
      onChange={(e) => setSearchInput(e.target.value)}
      label="Search Images"
      icon={<i className="fa-soild fa-magnifying-glass"></i>}
    />
  );
}

export default SearchComponent;
