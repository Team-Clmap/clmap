/** @JSXImportSource @emotion/react **/

"use client";

import { css } from "@emotion/react";
import { useEffect, useState } from "react";

import { photoBoxStyle, photoStyle } from "@/components/recordCard/RecordCard";
import ClimbingTypeCheckbox, {
  ClimbingType,
} from "@/components/recordCard/ClimbingTypeCheckbox";
import Header from "@/components/Header";
import Chip from "@/components/Chip";
import {
  actionButtonStyle,
  buttonStyle,
} from "@/components/membershipCard/MembershipCard";
import SearchFieldBottomSheet from "@/components/SearchFieldBottomSheet";
import TimePicker from "@/components/TimePicker/TimePicker";
import EditRecordItem from "@/components/recordCard/EditRecordItem";
import {
  recordCardReqData,
  recordCardResData,
} from "@/public/mocks/recordData";
import DeleteRecordItem from "@/components/recordCard/DeleteRecordItem";
import AddRecordItem from "@/components/recordCard/AddRecordItem";
import { formatTime } from "@/utils/utils";
import Button from "@/components/Button";

export type RecordType = {
  id: number;
  vGrade: string;
  colorGrade: string;
  tryCount: number;
  completeCount: number;
};

type EditRecordProps = {
  recordId: number;
  onSubmit: () => void;
};

type ListItemProps = RecordType & {
  openState: (key: string, id?: number) => void;
};

const ListItem: React.FC<ListItemProps> = ({
  id,
  vGrade,
  colorGrade,
  tryCount,
  completeCount,
  openState,
}) => (
  <div css={recordListStyle}>
    <div css={chipBoxStyle}>
      <Chip title={vGrade} color={colorGrade} />
    </div>
    <div>{tryCount}</div>
    <div>{completeCount}</div>
    <div>
      {tryCount === 0
        ? "-"
        : `${((completeCount / tryCount) * 100).toFixed(0)}%`}
    </div>
    <div css={actionButtonStyle}>
      <button css={buttonStyle} onClick={() => openState("isEditing", id)}>
        수정
      </button>
      |
      <button css={buttonStyle} onClick={() => openState("isDeleting", id)}>
        삭제
      </button>
    </div>
  </div>
);

