"use client";

import GradeInput from "@/components/GradeInput";
import Input from "@/components/Input";
import { useState } from "react";

export default function HomePage() {
  const [isValid, setIsValid] = useState(true);
  const [inputValue, setInputValue] = useState("");

  const validateInput = (value: string) => {
    return value.trim() != "";
  };

  const handleSubmit = () => {
    const isValidInput = validateInput(inputValue);
    setIsValid(isValidInput);

    if (!isValidInput) {
      console.log("입력이 유효하지 않습니다."); // [TODO] 토스트 적용
    }
  };

  const handleChange = (value: string) => {
    setInputValue(value);
  };

  return (
    <>
      <h1>Hello Clmap</h1>
      <Input
        size="large"
        align="left"
        placeHolder="이메일을 입력해주세요"
        onChange={handleChange}
        isValid={isValid}
      />
      <GradeInput onChange={handleChange} />
      <button onClick={handleSubmit}>확인</button>
    </>
  );
}
