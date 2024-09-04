import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import client from '@/db';
import bcrypt from 'bcrypt';

const passwordSchema = z.object({
  password: z.string(),
  userId: z.string(),
});

export async function POST(request: NextRequest) {
  const body = await request.json();
  const parsedBody = passwordSchema.safeParse(body);
  if (!parsedBody.success) {
    return NextResponse.json({ msg: 'Invalid Inputs' }, { status: 411 });
  }
  const { password, userId } = parsedBody.data;
  const dbUser = await client.user.findUnique({ where: { id: userId } });

  if (!dbUser) {
    return NextResponse.json({ msg: 'User not exists' }, { status: 404 });
  }
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    await client.user.update({
      where: { id: userId },
      data: { password: hashedPassword },
    });
    return NextResponse.json(
      { message: 'Password updated successfully' },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json({ msg: 'Something went wrong!' }, { status: 500 });
  }
}
