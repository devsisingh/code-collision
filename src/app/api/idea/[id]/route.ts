import { NextRequest, NextResponse } from 'next/server';
import client from '@/db';
import { z } from 'zod';
import { verifyJWT } from '@/app/api/backendUtils';

const updateIdeaSchema = z.object({
  title: z.string(),
  problem_solved: z.string(),
  possible_solution: z.string(),
  resources: z.array(z.string()).optional(),
  additional: z.string(),
});

export async function GET(request: NextRequest) {
  try {
    const ideaId = request.nextUrl.pathname.split('/').pop();
    const comments = await client.comment.findMany({
      where: { ideaId },
      select: {
        content: true,
        user: {
          select: { wallet_address: true, avatar_image_url: true },
        },
      },
    });
    const idea = await client.idea.findUnique({
      where: { id: ideaId },
      include: {
        user: {
          select: { wallet_address: true, avatar_image_url: true },
        },
      },
    });
    return NextResponse.json({ idea, comments });
  } catch (err) {
    return NextResponse.json({ msg: 'Something went wrong!' }, { status: 500 });
  }
}

// Update an Idea
export async function PATCH(request: NextRequest) {
  const ideaId = request.nextUrl.pathname.split('/').pop();
  const body = await request.json();
  const parsedBody = updateIdeaSchema.safeParse(body);
  try {
    verifyJWT();
  } catch (err) {
    return NextResponse.json({ message: 'Not Authorised' }, { status: 403 });
  }

  if (!parsedBody.success) {
    return NextResponse.json({ msg: 'Invalid Inputs' }, { status: 411 });
  }
  const { title, resources, possible_solution, problem_solved, additional } =
    parsedBody.data;
  try {
    const idea = await client.idea.update({
      where: { id: ideaId },
      data: {
        title,
        possible_solution,
        problem_solved,
        additional,
        resources: resources,
      },
    });
    return NextResponse.json({ idea });
  } catch (err) {
    return NextResponse.json({ msg: 'Something went wrong!' }, { status: 500 });
  }
}
