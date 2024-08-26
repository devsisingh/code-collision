import { NextResponse, NextRequest } from "next/server";
import client from '@/db'
import {z} from 'zod';
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken'
import { cookies } from "next/headers";

const createUserSchema = z.object({
  wallet_address:z.string(),
  avatar_image_url:z.string().optional(),
  password: z.string(),
})

// Create User
export async function POST(request: NextRequest) {
  const body = await request.json();
  const parsedBody = createUserSchema.safeParse(body)

  if (!parsedBody.success) {
    return NextResponse.json({msg: 'Invalid Inputs'}, {status: 411})
  }
  const {wallet_address,  avatar_image_url = "", password} =  parsedBody.data;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user =  await client.user.create({data:{wallet_address, avatar_image_url, password:hashedPassword, }});

  const token = jwt.sign({ wallet_address: user.wallet_address, avatar_image_url:user.avatar_image_url}, process.env.JWT_SECRET_KEY!);
  cookies().set("access-token",token);
  return NextResponse.json({ message: 'User registered successfully' }, {status:201});
}


