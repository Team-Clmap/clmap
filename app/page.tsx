/** @JSXImportSource @emotion/react **/

"use client";

import RadioButton from "@/components/RadioButton";
import { useState } from "react";

export default function HomePage() {
  const [selectedValue, setSelectedValue] = useState("latest");

  const handleRadioChange = (value: string) => {
    setSelectedValue(value);
  };

  return (
    <>
      <h1>Hello Clmap</h1>
      <div css={{ display: "flex", gap: "20px" }}>
        <RadioButton
          label="최신순"
          name="filter"
          value="latest"
          checked={selectedValue === "latest"}
          onChange={handleRadioChange}
        />
        <RadioButton
          label="오래된순"
          name="filter"
          value="oldest"
          checked={selectedValue === "oldest"}
          onChange={handleRadioChange}
        />
      </div>
    </>
  );
}
