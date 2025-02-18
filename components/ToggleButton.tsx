/** @JSXImportSource @emotion/react **/

import { css } from "@emotion/react";
import React from "react";

type ToggleButtonProps = {
  activeSide: "left" | "right";
  leftButtonName: string;
  rightButtonName: string;
  onClickLeft: () => void;
  onClickRight: () => void;
};

const ToggleButton = ({
  activeSide,
  leftButtonName,
  rightButtonName,
  onClickLeft,
  onClickRight,
}: ToggleButtonProps) => {
  const ToggleButtonStyle = css`
    width: 100vw;
    height: 45px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  `;

  const buttonStyle = (isActive: boolean) => css`
    width: calc(100vw / 2);
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    font-weight: bold;
    padding: ${isActive ? "11px 0 7px" : "11px 0"};
    border-bottom: ${isActive ? "4px solid #83bbff" : "none"};
  `;

  return (
    <div css={ToggleButtonStyle}>
      <button css={buttonStyle(activeSide === "left")} onClick={onClickLeft}>
        {leftButtonName}
      </button>
      <button css={buttonStyle(activeSide === "right")} onClick={onClickRight}>
        {rightButtonName}
      </button>
    </div>
  );
};

export default ToggleButton;
