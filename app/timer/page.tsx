"use client";

import TabBar from "@/components/TabBar";

export default function TimerMainPage() {
  return (
    <>
      <h1>Hello Timer MainPage</h1>
      <TabBar activeTab="timer" isVisiting={true} isBottomSheetOpen={false} />
    </>
  );
}
