/** @JSXImportSource @emotion/react **/

"use client";

import { css } from "@emotion/react";
import Popup from "../Popup";
import Input from "../Input";
import Scrim from "../Scrim";
import GradeInput from "../GradeInput";
import { useState } from "react";
import Toast from "../Toast";

export type RecordItemProps = {
  vGrade: string;
  colorGrade: string;
  tryCount: number;
  completeCount: number;
  onClose: () => void;
};

const AddRecordItem: React.FC<RecordItemProps> = ({
  vGrade,
  colorGrade,
  tryCount,
  completeCount,
  onClose,
}) => {
  const [isToast, setToast] = useState(false);
  const [values, setValues] = useState({
    colorGrade: colorGrade,
    vGrade: vGrade,
    tryCount: tryCount,
    completeCount: completeCount,
  });

  const handleGradeChange = (value: string) => {
    setValues((prev) => ({ ...prev, vGrade: value }));
  };

  const handleColorChange = (color: string) => {
    setValues((prev) => ({ ...prev, colorGrade: color }));
  };

  const handleTryCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value.replace(/[^0-9]/g, ""), 10) || 0;
    setValues((prev) => ({ ...prev, tryCount: value }));
  };

  const handleCompleteCountChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = parseInt(e.target.value.replace(/[^0-9]/g, ""), 10) || 0;
    setValues((prev) => ({ ...prev, completeCount: value }));
  };

  const isValid = {
    tryAndCompleteCheck: values.completeCount <= values.tryCount,
  };

  const handleSubmit = () => {
    if (!isValid.tryAndCompleteCheck) {
      setToast(true);
      return;
    }
    onClose();
    // 기록 추가 API 연동
  };

  return (
    <Scrim align="center" onClose={onClose}>
      <Popup
        title="등반기록 추가하기"
        buttonName="추가"
        leftButtonName="취소"
        onClickButton={handleSubmit}
        onClickLeft={onClose}
      >
        <div css={rowStyle}>
          <div css={columnStyle}>
            <div css={textStyle}>난이도</div>
            <GradeInput
              onChange={handleGradeChange}
              onColorChange={handleColorChange}
              color={values.colorGrade}
            />
          </div>
          <div css={columnStyle}>
            <div css={textStyle}>시도수</div>
            <Input
              size="small"
              align="center"
              value={values.tryCount.toString()}
              onChange={handleTryCountChange}
            />
          </div>
          <div css={columnStyle}>
            <div css={textStyle}>완등수</div>
            <Input
              size="small"
              align="center"
              value={values.completeCount.toString()}
              onChange={handleCompleteCountChange}
            />
          </div>
        </div>
      </Popup>
      {isToast && (
        <Toast
          type="alert"
          message="완등수가 시도수보다 많아요."
          setIsActive={setToast}
        />
      )}
    </Scrim>
  );
};

const rowStyle = css`
  display: flex;
  gap: 20px;
`;

const columnStyle = css`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const textStyle = css`
  font-size: 16px;
  line-height: 16px;
`;

export default AddRecordItem;
