import { NextRequest, NextResponse } from 'next/server';
import client from '@/db';
import {z} from 'zod';
import { verifyJWT } from '@/app/api/backendUtils';

const updateIdeaSchema = z.object({
  title:z.string(),
  description:z.string(),
})

export async function GET(request:NextRequest){
  const searchParams = request.nextUrl.pathname.split('/');
  const ideaId = searchParams[searchParams.length-1];
  const idea =  await client.idea.findUnique({where:{id:Number(ideaId)}});
  return NextResponse.json({idea });
}

// Update an Idea
export async function PATCH(request:NextRequest){
  const searchParams = request.nextUrl.pathname.split('/');
  const ideaId = searchParams[searchParams.length-1];
  const body = await request.json();
  const parsedBody = updateIdeaSchema.safeParse(body)
  try {
    verifyJWT()
  }catch (err){
    return NextResponse.json({message:'Not Authorised'}, {status:403})
  }

  if (!parsedBody.success) {
    return NextResponse.json({msg: 'Invalid Inputs'}, {status: 411})
  }
  const {title, description} =  parsedBody.data;
  const idea =  await client.idea.update({where:{id:Number(ideaId)}, data:{title, description}});
  return NextResponse.json({idea });
}
