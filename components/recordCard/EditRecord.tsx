/** @JSXImportSource @emotion/react **/

"use client";

import { css } from "@emotion/react";
import BottomSheet from "../BottomSheet";
import Scrim from "../Scrim";
import SearchField from "../SearchField";
import Button from "../Button";
import { photoBoxStyle, photoStyle } from "./RecordCard";

type EditRecordProps = {
  recordId: number;
  onClose: () => void;
};

const EditRecord: React.FC<EditRecordProps> = ({ recordId, onClose }) => {
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

  const editTitleStyle = css`
    font-size: 22px;
    padding-bottom: 16px;
    text-align: center;
  `;

  const editBodyStyle = css`
    display: flex;
    flex-direction: column;
    gap: 30px;
    margin: 0 30px;
    width: calc(100vw - 60px);
    overflow-y: auto;
  `;

  const editBodyContentStyle = css`
    display: flex;
    flex-direction: column;
    gap: 14px;
  `;

  const editBodyTitleStyle = css`
    font-size: 18px;
    font-weight: bold;
  `;

  const climbingTypeStyle = css`
    display: flex;
    gap: 4px;
  `;

  // [TODO] 수정완료 > Scrim onClose 닫힘 > 수정완료시 보낸 data 재조회
  // [TODO] SearchField: value, onChange, onSearch, isValid
  // [TODO] 운동시간 디자인 확정
  return (
    <Scrim align="end" onClose={onClose}>
      <BottomSheet
        isOpen={true}
        onSubmit={() => {
          console.log("[TODO] membershipId + 수정 데이터 API 연동");
          onClose();
        }}
        size="large"
        buttonName="수정하기"
        isFormValid={true}
      >
        <div css={editTitleStyle}>2024년 12월 6일 등반일지</div>
        <div css={editBodyStyle}>
          <div css={editBodyContentStyle}>
            <div css={editBodyTitleStyle}>장소</div>
            <SearchField
              size="large"
              placeholder="암장 이름을 검색해보세요."
              onChange={() => console.log("onChange")}
              onSearch={() => console.log("onSearch")}
            />
          </div>
          <div css={editBodyContentStyle}>
            <div css={editBodyTitleStyle}>운동 시간</div>
            <SearchField
              size="large"
              placeholder="암장 이름을 검색해보세요."
              onChange={() => console.log("onChange")}
              onSearch={() => console.log("onSearch")}
            />
          </div>
          <div css={editBodyContentStyle}>
            <div css={editBodyTitleStyle}>운동 종류</div>
            <div css={climbingTypeStyle}>
              <label>
                <input type="checkbox" />
                볼더링
              </label>
              <label>
                <input type="checkbox" />
                지구력
              </label>
              <label>
                <input type="checkbox" />
                리드
              </label>
            </div>
          </div>
          <div css={editBodyContentStyle}>
            <div css={editBodyTitleStyle}>등반 기록</div>
            <div>등반 기록 카드 만들 곳</div>
          </div>
          <div css={editBodyContentStyle}>
            <div css={editBodyTitleStyle}>등반 사진</div>
            <div css={photoBoxStyle}>
              {photos.map((path, idx) => (
                <img key={idx} css={photoStyle} src={path} />
              ))}
            </div>
          </div>
        </div>
      </BottomSheet>
    </Scrim>
  );
};

export default EditRecord;
