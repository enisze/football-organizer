import NextAuth, { type NextAuthOptions } from 'next-auth'
// Prisma adapter for NextAuth, optional and can be removed
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import CredentialsProvider from 'next-auth/providers/credentials'

import { sendWelcomeMail } from '@/inngest/sendWelcomeMail'
import DiscordProvider from 'next-auth/providers/discord'
import GoogleProvider from 'next-auth/providers/google'
import { prisma } from '../../../server/db/client'

export const authOptions: NextAuthOptions = {
  // figure one or more authentication providers
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: 'jwt',
    updateAge: 1000 * 60 * 60 * 24,
  },

  // pages: { signIn: '/', newUser: '/signUp' },
  providers: [
    DiscordProvider({
      clientId: process.env.NEXT_PUBLIC_DISCORD_CLIENT_ID ?? '',
      clientSecret: process.env.DISCORD_CLIENT_SECRET ?? '',
      token: 'https://discord.com/api/oauth2/token',
      userinfo: 'https://discord.com/api/users/@me',
      name: 'Discord',
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
      authorization: {
        params: {
          prompt: 'consent',
          access_type: 'offline',
          response_type: 'code',
        },
      },
    }),
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: 'Credentials',
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
        },
        username: {
          label: 'Paypal Name',
          type: 'string',
          placeholder: '(Nur, wenn nicht registriert)',
        },
        password: { label: 'Passwort', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.username) {
          const user = await prisma.user.findFirst({
            where: {
              email: credentials?.email,
              password: credentials?.password,
            },
          })

          return user
        }

        if (!credentials?.email) return null

        try {
          const createdUser = await prisma.user.create({
            data: {
              name: credentials?.username ?? '',
              email: credentials?.email,
              password: credentials?.password,
              role: 'USER',
            },
          })

          await sendWelcomeMail(createdUser)

          return createdUser
        } catch (error) {
          console.log(error)
        }
        return null
      },
    }),
  ],
  secret: process.env.JWT_SECRET,
  callbacks: {
    async signIn({}) {
      return true
    },
    async jwt({ token, user, account }) {
      const id = token.id

      let dbUser
      if (!user) {
        dbUser = await prisma.user.findUnique({ where: { id } })

        if (dbUser) {
          token.id = dbUser?.id
          token.role = dbUser?.role
          token.paypalName = dbUser?.paypalName
        }
      }
      if (user) {
        token.id = user.id
        token.role = user.role
        token.paypalName = user.paypalName
      }
      return token
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id
        session.user.role = token.role
        session.user.paypalName = token.paypalName
      }
      return session
    },
  },
}

export default NextAuth(authOptions)
