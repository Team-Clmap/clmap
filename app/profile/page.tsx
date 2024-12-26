"use client";

import TabBar from "@/components/TabBar";

export default function ProfileMainPage() {
  return (
    <>
      <h1>Hello Profile MainPage</h1>
      <TabBar activeTab="profile" isVisiting={true} isBottomSheetOpen={false} />
    </>
  );
}
