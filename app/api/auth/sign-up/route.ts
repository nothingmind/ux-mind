import * as bcrypt from 'bcrypt';

import { db } from '@/lib/db';

export async function POST(request: Request) {
  try {
    const { email, password, lastName, firstName } = await request.json();

    const user = await db.user.findUnique({
      where: {
        email
      }
    });

    if (user) {
      return Response.json({
        success: false,
        message: 'Email already exists'
      });
    }

    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(password, salt);

    await db.user.create({
      data: {
        id,
        email,
        firstName,
        lastName,
        password: hash
      }
    });

    return Response.json({
      success: true,
      message: 'User was successfully created.'
    });
  } catch (e) {
    console.log(e);

    return Response.json({
      success: false,
      message: 'Error occured while signing up!'
    });
  }
}
