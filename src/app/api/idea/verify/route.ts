import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { verifyJWT } from '@/app/api/backendUtils';
import client from '@/db';

const verifySchema = z.object({ ideaId: z.string() });

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
  const { ideaId } = parsedBody.data;

  try {
    const dbIdea = await client.idea.findUnique({ where: { id: ideaId } });
    if (!dbIdea) {
      return NextResponse.json({ msg: 'Idea not found' }, { status: 404 });
    }

    const idea = await client.idea.update({
      where: { id: ideaId },
      data: { is_stored_on_block: true },
    });
    return NextResponse.json({ idea });
  } catch (err) {
    return NextResponse.json({ msg: 'Something went wrong!' }, { status: 500 });
  }
}
