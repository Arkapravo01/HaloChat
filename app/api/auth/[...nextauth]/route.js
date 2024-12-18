import { connectToDB } from "@mongodb";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "@models/User";
import { compare } from "bcrypt";
import { Toaster } from 'react-hot-toast';

const handler = NextAuth({
    providers: [
        CredentialsProvider({
            name: "Credentials",
            async authorize(credentials) {
                // Check if both email and password are provided
                if (!credentials.email || !credentials.password) {
                    throw new Error("Email and password are required");
                }

                await connectToDB();

                // Find the user by email (use email here, not username)
                const user = await User.findOne({ email: credentials.email });

                // If no user found or no password field
                if (!user || !user.password) {
                    throw new Error("Invalid email or password");
                }

                // Compare the provided password with the stored hash
                const isMatch = await compare(credentials.password, user.password);

                if (!isMatch) {
                    throw new Error("Invalid password");
                }

                // Return the user object if authentication succeeds
                return user;
            },
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
    callbacks:{
        async session({session}){
            const mongodbUser=await User.findOne({email:session.user.email})
            session.user.id=mongodbUser._id.toString()

            session.user={...session.user, ...mongodbUser._doc}

            return session
        }
    }
});

export { handler as GET, handler as POST };
