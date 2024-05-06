import { connectDB } from "@/dbConfig/dbConfig";
import User from '@/models/userModel'
import { NextRequest, NextResponse } from 'next/server'
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'

export async function GET( req: NextRequest ) {
    try {
        const response = NextResponse.json({ 
            message: "LogOut Successfully", 
            success: true
        })
        response.cookies.set( "token", "", { 
                httpOnly: true, 
                expires: new Date(0),
        },)
        return response;
        
    } catch (error: any) {
        return NextResponse.json({ error: error.message},{status: 500})
    }
}
    