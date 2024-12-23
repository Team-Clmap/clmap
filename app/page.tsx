/** @jsxImportSource @emotion/react */

"use client";

import React, { useState } from "react";
import { css } from "@emotion/react";
import BottomSheet from "../components/BottomSheet";

const Page = () => {
  const [isBottomSheetOpen, setBottomSheetOpen] = useState(false);

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
      >
        <h2 css={{ marginBottom: "8px" }}>Bottom Sheet Content</h2>
        <p>This is some content inside the bottom sheet.</p>
      </BottomSheet>
    </div>
  );
};

export default Page;
