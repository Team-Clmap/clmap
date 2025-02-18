/** @JSXImportSource @emotion/react **/

"use client";

import { css } from "@emotion/react";
import { useRouter } from "next/navigation";

type HeaderProps = {
  title: string;
  isBackEnabled: boolean;
  backPath?: string;
};

const Header = ({
  title,
  isBackEnabled = false,
  backPath = "/",
}: HeaderProps) => {
  const router = useRouter();
  const navigateTo = (path: string) => {
    router.push(path);
  };

  const headerStyle = css`
    position: relative;
    width: 100vw;
    height: 70px;
    display: flex;
    align-items: center;
    padding: 20px;

    background-color: #ffffff;
    border-bottom: 1px solid #d6d6d6;
  `;

  const backButtonStyle = css`
    position: relative;
    width: 30px;
    height: 30px;

    border: none;
    background-color: transparent;
    cursor: pointer;
    z-index: 5;

    &::before {
      content: "";
      position: absolute;
      top: -15px;
      left: -15px;
      right: -15px;
      bottom: -15px;
    }
  `;

  const titleStyle = css`
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    justify-content: center;
    margin: auto;
    font-size: 24px;
    font-weight: bold;
  `;

  return (
    <div css={headerStyle}>
      {isBackEnabled && (
        <div css={backButtonStyle} onClick={() => navigateTo(`${backPath}`)}>
          <img
            css={backButtonStyle}
            src="/icons/arrow-left.png"
            alt="뒤로가기"
          />
        </div>
      )}
      <div css={titleStyle}>{title}</div>
    </div>
  );
};

export default Header;
