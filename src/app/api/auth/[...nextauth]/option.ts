import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { NextRequest, NextResponse } from "next/server";
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
    // ...add more providers here
  ],

  // pages: {
  //   signIn: "/login",
  // },
  session: {
    strategy: "jwt",
  },
};

// export const authOptions: AuthOptions = {
//   providers: [
//     CredentialsProvider({
//       name: "credentials",

//       credentials: {
//         email: { type: "email" },
//         password: { type: "password" },
//       },

//       async authorize(credentials) {
//         if (!credentials?.email || !credentials?.password) {
//           throw new Error(
//             "Sign in failed. Check the details you provided are correct"
//           );
//         }

//         const user = await prisma.users.findUnique({
//           where: {
//             email: credentials.email,
//           },
//         });

//         if (!user) {
//           throw new Error("User not found");
//         }

//         const isCorrectPassword = await bcrypt.compare(
//           credentials.password,
//           user.password
//         );

//         if (!isCorrectPassword) {
//           throw new Error(
//             "Sign in failed. Check the details you provided are correct"
//           );
//         }

//         return user;
//       },
//     }),
//   ],

//   pages: {
//     signIn: "/login",
//   },

//   secret: process.env.NEXT_SECRET,
//   debug: process.env.NODE_ENV === "development",
// };

// export async function GET(req: NextRequest) {
//   try {
//     // Connect to the MongoDB client
//     const client = await clientPromise;

//     // Access the 'users' database
//     const db = client.db("users");

//     // Query the 'users' collection
//     const user = await db.collection("users").findOne({
//       email: credentials.email,
//     });

//     // If user not found, throw an error
//     if (!user) {
//       throw new Error("User not found");
//     }

//     // Return the found user
//     return NextResponse.json(user);
//   } catch (error) {
//     // Handle any errors and log them
//     console.error(error);

//     // Return an error response
//     return NextResponse.json({ error: error.message }, { status: 404 });
//   }
// }
