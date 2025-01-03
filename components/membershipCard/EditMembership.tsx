/** @JSXImportSource @emotion/react **/

"use client";

import { css } from "@emotion/react";
import BottomSheet from "../BottomSheet";
import Scrim from "../Scrim";
import Input from "../Input";
import ToggleButton from "../ToggleButton";
import SearchField from "../SearchField";
import DatePicker from "../DatePicker";
import { MembershipEditData } from "@/public/mocks/membershipDatas";
import { useState } from "react";

type EditMembershipProps = {
  membershipId: number;
  onClose: () => void;
};

const EditMembership: React.FC<EditMembershipProps> = ({ membershipId, onClose }) => {
  const [data, setData] = useState(MembershipEditData);
  const [side, setSide] = useState<"left" | "right">(
    data.membershipType === "횟수권" ? "left" : "right"
  );

  const [isValid, setIsValid] = useState({
    membershipCenterName: true,
    membershipRegistrationDate: true,
    membershipUsageScope: true,
    membershipUsedCount: true,
    membershipExpirationPeriod: true,
  });

  const handleClickLeft = () => {
    setSide("left");
    setData((prev) => ({ ...prev, membershipType: "횟수권" }));
  };
  const handleClickRight = () => {
    setSide("right");
    setData((prev) => ({ ...prev, membershipType: "기간권" }));
  };

  const handleSearch = () => {
    console.log("검색 요청 API 연동");
  };

  const handleInputChange =
    (
      key:
        | "membershipUsageScope"
        | "membershipUsedCount"
        | "membershipExpirationPeriod"
    ) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setData((prev) => ({
        ...prev,
        [key]: e.target.value === "" ? 0 : Number(e.target.value),
      }));
    };

  const validateForm = () => {
    const today = new Date();
    const selectedDate = new Date(data.membershipRegistrationDate);
    const expirationDate =
      selectedDate.getTime() +
      data.membershipExpirationPeriod * 30 * 24 * 60 * 60 * 1000;

    const validations = [
      {
        isValid: data.membershipCenterName.trim() !== "",
        message: "회원권을 등록할 암장이름을 입력해주세요.",
      },
      {
        isValid: selectedDate <= today,
        message: "등록일은 오늘 이전 날짜까지 선택할 수 있어요.",
      },
      {
        isValid: data.membershipUsageScope > 0,
        message: "회원권은 최소 1회권(개월)부터 입력할 수 있어요.",
      },
      {
        isValid:
          (side === "left" && data.membershipUsedCount! >= 0) ||
          side === "right",
        message: "사용횟수를 입력해주세요.",
      },
      {
        isValid: data.membershipExpirationPeriod > 0,
        message: "유효기간은 최소 1개월부터 입력할 수 있어요.",
      },
      {
        isValid: expirationDate > today.getTime(),
        message: "만료된 회원권은 등록할 수 없어요.",
      },
      {
        isValid: expirationDate !== today.getTime(),
        message: "오늘 만료되는 회원권은 등록할 수 없어요.",
      },
      {
        isValid: !(
          side === "left" &&
          data.membershipUsedCount! > data.membershipUsageScope
        ),
        message: "사용횟수가 회원권 사용 범위보다 많아요.",
      },
      {
        isValid: !(
          side === "left" &&
          data.membershipUsedCount! === data.membershipUsageScope
        ),
        message: "모두 사용한 회원권은 등록할 수 없어요.",
      },
    ];

    setIsValid({
      membershipCenterName: data.membershipCenterName.trim() !== "",
      membershipRegistrationDate: selectedDate <= today,
      membershipUsageScope: data.membershipUsageScope > 0,
      membershipUsedCount:
        (side === "left" && data.membershipUsedCount! >= 0) || side === "right",
      membershipExpirationPeriod: data.membershipExpirationPeriod > 0,
    });

    for (const { isValid, message } of validations) {
      if (!isValid) {
        console.log(message);
        return false;
      }
    }

    return true;
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

  // [TODO] 수정완료 > Scrim onClose 닫힘 > 수정완료시 보낸 data 재조회
  return (
    <Scrim align="end" onClose={onClose}>
      <BottomSheet
        isOpen={true}
        onSubmit={() => {
          if (validateForm()) {
            console.log("[TODO] membershipId + 수정 데이터 API 연동");
            onClose();
          }
        }}
        size="medium"
        buttonName="수정하기"
        isFormValid={true}
      >
        <div css={editTitleStyle}>회원권수정</div>
        <ToggleButton
          activeSide={side}
          leftButtonName="횟수권"
          rightButtonName="기간권"
          onClickLeft={handleClickLeft}
          onClickRight={handleClickRight}
        />
        <div css={editBodyStyle}>
          <div css={editBodyContentStyle}>
            <div css={editBodyTitleStyle}>암장이름</div>
            <SearchField
              size="small"
              value={data.membershipCenterName}
              onChange={(value: string) =>
                setData((prev) => ({
                  ...prev,
                  membershipCenterName: value,
                }))
              }
              onSearch={handleSearch}
              isValid={isValid.membershipCenterName}
            />
          </div>
          <div css={editBodyContentStyle}>
            <div css={editBodyTitleStyle}>등록일</div>
            <DatePicker
              size="medium"
              value={data.membershipRegistrationDate}
              onChange={(value: string) =>
                setData((prev) => ({
                  ...prev,
                  membershipRegistrationDate: value,
                }))
              }
              isValid={isValid.membershipRegistrationDate}
            />
          </div>
          <div css={editBodyContentStyle}>
            <div css={editBodyTitleStyle}>회원권</div>
            <div css={editBodyDescriptionStyle}>
              <Input
                pattern="[0-9]*"
                size="small"
                align="right"
                value={data.membershipUsageScope}
                onChange={handleInputChange("membershipUsageScope")}
                isValid={isValid.membershipUsageScope}
              />
              {side === "left" ? "회권" : "개월"}
            </div>
          </div>
          {side === "left" && (
            <div css={editBodyContentStyle}>
              <div css={editBodyTitleStyle}>사용횟수</div>
              <div css={editBodyDescriptionStyle}>
                <Input
                  pattern="[0-9]*"
                  size="small"
                  align="right"
                  value={data.membershipUsedCount!.toString()}
                  onChange={handleInputChange("membershipUsedCount")}
                  isValid={isValid.membershipUsedCount}
                />
                회
              </div>
            </div>
          )}
          <div css={editBodyContentStyle}>
            <div css={editBodyTitleStyle}>유효기간</div>
            <div css={editBodyDescriptionStyle}>
              <Input
                pattern="[0-9]*"
                size="small"
                align="right"
                value={data.membershipExpirationPeriod}
                onChange={handleInputChange("membershipExpirationPeriod")}
                isValid={isValid.membershipExpirationPeriod}
              />
              개월
            </div>
          </div>
        </div>
      </BottomSheet>
    </Scrim>
  );
};

export default EditMembership;
