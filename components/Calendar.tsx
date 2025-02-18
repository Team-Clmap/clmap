/** @JSXImportSource @emotion/react **/

"use client";

import { css } from "@emotion/react";
import { useEffect, useState } from "react";

type CalendarProps = {
  onDateSelect: (date: string) => void;
};

const Calendar = ({ onDateSelect }: CalendarProps) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [year, setYear] = useState(currentDate.getFullYear());
  const [month, setMonth] = useState(currentDate.getMonth());
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [days, setDays] = useState<number[]>([]);

  const handleLeftButtonClick = () => {
    if (month === 0) {
      setYear((prev) => prev - 1);
      setMonth(11);
    } else {
      setMonth((prev) => prev - 1);
    }
  };

  const handleRightButtonClick = () => {
    if (month === 11) {
      setYear((prev) => prev + 1);
      setMonth(0);
    } else {
      setMonth((prev) => prev + 1);
    }
  };

  const handleDateClick = (day: number) => {
    const newSelectedDate = new Date(year, month, day);
    setSelectedDate(newSelectedDate);

    const formattedDate = `${year}.${(month + 1).toString().padStart(2, "0")}.${day
      .toString()
      .padStart(2, "0")}`;
    onDateSelect(formattedDate);
  };

  useEffect(() => {
    const firstDay = new Date(year, month, 1).getDay();
    const lastDate = new Date(year, month + 1, 0).getDate();

    const dates = Array.from({ length: lastDate }, (_, i) => i + 1);
    const paddedDates = [...Array(firstDay).fill(null), ...dates];

    setDays(paddedDates);
  }, [year, month]);

  const dayName = ["일", "월", "화", "수", "목", "금", "토"];

  return (
    <div css={calendarStyle}>
      <div css={yearMonthStyle}>
        <div css={yearMonthTextStyle}>
          {year}년 {month + 1}월
        </div>
        <div css={arrowButtonStyle}>
          <button css={buttonStyle(true)} onClick={handleLeftButtonClick} />
          <button css={buttonStyle(false)} onClick={handleRightButtonClick} />
        </div>
      </div>
      <div css={weekDayStyle}>
        <div css={weekStyle}>
          {dayName.map((day) => (
            <div key={day}>{day}</div>
          ))}
        </div>
        <div css={dayStyle}>
          {days.map((day, index) => {
            if (day === null) {
              return <div key={index} />;
            }

            const today = new Date();
            const isToday =
              day === today.getDate() &&
              month === today.getMonth() &&
              year === today.getFullYear();

            const isSelected =
              selectedDate.getFullYear() === year &&
              selectedDate.getMonth() === month &&
              selectedDate.getDate() === day;

            return (
              <div
                css={dateStyle(isSelected, isToday)}
                key={index}
                onClick={() => handleDateClick(day)}
              >
                {day}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

const calendarStyle = css`
  width: calc(100vw - 60px);
  display: flex;
  flex-direction: column;
  gap: 26px;
  align-items: center;
  justify-content: center;
  padding: 19px 12px;
  background-color: #ffffff;
  border: 1px solid #d6d6d6;
  border-radius: 10px;
`;

const yearMonthStyle = css`
  width: calc(100vw - 100px);
  height: 20px;
  display: flex;
  justify-content: space-between;
`;

const yearMonthTextStyle = css`
  font-size: 18px;
  font-weight: bold;
`;

const arrowButtonStyle = css`
  display: flex;
  gap: 30px;
`;

const buttonStyle = (isLeft?: boolean) => css`
  width: 20px;
  height: 20px;
  padding: 0;
  cursor: pointer;

  &::before {
    content: "";
    display: block;
    width: 100%;
    height: 100%;
    background-size: contain;
    background-position: center;
    background-image: ${isLeft
      ? "url('/icons/arrow-left-blue.png')"
      : "url('/icons/arrow-right-blue.png')"};
  }
`;

const weekDayStyle = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

const weekStyle = css`
  width: fit-content;
  display: flex;
  gap: 36px;
  font-size: 16px;
  font-weight: bold;
`;

const dayStyle = css`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  row-gap: 16px;
  column-gap: 3px;
`;

const dateStyle = (isSelected: boolean, isToday: boolean) => css`
  width: 48px;
  height: 48px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  border: ${isToday ? "1px solid #83bbff" : "none"};
  background-color: ${isSelected ? "#83bbff" : "transparent"};
  color: ${isSelected ? "#ffffff" : isToday ? "#83bbff" : "#848484"};
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
`;

export default Calendar;
