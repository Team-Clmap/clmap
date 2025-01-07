/** @JSXImportSource @emotion/react **/

"use client";

import { css } from "@emotion/react";
import Chip from "./Chip";
import { useState } from "react";

type RecordCardProps = { isEditable?: boolean };

const RecordCard: React.FC<RecordCardProps> = ({ isEditable = false }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleBottomSheetOpen = () => setIsEditing(true);
  const handleBottomSheetClose = () => setIsEditing(false);
  const handlePopupOpen = () => setIsDeleting(true);
  const handlePopupClose = () => setIsDeleting(false);

  const recordCardStyle = css`
    width: calc(100vw - 60px);
    border: 1px solid #d6d6d6;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
  `;

  const cardHeaderStyle = css`
    /* width: 100%; */
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
    /* width: fit-content; */
    text-align: right;
  `;

  const gradeWithTextBoxStyle = css`
    display: flex;
    align-items: center;
    gap: 8px;
    width: 100%;
  `;

  const gradeWithTextStyle = css`
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

  const gradeTextStyle = css`
    width: 18px;
    text-align: center;
  `;

  const photoBoxStyle = css`
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

  const photoStyle = css`
    width: 58px;
    height: 58px;
    border-radius: 5px;
    object-fit: cover;
  `;

  return (
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
          <div css={gradeWithTextBoxStyle}>
            <div css={gradeWithTextStyle}>
              <div css={gradeStyle("#ffc519")} />
              <div css={gradeTextStyle}>1</div>
            </div>
            <div css={gradeWithTextStyle}>
              <div css={gradeStyle("#83bbff")} />
              <div css={gradeTextStyle}>5</div>
            </div>
            <div css={gradeWithTextStyle}>
              <div css={gradeStyle("#007aff")} />
              <div css={gradeTextStyle}>9</div>
            </div>
            <div css={gradeWithTextStyle}>
              <div css={gradeStyle("#ff8aa0")} />
              <div css={gradeTextStyle}>0</div>
            </div>
          </div>
        </div>
        <div css={bodyContentStyle}>
          <div css={bodyTitleStyle}>시도횟수</div>
          <div css={gradeWithTextBoxStyle}>
            <div css={gradeWithTextStyle}>
              <div css={gradeStyle("#ffc519")} />
              <div css={gradeTextStyle}>1</div>
            </div>
            <div css={gradeWithTextStyle}>
              <div css={gradeStyle("#83bbff")} />
              <div css={gradeTextStyle}>5</div>
            </div>
            <div css={gradeWithTextStyle}>
              <div css={gradeStyle("#007aff")} />
              <div css={gradeTextStyle}>11</div>
            </div>
            <div css={gradeWithTextStyle}>
              <div css={gradeStyle("#ff8aa0")} />
              <div css={gradeTextStyle}>15 </div>
            </div>
          </div>
        </div>
        <div css={bodyContentStyle}>
          <div css={bodyTitleStyle}>사진첩</div>
        </div>
        <div css={photoBoxStyle}>
          <img css={photoStyle} src="/images/record_1.jpeg" />
          <img css={photoStyle} src="/images/record_2.png" />
          <img css={photoStyle} src="/images/record_3.jpeg" />
          <img css={photoStyle} src="/images/record_4.jpg" />
          <img css={photoStyle} src="/images/record_5.jpg" />
          <img css={photoStyle} src="/images/record_6.png" />
          <img css={photoStyle} src="/images/record_7.png" />
          <img css={photoStyle} src="/images/record_8.png" />
          <img css={photoStyle} src="/images/record_9.png" />
          <img css={photoStyle} src="/images/record_10.png" />
          <img css={photoStyle} src="/images/record_11.png" />
        </div>
      </div>
    </div>
  );
};

export default RecordCard;
