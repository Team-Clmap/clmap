/** @jsxImportSource @emotion/react */

"use client";

import React, { ReactNode, useRef, useState } from "react";
import { css, keyframes } from "@emotion/react";

type BottomSheetProps = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  buttonName?: string;
};

const slideUp = keyframes`
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(0);
  }
`;

const BottomSheet: React.FC<BottomSheetProps> = ({
  isOpen,
  onClose,
  children,
  buttonName = "닫기",
}) => {
  const [height, setHeight] = useState(300); // 300, 560, 822
  const sheetRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startY = useRef(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    isDragging.current = true;
    startY.current = e.touches[0].clientY;
    document.body.style.cursor = "ns-resize";
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (isDragging.current) {
      const delta = startY.current - e.touches[0].clientY; // 이동한 거리
      const newHeight = Math.max(100, height - delta); // 최소 높이 100
      setHeight(newHeight); // 상태 업데이트
      startY.current = e.touches[0].clientY; // 위치 갱신
    }
  };

  const handleTouchEnd = () => {
    isDragging.current = false;
    document.body.style.cursor = "";
  };

  React.useEffect(() => {
    document.addEventListener("touchmove", handleTouchMove);
    document.addEventListener("touchend", handleTouchEnd);

    return () => {
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("touchend", handleTouchEnd);
    };
  }, []);

  const scrimStyle = css`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1000;
    display: ${isOpen ? "flex" : "none"};
    justify-content: center;
    align-items: flex-end;

    background: rgba(0, 0, 0, 0.5);
  `;

  const sheetStyle = css`
    position: relative;

    width: 100%;
    max-width: 440px;
    height: ${height}px;
    border-radius: 10px 10px 0 0;
    padding: 0 30px;

    display: flex;
    flex-direction: column;
    gap: 10px;
    align-items: center;

    background: #ffffff;
    transition: height 0.2s; // ?
    animation: ${isOpen
      ? css`
          ${slideUp} 0.3s ease-in-out
        `
      : "none"};
  `;

  const handleBarStyle = css`
    position: absolute;
    top: 20px;

    width: 60px;
    height: 8px;
    border-radius: 20px;
    background-color: #d6d6d6;

    cursor: ns-resize;
  `;

  const buttonStyle = css`
    position: absolute;
    bottom: 24px;
    width: 100%;
    height: 72px;
    border: none;
    border-radius: 10px;
    align-items: center;

    background: #83bbff; // [TODO] disable 처리
    color: #ffffff;
    font-size: 22px;
    font-weight: bold;
    cursor: pointer;
  `;

  return (
    <div
      ref={sheetRef}
      css={scrimStyle}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div css={sheetStyle}>
        <div css={handleBarStyle} onTouchStart={handleTouchStart} />
        {children}
        <button css={buttonStyle} onClick={onClose}>
          {buttonName}
        </button>
      </div>
    </div>
  );
};

export default BottomSheet;
