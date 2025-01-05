/** @JSXImportSource @emotion/react **/

import { css } from "@emotion/react";
import { MouseEventHandler } from "react";

type ButtonProps = {
  type: "main" | "sub" | "kakao" | "naver" | "google" | "icon";
  buttonName: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
  width?: "whole" | "half" | "auto";
  isActive?: boolean;
  iconName?: string;
};

const Button: React.FC<ButtonProps> = ({
  type,
  buttonName,
  onClick,
  width = "whole",
  isActive = true,
  iconName,
}) => {
  const colorStyles = {
    main: {
      background: isActive ? "#83bbff" : "#b0b0b0",
      text: "#ffffff",
      border: "none",
    },
    sub: {
      background: isActive ? "#ffffff" : "#ededed",
      text: isActive ? "#83bbff" : "#848484",
      border: "1px solid #83bbff",
    },
    naver: { background: "#03c75a", text: "#ffffff", border: "none" },
    kakao: { background: "#fee500", text: "#000000", border: "none" },
    google: {
      background: "#ffffff",
      text: "#000000",
      border: "1px solid #d6d6d6",
    },
    icon: {
      background: "#ffffff",
      text: "#000000",
      border: "1px solid #d6d6d6",
    },
  };

  const { background, text, border } = colorStyles[type];

  const buttonStyle = css`
    width: ${type === "icon"
      ? "fit-content"
      : width === "half"
        ? "calc((100vw - 60px) / 2 - 8px)"
        : "calc(100vw - 60px)"};
    height: ${type === "icon" ? "24px" : "72px"};
    padding: ${type === "icon"
      ? "1px 5px"
      : type === "google" || (type === "sub" && isActive)
        ? "20px"
        : "21px"};
    border-radius: ${type === "icon" ? "5px" : "10px"};
    border: ${isActive ? border : "none"};
    background-color: ${background};
    color: ${text};
    font-size: ${type === "icon" ? "10px" : "22px"};
    font-weight: ${type === "icon" ? "normal" : "bold"};
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 4px;
    position: relative;
  `;

  const iconStyle = css`
    width: ${type === "icon" ? "14px" : "30px"};
    height: ${type === "icon" ? "14px" : "30px"};
    ${type !== "icon" && "position: absolute; left: 20px;"}
  `;

  const renderIcon = () => {
    if (type === "icon" && iconName) {
      return <img src={`/icons/${iconName}.png`} css={iconStyle} />;
    }
    if (type === "kakao")
      return <img src="/icons/kakao-logo.png" css={iconStyle} />;
    if (type === "naver")
      return <img src="/icons/naver-logo.png" css={iconStyle} />;
    if (type === "google")
      return <img src="/icons/google-logo.png" css={iconStyle} />;
    return null;
  };

  return (
    <button css={buttonStyle} onClick={onClick}>
      {renderIcon()}
      {buttonName}
    </button>
  );
};

export default Button;
