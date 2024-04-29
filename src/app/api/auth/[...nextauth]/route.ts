import NextAuth from "next-auth";
import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import clientPromise from "@/lib/mongodb";

export const nextauthOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      credentials: {
        email: { type: "email" },
        password: { type: "password" },
      },

      async authorize(credentials) {
        const client = await clientPromise;
        const usersCollection = client.db("hub").collection("influencers");
        const brandsCollection = client.db("hub").collection("brands");
        const email = credentials?.email.toLowerCase();
        const user = await usersCollection.findOne({ email });
        const buser = await brandsCollection.findOne({ email });
        if (!user && !buser) {
          throw new Error("User does not exist.");
        }
        if (user) {
          //validate password
          const passwordIsValid = await bcrypt.compare(
            credentials?.password!,
            user.password
          );
          if (!passwordIsValid) {
            throw new Error("Invalid credentials");
          }
          return {
            id: user._id.toString(),
            ...user,
          };
        }
        if (buser) {
          //validate password
          const passwordIsValid = await bcrypt.compare(
            credentials?.password!,
            buser.password
          );
          if (!passwordIsValid) {
            throw new Error("Invalid credentials");
          }
          return {
            id: buser._id.toString(),
            ...buser,
          };
        }
        throw new Error("Invalid credentials User not found");
      },
    }),
  ],
  callbacks: {
    session: async ({ session, token }) => {
      if (session?.user) {
        session.user.id = token.uid;
      }
      return session;
    },
    jwt: async ({ user, token }) => {
      if (user) {
        token.uid = user.id;
      }
      return token;
    },
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/",
  },
};

const handler = NextAuth(nextauthOptions);

export { handler as GET, handler as POST };
