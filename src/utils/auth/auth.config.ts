import type { NextAuthConfig } from "next-auth";

const authConfig = {
  providers: [],
  callbacks: {
    session({session, token}) {
      if (session.user && token.sub) {
        session.user.id = token.sub
      }
      return session;
    },
  },
} satisfies NextAuthConfig;

export default authConfig;