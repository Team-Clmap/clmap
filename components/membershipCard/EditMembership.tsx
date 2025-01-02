/** @JSXImportSource @emotion/react **/

"use client";

import { css } from "@emotion/react";
import Input from "../Input";
import ToggleButton from "../ToggleButton";
import SearchField from "../SearchField";
import DatePicker from "../DatePicker";
import { MembershipState } from "./MembershipCard";

type EditMembershipProps = {
  state: MembershipState;
  onFieldChange: (field: keyof MembershipState, value: string) => void;
  onSideChange: (side: "left" | "right") => void;
};

const EditMembership: React.FC<EditMembershipProps> = ({
  state,
  onFieldChange,
  onSideChange,
}) => {
  const createChangeHandler =
    (field: keyof MembershipState) => (value: string) => {
      onFieldChange(field, value);
    };

  const handleSearch = () => {
    const results = "예) 검색결과";
    console.log("검색 결과입니다: ", results);
  };

  const editTitleStyle = css`
    font-size: 22px;
    padding-bottom: 16px;
    text-align: center;
  `;

  const editBodyStyle = css`
    display: flex;
    flex-direction: column;
    gap: 12px;
    padding: 30px;
  `;

  const editBodyContentStyle = css`
    display: flex;
    align-items: center;
    justify-content: space-between;
  `;

  const editBodyTitleStyle = css`
    font-size: 20px;
    width: fit-content;
  `;

  const editBodyDescriptionStyle = css`
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 18px;
    width: fit-content;
  `;

  return (
    <>
      <div css={editTitleStyle}>회원권수정</div>
      <ToggleButton
        activeSide={state.activeSide}
        leftButtonName="횟수권"
        rightButtonName="기간권"
        onClickLeft={() => onSideChange("left")}
        onClickRight={() => onSideChange("right")}
      />
      <div css={editBodyStyle}>
        <div css={editBodyContentStyle}>
          <div css={editBodyTitleStyle}>암장이름</div>
          <div css={editBodyDescriptionStyle}>
            <SearchField
              size="small"
              value={state.searchValue}
              onChange={createChangeHandler("searchValue")}
              onSearch={handleSearch}
            />
          </div>
        </div>
        <div css={editBodyContentStyle}>
          <div css={editBodyTitleStyle}>등록일</div>
          <div css={editBodyDescriptionStyle}>
            <DatePicker
              size="medium"
              value={state.dateValue}
              onChange={createChangeHandler("dateValue")}
            />
          </div>
        </div>
        <div css={editBodyContentStyle}>
          <div css={editBodyTitleStyle}>회원권</div>
          <div css={editBodyDescriptionStyle}>
            <Input
              size="small"
              align="right"
              value={state.membershipCount}
              onChange={(e) =>
                createChangeHandler("membershipCount")(e.target.value)
              }
              isValid={!!state.membershipCount.match(/^\d+$/)}
            />
            {state.activeSide === "left" ? "회권" : "개월"}
          </div>
        </div>
        {state.activeSide === "left" && (
          <div css={editBodyContentStyle}>
            <div css={editBodyTitleStyle}>사용횟수</div>
            <div css={editBodyDescriptionStyle}>
              <Input
                size="small"
                align="right"
                value={state.usageCount}
                onChange={(e) =>
                  createChangeHandler("usageCount")(e.target.value)
                }
                isValid={!!state.usageCount.match(/^\d+$/)}
              />
              회
            </div>
          </div>
        )}
        <div css={editBodyContentStyle}>
          <div css={editBodyTitleStyle}>유효기간</div>
          <div css={editBodyDescriptionStyle}>
            <Input
              size="small"
              align="right"
              value={state.validityPeriod}
              onChange={(e) =>
                createChangeHandler("validityPeriod")(e.target.value)
              }
              isValid={!!state.validityPeriod.match(/^\d+$/)}
            />
            개월
          </div>
        </div>
      </div>
    </>
  );
};

export default EditMembership;
