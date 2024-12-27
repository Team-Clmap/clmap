"use client";

import TabBar from "@/components/TabBar";

export default function MapMainPage() {
  return (
    <>
      <h1>Hello Map MainPage</h1>
      <TabBar activeTab="map" isVisiting={true} isBottomSheetOpen={false} />
    </>
  );
}
