"use client";

import "../styles/global.css";
import localFont from "next/font/local";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "../utils/react-query-client";
import { ReactNode } from "react";

const nanumsquare = localFont({
  src: [
    {
      path: "../public/fonts/NanumSquareEB.ttf",
      weight: "800",
      style: "extraBold",
    },
    {
      path: "../public/fonts/NanumSquareB.ttf",
      weight: "700",
      style: "bold",
    },
    {
      path: "../public/fonts/NanumSquareR.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/NanumSquareL.ttf",
      weight: "300",
      style: "light",
    },
  ],
  display: "swap", // 로드 중에도 텍스트가 표시되도록 설정
  variable: "--font-nanumsquare", // 전역 CSS 변수 생성
});

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <title>Clmap</title>
      <body className={nanumsquare.className}>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </body>
    </html>
  );
}
