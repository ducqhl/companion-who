import { NextResponse } from 'next/server';

import { createCompanion, updateCompanion } from '@/services/db';
import { currentUser } from '@clerk/nextjs';

export async function PATCH(
  req: Request,
  { params }: { params: { companionId: string } },
) {
  try {
    const body = await req.json();
    const user = await currentUser();
    const { src, name, description, instructions, seed, categoryId } = body;

    if (params?.companionId) {
      return new NextResponse('Companion Id is not provided');
    }
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

    const companion = await updateCompanion(params?.companionId, {
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
    console.error('[COMPANION_UPDATE]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
