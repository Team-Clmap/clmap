// 회원권 관련 목데이터

export type MembershipCardInfo = {
  membershipId: number;
  membershipCenterName: string;
  membershipType: "횟수권" | "기간권";
  membershipRegistrationDate: string;
  membershipExpirationDate: string;
  membershipRestInfo: string;
};

type MembershipCardInfos = {
  membershipInfos: MembershipCardInfo[];
};

export const MembershipCardData: MembershipCardInfos = {
  membershipInfos: [
    {
      membershipId: 1,
      membershipCenterName: "락트리뿡뿡방구",
      membershipType: "기간권",
      membershipRegistrationDate: "2025.01.01",
      membershipExpirationDate: "2025.02.01",
      membershipRestInfo: "10일",
    },
    {
      membershipId: 2,
      membershipCenterName: "더클연남",
      membershipType: "횟수권",
      membershipRegistrationDate: "2025.01.20",
      membershipExpirationDate: "2025.06.20",
      membershipRestInfo: "10회",
    },
  ],
};

export type MembershipEditInfo = {
  membershipType: "횟수권" | "기간권";
  membershipCenterId: number;
  membershipCenterName: string;
  membershipRegistrationDate: string;
  membershipUsageScope: number;
  membershipUsedCount?: number;
  membershipExpirationPeriod: number;
};

export const MembershipEditData: MembershipEditInfo = {
  membershipType: "기간권",
  membershipCenterId: 11,
  membershipCenterName: "락트리뿡뿡방구",
  membershipRegistrationDate: "2025.01.01",
  membershipUsageScope: 10,
  membershipUsedCount: 4,
  membershipExpirationPeriod: 6,
};
