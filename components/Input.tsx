/** @JSXImportSource @emotion/react **/

import { css } from "@emotion/react";

type InputProps = {
  type?: string;
  pattern?: string;
  size: "small" | "medium" | "large";
  align?: "left" | "center" | "right";
  placeholder?: string;
  value: string | number;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  isValid?: boolean;
};

const Input: React.FC<InputProps> = ({
  type = "text",
  pattern,
  size,
  align = "left",
  placeholder,
  value,
  onChange,
  isValid = true,
}) => {
  const inputStyle = css`
    display: flex;
    align-items: center;
    text-align: ${align};
    padding: 11px 13px;
    width: ${size === "small" ? "90px" : "100%"};
    height: 44px;

    outline: none;
    border: 1px solid ${isValid ? "#d6d6d6" : "#ff3b30"};
    border-radius: 10px;
    font-size: 18px;

    &::placeholder {
      color: #d6d6d6;
    }

    ::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
    ::-webkit-outer-spin-button {
      -webkit-appearance: none;
      margin: 0;
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
      onChange={onChange}
      placeholder={placeholder}
    />
  ) : (
    <input
      type={type}
      pattern={pattern}
      css={inputStyle}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  );
};

export default Input;
