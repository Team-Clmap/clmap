/** @jsxImportSource @emotion/react */

"use client";

import DatePicker from "@/components/DatePicker";
import { useState } from "react";

export default function HomePage() {
  const [date, setDate] = useState("");

  const handleDateChange = (value: string) => {
    setDate(value);
  };

  const handleIconClick = () => {
    alert("달력 아이콘 클릭됨!");
  };
  return (
    <>
      <h1>Hello Clmap</h1>
      <DatePicker
        size="large"
        value={date}
        onChange={handleDateChange}
        onClick={handleIconClick}
      />
    </>
  );
}
