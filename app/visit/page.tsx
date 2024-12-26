"use client";

import TabBar from "@/components/TabBar";

export default function VisitMainPage() {
  return (
    <>
      <h1>Hello Visit MainPage</h1>
      <TabBar activeTab="visit" isVisiting={true} isBottomSheetOpen={false} />
    </>
  );
}
