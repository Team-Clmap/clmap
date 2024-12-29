/** @JSXImportSource @emotion/react **/

import { css } from "@emotion/react";

type DatePickerProps = {
  size: "medium" | "large";
  value: string;
  onChange: (value: string) => void;
  onClick: () => void;
};

const DatePicker: React.FC<DatePickerProps> = ({
  size,
  value,
  onChange,
  onClick,
}) => {
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
  `;

  return (
    <div css={datePickerStyle}>
      <input
        css={datePickerInputStyle}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="날짜를 선택해주세요."
      />
      <div css={calendarIconStyle}>
        <img src="/icons/calendar.png" alt="날짜선택" />
      </div>
    </div>
  );
};

export default DatePicker;
