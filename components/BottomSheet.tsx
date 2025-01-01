/** @jsxImportSource @emotion/react */

"use client";

import React, { ReactNode, useEffect, useRef, useState } from "react";
import { css, keyframes } from "@emotion/react";

type BottomSheetProps = {
  isOpen: boolean;
  onSubmit: () => void;
  children: ReactNode;
  size: "small" | "medium" | "large";
  buttonName?: string;
};

type childProps = {
  isFormValid?: boolean;
};

const slideUp = keyframes`
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(0);
  }
`;

const BottomSheet: React.FC<BottomSheetProps & childProps> = ({
  isOpen,
  onSubmit,
  children,
  size,
  buttonName = "닫기",
  isFormValid,
}) => {
  const defaultHeight = size === "small" ? 300 : size === "medium" ? 560 : 822;
  const [height, setHeight] = useState(defaultHeight);
  const isDragging = useRef(false);
  const startY = useRef(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    isDragging.current = true;
    startY.current = e.touches[0].clientY;
    document.body.style.cursor = "ns-resize";
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (isDragging.current) {
      const delta = startY.current - e.touches[0].clientY;
      const maxHeight = 778;
      const minHeight = 256;

      const newHeight = Math.min(
        maxHeight,
        Math.max(minHeight, height + delta)
      );
      setHeight(newHeight);
      startY.current = e.touches[0].clientY;
    }
  };

  const handleTouchEnd = () => {
    isDragging.current = false;
    document.body.style.cursor = "";
  };

  useEffect(() => {
    document.addEventListener("touchmove", handleTouchMove);
    document.addEventListener("touchend", handleTouchEnd);

    return () => {
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("touchend", handleTouchEnd);
    };
  }, [height]);

  const sheetStyle = css`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: ${height}px;
    border-radius: 10px 10px 0 0;

    background: #ffffff;
    transition: height 0.2s;
    animation: ${isOpen
      ? css`
          ${slideUp} 0.3s ease-in-out
        `
      : "none"};
  `;

  const handleBarStyle = css`
    position: relative;

    width: 60px;
    height: 8px;
    border-radius: 20px;
    margin: 20px;

    background-color: #d6d6d6;
    cursor: ns-resize;

    &::before {
      content: "";
      position: absolute;
      top: -20px;
      left: -190px;
      right: -190px;
      bottom: -20px;
    }
  `;

  const contentStyle = css`
    position: relative;
    display: flex;
    flex-direction: column;
    width: 100%;
    height: calc(100% - 24px);
    overflow-y: auto;
  `;

  const buttonStyle = css`
    position: fixed;
    bottom: 24px;
    width: calc(100% - 60px);
    height: 72px;
    border: none;
    border-radius: 10px;
    margin: 0 30px;

    color: #ffffff;
    font-size: 22px;
    font-weight: bold;
    background-color: ${isFormValid ? "#83bbff" : "#b0b0b0"};
    cursor: ${isFormValid ? "pointer" : "auto"};
  `;

  return (
    <div css={sheetStyle}>
      <div css={handleBarStyle} onTouchStart={handleTouchStart} />
      <div css={contentStyle}>
        {React.Children.map(children, (child) =>
          React.isValidElement<childProps>(child) &&
          typeof child.type !== "string" // [Unknown Prop Warning] DOM 요소가 아닌 경우에만 전달
            ? React.cloneElement(child, { isFormValid })
            : child
        )}
        <button
          css={buttonStyle}
          onClick={() => {
            onSubmit();
          }}
          disabled={!isFormValid}
        >
          {buttonName}
        </button>
      </div>
    </div>
  );
};

export default BottomSheet;
