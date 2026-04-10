/* eslint-disable @typescript-eslint/no-explicit-any */
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        try {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL}/auth/login`,
            {
              method: "POST",
              body: JSON.stringify(credentials),
              headers: { "Content-Type": "application/json" },
            },
          );

          const result = await res.json();

          // Standard v4 check: return an object on success, null on failure
          if (res.ok && result.success && result.data) {
            return {
              ...result.data.user,
              accessToken: result.data.accessToken,
              // Ensure id is a string, as NextAuth v4 expects 'id'
              id: result.data.user._id || result.data.user.id,
            };
          }
        } catch (error) {
          console.error("Auth fetch error:", error);
        }

        return null;
      },
    }),
  ],
  pages: {
    signIn: "/wp-admin",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }: any) {
      // User is only passed the first time authorize is called
      if (user) {
        return {
          ...token,
          ...user,
        };
      }
      return token;
    },
    async session({ session, token }: any) {
      if (token) {
        session.user = {
          _id: token._id,
          name: token.name,
          email: token.email,
          role: token.role,
          accessToken: token.accessToken,
        };
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
