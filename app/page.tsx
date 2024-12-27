/** @jsxImportSource @emotion/react */

"use client";

import Popup from "@/components/Popup";
import { css } from "@emotion/react";
import { useState } from "react";

export default function HomePage() {
  const [isPopupOpen, setPopupOpen] = useState(false);
  const handleButtonClick = () => {
    setPopupOpen(false);
  };

  const handleLeftButtonClick = () => {
    setPopupOpen(false);
  };

  const buttonStyle = css`
    width: 100px;
    height: 40px;
  `;

  return (
    <>
      <h1>Hello Clmap</h1>
      <button css={buttonStyle} onClick={() => setPopupOpen(true)}>
        팝업나와
      </button>
      <Popup
        isOpen={isPopupOpen}
        title="팝업제목"
        description="팝업입니다 근데 사실은 팝업이고 어떻게보면 팝업이지요 이정도면 됐겠지요"
        leftButtonName="취소"
        buttonName="저장"
        onClickButton={handleButtonClick}
        onClickLeft={handleLeftButtonClick}
      >
        <input />
      </Popup>
    </>
  );
}
