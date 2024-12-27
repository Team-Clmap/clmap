/** @jsxImportSource @emotion/react */

"use client";

import { css } from "@emotion/react";
import { ReactNode } from "react";
import Scrim from "./Scrim";

type PopupProps = {
  isOpen: boolean;
  title: string;
  buttonName: string;
  onClickButton: () => void;
  description?: string;
  children?: ReactNode;
  leftButtonName?: string;
  onClickLeft?: () => void;
};

const Popup: React.FC<PopupProps> = ({
  isOpen,
  title,
  buttonName,
  onClickButton,
  description,
  children,
  leftButtonName,
  onClickLeft,
}) => {
  const popupStyle = css`
    display: flex;
    flex-direction: column;
    gap: 30px;
    align-items: center;
    justify-content: center;
    text-align: center;

    width: calc(100% - 60px);
    padding: 30px 22px 20px;

    background-color: #ffffff;
    border-radius: 10px;
    z-index: 1001;
  `;

  const titleStyle = css`
    font-size: 22px;
    font-weight: bold;
  `;

  const descriptionStyle = css`
    font-size: 18px;
    color: #848484;
  `;

  const buttonsStyle = css`
    width: 100%;
    display: flex;
    gap: 16px;
    justify-content: center;
  `;

  const buttonStyle = css`
    height: 50px;

    font-size: 18px;
    font-weight: bold;
    color: #ffffff;
    background-color: #83bbff;
    border: none;
    border-radius: 10px;
    cursor: pointer;
  `;

  const leftButtonStyle = css`
    ${buttonStyle};
    color: #83bbff;
    border: 1px solid #83bbff;
    background-color: #ffffff;
  `;

  return (
    <Scrim isOpen={isOpen} align="center">
      <div css={popupStyle}>
        <div css={titleStyle}>{title}</div>
        <div css={descriptionStyle}>{description}</div>
        {children}
        <div css={buttonsStyle}>
          {leftButtonName && (
            <button css={leftButtonStyle} onClick={onClickLeft}>
              {leftButtonName}
            </button>
          )}
          <button css={buttonStyle} onClick={onClickButton}>
            {buttonName}
          </button>
        </div>
      </div>
    </Scrim>
  );
};

export default Popup;
