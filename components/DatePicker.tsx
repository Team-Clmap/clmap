/** @JSXImportSource @emotion/react **/

import { css } from "@emotion/react";
import { useState } from "react";
import Calendar from "./Calendar";
import Scrim from "./Scrim";

type DatePickerProps = {
  size: "medium" | "large";
  value: string;
  onChange: (value: string) => void;
};

const DatePicker: React.FC<DatePickerProps> = ({ size, value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
  };
  const handleClose = () => {
    setIsOpen(false);
  };

  const datePickerStyle = css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    border: 1px solid #d6d6d6;
    border-radius: 10px;
    height: 44px;
    width: ${size === "large" ? "calc(100vw - 60px)" : "calc(100vw - 190px)"};
    padding: ${size === "large" ? "0 13px" : "0 11px"};
  `;

  const datePickerInputStyle = css`
    border: none;
    outline: none;
    font-size: ${size === "large" ? "18px" : "16px"};
    &::placeholder {
      color: #d6d6d6;
    }
  `;

  const calendarIconStyle = css`
    width: 18px;
    height: 18px;
    cursor: pointer;
    position: relative;

    &::before {
      position: absolute;
      content: "";
      top: -50%;
      left: -50%;
      right: -50%;
      bottom: -50%;
    }
  `;

  return (
    <div css={datePickerStyle}>
      <input
        css={datePickerInputStyle}
        value={value}
        onClick={handleOpen}
        onChange={(e) => onChange(e.target.value)}
        placeholder="날짜를 선택해주세요."
        readOnly
      />
      <div css={calendarIconStyle} onClick={handleOpen}>
        <img src="/icons/calendar.png" alt="날짜선택" />
      </div>
      {isOpen && (
        <Scrim align="center" onClose={handleClose}>
          <Calendar onDateSelect={onChange} />
        </Scrim>
      )}
    </div>
  );
};

export default DatePicker;
