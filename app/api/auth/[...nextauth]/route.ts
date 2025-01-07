import NextAuth, { NextAuthOptions } from "next-auth";
import KakaoProvider from "next-auth/providers/kakao";
import GoogleProvider from "next-auth/providers/google";
import NaverProvider from "next-auth/providers/naver";
import { MemberService } from "../../members/service";

import type { JWT } from "next-auth/jwt";
import type { Account, User, Session } from "next-auth";

import "next-auth/jwt";

type JwtCallbackParams = {
    token: JWT;
    account?: Account | null;
    user: User;
};

type SessionCallbackParams = {
    session: Session;
    token: JWT;
    user: User;
};

const memberService = MemberService.getInstance();

/*
* providers: 소셜로그인 제공자 정보
* callbacks: 소셜로그인 이후 동작하는 함수 정의
* jwt: 로그인 요청 시 초기 로그인과 상시 로그인을 구분
* session: 클라이언트에게 반환할 정보
*/
export const authOptions: NextAuthOptions = {
    providers: [
        KakaoProvider({
            clientId: process.env.KAKAO_CLIENT_ID as string,
            clientSecret: process.env.KAKAO_CLIENT_SECRET as string
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string, 
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
        }),
        NaverProvider({
            clientId: process.env.NAVER_CLIENT_ID as string, 
            clientSecret: process.env.NAVER_CLIENT_SECRET as string
        }),
    ],
    callbacks: {
        async jwt({ token, account, user }: JwtCallbackParams): Promise<JWT> {
            if (account && user) {
                
                // 초기 로그인 시 새로운 토큰 생성 + db 저장
                token = {
                    ...token,
                    accessToken: account.access_token,
                    accessTokenExpires: Date.now() + 3000,
                    refreshToken: account.refresh_token,
                    user: user
                };
                
                // db 저장
                const id = user.id; 
                const provider = account.provider;
                const refreshToken = token.refreshToken as string;
                const expiresAt = new Date(Date.now()+10000000);
                memberService.createMember({ id, provider, refreshToken, expiresAt });
                return token;
            }
        
            // 만료되지 않은 경우 기존 토큰 반환
            if (Date.now() < (token.accessTokenExpires as number)) {
                return token;
            }

            return token;
        },
        
        async session({ session, token }: SessionCallbackParams): Promise<Session> {
            
            // 토큰 존재 시 세션에 id, email 삽입. 추후에 온보딩 여부 전송 예정
            if (token) {
                session.user.id = token.user.id;
                session.user.email = token.user.email;
            }
            
            return session;
        }
        
    },
    secret : process.env.SECRET_KEY
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };