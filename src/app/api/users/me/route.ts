import { connectDB } from "@/dbConfig/dbConfig";
import User from '@/models/userModel'
import { NextRequest, NextResponse } from 'next/server'
import { getDataFromToken } from "@/helpers/getDataFromToken";

export async function POST(req: NextRequest) {
    
    await connectDB();
    try {
        const userId = await getDataFromToken(req);
        const user = await User.findOne({_id: userId}).select("-password");
        
        if( !user ) { return NextResponse.json({ error: "Invalid Token"}, {status: 400}) }
        
        return NextResponse.json({ 
            message: "User found", 
            data: user
        });

    } catch (error: any) {
        
    }

}