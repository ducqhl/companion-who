import { NextResponse } from 'next/server';

import { deleteCompanion, updateCompanion } from '@/services/db';
import { auth, currentUser } from '@clerk/nextjs';

export async function PATCH(
  req: Request,
  { params }: { params: { companionId: string } },
) {
  try {
    const body = await req.json();
    const user = await currentUser();
    const { src, name, description, instructions, seed, categoryId } = body;

    if (!params?.companionId) {
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

    const companion = await updateCompanion({
      where: {
        id: params?.companionId,
        userId: user.id,
      },
      data: {
        categoryId,
        userId: user.id,
        userName: user.firstName,
        src,
        name,
        description,
        instructions,
        seed,
      },
    });

    return NextResponse.json(companion);
  } catch (error) {
    console.error('[COMPANION_UPDATE]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { companionId: string } },
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const companion = await deleteCompanion({
      where: {
        userId,
        id: params.companionId,
      },
    });

    return NextResponse.json(companion);
  } catch (error) {
    console.log('[COMPANION_DELETE]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
