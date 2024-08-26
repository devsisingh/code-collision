// Login User
import { NextRequest, NextResponse } from 'next/server';
import client from '@/db'
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

// Login User
export async function POST(request: NextRequest) {
  const {wallet_address, password}  = await request.json();
  const user = await client.user.findUnique({where:{wallet_address}, include:{ideas:true}})
  if(!user){
    return NextResponse.json({message:"Wallet address or Password not correct"},{status:404})
  }
  const passwordValidation = await bcrypt.compare(password, user.password);
  if(!passwordValidation){
    return NextResponse.json({message:"Wallet address or Password not correct"},{status:404})
  }
  const token = jwt.sign({ wallet_address: user.wallet_address, avatar_image_url:user.avatar_image_url}, process.env.JWT_SECRET_KEY!);
  cookies().set("access-token",token);
  return NextResponse.json({ message: 'Logged in successfully' }, {status:200});
}