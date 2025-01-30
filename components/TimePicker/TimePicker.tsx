/** @jsxImportSource @emotion/react */

"use client";

import { css } from "@emotion/react";

type TimePickerProps = {
  range: string[];
  handleTimeScroll: (e: React.UIEvent<HTMLDivElement>) => void;
  selectedTime: string;
};

const TimePicker: React.FC<TimePickerProps> = ({
  range,
  handleTimeScroll,
  selectedTime,
}) => {
  return (
    <div css={containerStyle}>
      <div css={scrollBoxStyle} onScroll={handleTimeScroll}>
        {range.map((time) => (
          <div key={time} css={itemStyle(time === selectedTime)}>
            {time}
          </div>
        ))}
      </div>
      <div css={selectionBoxStyle} />
    </div>
  );
};

const containerStyle = css`
  width: 44px;
  height: 108px;
  position: relative;
`;

const scrollBoxStyle = css`
  height: 100%;
  overflow-y: auto;
  scroll-snap-type: y mandatory;
  overscroll-behavior: contain;
  padding: 40px 0;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const selectionBoxStyle = css`
  position: absolute;
  top: 50%;
  left: 0;
  width: 100%;
  height: 40px;
  border-top: 1px solid #d6d6d6;
  border-bottom: 1px solid #d6d6d6;
  transform: translateY(-50%);
  pointer-events: none;
`;

const itemStyle = (isBold: boolean) => css`
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  scroll-snap-align: center;
  color: ${isBold ? "black" : "#d6d6d6"};
  font-weight: ${isBold ? "bold" : "normal"};
  font-size: 24px;
`;

export default TimePicker;
