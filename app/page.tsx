/** @jsxImportSource @emotion/react */

"use client";

import { useState } from "react";
import SearchField from "@/components/SearchField";

export default function HomePage() {
  const [searchValue, setSearchValue] = useState("");

  const handleSearchChange = (value: string) => {
    console.log("입력중: ", value);
    setSearchValue(value);
  };

  const handleSearchSubmit = (value: string) => {
    console.log("검색할 암장: ", value);
  };

  return (
    <>
      <h1>Hello Clmap</h1>
      <SearchField
        size="small"
        placeholder="암장 이름을 검색해보세요."
        value={searchValue}
        onSearch={handleSearchSubmit}
        onChange={handleSearchChange}
      />
    </>
  );
}
