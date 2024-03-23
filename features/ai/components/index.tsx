'use client';
import { useEffect, useRef, useState } from 'react';

import { useActions, useUIState } from 'ai/rsc';
import { UserMessage } from './llm/message';

import { type AI } from '../action';
// import { ChatScrollAnchor } from '@/lib/hooks/chat-scroll-anchor';
import clsx from 'clsx';
import Textarea from 'react-textarea-autosize';
import { Button } from '~/components/ui/button';
import { IconAI, IconArrowElbow, IconClose, IconPlus } from '~/components/ui/icons';
import { Tooltip, TooltipContent, TooltipTrigger } from '~/components/ui/tooltip';
import { useEnterSubmit } from '../hooks/use-enter-submit';
import { ChatList } from './chat-list';
import { EmptyScreen } from './empty-screen';

export default function AiChatBox() {
  const [messages, setMessages] = useUIState<typeof AI>();
  const { submitUserMessage } = useActions<typeof AI>();
  const [inputValue, setInputValue] = useState('');
  const { formRef, onKeyDown } = useEnterSubmit();
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const [openChat, setOpenChat] = useState<boolean>(false);

  const toggleChat = () => setOpenChat(!openChat);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '/') {
        if (e.target && ['INPUT', 'TEXTAREA'].includes((e.target as any).nodeName)) {
          return;
        }
        e.preventDefault();
        e.stopPropagation();
        if (inputRef?.current) {
          inputRef.current.focus();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [inputRef]);

  return (
    <div>
      <div id="chatbox" className="fixed bottom-5 right-10 z-50 flex flex-row items-end space-x-4">
        <div
          className={clsx(
            `w-96 overflow-x-hidden rounded-lg border border-gray-200 bg-white drop-shadow-md duration-200 ease-in-out`,
            openChat ? 'visible opacity-100' : 'invisible opacity-0'
          )}
        >
          {/* Chat header */}
          <div
            className="px-4 py-3"
            style={{
              backgroundColor: '#F6F8FA'
            }}
          >
            <p className="text-center text-sm font-semibold text-black">Chat with AI Assistant</p>
          </div>
          {messages.length ? (
            <>
              <ChatList messages={messages} />
            </>
          ) : (
            <EmptyScreen
              submitMessage={async (message) => {
                // Add user message UI
                setMessages((currentMessages) => [
                  ...currentMessages,
                  {
                    id: Date.now(),
                    display: <UserMessage>{message}</UserMessage>
                  }
                ]);

                // Submit and get response message
                const responseMessage = await submitUserMessage(message);
                setMessages((currentMessages) => [...currentMessages, responseMessage]);
              }}
            />
          )}
          <div id="chatbox_input" className="mx-auto duration-300 ease-in-out animate-in">
            <div className="rounded-t-2xl">
              <form
                ref={formRef}
                onSubmit={async (e: any) => {
                  e.preventDefault();

                  // Blur focus on mobile
                  if (window.innerWidth < 600) {
                    e.target['message']?.blur();
                  }

                  const value = inputValue.trim();
                  setInputValue('');
                  if (!value) return;

                  // Add user message UI
                  setMessages((currentMessages) => [
                    ...currentMessages,
                    {
                      id: Date.now(),
                      display: <UserMessage>{value}</UserMessage>
                    }
                  ]);

                  try {
                    // Submit and get response message
                    const responseMessage = await submitUserMessage(value);
                    setMessages((currentMessages) => [...currentMessages, responseMessage]);
                  } catch (error) {
                    // You may want to show a toast or trigger an error state.
                    console.error(error);
                  }
                }}
              >
                <div
                  className="relative flex h-full w-full grow flex-col overflow-hidden sm:rounded-md"
                  style={{
                    backgroundColor: '#F6F8FA'
                  }}
                >
                  <Textarea
                    ref={inputRef}
                    tabIndex={0}
                    onKeyDown={onKeyDown}
                    placeholder="Send a message."
                    className="min-h-[60px] w-full resize-none bg-transparent px-4 py-[1.3rem] text-black focus-within:outline-none sm:text-sm"
                    autoFocus
                    spellCheck={false}
                    autoComplete="off"
                    autoCorrect="off"
                    name="message"
                    rows={1}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                  />
                  <div className="flex flex-row justify-between px-4 pb-4">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="outline"
                          size="icon"
                          id="action-new"
                          className="top-4 h-8 w-8 rounded-full border-none bg-white p-0 hover:bg-gray-300 sm:left-4"
                          onClick={(e) => {
                            e.preventDefault();
                            setMessages([]);
                          }}
                        >
                          <IconPlus className="text-black" />
                          <span className="sr-only text-xs">New Chat</span>
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>New Chat</TooltipContent>
                    </Tooltip>

                    <div className="">
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button type="submit" size="icon" disabled={inputValue === ''}>
                            <IconArrowElbow />
                            <span className="sr-only">Send message</span>
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>Send message</TooltipContent>
                      </Tooltip>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        <button
          className="h-fit w-fit rounded-full bg-black px-4 py-4 text-white"
          onClick={toggleChat}
        >
          {openChat ? <IconClose className="h-5 w-5" /> : <IconAI className="h-5 w-5" />}
        </button>
      </div>
    </div>
  );
}
