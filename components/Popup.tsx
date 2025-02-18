/** @jsxImportSource @emotion/react */

"use client";

import { css } from "@emotion/react";
import { ReactNode } from "react";

type PopupProps = {
  title?: string;
  description?: string;
  children?: ReactNode;
  buttonName: string;
  leftButtonName?: string;
  onClickButton: () => void;
  onClickLeft?: () => void;
};

const Popup = ({
  title,
  description,
  children,
  buttonName,
  leftButtonName,
  onClickButton,
  onClickLeft,
}: PopupProps) => {
  const popupStyle = css`
    display: flex;
    flex-direction: column;
    gap: 30px;
    align-items: center;
    justify-content: center;
    text-align: center;

    width: calc(100vw - 60px);
    padding: 30px 22px 20px;

    background-color: #ffffff;
    border-radius: 10px;
    z-index: 1001;
  `;

  const titleStyle = css`
    font-size: 22px;
    font-weight: bold;
    line-height: 25px;
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
    width: 100%;
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
    <div css={popupStyle}>
      {title && <div css={titleStyle}>{title}</div>}
      {description && <div css={descriptionStyle}>{description}</div>}
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
  );
};

export default Popup;
