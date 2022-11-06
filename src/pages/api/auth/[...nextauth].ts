import NextAuth, { type NextAuthOptions } from "next-auth";
// Prisma adapter for NextAuth, optional and can be removed
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials";

import { prisma } from "../../../server/db/client";

export const authOptions: NextAuthOptions = {
  // figure one or more authentication providers
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
    updateAge: 1000 * 60 * 60 * 24,
    generateSessionToken: () => "testit",
  },
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: "Credentials",
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: {
          label: "Email",
          type: "email",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        if (
          credentials?.password !== process.env.AUTH_KEY ||
          !credentials?.email
        )
          return null;

        try {
          const user = await prisma.user.findFirst({
            where: { email: credentials?.email, name: credentials.email },
          });
          if (user) {
            return {
              id: user.id,
              email: user.email,
              name: user.email,
              role: "admin",
            };
          }
        } catch (error) {
          console.log(error);
        }

        try {
          const createdUser = await prisma.user.create({
            data: { email: credentials?.email, name: credentials.email },
          });

          return {
            id: createdUser.id,
            email: createdUser.email,
            name: createdUser.name,
            role: "admin",
          };
        } catch (error) {
          console.log(error);
        }
        return null;
      },
    }),
  ],
  secret: process.env.JWT_SECRET,
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      return true;
    },
    async jwt({ token, isNewUser, user, account, profile }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id;
        session.user.role = token.role;
      }
      return session;
    },
  },
};

export default NextAuth(authOptions);
