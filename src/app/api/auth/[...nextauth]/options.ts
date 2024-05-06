import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import User from '@/models/userModel';
import { connectDB } from '@/dbConfig/dbConfig';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: 'credentials',
      name: 'Credentials',
      credentials: {},
      async authorize(credentials: any): Promise<any> {
        await connectDB();
        const { email, password } = credentials as  {
            email: string,
            password: string,
          };
        try {
          const user = await User.findOne({
            email: email
          });

          if (!user) {
            console.log('No user found with this email');
          }

          const isPasswordCorrect = await bcrypt.compare(
            password,
            user.password
          );
          console.log(isPasswordCorrect);
          
          if (isPasswordCorrect) {
            return user;
          } else {
            console.log('Incorrect password');
          }
        } catch (err: any) {
          console.log(err);
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, session }) {
        console.log("jwt callback :: ",{ token, user, session });
        if (user) {
            return {
                ...token,
                _id: user._id?.toString(),
                username: user.username,
                _isAdmin: user._isAmin,
            }
        }
      return token;
    },
    async session({ session, token, user }) {
        console.log("se ssion callback :: ", { session, token, user });
        if (token) {
            return {
                ...session,
                user: {
                   ...session.user,
                    _id: token._id,
                    username: token.username,
                },
            }
        }
      return session;
    },
  },
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/login',
  },
};