const EditRecord: React.FC<EditRecordProps> = ({ recordId, onSubmit }) => {
  // [TODO] 일간 기록 조회 > atom 저장 > atom 조회
  const [records, setRecords] = useState(
    recordCardResData.vGrade.map((_, idx) => ({
      id: idx,
      vGrade: recordCardResData.vGrade[idx],
      colorGrade: recordCardResData.colorGrade[idx],
      tryCount: recordCardResData.tryCount[idx],
      completeCount: recordCardResData.completeCount[idx],
    }))
  );

  const year = recordCardReqData.year;
  const month = recordCardReqData.month;
  const date = recordCardReqData.date;
  const [startTime, setStartTime] = useState(
    formatTime(recordCardResData.recordStartTime)
  );
  const [endTime, setEndTime] = useState(
    formatTime(recordCardResData.recordEndTime)
  );
  const [photos, setPhotos] = useState(recordCardResData.recordImages);

  const [searchValue, setSearchValue] = useState("");
  const [state, setState] = useState({
    isSearching: false,
    isPicking: false,
    isAdding: false,
    isEditing: false,
    isDeleting: false,
    recordId: null as number | null,
  });

  const [checkedStates, setCheckedStates] = useState<
    Record<ClimbingType, boolean>
  >({
    bouldering: recordCardResData.recordClimbingTypes.includes("볼더링"),
    endurance: recordCardResData.recordClimbingTypes.includes("지구력"),
    lead: recordCardResData.recordClimbingTypes.includes("리드"),
  });

  const openState = (key: string, id?: number) =>
    setState((prev) => ({ ...prev, [key]: true, recordId: id ?? null }));
  const closeState = (key: string) =>
    setState((prev) => ({ ...prev, [key]: false, recordId: null }));

  const handleTypeChange = (id: ClimbingType, checked: boolean) => {
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

  const handleAddRecord = (newRecord: RecordType) => {
    setRecords((prevRecords) => [
      ...prevRecords,
      {
        ...newRecord,
        id: prevRecords.length,
      },
    ]);
  };

  const handleDeleteRecord = (recordItemId: number) => {
    setRecords((prevRecords) =>
      prevRecords.filter((record) => record.id !== recordItemId)
    );
  };

  const handleSubmit = () => {
    console.log("유효성 검사 및 기록 수정 API PUT");
    console.log("일간 조회 화면으로 이동");
  };

  // [TODO] id 관련 처리, timepicker 구현, 운동 시작 종료 시간 분리
  // [TODO] 하단 버튼 유효성 검사
  return (
    <>
      <Header title="기록하기" isBackEnabled backPath="/" />
      <div css={recordBoxStyle}>
        <div css={firstCardStyle}>
          <div css={rowStyle}>
            <div css={titleStyle}>날짜</div>
            <div>
              {year}.{month}.{date}
            </div>
          </div>

          <div css={rowStyle}>
            <div css={titleStyle}>암장</div>
            <button onClick={() => openState("isSearching")}>
              {recordCardResData.recordCenterName}
            </button>
          </div>

          <div css={timeInfoStyle}>
            <div css={columnStyle}>
              <div css={titleStyle}>운동 시작 시간</div>
              <button
                css={timePickerStyle}
                onClick={() => openState("isPicking")}
              >
                {startTime}
              </button>
            </div>
            <div css={columnStyle}>
              <div css={titleStyle}>운동 종료 시간</div>
              <button
                css={timePickerStyle}
                onClick={() => openState("isPicking")}
              >
                {endTime}
              </button>
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
                  onChange={handleTypeChange}
                />
              ))}
            </div>
          </div>
        </div>

        <div css={secondCardStyle}>
          <div css={titleBoxStyle}>
            <div css={titleStyle}>난이도</div>
            <div css={titleStyle}>시도수</div>
            <div css={titleStyle}>완등수</div>
            <div css={titleStyle}>완등률</div>
            <button css={addButtonStyle} onClick={() => openState("isAdding")}>
              추가
            </button>
          </div>
          <div css={listBoxStyle}>
            {records.map((item, idx) => (
              <ListItem key={idx} openState={openState} {...item} />
            ))}
          </div>
        </div>

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
        <div css={buttonBoxStyle}>
          <Button type="main" buttonName="수정하기" onClick={handleSubmit} />
        </div>
      </div>

      {state.isSearching && (
        <SearchFieldBottomSheet
          value={searchValue}
          setValue={setSearchValue}
          onClose={() => closeState("isSearching")}
        />
      )}
      {state.isPicking && (
        <TimePicker
          value={startTime}
          setValue={setStartTime}
          onClose={() => closeState("isPicking")}
        />
      )}
      {state.isAdding && (
        <AddRecordItem
          id={records.length}
          vGrade="V0"
          colorGrade="#ffffff"
          tryCount={0}
          completeCount={0}
          onSubmit={handleAddRecord}
          onClose={() => closeState("isAdding")}
        />
      )}
      {state.isEditing && (
        <EditRecordItem
          id={state.recordId!}
          vGrade={records[state.recordId!]?.vGrade}
          colorGrade={records[state.recordId!]?.colorGrade}
          tryCount={records[state.recordId!]?.tryCount}
          completeCount={records[state.recordId!]?.completeCount}
          onSubmit={handleAddRecord}
          onClose={() => closeState("isEditing")}
        />
      )}
      {state.isDeleting && (
        <DeleteRecordItem
          id={state.recordId!}
          onSubmit={handleDeleteRecord}
          onClose={() => closeState("isDeleting")}
        />
      )}
    </>
  );
};

const recordBoxStyle = css`
  display: flex;
  flex-direction: column;
  gap: 14px;
  margin: 30px;
`;

const firstCardStyle = css`
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

const titleBoxStyle = css`
  width: calc(100vw - 110px);
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const titleStyle = css`
  font-size: 16px;
  font-weight: bold;
  line-height: 16px;
`;

const timeInfoStyle = css`
  width: 100%;
  display: flex;
`;

const timePickerStyle = css`
  text-align: left;
`;

const secondCardStyle = css`
  width: calc(100vw - 60px);
  padding: 10px 0;
  border: 1px solid #d6d6d6;
  border-radius: 10px;
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 21px;
  align-items: center;

  &::before {
    content: "";
    width: 100%;
    position: absolute;
    top: 38px;
    border-top: 1px solid #d6d6d6;
  }
`;

const addButtonStyle = css`
  color: #83bbff;
  line-height: 16px;
  display: flex;
  gap: 2px;
  align-items: center;

  &::before {
    content: "";
    width: 12px;
    height: 12px;
    background-image: url("/icons/add-blue.png");
    background-size: contain;
    background-repeat: no-repeat;
  }
`;

const listBoxStyle = css`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const recordListStyle = css`
  width: calc(100vw - 100px);
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;

  > * {
    width: 54px;
    justify-content: center;
    text-align: center;
  }
`;

const chipBoxStyle = css`
  display: flex;
  justify-content: center;
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

const buttonBoxStyle = css`
  position: fixed;
  bottom: 24px;
`;

export default EditRecord;
