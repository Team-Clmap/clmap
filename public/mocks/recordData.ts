// 기록 관련 목데이터

type recordCardDataType = {
  recordCenterId: number;
  recordCenterName: string;
  recordRegisterDate: string;
  recordStartTime: string;
  recordEndTime: string;
  recordClimbingTypes: string[];
  vGrade: string[];
  colorGrade: string[];
  tryCount: number[];
  completeCount: number[];
  recordImages: string[]; // 추후 File로 수정
};

export const recordCardData: recordCardDataType = {
  recordCenterId: 1,
  recordCenterName: "락트리 클라이밍 분당",
  recordRegisterDate: "2024.10.26",
  recordStartTime: "12:00",
  recordEndTime: "13:00",
  recordClimbingTypes: ["볼더링", "지구력"],
  vGrade: ["V99", "V5", "V6", "V7"],
  colorGrade: ["#ffc519", "#83bbff", "#007aff", "#ff8aa0"],
  tryCount: [1, 5, 11, 150],
  completeCount: [1, 5, 9, 0],
  recordImages: [
    "/images/record_2.png",
    "/images/record_3.jpeg",
    "/images/record_4.jpg",
    "/images/record_7.png",
    "/images/record_11.png",
    "/images/record_8.png",
    "/images/record_10.png",
    "/images/record_1.png",
    "/images/record_5.png",
    "/images/record_6.png",
    "/images/record_9.png",
  ],
};
