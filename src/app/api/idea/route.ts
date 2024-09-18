import { NextResponse, NextRequest } from 'next/server';
import client, { category_type } from '@/db';
import { z } from 'zod';
import { verifyJWT } from '@/app/api/backendUtils';

const createIdeaSchema = z.object({
  title: z.string(),
  problem_solved: z.string(),
  possible_solution: z.string(),
  resources: z.array(z.string()).optional(),
  additional: z.string(),
  category: z.enum([
    'Payment',
    'ConsumerDapp',
    'Nft',
    'DeFi',
    'DePin',
    'Gaming',
    'Social',
    'AI',
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
  const userId = request.nextUrl.searchParams.get('userId');
  let ideas: any;
  try {
    ideas = await client.idea.findMany({
      where: {
        category: category ?? undefined,
        userId: userId ?? undefined,
        is_stored_on_block: userId ? undefined : true,
      },
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
    const {
      title,
      problem_solved,
      resources,
      possible_solution,
      additional,
      category,
      userId,
    } = parsedBody.data;

    const idea = await client.idea.create({
      data: {
        title,
        problem_solved,
        resources,
        possible_solution,
        additional,
        userId,
        category,
      },
    });
    return NextResponse.json({ idea });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ msg: 'Something went wrong!' }, { status: 500 });
  }
}
