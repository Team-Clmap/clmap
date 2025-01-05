/** @JSXImportSource @emotion/react **/

"use client";

import Button from "@/components/Button";

export default function HomePage() {
  return (
    <div css={{ display: "flex", flexDirection: "column", gap: "8px" }}>
      <Button type="main" name="버튼하기" onClick={() => console.log("main")} />
      <Button
        type="main"
        name="버튼하기"
        onClick={() => console.log("main")}
        isActive={false}
      />
      <Button type="sub" name="버튼하기" onClick={() => console.log("sub")} />
      <Button
        type="sub"
        name="버튼하기"
        onClick={() => console.log("sub")}
        isActive={false}
      />
      <Button
        type="sub"
        name="버튼하기"
        width="half"
        onClick={() => console.log("sub half")}
      />
      <Button
        type="main"
        name="버튼하기"
        width="half"
        onClick={() => console.log("main half")}
      />
      <Button
        type="google"
        name="버튼하기"
        onClick={() => console.log("google")}
      />
      <Button
        type="naver"
        name="버튼하기"
        onClick={() => console.log("naver")}
      />
      <Button
        type="kakao"
        name="버튼하기"
        onClick={() => console.log("kakao")}
      />
    </div>
  );
}
