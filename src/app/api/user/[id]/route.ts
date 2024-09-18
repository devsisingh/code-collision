import client from '@/db';
import { NextResponse, NextRequest } from 'next/server';
import { verifyJWT } from '@/app/api/backendUtils';

// Get User by ID
export async function GET(request: NextRequest) {
  const userId = request.nextUrl.pathname.split('/').pop();
  try {
    verifyJWT();
  } catch (err) {
    return NextResponse.json({ message: 'Not Authorised' }, { status: 403 });
  }
  try {
    const user = await client.user.findUnique({
      where: { id: userId },
    });
    if (!user) {
      return NextResponse.json({ message: 'No User found' }, { status: 404 });
    }
    return NextResponse.json({ user });
  } catch (err) {
    return NextResponse.json(
      { message: 'Something went wrong!' },
      { status: 500 }
    );
  }
}
