/** @JSXImportSource @emotion/react **/

"use client";

import DatePicker from "@/components/DatePicker";
import { useState } from "react";
import SearchField from "@/components/SearchField";

export default function HomePage() {
  const [date, setDate] = useState("");

  const handleDateChange = (value: string) => {
    setDate(value);
  };

  return (
    <>
      <h1>Hello Clmap</h1>
      <DatePicker size="large" value={date} onChange={handleDateChange} />
    </>
  );
}
