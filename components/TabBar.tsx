/** @jsxImportSource @emotion/react */

"use client";

import { css } from "@emotion/react";
import { useRouter } from "next/navigation";

type TabBarProps = {
  activeTab: string;
  isVisiting: boolean;
  isBottomSheetOpen: boolean;
};

const TabBar = ({ activeTab, isVisiting, isBottomSheetOpen }: TabBarProps) => {
  const router = useRouter();
  const navigateTo = (path: string) => {
    router.push(path);
  };

  const tabs = [
    {
      key: "map",
      label: "지도",
      icon: "/icons/map.png",
      activeIcon: "/icons/map-blue.png",
    },
    {
      key: "review",
      label: "리뷰",
      icon: "/icons/mountain.png",
      activeIcon: "/icons/mountain-blue.png",
    },
    isVisiting
      ? {
          key: "timer",
          label: "타이머",
          icon: "/icons/watch.png",
          activeIcon: "/icons/watch-blue.png",
        }
      : {
          key: "visit",
          label: "방문",
          icon: "/icons/lens.png",
          activeIcon: "/icons/lens-blue.png",
        },
    {
      key: "record",
      label: "기록",
      icon: "/icons/write.png",
      activeIcon: "/icons/write-blue.png",
    },
    {
      key: "profile",
      label: "프로필",
      icon: "/icons/profile.png",
      activeIcon: "/icons/profile-blue.png",
    },
  ];

  const tabBarStyle = css`
    display: ${isBottomSheetOpen ? "none" : "flex"};
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 66px;
  `;

  const tabStyle = (isActive: boolean) => css`
    display: flex;
    flex-direction: column;
    gap: 8px;
    align-items: center;
    justify-content: center;
    flex: 1;

    border: none;
    padding-top: ${isActive ? "0" : "2px"};
    border-top: ${isActive ? "2px solid #83bbff" : "none"};
    background-color: #ffffff;
    color: ${isActive ? "#83bbff" : "#000000"};
    cursor: pointer;
  `;

  const iconStyle = css`
    width: 30px;
    height: 30px;
  `;

  return (
    <div css={tabBarStyle}>
      {tabs.map((tab) => {
        const isActive = activeTab === tab.key;
        return (
          <button
            key={tab.key}
            css={tabStyle(isActive)}
            onClick={() => navigateTo(`/${tab.key}`)}
          >
            <img
              css={iconStyle}
              src={isActive ? tab.activeIcon : tab.icon}
              alt={tab.label}
            />
            {tab.label}
          </button>
        );
      })}
    </div>
  );
};

export default TabBar;
