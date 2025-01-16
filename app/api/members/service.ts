import { Profile } from "@/app/api/entity/profile";
import { CreateMemberParams, MemberRepository } from "./repository";
import { GetMemberProfileDto, Title, GetMemberProfileResponse, UserMembershipInfo } from "./me/dto";
import { Nickname } from "./nickname/route";
import { formatDate, minuteToTime } from "@/utils/convert-format";
import type { User } from "next-auth";

import data from '@/app/api/members/nickname/nickname_set.json' assert { type: 'json' };

export class MemberService {
    private static instance: MemberService;
    
    private memberRepository: MemberRepository;
    
    // 생성 시 MemberRepository 의존성 주입
    private constructor() {
        this.memberRepository = MemberRepository.getInstance();
    }
    
    // 객체 호출
    public static getInstance(): MemberService {
        if (!this.instance) {
            this.instance = new MemberService();
        }
        return this.instance;
    }
    
    // 회원 존재 여부 확인
    private async isMemberExist(id: User["id"]): Promise<boolean> {
        return await this.memberRepository.existMember(id);
    }
    
    // 회원 존재 여부 확인
    private async isNicknameExist(nickname: string): Promise<boolean> {
        return await this.memberRepository.existMemberNickname(nickname);
    }

    // 회원 생성
    public async createMember({ id, provider, refreshToken, expiresAt }: CreateMemberParams): Promise<void> {
        try {
            const exists = await this.isMemberExist(id);
            if (!exists) {
                await this.memberRepository.createMember({ id, provider, refreshToken, expiresAt });
            } else {
                console.warn(`이미 존재함`);
            }
        } catch (error) {
            console.error(`이미 존재함`);
            throw error;
        }
    }
    
    public async createNickname(): Promise<Nickname> {
        let adjective: string;
        let animal: string;
        let nickname: string;
        let count = 0;
        // 닉네임 중복 체크
        do {
            if (count++ >= 10) throw new Error("부여할 수 있는 닉네임이 없습니다.");
            adjective = data.prefix[Math.floor(Math.random() * data.prefix.length)];
            animal = data.suffix[Math.floor(Math.random() * data.suffix.length)];
            nickname = `${adjective} ${animal}`;
        } while(await this.isNicknameExist(nickname));
        
        const result: Nickname = {
            nickname: `${adjective} ${animal}`
        }
        
        return result;
    }
    
    // 회원 프로필 조회
    public async getMemberProfile(id: User["id"]): Promise<GetMemberProfileResponse> {
        const exists = await this.isMemberExist(id);
        if (!exists) {
            throw new Error(`Member with id ${id} does not exist.`);
        }

        const profile = await this.memberRepository.getMemberProfile(id);
        
        if (!profile) {
            throw new Error(`Profile for member with id ${id} not found.`);
        }
        
        const response: GetMemberProfileResponse = {
            status: 200,
            message: "ok",
            data: {
                nickname: profile.nickname,
                userInstagramId: profile.instagramId,
                climbingStartDate: profile.climbingStartDate !== undefined ? formatDate(profile.climbingStartDate, "YYYY.mm.dd") : undefined,
                recentClimbingDate: profile.recentClimbingDate !== undefined ? formatDate(profile.recentClimbingDate, "YYYY.mm.dd") : undefined,
                averageClimbingTime: profile.averageClimbingTime !== undefined ? minuteToTime(profile.averageClimbingTime, "시", "분") : undefined,
                averageClearRate: profile.averageClearRate !== undefined ? `${profile.averageClearRate}%` : undefined,
                averageLevel: profile.averageLevel,
                crewName: profile.crewName,
                // titles 추가 예정
                titles: [],
                // image 추가 예정
                profileImage: profile.image,
                // membership 추가 예정
                userMembershipInfos: [],
            },
        };
        
        return response;
    }
}
