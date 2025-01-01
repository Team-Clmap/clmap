/** @JSXImportSource @emotion/react **/

import { css } from "@emotion/react";

type InputProps = {
  size: "small" | "medium" | "large";
  align?: "left" | "center" | "right";
  placeHolder?: string;
  value: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  isValid?: boolean;
};

const Input: React.FC<InputProps> = ({
  size,
  align = "left",
  placeHolder,
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
      placeholder={placeHolder}
    />
  ) : (
    <input
      css={inputStyle}
      value={value}
      onChange={onChange}
      placeholder={placeHolder}
    />
  );
};

export default Input;
