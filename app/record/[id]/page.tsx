/** @JSXImportSource @emotion/react **/

"use client";

import { css } from "@emotion/react";
import { useState } from "react";

import { photoBoxStyle, photoStyle } from "@/components/recordCard/RecordCard";
import ClimbingTypeCheckbox, {
  ClimbingType,
} from "@/components/recordCard/ClimbingTypeCheckbox";
import Header from "@/components/Header";

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
  const [photos, setPhotos] = useState([
    "/images/record_2.png",
    "/images/record_3.jpeg",
    "/images/record_4.jpg",
    "/images/record_7.png",
    "/images/record_11.png",
    "/images/record_8.png",
    "/images/record_10.png",
  ]);

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

  const handleDeletePhoto = (photoPath: string) => {
    setPhotos((prevPhotos) =>
      prevPhotos.filter((photo) => photo !== photoPath)
    );
  };

  const recordBoxStyle = css`
    display: flex;
    flex-direction: column;
    gap: 30px;
    margin: 30px;
  `;

  const cardStyle = css`
    border: 1px solid #d6d6d6;
    border-radius: 10px;
    padding: 19px;
    width: calc(100vw - 60px);

    display: flex;
    flex-direction: column;
    gap: 26px;
  `;

  const columnStyle = css`
    display: flex;
    flex-direction: column;
    gap: 10px;
    font-size: 16px;
    line-height: 16px;
    flex: 1;
  `;

  const rowStyle = css`
    display: flex;
    gap: 5px;
    line-height: 16px;
  `;

  const titleStyle = css`
    font-weight: bold;
  `;

  const timeInfoStyle = css`
    width: 100%;
    display: flex;
  `;

  const timePickerStyle = css`
    text-align: left;
  `;

  const infoTextStyle = css`
    font-size: 12px;
    text-align: right;
  `;

  const addPhotoStyle = css`
    ${photoStyle};
    display: flex;
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

  const deletePhotoStyle = css`
    width: 58px;
    height: 58px;
    position: relative;

    &::before {
      content: "";
      position: absolute;
      top: 0;
      right: 0;
      width: 20px;
      height: 20px;
      background-image: url("/icons/close.png");
      background-size: contain;
      background-repeat: no-repeat;
    }
  `;

  // [TODO] 유효성 검사
  // [TODO] TimePicker 구현
  // [TODO] 등반기록카드 구현
  // [TODO] 하단 버튼 생성
  return (
    <>
      <Header title="기록하기" isBackEnabled backPath="/" />
      <div css={recordBoxStyle}>
        <div css={cardStyle}>
          <div css={rowStyle}>
            <div css={titleStyle}>날짜</div>
            <div>2024.12.06</div>
          </div>

          <div css={rowStyle}>
            <div css={titleStyle}>암장</div>
            <div>오늘똥못쌌어암장</div>
          </div>

          <div css={timeInfoStyle}>
            <div css={columnStyle}>
              <div css={titleStyle}>운동 시작 시간</div>
              <button css={timePickerStyle}>오후 05:01</button>
            </div>
            <div css={columnStyle}>
              <div css={titleStyle}>운동 종료 시간</div>
              <button css={timePickerStyle}>오후 09:17</button>
            </div>
          </div>

          <div css={columnStyle}>
            <div css={titleStyle}>운동 종류</div>
            <div css={rowStyle}>
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
        </div>

        <div>등반 기록 카드 만들 곳</div>

        <div css={columnStyle}>
          <div css={infoTextStyle}>*최대 10장까지 추가할 수 있어요.</div>
          <div css={photoBoxStyle}>
            <button
              css={addPhotoStyle}
              onClick={() => console.log("갤러리 연동")}
            />
            {photos.map((path, idx) => (
              <button
                key={idx}
                css={deletePhotoStyle}
                onClick={() => handleDeletePhoto(path)}
              >
                <img css={photoStyle} src={path} alt={`photo-${idx}`} />
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default EditRecord;
