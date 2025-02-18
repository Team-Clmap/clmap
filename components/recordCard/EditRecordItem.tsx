/** @JSXImportSource @emotion/react **/

"use client";

import { css } from "@emotion/react";
import { RecordItemProps } from "./AddRecordItem";
import Popup from "../Popup";
import Input from "../Input";
import Scrim from "../Scrim";
import GradeInput from "../GradeInput";
import { useState } from "react";
import Toast from "../Toast";

const EditRecordItem = ({
  id,
  vGrade,
  colorGrade,
  tryCount,
  completeCount,
  onSubmit,
  onClose,
}: RecordItemProps) => {
  const [toastMessage, setToastMessage] = useState<string | null>(null);
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
      setToastMessage("완등수가 시도수보다 많아요.");
      return;
    }
    if (values.tryCount == 0) {
      setToastMessage("시도하지 않은 문제는 추가할 수 없어요.");
      return;
    }
    onSubmit({ id, ...values });
    onClose();
  };

  return (
    <Scrim align="center" onClose={onClose}>
      <Popup
        title="등반기록 수정하기"
        buttonName="수정"
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
              value={values.vGrade.slice(1)}
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
      {toastMessage && (
        <Toast
          type="alert"
          message={toastMessage}
          setIsActive={() => setToastMessage(null)}
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

export default EditRecordItem;
