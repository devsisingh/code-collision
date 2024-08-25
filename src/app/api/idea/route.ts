import { NextResponse, NextRequest } from "next/server";
import client from '@/db'
import {z} from 'zod';

const createIdeaSchema = z.object({
  title:z.string(),
  description:z.string(),
  category: z.enum(['Gaming', "Defi","DePin"]),
  userId: z.number()
})

// Get All Ideas
export async function GET() {
  let ideas:any;
  try {
   ideas = await client.idea.findMany()
  }catch (err){
    console.log(err);
  }
  return NextResponse.json({ideas });
}

// Create an Idea
export async function POST(request:NextRequest){
  const body = await request.json();
  const parsedBody = createIdeaSchema.safeParse(body)

  if (!parsedBody.success) {
    return NextResponse.json({msg: 'Invalid Inputs'}, {status: 411})
  }
  const {title, description, category, userId} =  parsedBody.data;
  const idea =  await client.idea.create({data:{title,  description, category, userId}});
  return NextResponse.json({idea });
}


