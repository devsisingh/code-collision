// Login User
import { NextRequest, NextResponse } from 'next/server';
import client from '@/db'

export async function POST(request: NextRequest) {
  const {wallet_address, password}  = await request.json();
  const user = await client.user.findUnique({where:{wallet_address,password}, include:{ideas:true}})
  if(!user){
    return NextResponse.json({message:"No User found"},{status:404})
  }
  return NextResponse.json({user});
}