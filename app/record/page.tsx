"use client";

import TabBar from "@/components/TabBar";

export default function RecordMainPage() {
  return (
    <>
      <h1>Hello Record MainPage</h1>
      <TabBar activeTab="record" isVisiting={true} isBottomSheetOpen={false} />
    </>
  );
}
