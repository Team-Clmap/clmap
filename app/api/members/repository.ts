import getDataSource from "@/utils/database/getDataSource";
import { Profile } from "../entity/profile";
import { Member } from "../entity/member";
import 'reflect-metadata';

export type CreateMemberParams = {
    id: string;
    provider: string;
    refreshToken: string;
    expiresAt: Date;
};

export class MemberRepository {
    private static instance: MemberRepository;
    
    private constructor() {
    }
    
    // Repository 객체 반환
    public static getInstance(): MemberRepository {
        if (!this.instance) {
            this.instance = new MemberRepository();
        }
        return this.instance;
    }
    
    // Member 생성
    async createMember({ id, provider, refreshToken, expiresAt }: CreateMemberParams): Promise<Member> {
        const dataSource = await getDataSource();
        const memberRepo = dataSource.getRepository(Member);
        const member = memberRepo.create({
            id,
            provider,
            refreshToken,
            expiresAt,
        });
        return memberRepo.save(member);
    }
    
    // Member 존재 여부 확인
    async existMember(id: string): Promise<boolean> {
        const dataSource = await getDataSource();
        const memberRepo = dataSource.getRepository(Member);
        const count = await memberRepo.count({ where: { id } });
        return count > 0;
    }
    
    async existMemberNickname(nickname: string): Promise<boolean> {
        const dataSource = await getDataSource();
        const profileRepo = dataSource.getRepository(Profile);
        const count = await profileRepo.count({ where: { nickname:nickname } });
        return count > 0;
    }
    
    async getMemberProfile(id: string): Promise<Profile | null> {
        const dataSource = await getDataSource();
        const profileRepo = dataSource.getRepository(Profile);
        return profileRepo.findOne({ where: { id } });
    }
    //멤버 초기 데이터 생성
    async createMemberInitInfo(entity: Profile): Promise<Profile> {
        const dataSource = await getDataSource();
        const profileRepo = dataSource.getRepository(Profile);
        const profile = profileRepo.create(entity);
        return profileRepo.save(profile);
    }
    
    async updateMemberProfile(entity: Profile) {
        const dataSource = await getDataSource();
        const profileRepo = dataSource.getRepository(Profile);
        profileRepo.update({id: entity.id as string}, {
            nickname: entity.nickname,
            crewName: entity.crewName,
            instagramId: entity.instagramId
        })
    }
    
    async getMember(id: string): Promise<Member | null> {
        const dataSource = await getDataSource();
        const memberRepo = dataSource.getRepository(Member);
        return memberRepo.findOne({ where: { id } });
    }
    
    async deleteMember(id: string): Promise<void> {
        const dataSource = await getDataSource();
        const memberRepo = dataSource.getRepository(Member);
        memberRepo.delete({ id:id });
    }
}