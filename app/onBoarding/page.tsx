/** @JSXImportSource @emotion/react **/

"use client";

import { signIn } from "next-auth/react";
import Button from "@/components/Button";
import { css } from "@emotion/react";
import { useRouter } from "next/navigation";

type OnBoardingPageProps = {};

const OnBoardingPage: React.FC<OnBoardingPageProps> = ({}) => {
  const router = useRouter();

  return (
    <div css={pageStyle}>
      <div css={headerStyle}>
        <img src="/icons/logo-512x512.png" alt="클맵 로고" css={logoStyle} />
        <div>
          <div css={titleStyle}>암장의 모든 것, 클맵</div>
          <div css={textStyle}>자고로 벽이란 넓어야 맛있는 법</div>
        </div>
      </div>
      <div css={ButtonBoxStyle}>
        <Button
          type="kakao"
          buttonName="카카오 로그인"
          onClick={() => signIn("kakao")}
        />
        <Button
          type="naver"
          buttonName="네이버 로그인"
          onClick={() => signIn("naver")}
        />
        <Button
          type="google"
          buttonName="구글 로그인"
          onClick={() => signIn("google")}
        />
        <div css={textWithLineStyle}>또는</div>
        <Button
          type="sub"
          buttonName="비회원으로 시작하기"
          onClick={() => router.push("/map")}
        />
      </div>
    </div>
  );
};

const columnStyle = css`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const pageStyle = css`
  ${columnStyle};
  justify-content: space-between;
  width: calc(100vw - 60px);
  height: calc(100vh - 60px);
  margin: 30px;
`;

const headerStyle = css`
  ${columnStyle};
  gap: 60px;
  margin-top: 80px;
`;

const logoStyle = css`
  width: 200px;
  height: 200px;
  border-radius: 10px;
`;

const titleStyle = css`
  font-size: 24px;
  font-weight: bold;
  text-align: center;
`;

const textStyle = css`
  font-size: 20px;
  color: #848484;
  margin-top: 20px;
  text-align: center;
`;

const ButtonBoxStyle = css`
  ${columnStyle};
  gap: 20px;
  width: 100%;
`;

const textWithLineStyle = css`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 22px;
  width: 100%;
  gap: 15px;

  &::before,
  &::after {
    content: "";
    flex-grow: 1;
    height: 1px;
    background-color: #d6d6d6;
  }
`;

export default OnBoardingPage;
