export const formatTime = (time: string): string => {
  const [hour, minute] = time.split(":").map(Number); // "17:01" -> [17, 1]
  const isPM = hour >= 12; // 오후 여부
  const formattedHour = hour % 12 || 12; // 12시간제: 0은 12로 처리
  const meridiem = isPM ? "오후" : "오전"; // 오전/오후 결정

  return `${meridiem} ${String(formattedHour).padStart(2, "0")}:${minute.toString().padStart(2, "0")}`;
};
