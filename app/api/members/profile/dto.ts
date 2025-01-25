export interface UpdateMemberProfileRequest {
    nickname: string | null;
    userInstagramId: string | null;
    crewName: string | null;
    titleIds: number[] | null;
    profileImage: File | null;
}
  