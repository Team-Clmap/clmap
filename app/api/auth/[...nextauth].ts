import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials"; // 변경된 부분

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        // 사용자 인증 로직
        if (
          credentials?.email === "test@example.com" &&
          credentials.password === "password"
        ) {
          return { id: "1", name: "Test User", email: "test@example.com" };
        }
        return null;
      },
    }),
  ],
});
