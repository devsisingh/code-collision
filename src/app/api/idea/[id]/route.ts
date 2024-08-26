import { NextRequest, NextResponse } from 'next/server';
import client from '@/db';
import { z } from 'zod';
import { verifyJWT } from '@/app/api/backendUtils';

const updateIdeaSchema = z.object({
  title: z.string(),
  description: z.string(),
});

export async function GET(request: NextRequest) {
  try {
    const ideaId = request.nextUrl.pathname.split('/').pop();
    const idea = await client.idea.findUnique({
      where: { id: ideaId },
    });
    return NextResponse.json({ idea });
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
  const { title, description } = parsedBody.data;
  try {
    const idea = await client.idea.update({
      where: { id: ideaId },
      data: { title, description },
    });
    return NextResponse.json({ idea });
  } catch (err) {
    return NextResponse.json({ msg: 'Something went wrong!' }, { status: 500 });
  }
}
