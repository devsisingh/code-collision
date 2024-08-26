import { NextResponse, NextRequest } from 'next/server';
import client, { category_type } from '@/db';
import { z } from 'zod';
import { verifyJWT } from '@/app/api/backendUtils';

const createIdeaSchema = z.object({
  title: z.string(),
  description: z.string(),
  category: z.enum([
    'Payment',
    'ConsumerDapp',
    'Nft',
    'DeFi',
    'DePin',
    'Gaming',
    'Social',
    'Ai',
    'Content',
    'DeveloperTooling',
    'Community',
  ]),
  userId: z.string(),
});

// Get All Ideas
export async function GET(request: NextRequest) {
  const category = request.nextUrl.searchParams.get(
    'category'
  ) as category_type;
  let ideas: any;
  try {
    ideas = await client.idea.findMany({
      where: { category: category ?? undefined },
      orderBy: { vote_count: 'desc' },
    });
    return NextResponse.json({ ideas });
  } catch (err) {
    return NextResponse.json({ msg: 'Something went wrong!' }, { status: 500 });
  }
}

// Create an Idea
export async function POST(request: NextRequest) {
  const body = await request.json();
  const parsedBody = createIdeaSchema.safeParse(body);

  try {
    verifyJWT();
  } catch (err) {
    return NextResponse.json({ message: 'Not Authorised' }, { status: 403 });
  }

  if (!parsedBody.success) {
    return NextResponse.json({ msg: 'Invalid Inputs' }, { status: 411 });
  }
  try {
    const { title, description, category, userId } = parsedBody.data;
    const idea = await client.idea.create({
      data: { title, description, category, userId },
    });
    return NextResponse.json({ idea });
  } catch (err) {
    return NextResponse.json({ msg: 'Something went wrong!' }, { status: 500 });
  }
}
