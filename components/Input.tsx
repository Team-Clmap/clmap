/** @JSXImportSource @emotion/react **/

import { css } from "@emotion/react";
import { useState } from "react";

type InputProps = {
  size: "small" | "medium" | "large";
  align?: "left" | "center" | "right";
  placeHolder?: string;
  defaultValue?: string;
  onChange: (value: string) => void;
  isValid?: boolean;
};

const Input: React.FC<InputProps> = ({
  size,
  align = "left",
  placeHolder = "값을 입력해주세요",
  defaultValue,
  onChange,
  isValid = true,
}) => {
  const [value, setValue] = useState(defaultValue || "");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setValue(e.target.value);
    onChange(e.target.value);
  };

  const inputStyle = css`
    align-items: center;
    justify-content: ${align};
    padding: 12px 14px;
    width: ${size === "small" ? "90px" : "100%"};
    height: 44px;

    outline: none;
    border: 1px solid ${isValid ? "#d6d6d6" : "#ff3b30"};
    border-radius: 10px;
    font-size: 18px;

    &::placeholder {
      color: #d6d6d6;
    }
  `;

  const textareaStyle = css`
    ${inputStyle};
    resize: none;
    height: 102px;
  `;

  return size === "large" ? (
    <textarea
      css={textareaStyle}
      value={value}
      onChange={handleChange}
      placeholder={placeHolder}
    />
  ) : (
    <input
      css={inputStyle}
      value={value}
      onChange={handleChange}
      placeholder={placeHolder}
    />
  );
};

export default Input;
