import { Profile } from "@/app/api/entity/profile";
import { CreateMemberParams, MemberRepository } from "./repository";
import { GetMemberProfileDto, Title, GetMemberProfileResponse, UserMembershipInfo } from "./me/dto";
import { Nickname } from "./nickname/route";
import { formatDate, minuteToTime } from "@/utils/convert-format";
import { CreateInitInfoRequest } from "./init-info/route";

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
        console.log(profile)
        const response: GetMemberProfileResponse = {
            status: 200,
            message: "ok",
            data: {
                nickname: profile.nickname,
                userInstagramId: profile.instagramId,
                climbingStartDate: profile.climbingStartDate instanceof Date ? formatDate(profile.climbingStartDate, "YYYY.MM.DD") : null,
                recentClimbingDate: profile.recentClimbingDate instanceof Date ? formatDate(profile.recentClimbingDate, "YYYY.MM.DD") : null,
                averageClimbingTime: typeof profile.averageClimbingTime === "number" ? minuteToTime(profile.averageClimbingTime, "시", "분") : null,
                averageClearRate: typeof profile.averageClearRate === "number" ? `${profile.averageClearRate}%` : null,
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
    
    // 초기 회원 정보 생성
    public async createMemberInitInfo(dto: CreateInitInfoRequest, id: User["id"]): Promise<void> {
        const exists = await this.isMemberExist(id);
        if (!exists) {
            throw new Error(`멤버 id가 존재하지 않음`);
        }

        const { nickname, crewName, climbingStartDate, userInstagramId } = dto;
        const image = ""; // 기본값 설정

        // TODO: 이미지 업로드 로직 추가
        // const uploadedImage = await this.uploadImage(dto.imageFile);
            
        const profileEntity = new Profile();
        profileEntity.id = id;
        profileEntity.nickname = nickname;
        profileEntity.crewName = crewName;
        profileEntity.climbingStartDate = climbingStartDate;
        profileEntity.instagramId = userInstagramId;
        profileEntity.image = image;

        await this.memberRepository.createMemberInitInfo(profileEntity);
    }
}
