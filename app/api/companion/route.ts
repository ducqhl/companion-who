import { NextResponse } from 'next/server';

import { createCompanion } from '@/services/db';
import { currentUser } from '@clerk/nextjs';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const user = await currentUser();
    const { src, name, description, instructions, seed, categoryId } = body;

    if (!user?.id || !user?.firstName) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    if (
      !src ||
      !name ||
      !description ||
      !instructions ||
      !categoryId ||
      !seed ||
      !categoryId
    ) {
      return new NextResponse('Missing required fields', { status: 400 });
    }

    // TODO: check for subscription

    const companion = await createCompanion({
      categoryId,
      userId: user.id,
      userName: user.firstName,
      src,
      name,
      description,
      instructions,
      seed,
    });

    return NextResponse.json(companion);
  } catch (error) {
    console.error('[COMPANION_POST]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
