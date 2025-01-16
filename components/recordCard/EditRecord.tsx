/** @JSXImportSource @emotion/react **/

"use client";

import { css } from "@emotion/react";
import { useState } from "react";
import Scrim from "../Scrim";
import BottomSheet from "../BottomSheet";
import SearchField from "../SearchField";
import { photoBoxStyle, photoStyle } from "./RecordCard";
import ClimbingTypeCheckbox, { ClimbingType } from "./ClimbingTypeCheckbox";

type EditRecordProps = {
  recordId: number;
  onClose: () => void;
};

const EditRecord: React.FC<EditRecordProps> = ({ recordId, onClose }) => {
  const [searchValue, setSearchValue] = useState("");
  const [checkedStates, setCheckedStates] = useState<
    Record<ClimbingType, boolean>
  >({
    bouldering: false,
    endurance: false,
    lead: false,
  });

  const handleSearchChange = (value: string) => {
    console.log("입력중: ", value);
    setSearchValue(value);
  };

  const handleSearchSubmit = (value: string) => {
    console.log("검색할 암장: ", value);
  };

  const handleCheckboxChange = (id: ClimbingType, checked: boolean) => {
    setCheckedStates((prevState) => ({
      ...prevState,
      [id]: checked,
    }));
  };

  const photos = [
    "/images/record_2.png",
    "/images/record_3.jpeg",
    "/images/record_4.jpg",
    "/images/record_7.png",
    "/images/record_11.png",
    "/images/record_8.png",
    "/images/record_10.png",
  ];

  const editTitleStyle = css`
    font-size: 22px;
    font-weight: bold;
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

  const timeInfoStyle = css`
    display: flex;
    flex: 1;
  `;

  const climbingTypeStyle = css`
    display: flex;
    gap: 4px;
  `;

  const addPhotoStyle = css`
    ${photoStyle};
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 14px;
    background-color: #ededed;

    &::before {
      content: "";
      width: 30px;
      height: 30px;
      background-image: url("/icons/add.png");
      background-size: contain;
      background-repeat: no-repeat;
    }
  `;

  // [TODO] 수정하기 버튼 클릭 시 유효성 검사
  // [TODO] TimePicker 구현
  // [TODO] 등반기록카드 구현
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
              value={searchValue}
              onSearch={handleSearchSubmit}
              onChange={handleSearchChange}
            />
          </div>
          <div css={timeInfoStyle}>
            <div css={editBodyContentStyle}>
              <div css={editBodyTitleStyle}>운동 시작 시간</div>
              <div>오후 5:01</div>
            </div>
            <div css={editBodyContentStyle}>
              <div css={editBodyTitleStyle}>운동 종료 시간</div>
              <div>오후 9:19</div>
            </div>
          </div>
          <div css={editBodyContentStyle}>
            <div css={editBodyTitleStyle}>운동 종류</div>
            <div css={climbingTypeStyle}>
              {(["bouldering", "endurance", "lead"] as const).map((id) => (
                <ClimbingTypeCheckbox
                  key={id}
                  id={id}
                  checked={checkedStates[id]}
                  onChange={handleCheckboxChange}
                />
              ))}
            </div>
          </div>
          <div css={editBodyContentStyle}>
            <div css={editBodyTitleStyle}>등반 기록</div>
            <div>등반 기록 카드 만들 곳</div>
          </div>
          <div css={editBodyContentStyle}>
            <div css={editBodyTitleStyle}>등반 사진</div>
            <div css={photoBoxStyle}>
              <button
                css={addPhotoStyle}
                onClick={() => console.log("갤러리 연동")}
              />
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
