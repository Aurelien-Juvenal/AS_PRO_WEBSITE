import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { compare } from "bcryptjs";
import { prisma } from "@/lib/prisma";

export const { handlers, auth, signIn, signOut } = NextAuth({
  // L'adapter Prisma gère la création/liaison des comptes Google en base.
  // Avec le provider Credentials, la session doit rester en stratégie JWT
  // (limitation connue d'Auth.js — l'adapter reste utile pour Google).
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },

  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),

    Credentials({
      name: "Email et mot de passe",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Mot de passe", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const user = await prisma.user.findUnique({
          where: { email: credentials.email as string },
        });

        if (!user || !user.password) return null;

        const isValid = await compare(
          credentials.password as string,
          user.password
        );
        if (!isValid) return null;

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          image: user.image,
          role: user.role,
        };
      },
    }),
  ],

  callbacks: {
    // Ajoute le rôle (ADMIN / CLIENT) au JWT lors de la connexion
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as { role?: string }).role ?? "CLIENT";
      } else if (token.email && !token.role) {
        // Cas d'une connexion Google : le rôle n'existe pas encore sur le
        // token, on va le chercher une fois en base puis il reste en cache.
        const dbUser = await prisma.user.findUnique({
          where: { email: token.email },
        });
        token.role = dbUser?.role ?? "CLIENT";
      }
      return token;
    },
    // Expose le rôle côté client via useSession() / auth()
    async session({ session, token }) {
      if (session.user) {
        session.user.role = (token.role as "ADMIN" | "CLIENT") ?? "CLIENT";
      }
      return session;
    },
  },

  pages: {
    signIn: "/login",
  },
});
