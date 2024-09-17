import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { verifyJWT } from '@/app/api/backendUtils';
import client from '@/db';

const verifySchema = z.object({ ideaId: z.string(), userId: z.string() });

export async function POST(request: NextRequest) {
  const body = await request.json();
  const parsedBody = verifySchema.safeParse(body);
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
    const dbVote = await client.vote.findFirst({ where: { ideaId, userId } });
    if (!dbVote) {
      return NextResponse.json({ msg: 'Not voted yet' }, { status: 404 });
    }

    await client.vote.updateMany({
      where: { ideaId, userId },
      data: { is_stored_on_block: true },
    });

    await client.idea.update({
      where: { id: ideaId },
      data: { vote_count: dbIdea.vote_count + 1 },
    });
    return NextResponse.json({ msg: 'Upvoted successfully' });
  } catch (err) {
    return NextResponse.json({ msg: 'Something went wrong!' }, { status: 500 });
  }
}
