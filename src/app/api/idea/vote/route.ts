import { z } from 'zod';
import { NextRequest, NextResponse } from 'next/server';
import { verifyJWT } from '@/app/api/backendUtils';
import client from '@/db';

const voteSchema = z.object({ ideaId: z.string(), userId: z.string() });
// Vote an Idea
export async function PATCH(request: NextRequest) {
  const body = await request.json();
  const parsedBody = voteSchema.safeParse(body);
  try {
    verifyJWT();
  } catch (err) {
    return NextResponse.json({ message: 'Not Authorised' }, { status: 403 });
  }

  if (!parsedBody.success) {
    return NextResponse.json({ msg: 'Invalid Inputs' }, { status: 411 });
  }
  const { ideaId, userId } = parsedBody.data;

  try {
    const dbIdea = await client.idea.findUnique({ where: { id: ideaId } });
    if (!dbIdea) {
      return NextResponse.json({ msg: 'Idea not found' }, { status: 404 });
    }
    const dbVote = await client.vote.findFirst({ where: { userId, ideaId } });
    if (dbVote) {
      return NextResponse.json({ msg: 'Already voted' }, { status: 403 });
    }
    await client.vote.create({ data: { userId, ideaId } });
    return NextResponse.json({ msg: 'vote created' });
  } catch (err) {
    return NextResponse.json({ msg: 'Something went wrong!' }, { status: 500 });
  }
}
