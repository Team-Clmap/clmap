import { DefaultSession, User } from 'next-auth';

declare module "next-auth/jwt" {
    interface JWT {
        accessToken: string | undefined;
        refreshToken: string | undefined;
        user: User;
    }
}

declare module 'next-auth' {
    interface User {
      id: string;
    }
  
    interface Session extends DefaultSession {
      user: User;
      accessToken: string;
      isNewUser: boolean; //신규 가입자 여부
      isInited: boolean; // 온보딩 여부
    }
}