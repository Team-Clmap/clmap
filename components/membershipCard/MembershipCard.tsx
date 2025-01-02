/** @JSXImportSource @emotion/react **/

"use client";

import { css } from "@emotion/react";
import { useReducer, useState } from "react";
import Chip from "../Chip";
import BottomSheet from "../BottomSheet";
import Scrim from "../Scrim";
import EditMembership from "./EditMembership";

type MembershipCardProps = {
  centerName: string;
  membershipType: "횟수권" | "기간권";
  registrationDate: string;
  expirationDate: string;
  restInfo: string;
  isEditable?: boolean;
};

export type MembershipState = {
  activeSide: "left" | "right";
  searchValue: string;
  dateValue: string;
  membershipCount: string;
  usageCount: string;
  validityPeriod: string;
};

type Action =
  | { type: "SET_ACTIVE_SIDE"; payload: "left" | "right" }
  | { type: "UPDATE_FIELD"; field: keyof MembershipState; value: string };

const initialState: MembershipState = {
  activeSide: "left",
  searchValue: "",
  dateValue: "",
  membershipCount: "",
  usageCount: "",
  validityPeriod: "",
};

const reducer = (state: MembershipState, action: Action): MembershipState => {
  switch (action.type) {
    case "SET_ACTIVE_SIDE":
      return { ...state, activeSide: action.payload };
    case "UPDATE_FIELD":
      return { ...state, [action.field]: action.value };
    default:
      return state;
  }
};

const MembershipCard: React.FC<MembershipCardProps> = ({
  centerName,
  membershipType,
  registrationDate,
  expirationDate,
  restInfo,
  isEditable = false,
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [isEditing, setIsEditing] = useState(false);

  const handleBottomSheetOpen = () => setIsEditing(true);
  const handleBottomSheetClose = () => setIsEditing(false);

  const handleChange = (field: keyof MembershipState, value: string) => {
    dispatch({ type: "UPDATE_FIELD", field, value });
  };

  const handleSubmit = () => {
    const formData = {
      searchValue: state.searchValue,
      dateValue: state.dateValue,
      membershipCount: state.membershipCount,
      validityPeriod: state.validityPeriod,
      ...(membershipType === "횟수권" && { usageCount: state.usageCount }),
    };

    console.log("폼이 제출되었습니다.");
    console.log("Form Data: ", formData);

    setIsEditing(false);
  };

  const isFormValid = (): boolean => {
    const commonFieldsValid =
      state.searchValue.trim() !== "" &&
      state.dateValue.trim() !== "" &&
      state.membershipCount.trim() !== "" &&
      state.validityPeriod.trim() !== "";

    const usageCountValid =
      membershipType !== "기간권" ? state.usageCount.trim() !== "" : true;

    return commonFieldsValid && usageCountValid;
  };

  const membershipCardStyle = css`
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

  const centerAndTypeStyle = css`
    display: flex;
    gap: 6px;
    font-size: 16px;
    font-weight: bold;
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
    gap: 9px;
    padding: 12px 14px 11px;
  `;

  const bodyContentStyle = css`
    display: flex;
    font-size: 14px;
  `;

  const bodyTitleStyle = css`
    width: 106px;
    text-align: left;
    font-weight: bold;
  `;

  const bodyDescriptionStyle = css`
    font-weight: regular;
    width: fit-content;
  `;

  return (
    <>
      <div css={membershipCardStyle}>
        <div css={cardHeaderStyle}>
          <div css={centerAndTypeStyle}>
            {centerName}
            <Chip
              title={membershipType}
              color={membershipType === "횟수권" ? "#ffc519" : "#83bbff"}
            />
          </div>
          {isEditable && (
            <div css={actionButtonStyle}>
              <button css={buttonStyle} onClick={handleBottomSheetOpen}>
                수정
              </button>
              |
              <button
                css={buttonStyle}
                onClick={() => console.log("삭제 팝업")}
              >
                삭제
              </button>
            </div>
          )}
        </div>
        <div css={cardBodyStyle}>
          <div css={bodyContentStyle}>
            <div css={bodyTitleStyle}>등록일</div>
            <div css={bodyDescriptionStyle}>{registrationDate}</div>
          </div>
          <div css={bodyContentStyle}>
            <div css={bodyTitleStyle}>유효기간</div>
            <div css={bodyDescriptionStyle}>{expirationDate}</div>
          </div>
          <div css={bodyContentStyle}>
            <div css={bodyTitleStyle}>남은기간/횟수</div>
            <div css={bodyDescriptionStyle}>{restInfo}</div>
          </div>
        </div>
      </div>

      {isEditing && (
        <Scrim align="end" onClose={handleBottomSheetClose}>
          <BottomSheet
            isOpen={isEditing}
            onSubmit={() => {
              handleSubmit();
            }}
            size="medium"
            buttonName="수정하기"
            isFormValid={isFormValid()}
          >
            <EditMembership
              state={state}
              onFieldChange={handleChange}
              onSideChange={(side) =>
                dispatch({ type: "SET_ACTIVE_SIDE", payload: side })
              }
            />
          </BottomSheet>
        </Scrim>
      )}
    </>
  );
};

export default MembershipCard;
