import { redirect } from 'next/navigation';
import React from 'react';

import { getCompanion } from '@/services/db';
import { auth, redirectToSignIn } from '@clerk/nextjs';

import ChatClient from './components/chat-client';

interface ChatIdPageProps {
  params: {
    chatId: string;
  };
}
const ChatIdPage = async ({ params }: ChatIdPageProps) => {
  const { userId } = auth();

  if (!userId) {
    return redirectToSignIn();
  }

  const companion = await getCompanion({
    where: {
      id: params.chatId,
    },
    include: {
      messages: {
        orderBy: {
          createdAt: 'asc',
        },
        where: {
          userId,
        },
      },
      _count: {
        select: {
          messages: true,
        },
      },
    },
  });

  if (!companion) {
    return redirect('/');
  }

  return <ChatClient companion={companion} />;
};

export default ChatIdPage;
