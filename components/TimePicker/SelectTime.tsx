/** @jsxImportSource @emotion/react */

"use client";

import { css } from "@emotion/react";
import { Dispatch, SetStateAction, useState } from "react";
import Scrim from "../Scrim";
import TimePicker from "./TimePicker";
import Popup from "../Popup";

type SelectTimeProps = {
  setValue: Dispatch<SetStateAction<string>>;
  onClose: () => void;
};

const SelectTime = ({ setValue, onClose }: SelectTimeProps) => {
  const [selectedMeridiem, setSelectedMeridiem] = useState("오전");
  const [selectedHour, setSelectedHour] = useState("12");
  const [selectedMinute, setSelectedMinute] = useState("00");

  const meridiems = ["오전", "오후"];
  const hours = [...Array(12)].map((_, i) =>
    (i + 1).toString().padStart(2, "0")
  );
  const minutes = [...Array(60)].map((_, i) => i.toString().padStart(2, "0"));

  const handleMeridiemScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const container = e.currentTarget;
    const index = Math.round(container.scrollTop / 40);
    setSelectedMeridiem(meridiems[index] || "오전");
  };

  const handleHourScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const container = e.currentTarget;
    const index = Math.round(container.scrollTop / 40);
    setSelectedHour(hours[index] || "12"); // -1??
  };

  const handleMinuteScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const container = e.currentTarget;
    const index = Math.round(container.scrollTop / 40);
    setSelectedMinute(minutes[index] || "00");
  };

  const handleSubmit = () => {
    setValue(`${selectedMeridiem} ${selectedHour}:${selectedMinute}`);
    onClose();
  };

  return (
    <Scrim align="center" onClose={onClose}>
      <Popup
        buttonName="확인"
        leftButtonName="취소"
        onClickButton={handleSubmit}
        onClickLeft={onClose}
      >
        <div css={scrollContainer}>
          <TimePicker
            range={meridiems}
            handleTimeScroll={handleMeridiemScroll}
            selectedTime={selectedMeridiem}
          />
          <div css={colonStyle}>&nbsp;</div>
          <TimePicker
            range={hours}
            handleTimeScroll={handleHourScroll}
            selectedTime={selectedHour}
          />
          <div css={colonStyle}>:</div>
          <TimePicker
            range={minutes}
            handleTimeScroll={handleMinuteScroll}
            selectedTime={selectedMinute}
          />
        </div>
      </Popup>
    </Scrim>
  );
};

const scrollContainer = css`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 21.38px;
`;

const colonStyle = css`
  font-size: 24px;
  font-weight: bold;
  display: flex;
  align-items: center;
  width: 7.25px;
`;

export default SelectTime;
