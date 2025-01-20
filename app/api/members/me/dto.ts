export interface Title {
    titleId: number;
    titleName: string;
    titleColor: string;
}

export interface UserMembershipInfo {
    membershipCenterName: string;
    membershipType: string;
    membershipRegistrationDate: string;
    membershipExpirationDate: string;
    membershipRestInfo: string;
}

export interface GetMemberProfileDto {
    nickname?: string | null;
    userInstagramId?: string | null;
    climbingStartDate?: string | null;
    recentClimbingDate?: string | null;
    averageClimbingTime?: string | null;
    averageClearRate?: string | null;
    averageLevel?: string | null;
    crewName?: string | null;
    titles?: Title[];
    profileImage?: string;
    userMembershipInfos?: UserMembershipInfo[];
}

export interface GetMemberProfileResponse {
    status: number;
    message: string;
    data: GetMemberProfileDto;
}