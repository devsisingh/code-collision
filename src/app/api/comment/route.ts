import { NextRequest, NextResponse } from 'next/server';
import { verifyJWT } from '@/app/api/backendUtils';
import client from '@/db';
import { z } from 'zod';

const createContentSchema = z.object({
  content: z.string(),
  userId: z.string(),
  ideaId: z.string(),
});

export async function POST(request: NextRequest) {
  const body = await request.json();
  const parsedBody = createContentSchema.safeParse(body);
  if (!parsedBody.success) {
    return NextResponse.json({ msg: 'Invalid Inputs' }, { status: 411 });
  }

  try {
    verifyJWT();
  } catch (err) {
    return NextResponse.json({ message: 'Not Authorised' }, { status: 403 });
  }

  try {
    const { content, ideaId, userId } = parsedBody.data;

    const user = await client.user.findUnique({ where: { id: userId } });
    const idea = await client.idea.findUnique({ where: { id: ideaId } });

    if (!user || !idea) {
      return NextResponse.json(
        { message: 'The Idea or User does not exits' },
        { status: 404 }
      );
    }

    const comment = await client.comment.create({
      data: {
        content,
        userId,
        ideaId,
      },
    });
    return NextResponse.json({ comment });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ msg: 'Something went wrong!' }, { status: 500 });
  }
}
