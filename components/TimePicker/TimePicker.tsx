/** @jsxImportSource @emotion/react */

"use client";

import { css } from "@emotion/react";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import Scrim from "../Scrim";
import BottomSheet from "../BottomSheet";

const MERIDIEM_ITEMS = ["오전", "오후"];
const HOUR_ITEMS = Array.from({ length: 12 }, (_, i) =>
  (i + 1).toString().padStart(2, "0")
);
const MINUTE_ITEMS = Array.from({ length: 60 }, (_, i) =>
  i.toString().padStart(2, "0")
);

type TimePickerProps = {
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  onClose: () => void;
};

const TimePicker: React.FC<TimePickerProps> = ({
  value,
  setValue,
  onClose,
}) => {
  const [meridiem, setMeridiem] = useState(
    value.includes("오후") ? "오후" : "오전"
  );
  const [hour, setHour] = useState(value.split(":")[0]);
  const [minute, setMinute] = useState(value.split(":")[1]); // slice(0, 2) 필요?

  const meridiemRef = useRef<HTMLDivElement | null>(null);
  const hourRef = useRef<HTMLDivElement | null>(null);
  const minuteRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const [time, meridiem] = value.split(" ");
    const [hour, minute] = time.split(":");
    setMeridiem(meridiem);
    setHour(hour);
    setMinute(minute);
  }, [value]);

  // useEffect(() => {
  //   console.log(meridiem)
  //   console.log(hour);
  //   console.log(minute);
  // });

  const handleScrollToCenter = (
    ref: React.RefObject<HTMLDivElement | null>,
    items: string[],
    setValue: Dispatch<SetStateAction<string>>
  ) => {
    if (ref.current) {
      const scrollY = ref.current.scrollTop;
      const index = Math.round(scrollY / 40);
      setValue(items[index]);
      ref.current.scrollTo({
        top: index * 40,
        behavior: "smooth",
      });
    }
  };

  const handleSubmit = () => {
    setValue(`${meridiem} ${hour}:${minute}`);
    onClose();
  };

  return (
    <Scrim align="end" onClose={onClose}>
      <BottomSheet
        isOpen
        onSubmit={handleSubmit}
        size="small"
        buttonName="확인"
        isFormValid
      >
        <div css={boxStyle}>
          <div css={scrollContainer}>
            <div
              ref={meridiemRef}
              css={scrollView}
              onScroll={() =>
                handleScrollToCenter(meridiemRef, MERIDIEM_ITEMS, setMeridiem)
              }
            >
              {MERIDIEM_ITEMS.map((item) => (
                <div key={item} css={itemStyle({ isBold: item === meridiem })}>
                  {item}
                </div>
              ))}
            </div>

            <div
              ref={hourRef}
              css={scrollView}
              onScroll={() =>
                handleScrollToCenter(hourRef, HOUR_ITEMS, setHour)
              }
            >
              {HOUR_ITEMS.map((item) => (
                <div key={item} css={itemStyle({ isBold: item === hour })}>
                  {item}
                </div>
              ))}
            </div>

            <div
              ref={minuteRef}
              css={scrollView}
              onScroll={() =>
                handleScrollToCenter(minuteRef, MINUTE_ITEMS, setMinute)
              }
            >
              {MINUTE_ITEMS.map((item) => (
                <div key={item} css={itemStyle({ isBold: item === hour })}>
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </BottomSheet>
    </Scrim>
  );
};

const boxStyle = css`
  display: flex;
  flex-direction: column;
  gap: 36px;
  align-items: center;
  justify-content: center;
`;

const scrollContainer = css`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 8px;
`;

const scrollView = css`
  width: 80px;
  height: 160px;
  overflow-y: scroll;
  scrollbar-width: none;
  -ms-overflow-style: none;
  scroll-snap-type: y mandatory;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const itemStyle = ({ isBold }: { isBold: boolean }) => css`
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  scroll-snap-align: center;
  font-weight: ${isBold ? "bold" : "normal"};
  color: ${isBold ? "black" : "#d6d6d6"};
`;

export default TimePicker;
