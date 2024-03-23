'use client';

import { cn } from 'no';
import { Avatar, AvatarFallback } from '~/components/ui/avatar';
import { IconAI, IconUser } from '~/components/ui/icons';

// Different types of message bubbles.

export function UserMessage({ children }: { children: React.ReactNode }) {
  return (
    <div className={'user-msg group relative'}>
      <div className="mr-4 w-fit overflow-hidden">
        <div className="content px-4 py-2 text-white">{children}</div>
      </div>
      <Avatar className="avatar h-8 w-8 translate-y-2 items-center justify-center">
        <AvatarFallback className="border-[1px] border-black bg-white">
          <IconUser className="text-black" />
        </AvatarFallback>
      </Avatar>
    </div>
  );
}

export function BotMessage({
  children,
  className
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn('bot-msg group relative', className)}>
      <Avatar className="avatar h-8 w-8 translate-y-2 items-center justify-center">
        <IconAI className="text-black" />
      </Avatar>
      <div className="ml-4 w-fit overflow-hidden">
        <div className="content w-fit px-4 py-2 text-black">{children}</div>
      </div>
    </div>
  );
}

export function BotCard({
  children,
  showAvatar = true,
  className
}: {
  children: React.ReactNode;
  showAvatar?: boolean;
  className?: string;
}) {
  return (
    <div className="group relative flex items-end">
      <div
        className={cn(
          'bg-primary text-primary-foreground flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-full border shadow-sm',
          !showAvatar && 'invisible',
          className
        )}
      >
        <IconAI />
      </div>
      <div className="ml-4 w-full overflow-hidden px-1">{children}</div>
    </div>
  );
}

export function SystemMessage({ children }: { children: React.ReactNode }) {
  return (
    <div className={'mt-2 flex items-center justify-center gap-2 text-xs text-gray-500'}>
      <div className={'max-w-[600px] flex-initial px-2 py-2'}>{children}</div>
    </div>
  );
}
