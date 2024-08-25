import { NextResponse, NextRequest } from "next/server";
import client from '@/db'
import {z} from 'zod';

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
  const user =  await client.user.create({data:{wallet_address, avatar_image_url, password, }});
  return NextResponse.json({user });
}


