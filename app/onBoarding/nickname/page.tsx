/** @JSXImportSource @emotion/react **/

"use client";

import Button from "@/components/Button";
import { css } from "@emotion/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

const CreateNicknamePage = () => {
  const [nickname, setNickname] = useState<string>("방문자");
  const [making, setMaking] = useState<boolean>(false);
  const [saving, setSaving] = useState<boolean>(false);
  const router = useRouter();

  // 닉네임 생성 (GET)
  const getNickname = async () => {
    setMaking(true);
    try {
      const response = await fetch("/api/members/nickname");
      if (!response.ok) throw new Error("닉네임");

      const data = await response.json();
      setNickname(data.data.nickname);
    } catch (error) {
      console.error("닉네임 생성 실패:", error);
    } finally {
      setMaking(false);
    }
  };

  // 닉네임 선택 (POST)
  const saveNickname = async () => {
    if (nickname === "방문자") return;
    setSaving(true);
    try {
      const response = await fetch("/api/members/nickname", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nickname }),
      });

      if (!response.ok) throw new Error("닉네임 저장 실패");

      router.push("/onBoarding/information");
    } catch (error) {
      console.error("닉네임 저장 실패:", error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div css={pageStyle}>
      <div css={textStyle}>
        반가워요,
        <br />
        <span css={nameStyle}>{nickname}</span>님!
        <br />
        <br />
        아래 버튼을 눌러서
        <br />
        맛있는 닉네임을 골라주세요.
      </div>
      <div css={buttonBoxStyle}>
        <Button
          type="main"
          buttonName={making ? "닉네임 생성중" : "닉네임 생성하기"}
          onClick={getNickname}
          isActive={!making}
        />
        <Button
          type="sub"
          buttonName={saving ? "닉네임 저장중" : "이걸로 할래요"}
          onClick={saveNickname}
          isActive={nickname !== "방문자"}
        />
      </div>
    </div>
  );
};

const pageStyle = css`
  display: flex;
  flex-direction: column;
  gap: 50px;
  margin: 60px 30px;
  width: calc(100vw - 60px);
`;

const textStyle = css`
  font-size: 24px;
  line-height: 33.4px;
`;

const nameStyle = css`
  font-weight: bold;
`;

const buttonBoxStyle = css`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export default CreateNicknamePage;
