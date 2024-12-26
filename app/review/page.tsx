"use client";

import TabBar from "@/components/TabBar";

export default function ReviewMainPage() {
  return (
    <>
      <h1>Hello Review MainPage</h1>
      <TabBar activeTab="review" isVisiting={true} isBottomSheetOpen={false} />
    </>
  );
}
