import nextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
    interface User {
        _id?: string;
        _isAmin?: boolean;
        isVerified?: boolean;
        username?: string;
    }
    interface Session {
        user: {
            _id?: string;
            _isAmin?: boolean;
            isVerified?: boolean;
            username?: string;
        } & DefaultSession['user']
    }
}
declare module "next-auth/jwt" {
    interface JWT {
        _id?: string;
        _isAmin?: boolean;
        isVerified?: boolean;
        username?: string;
    }
}