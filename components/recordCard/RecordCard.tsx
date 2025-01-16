/** @JSXImportSource @emotion/react **/

"use client";

import { css } from "@emotion/react";
import Chip from "../Chip";
import { useState } from "react";
import DeleteRecord from "./DeleteRecord";
import EditRecord from "./EditRecord";

type RecordCardProps = { isEditable?: boolean };

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

const RecordCard: React.FC<RecordCardProps> = ({ isEditable = false }) => {
  // mock 연결 전 임시 변수
  const recordId = 1;

  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleBottomSheetOpen = () => setIsEditing(true);
  const handleBottomSheetClose = () => setIsEditing(false);
  const handlePopupOpen = () => setIsDeleting(true);
  const handlePopupClose = () => setIsDeleting(false);

  //completeClimbCount,numberOfSuccessfulClimbs,numberTimesCompletion,achievements
  // attemptCount, attempts
  const success = [
    { color: "#ffc519", count: "1" },
    { color: "#83bbff", count: "5" },
    { color: "#007aff", count: "9" },
    { color: "#ff8aa0", count: "0" },
  ];

  const attempts = [
    { color: "#ffc519", count: "1" },
    { color: "#83bbff", count: "5" },
    { color: "#007aff", count: "11" },
    { color: "#ff8aa0", count: "5" },
  ];

  // [TODO] grade

  const photos = [
    "/images/record_1.jpeg",
    "/images/record_2.png",
    "/images/record_3.jpeg",
    "/images/record_4.jpg",
    "/images/record_5.jpg",
    "/images/record_6.png",
    "/images/record_7.png",
    "/images/record_8.png",
    "/images/record_9.png",
    "/images/record_10.png",
    "/images/record_11.png",
  ];

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
  `;

  const descriptionStyle = css`
    text-align: right;
  `;

  const gradeWithCountBoxStyle = css`
    display: flex;
    align-items: center;
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

  // [TODO] 마크업 단계에서 API 확인할 부분: photos, grades(color, count인지 +count type 확인), chips(등반종류 map 필요)

  return (
    <>
      <div css={recordCardStyle}>
        <div css={cardHeaderStyle}>
          <div css={recordTitleAndChipStyle}>
            <div css={recordTitleStyle}>2024년 12월 5일 등반 기록</div>
            <div css={chipBoxStyle}>
              <Chip title="지" color="#ff8aa0" />
              <Chip title="볼" color="#83bbff" />
              <Chip title="리" color="#ffc519" />
            </div>
          </div>
          {isEditable && (
            <div css={actionButtonStyle}>
              <button css={buttonStyle} onClick={handleBottomSheetOpen}>
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
            <div css={descriptionStyle}>17:01~21:19 (4시간 18분)</div>
          </div>
          <div css={bodyContentStyle}>
            <div css={bodyTitleStyle}>장소</div>
            <div css={descriptionStyle}>락트리 클라이밍 분당</div>
          </div>
          <div css={bodyContentStyle}>
            <div css={bodyTitleStyle}>완등횟수</div>
            <div css={gradeWithCountBoxStyle}>
              {success.map(({ color, count }, idx) => (
                <div key={idx} css={gradeWithCountStyle}>
                  <div css={gradeStyle(color)} />
                  <div css={gradeCountStyle}>{count}</div>
                </div>
              ))}
            </div>
          </div>
          <div css={bodyContentStyle}>
            <div css={bodyTitleStyle}>시도횟수</div>
            <div css={gradeWithCountBoxStyle}>
              {attempts.map(({ color, count }, idx) => (
                <div key={idx} css={gradeWithCountStyle}>
                  <div css={gradeStyle(color)} />
                  <div css={gradeCountStyle}>{count}</div>
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
      
      {isEditing && (
        <EditRecord recordId={recordId} onClose={handleBottomSheetClose} />
      )}
      {isDeleting && (
        <DeleteRecord recordId={recordId} onClose={handlePopupClose} />
      )}
    </>
  );
};

export default RecordCard;
