"use client";

import { useRecoilState } from "recoil";
import Logo from "./Logo";
import { searchState } from "@/utils/recoil/atoms";

export default function Header() {
  const [search, setSearch] = useRecoilState(searchState);

  return (
    <header className="fixed top-0 left-0 p-4 bg-gray-900 right-0 flex items-center justify-between z-50">
      <nav className="flex gap-4">
        <Logo />
        <ul className="flex gap-2 text-white">
          <li>Movies</li>
          <li>Dramas</li>
        </ul>
      </nav>

      <div className="border border-white rounded-md p-2 text-white flex gap-2 items-center w-full max-w-72">
        <i className="fas fa-search"></i>
        <input
          onChange={(e) => setSearch(e.target.value)}
          value={search}
          type="text"
          className=" bg-transparent"
          placeholder="Search Movies"
        />
      </div>
    </header>
  );
}
