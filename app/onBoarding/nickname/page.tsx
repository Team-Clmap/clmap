/** @JSXImportSource @emotion/react **/

"use client";

import Button from "@/components/Button";
import { css } from "@emotion/react";

type CreateNicknameProps = {};

const CreateNicknamePage: React.FC<CreateNicknameProps> = ({}) => {
  return (
    <div css={pageStyle}>
      <div css={textStyle}>
        반가워요,
        <br />
        <span css={nameStyle}>포근한귀리</span>님!
        <br />
        <br />
        아래 버튼을 눌러서
        <br />
        맛있는 닉네임을 골라주세요.
      </div>
      <div css={buttonBoxStyle}>
        <Button
          type="main"
          buttonName="닉네임 생성하기"
          onClick={() => {
            console.log("닉네임 생성");
          }}
        />
        <Button
          type="sub"
          buttonName="이걸로 할래요"
          onClick={() => {
            console.log("닉네임 확정 및 정보입력 화면으로 이동");
          }}
        />
      </div>
    </div>
  );
};

const pageStyle = css`
  display: flex;
  flex-direction: column;
  gap: 50px;
  margin: 60px 30px;
  width: calc(100vw - 60px);
`;

const textStyle = css`
  font-size: 24px;
  line-height: 33.4px;
`;

const nameStyle = css`
  font-weight: bold;
`;

const buttonBoxStyle = css`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export default CreateNicknamePage;
