import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';

export function verifyJWT(){
    const token = cookies().get('access-token')?.value;
    if(!token){
      throw new Error('access-token')
    }
    try {
      jwt.verify(token, process.env.JWT_SECRET_KEY!);
    } catch (err){
      throw new Error('access-token')
    }
}

