/** @JSXImportSource @emotion/react **/

"use client";

import { css } from "@emotion/react";
import Chip from "../Chip";
import { useState } from "react";
import { useRouter } from "next/navigation";
import DeleteRecord from "./DeleteRecord";
import {
  recordCardReqData,
  recordCardResData,
} from "@/public/mocks/recordData";

type RecordCardProps = { isEditable?: boolean };

const RecordCard = ({ isEditable = false }: RecordCardProps) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();
  const navigateTo = (path: string) => {
    router.push(path);
  };

  const handlePopupOpen = () => setIsDeleting(true);
  const handlePopupClose = () => setIsDeleting(false);

  // [TODO] 추후 화면 개발 시 달력 클릭 value와 연동
  const year = recordCardReqData.year;
  const month = recordCardReqData.month;
  const date = recordCardReqData.date;

  const records = recordCardResData.vGrade.map((_, idx) => ({
    colorGrade: recordCardResData.colorGrade[idx],
    tryCount: recordCardResData.tryCount[idx],
    completeCount: recordCardResData.completeCount[idx],
  }));
  const types = recordCardResData.recordClimbingTypes;
  const photos = recordCardResData.recordImages;

  // [TODO] 일간 기록 조회 Data: atom에 저장
  return (
    <>
      <div css={recordCardStyle}>
        <div css={cardHeaderStyle}>
          <div css={recordTitleAndChipStyle}>
            <div css={recordTitleStyle}>
              {year}년 {month}월 {date}일 등반 기록
            </div>
            <div css={chipBoxStyle}>
              {types.includes("지구력") && <Chip title="지" color="#ff8aa0" />}
              {types.includes("볼더링") && <Chip title="볼" color="#83bbff" />}
              {types.includes("리드") && <Chip title="리" color="#ffc519" />}
            </div>
          </div>
          {isEditable && (
            <div css={actionButtonStyle}>
              <button
                css={buttonStyle}
                onClick={() =>
                  navigateTo(`/record/${recordCardResData.recordId}`)
                }
              >
                수정
              </button>
              |
              <button css={buttonStyle} onClick={handlePopupOpen}>
                삭제
              </button>
            </div>
          )}
        </div>

        <div css={cardBodyStyle}>
          <div css={bodyContentStyle}>
            <div css={bodyTitleStyle}>운동시간</div>
            <div css={descriptionStyle}>
              {recordCardResData.recordStartTime}~
              {recordCardResData.recordEndTime} ({recordCardResData.duration})
            </div>
          </div>

          <div css={bodyContentStyle}>
            <div css={bodyTitleStyle}>장소</div>
            <div css={descriptionStyle}>
              {recordCardResData.recordCenterName}
            </div>
          </div>

          <div css={bodyContentStyle}>
            <div css={bodyTitleStyle}>완등횟수</div>
            <div css={gradeWithCountBoxStyle}>
              {records.map(({ colorGrade, completeCount }, idx) => (
                <div key={idx} css={gradeWithCountStyle}>
                  <div css={gradeStyle(colorGrade)} />
                  <div css={gradeCountStyle}>{completeCount}</div>
                </div>
              ))}
            </div>
          </div>

          <div css={bodyContentStyle}>
            <div css={bodyTitleStyle}>시도횟수</div>
            <div css={gradeWithCountBoxStyle}>
              {records.map(({ colorGrade, tryCount }, idx) => (
                <div key={idx} css={gradeWithCountStyle}>
                  <div css={gradeStyle(colorGrade)} />
                  <div css={gradeCountStyle}>{tryCount}</div>
                </div>
              ))}
            </div>
          </div>
          <div css={bodyContentStyle}>
            <div css={bodyTitleStyle}>사진첩</div>
          </div>
          <div css={photoBoxStyle}>
            {photos.map((path, idx) => (
              <img key={idx} css={photoStyle} src={path} />
            ))}
          </div>
        </div>
      </div>

      {isDeleting && (
        <DeleteRecord
          recordId={recordCardResData.recordId}
          onClose={handlePopupClose}
        />
      )}
    </>
  );
};

const recordCardStyle = css`
  width: calc(100vw - 60px);
  border: 1px solid #d6d6d6;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
`;

const cardHeaderStyle = css`
  display: flex;
  justify-content: space-between;
  padding: 11px 13px;
  border-bottom: 1px solid #d6d6d6;
`;

const recordTitleAndChipStyle = css`
  display: flex;
  gap: 6px;
  font-size: 16px;
  font-weight: bold;
`;

const recordTitleStyle = css`
  white-space: nowrap;
`;

const chipBoxStyle = css`
  display: flex;
  align-items: center;
  gap: 3px;
`;

const actionButtonStyle = css`
  width: max-content;
  display: flex;
  align-items: center;
  gap: 2px;
  font-size: 12px;
  font-weight: regular;
  color: #848484;
`;

const buttonStyle = css`
  width: max-content;
  color: #848484;
  cursor: pointer;
`;

const cardBodyStyle = css`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 12px 14px 13px;
`;

const bodyContentStyle = css`
  display: flex;
  justify-content: space-between;
  font-size: 14px;
`;

const bodyTitleStyle = css`
  font-weight: bold;
  white-space: nowrap;
`;

const descriptionStyle = css`
  text-align: right;
`;

const gradeWithCountBoxStyle = css`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 8px;
  width: 100%;
`;

const gradeWithCountStyle = css`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2px;
`;

const gradeStyle = (color: string) => css`
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background-color: ${color};
`;

const gradeCountStyle = css`
  width: 18px;
  text-align: center;
`;

export const photoBoxStyle = css`
  display: flex;
  align-items: center;
  gap: 5px;
  overflow-x: scroll;
  -ms-overflow-style: none;
  scrollbar-width: none;
  ::-webkit-scrollbar {
    display: none;
  }
`;

export const photoStyle = css`
  width: 58px;
  height: 58px;
  border-radius: 5px;
  object-fit: cover;
`;

export default RecordCard;
