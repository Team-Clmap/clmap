/** @JSXImportSource @emotion/react **/

import { css } from "@emotion/react";
import { useState } from "react";
import Calendar from "./Calendar";
import Scrim from "./Scrim";

type DatePickerProps = {
  size: "medium" | "large";
  value: string;
  onChange: (value: string) => void;
  isValid?: boolean;
};

const DatePicker = ({
  size,
  value,
  onChange,
  isValid = true,
}: DatePickerProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
  };
  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <div css={datePickerStyle(isValid, size)}>
      <input
        css={datePickerInputStyle(size)}
        value={value}
        onClick={handleOpen}
        onChange={(e) => onChange(e.target.value)}
        placeholder="날짜를 선택해주세요."
        readOnly
      />
      <div css={calendarIconStyle} onClick={handleOpen} />
      {isOpen && (
        <Scrim align="center" onClose={handleClose}>
          <Calendar onDateSelect={onChange} />
        </Scrim>
      )}
    </div>
  );
};

const datePickerStyle = (isValid: boolean, size: "medium" | "large") => css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid ${isValid ? "#d6d6d6" : "#ff3b30"};
  border-radius: 10px;
  height: 44px;
  width: ${size === "large" ? "calc(100vw - 60px)" : "calc(100vw - 190px)"};
  padding: ${size === "large" ? "0 13px" : "0 11px"};
`;

const datePickerInputStyle = (size: "medium" | "large") => css`
  border: none;
  outline: none;
  font-size: ${size === "large" ? "18px" : "16px"};
  &::placeholder {
    color: #d6d6d6;
  }
`;

const calendarIconStyle = css`
  width: 40px;
  height: 40px;
  cursor: pointer;
  position: relative;

  display: flex;
  align-items: center;
  justify-content: end;

  &::before {
    position: absolute;
    content: "";
    width: 18px;
    height: 18px;
    background-image: url("/icons/calendar.png");
    background-size: contain;
    background-repeat: no-repeat;
  }
`;

export default DatePicker;
