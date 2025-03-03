/** @JSXImportSource @emotion/react **/

"use client";

import { useSession } from "next-auth/react";
import Button from "@/components/Button";
import DatePicker from "@/components/DatePicker";
import Input from "@/components/Input";
import Toast from "@/components/Toast";
import { css } from "@emotion/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const InformationPage = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const [startDate, setStartDate] = useState("");
  const [instagramId, setInstagramId] = useState("");
  const [crewName, setCrewName] = useState("");
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInstagramId(e.target.value);
  };

  const handleCrewChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCrewName(e.target.value);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setProfileImage(file);

    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImagePreview(imageUrl);
    }
  };

  const handleSubmit = async () => {
    if (!startDate) {
      setToastMessage("클라이밍 시작일을 채워주세요.");
      return;
    }

    const formData = new FormData();
    formData.append("climbingStartDate", startDate);
    instagramId && formData.append("userInstagramId", instagramId);
    crewName && formData.append("crewName", crewName);
    profileImage && formData.append("profileImage", profileImage);

    try {
      const response = await fetch("/api/members/init-info", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${session?.accessToken}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error("프로필 생성 실패");
      }

      setToastMessage("프로필이 생성되었어요.");
      router.push("/map");
    } catch (error) {
      console.error("에러 발생: ", error);
      setToastMessage("프로필 생성 중 문제가 생겼어요.");
    }
  };

  useEffect(() => {
    return () => {
      if (imagePreview) URL.revokeObjectURL(imagePreview);
    };
  }, [imagePreview]);

  return (
    <div css={pageStyle}>
      <div css={textStyle}>
        아주 멋진 닉네임이네요!
        <br />
        <br />
        이번에는
        <br />
        프로필 생성을 위해
        <br />
        간단한 정보를 입력해 주세요. <div css={requiredStyle}>*필수</div>
      </div>
      <div css={questionBoxStyle}>
        <div css={questionStyle}>
          <div css={titleStyle}>
            <span css={{ color: "#83bbff" }}>*</span>클라이밍을 시작한 날짜는
            언제인가요?
          </div>
          <DatePicker size="large" value={startDate} onChange={setStartDate} />
        </div>
        <div css={questionStyle}>
          <div css={titleStyle}>인스타그램에서도 소통해요!</div>
          <Input size="medium" onChange={handleIdChange} />
        </div>
        <div css={questionStyle}>
          <div css={titleStyle}>소속된 크루가 있나요?</div>
          <Input size="medium" onChange={handleCrewChange} />
        </div>
        <div css={questionStyle}>
          <div css={titleStyle}>프로필 사진을 등록해주세요.</div>
          <label css={[addImageStyle(imagePreview)]}>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              hidden
            />
          </label>
        </div>
      </div>
      <div css={buttonStyle}>
        <Button
          type="main"
          buttonName="클맵 시작하기"
          onClick={handleSubmit}
          isActive
          fixed
        />
      </div>
      {toastMessage && (
        <Toast
          type="alert"
          message={toastMessage}
          setIsActive={() => setToastMessage(null)}
        />
      )}
    </div>
  );
};

const pageStyle = css`
  display: flex;
  flex-direction: column;
  gap: 60px;
  margin: 60px 30px 24px;
  width: calc(100vw - 60px);
  height: calc(100vh - 84px);
  position: relative;
`;

const textStyle = css`
  font-size: 24px;
  line-height: 32.9px;
`;

const requiredStyle = css`
  font-size: 16px;
  color: #83bbff;
  display: inline;
`;

const questionBoxStyle = css`
  display: flex;
  flex-direction: column;
  gap: 40px;
`;

const questionStyle = css`
  display: flex;
  flex-direction: column;
  gap: 14px;
  line-height: 22px;
`;

const titleStyle = css`
  font-size: 18px;
  font-weight: bold;
`;

const addImageStyle = (imagePreview?: string) => css`
  width: 100px;
  height: 100px;
  border-radius: 10px;
  background-color: #ededed;
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: ${imagePreview
    ? `url(${imagePreview})`
    : 'url("/icons/add.png")'};
  background-size: ${imagePreview ? "cover" : "30px 30px"};
  background-position: center;
  background-repeat: no-repeat;

  &::before {
    content: "";
  }
`;

const buttonStyle = css`
  position: absolute;
  bottom: 0;
`;

export default InformationPage;
