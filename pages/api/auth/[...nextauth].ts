import NextAuth, { Session } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { GameState } from "@/interfaces/GameStates";
import { JWT } from "next-auth/jwt";
import { AdapterUser } from "next-auth/adapters";

// type authProps = {
//     credentials: Record<"email" | "password" | "credentials", string> | undefined;
//     req: Pick<RequestInternal, "method" | "body" | "query" | "headers">
// }


export default NextAuth({
  secret: process.env.NextAuth_SECRET,
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "Enter email",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Enter Password",
        },
      },

      async authorize(credentials: any) {
         const { email, password } = credentials;

          const res = await fetch("http://localhost:3000/api/auth/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: email,
              password: password,
            }),
          });
          const user = await res.json();
          if (res.ok && user) {
            console.log(user)
            return user;
          } else return null;
      },
    }),
    // ...add more providers here
  ],
  session: {
    strategy: "jwt",
  },

  callbacks: {
    async jwt({ token, user }: any) {
      if (user?._id) token._id = user._id;
      if (user?.username) token.username = user.username;
    //   if (user?.isAdmin) token.isAdmin = user.isAdmin;
      return token;
    },
    async session({ session, token }: any) {
      if (token?._id) session.user._id = token._id;
      if (token?.username) session.user.username = token.username;
    //   if (token?.isAdmin) session.user.isAdmin = token.isAdmin;
      return session;
    },
  },
});
