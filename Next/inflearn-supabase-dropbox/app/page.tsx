"use client";

import Logo from "../components/logo";
import { useState } from "react";
import SearchComponent from "../components/search-component";

export default function Home() {
  const [searchInput, setSearchInput] = useState("");

  return (
    <main className="w-full p-2 flex flex-col gap-4">
      {/* logo */}
      <Logo />
      {/* search component */}
      <SearchComponent
        searchInput={searchInput}
        setSearchInput={setSearchInput}
      />

      {/* file drag & drop zone */}

      {/* dropbox image list */}
    </main>
  );
}
