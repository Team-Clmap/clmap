/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react";
import { ReactNode } from "react";

type ScrimProps = {
  align: "center" | "end";
  children: ReactNode;
  onClose: () => void;
};

const Scrim: React.FC<ScrimProps> = ({ align, children, onClose }) => {
  const handleScrimClick = () => {
    onClose();
  };

  const handleContentClick = (event: React.MouseEvent) => {
    event.stopPropagation();
  };

  const scrimStyle = css`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1000;

    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: ${align === "end" ? "flex-end" : `${align}`};
    background: rgba(0, 0, 0, 0.5);
  `;

  const contentStyle = css`
    display: flex;
    justify-content: center;
  `;

  return (
    <div css={scrimStyle} onClick={handleScrimClick}>
      <div css={contentStyle} onClick={handleContentClick}>
        {children}
      </div>
    </div>
  );
};

export default Scrim;
