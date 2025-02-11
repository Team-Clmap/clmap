/** @JSXImportSource @emotion/react **/

"use client";

import Button from "@/components/Button";
import DatePicker from "@/components/DatePicker";
import Input from "@/components/Input";
import { css } from "@emotion/react";

type InformationPageProps = {};

const InformationPage = ({}: InformationPageProps) => {
  return (
    <div css={pageStyle}>
      <div css={textStyle}>
        아주 멋진 닉네임이네요!
        <br />
        <br />
        이번에는
        <br />
        프로필 생성을 위해
        <br />
        간단한 정보를 입력해 주세요. <div css={requiredStyle}>*필수항목</div>
      </div>
      <div css={questionBoxStyle}>
        <div css={questionStyle}>
          <div css={titleStyle}>
            <span css={{ color: "#83bbff" }}>*</span>클라이밍을 시작한 날짜는
            언제인가요?
          </div>
          <DatePicker
            size="large"
            value=""
            onChange={() => console.log("onChange")}
          />
        </div>
        <div css={questionStyle}>
          <div css={titleStyle}>인스타그램에서도 소통해요!</div>
          <Input size="medium" onChange={() => console.log("onChange")} />
        </div>
        <div css={questionStyle}>
          <div css={titleStyle}>소속된 크루가 있나요?</div>
          <Input size="medium" onChange={() => console.log("onChange")} />
        </div>
        <div css={questionStyle}>
          <div css={titleStyle}>프로필 사진을 등록해주세요.</div>
          <button
            css={addPhotoStyle}
            onClick={() => console.log("사진 등록 연동")}
          />
        </div>
      </div>
      <div css={buttonStyle}>
        <Button
          type="main"
          buttonName="클맵 시작하기"
          onClick={() => console.log("onClick")}
          isActive
        />
      </div>
    </div>
  );
};

const pageStyle = css`
  display: flex;
  flex-direction: column;
  gap: 60px;
  margin: 60px 30px 24px;
  width: calc(100vw - 60px);
  height: calc(100vh - 84px);
  position: relative;
`;

const textStyle = css`
  font-size: 24px;
  line-height: 32.9px;
`;

const requiredStyle = css`
  font-size: 16px;
  color: #83bbff;
  display: inline;
`;

const questionBoxStyle = css`
  display: flex;
  flex-direction: column;
  gap: 40px;
`;

const questionStyle = css`
  display: flex;
  flex-direction: column;
  gap: 14px;
  line-height: 22px;
`;

const titleStyle = css`
  font-size: 18px;
  font-weight: bold;
`;

const addPhotoStyle = css`
  width: 100px;
  height: 100px;
  border-radius: 10px;
  background-color: #ededed;
  display: flex;
  align-items: center;
  justify-content: center;
  &::before {
    content: "";
    width: 30px;
    height: 30px;
    background-size: contain;
    background-image: url(/icons/add.png);
  }
`;

const buttonStyle = css`
  position: absolute;
  bottom: 0;
`;

export default InformationPage;
