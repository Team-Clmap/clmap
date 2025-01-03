/** @JSXImportSource @emotion/react **/

"use client";

import { css } from "@emotion/react";
import { useState } from "react";
import Chip from "../Chip";
import EditMembership from "./EditMembership";
import { MembershipCardInfo } from "@/public/mocks/membershipDatas";

type MembershipCardProps = MembershipCardInfo & { isEditable?: boolean };

const MembershipCard: React.FC<MembershipCardProps> = ({
  membershipCenterName,
  membershipType,
  membershipRegistrationDate,
  membershipExpirationDate,
  membershipRestInfo,
  isEditable = false,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const handleBottomSheetOpen = () => setIsEditing(true);
  const handleBottomSheetClose = () => setIsEditing(false);

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
            {membershipCenterName}
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
            <div css={bodyDescriptionStyle}>{membershipRegistrationDate}</div>
          </div>
          <div css={bodyContentStyle}>
            <div css={bodyTitleStyle}>유효기간</div>
            <div css={bodyDescriptionStyle}>{membershipExpirationDate}</div>
          </div>
          <div css={bodyContentStyle}>
            <div css={bodyTitleStyle}>남은기간/횟수</div>
            <div css={bodyDescriptionStyle}>{membershipRestInfo}</div>
          </div>
        </div>
      </div>

      {isEditing && <EditMembership onClose={handleBottomSheetClose} />}
    </>
  );
};

export default MembershipCard;
