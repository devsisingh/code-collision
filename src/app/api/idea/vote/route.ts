import { z } from 'zod';
import { NextRequest, NextResponse } from 'next/server';
import { verifyJWT } from '@/app/api/backendUtils';
import client from '@/db';

const voteSchema = z.object({ ideaId: z.string() });
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
  const { ideaId } = parsedBody.data;

  try {
    const dbIdea = await client.idea.findUnique({ where: { id: ideaId } });
    if (!dbIdea) {
      return NextResponse.json({ msg: 'Idea not found' }, { status: 404 });
    }

    const idea = await client.idea.update({
      where: { id: ideaId },
      data: { vote_count: dbIdea.vote_count + 1 },
    });
    return NextResponse.json({ idea });
  } catch (err) {
    return NextResponse.json({ msg: 'Something went wrong!' }, { status: 500 });
  }
}
