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

// export default NextAuth(nextauthOptions);
// export async function post(req: NextRequest & { body?: any }) {
//   try {
//     // Extract email and password from request body
//     const { email, password } = req.body;

//     // Get session
//     const session = await getSession({ req });

//     // If user is already authenticated, return the session
//     if (session) {
//       return NextResponse.json(session);
//     }

//     // If method is not POST, return 405 Method Not Allowed
//     if (req.method !== "POST") {
//       return NextResponse.json(
//         { message: "Method Not Allowed" },
//         { status: 405 }
//       );
//     }

//     // If method is POST, handle the authentication
//     // Sign in using email and password
//     const response = await signIn("credentials", {
//       redirect: false,
//       email,
//       password,
//     });

//     // If authentication is successful, return the session
//     if (response?.ok) {
//       const newSession = await getSession({ req });
//       return NextResponse.json(newSession);
//     }

//     // If authentication fails, return 401 Unauthorized
//     return NextResponse.json(
//       { message: "Authentication failed" },
//       { status: 401 }
//     );
//   } catch (error) {
//     console.error(error);
//     return NextResponse.json(
//       { message: "Internal Server Error" },
//       { status: 500 }
//     );
//   }
// }
// export async function post(req: NextRequest) {
//     // Handle the POST request here
//     try {
//       const result = await nextauthOptions.providers[0].authorize(req.body);
//       return NextResponse.json(result);
//     } catch (error) {
//       console.error(error);
//       return NextResponse.json(new Error("Authentication failed"), { status: 401 });
//     }
//   }
