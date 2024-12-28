/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react";
import { ReactNode } from "react";

type ScrimProps = {
  isOpen: boolean;
  align: "center" | "end";
  children: ReactNode;
};

const Scrim: React.FC<ScrimProps> = ({ isOpen, align, children }) => {
  const scrimStyle = css`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1000;

    width: 100vw;
    height: 100vh;
    display: ${isOpen ? "flex" : "none"};
    justify-content: center;
    align-items: ${align === "end" ? "flex-end" : `${align}`};
    background: rgba(0, 0, 0, 0.5);
  `;

  return <div css={scrimStyle}>{children}</div>;
};

export default Scrim;
