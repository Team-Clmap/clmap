/** @jsxImportSource @emotion/react */

"use client";

import React, { useState } from "react";
import { css } from "@emotion/react";
import BottomSheet from "../components/BottomSheet";

const Page = () => {
  const [isBottomSheetOpen, setBottomSheetOpen] = useState(false);
  const [isFormValid, setFormValid] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isValidInput = e.target.value.trim() != "";
    setFormValid(isValidInput);
  };

  const buttonStyle = css`
    padding: 8px 16px;
    background: #83bbff;
    color: #fff;
    border: none;
    border-radius: 4px;
    font-size: 16px;
    cursor: pointer;
    transition: background 0.3s ease;
  `;

  return (
    <div>
      <button css={buttonStyle} onClick={() => setBottomSheetOpen(true)}>
        버튼하기
      </button>
      <BottomSheet
        isOpen={isBottomSheetOpen}
        onClose={() => setBottomSheetOpen(false)}
        isFormValid={isFormValid}
      >
        <form>
          <input type="text" onChange={handleInputChange} />
        </form>
        <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with
          the release of Letraset sheets containing Lorem Ipsum passages, and
          more recently with desktop publishing software like Aldus PageMaker
          including versions of Lorem Ipsum.
        </p>
      </BottomSheet>
    </div>
  );
};

export default Page;
