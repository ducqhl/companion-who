'use client';

import { ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react';

import BotAvatar from '@/components/bot-avatar';
import { Button } from '@/components/ui/button';
import { Companion, Message } from '@prisma/client';

interface ChatHeaderProps {
  companion: Companion & {
    messages: Message[];
    _count: {
      messages: number;
    };
  };
}

const ChatHeader = ({ companion }: ChatHeaderProps) => {
  const router = useRouter();

  return (
    <div className="flex w-full justify-between items-center border-b border-primary/10 pb-4">
      <div className="flex gap-x-2 items-center">
        <Button size="icon" variant="ghost" onClick={() => router.back()}>
          <ChevronLeft className="h-8 w-8" />
        </Button>
        <BotAvatar />
      </div>
    </div>
  );
};

export default ChatHeader;