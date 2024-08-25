import client from '@/db';
import { NextResponse, NextRequest } from 'next/server';
import { verifyJWT } from '@/app/api/backendUtils';

// Get User by ID
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.pathname.split('/');

  try {
    verifyJWT()
  }catch (err){
    return NextResponse.json({message:'Not Authorised'}, {status:403})
  }
  const userId = searchParams[searchParams.length-1];
  const user = await client.user.findUnique({where:{id:Number(userId)}, include:{ideas:true}})
  if(!user){
    return NextResponse.json({message:"No User found"},{status:404})
  }
  return NextResponse.json({user });
}

