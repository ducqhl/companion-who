import React, { ElementRef, useEffect, useRef, useState } from 'react';

import ChatMessage, { ChatMessageProps } from '@/components/chat-message';
import { Companion } from '@prisma/client';

interface ChatMessagesProps {
  companion: Companion;
  isLoading: boolean;
  messages: ChatMessageProps[];
}

const ChatMessages = ({
  companion,
  isLoading,
  messages,
}: ChatMessagesProps) => {
  const scrollRef = useRef<ElementRef<'div'>>(null);
  const [fakeLoading, setFakeLoading] = useState(
    messages?.length === 0 ? true : false,
  );

  useEffect(() => {
    const timeout = setTimeout(() => setFakeLoading(false), 1000);

    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    scrollRef?.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages.length]);

  return (
    <div className="flex-1 overflow-y-auto pr-4">
      <ChatMessage
        isLoading={fakeLoading}
        src={companion.src}
        role="system"
        content={`Hello, I am ${companion.name}, ${companion.description}`}
      />
      {messages.map((message) => (
        <ChatMessage
          role={message.role}
          key={message.content}
          content={message.content}
          src={message.src}
        />
      ))}
      {isLoading && <ChatMessage isLoading src={companion.src} role="system" />}
      <div ref={scrollRef} />
    </div>
  );
};

export default ChatMessages;
