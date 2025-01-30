// 기록 관련 목데이터

type recordCardReqType = {
  year: number;
  month: number;
  date: number;
};

type recordCardResType = {
  recordId: number;
  recordClimbingTypes: string[];
  recordStartTime: string;
  recordEndTime: string;
  duration: string;
  recordCenterName: string;
  vGrade: string[];
  colorGrade: string[];
  tryCount: number[];
  completeCount: number[];
  recordImages: string[]; // 추후 File로 수정
};

export const recordCardReqData: recordCardReqType = {
  year: 2024,
  month: 12,
  date: 24,
};

// 일간 기록 조회
export const recordCardResData: recordCardResType = {
  recordId: 1,
  recordClimbingTypes: ["볼더링", "지구력"],
  recordStartTime: "17:01",
  recordEndTime: "21:19",
  duration: "4시간 18분",
  recordCenterName: "락트리 클라이밍 분당",
  vGrade: ["V99", "V5", "V6", "V7"],
  colorGrade: ["#ffc519", "#83bbff", "#007aff", "#ff8aa0"],
  tryCount: [1, 5, 11, 15],
  completeCount: [1, 5, 9, 0],
  recordImages: [
    "/images/record_2.png",
    "/images/record_3.jpeg",
    "/images/record_4.jpg",
    "/images/record_7.png",
    "/images/record_11.png",
    "/images/record_8.png",
    "/images/record_10.png",
    "/images/record_1.jpeg",
    "/images/record_5.jpg",
    "/images/record_6.png",
    "/images/record_9.png",
  ],
};
