/** @JSXImportSource @emotion/react **/

import { css, keyframes } from "@emotion/react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

type ToastProps = {
  type: "alert" | "confirm";
  message: string;
  setIsActive: Dispatch<SetStateAction<boolean>>;
};

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    transform: translateY(20px);
  }
`;

const Toast: React.FC<ToastProps> = ({ type, message, setIsActive }) => {
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsFading(true);
    }, 3000);

    const cleanupTimer = setTimeout(() => {
      setIsActive(false);
    }, 3500);

    return () => {
      clearTimeout(timer);
      clearTimeout(cleanupTimer);
    };
  }, [setIsActive]);

  const toastStyle = css`
    width: calc(100vw - 60px);
    background-color: rgba(0, 0, 0, 0.7);
    border-radius: 10px;
    display: flex;
    gap: 8px;
    align-items: center;
    padding: 14px 20px;

    animation: ${isFading ? fadeOut : fadeIn} 0.5s forwards;
    position: fixed;
    bottom: 20px;
    left: 30px;
  `;

  const iconStyle = css`
    width: 22px;
    height: 22px;
  `;

  const messageStyle = css`
    font-size: 16px;
    color: white;
  `;

  return (
    <div css={toastStyle}>
      {type === "alert" ? (
        <img css={iconStyle} src="/icons/alert.png" alt="경고" />
      ) : (
        <img css={iconStyle} src="/icons/confirm.png" alt="확인" />
      )}
      <div css={messageStyle}>{message}</div>
    </div>
  );
};

export default Toast;
