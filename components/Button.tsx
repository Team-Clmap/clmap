/** @JSXImportSource @emotion/react **/

import { css } from "@emotion/react";
import { MouseEventHandler } from "react";

type ButtonProps = {
  type: "main" | "sub" | "kakao" | "naver" | "google";
  name: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
  width?: "whole" | "half";
  isActive?: boolean;
};

const Button: React.FC<ButtonProps> = ({
  type,
  name,
  onClick,
  width = "whole",
  isActive = true,
}) => {
  const buttonStyle = css`
    width: ${width === "half"
      ? "calc((100vw - 60px) / 2 - 8px)"
      : "calc(100vw - 60px)"};
    height: 72px;
    padding: ${type === "google" || (type === "sub" && isActive)
      ? "20px"
      : "21px"};
    border-radius: 10px;
    border: ${isActive
      ? type === "google"
        ? "1px solid #d6d6d6"
        : type === "sub"
          ? "1px solid #83bbff"
          : "none"
      : "none"};
    background-color: ${{
      main: isActive ? "#83bbff" : "#b0b0b0",
      sub: isActive ? "#ffffff" : "#ededed",
      naver: "#03c75a",
      kakao: "#fee500",
      google: "#ffffff",
    }[type] || "#83bbff"};
    color: ${{
      main: "#ffffff",
      sub: isActive ? "#83bbff" : "#848484",
      naver: "#ffffff",
      kakao: "#000000",
      google: "#000000",
    }[type] || "#ffffff"};
    font-size: 22px;
    font-weight: bold;
    cursor: ${isActive ? "pointer" : "auto"};

    // [TODO] position 잡기
    position: relative;
  `;

  const iconStyle = css`
    width: 30px;
    height: 30px;

    position: absolute;
    left: 20px;
  `;

  return (
    <button css={buttonStyle} onClick={onClick}>
      {type === "kakao" && <img src="/icons/kakao-logo.png" css={iconStyle} />}
      {type === "naver" && <img src="/icons/naver-logo.png" css={iconStyle} />}
      {type === "google" && <img src="/icons/google-logo.png" css={iconStyle} />}
      {name}
    </button>
  );
};

export default Button;
