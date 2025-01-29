"use client";

import RecordCard from "@/components/recordCard/RecordCard";
import TabBar from "@/components/TabBar";

export default function RecordMainPage() {
  return (
    <>
      <h1>Hello Record MainPage</h1>
      <RecordCard isEditable />
      <TabBar activeTab="record" isVisiting={true} isBottomSheetOpen={false} />
    </>
  );
}
