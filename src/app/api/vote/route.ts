import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import client from '@/db';
import { verifyJWT } from '@/app/api/backendUtils';
const voteSchema = z.object({
  userId: z.string(),
});

export async function POST(request: NextRequest) {
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

  const { userId } = parsedBody.data;

  const dbUser = await client.user.findUnique({ where: { id: userId } });

  if (!dbUser) {
    return NextResponse.json({ msg: 'User not found' }, { status: 404 });
  }
  try {
    const totalVotesByUser = await client.vote.findMany({
      where: { userId },
      include: { idea: true },
    });
    return NextResponse.json({ votesByUser: totalVotesByUser });
  } catch (err) {
    return NextResponse.json({ msg: 'Something went wrong!' }, { status: 500 });
  }
}
