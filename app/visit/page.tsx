"use client";

import Header from "@/components/Header";
import TabBar from "@/components/TabBar";

export default function VisitMainPage() {
  return (
    <>
      <Header title="방문" isBackEnabled={false} />
      <h1>Hello Visit MainPage</h1>
      <TabBar activeTab="visit" isVisiting={true} isBottomSheetOpen={false} />
    </>
  );
}
