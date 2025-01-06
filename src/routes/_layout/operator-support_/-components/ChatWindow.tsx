import SendMessage from "./SendMessage";
import ChatHeader from "./ChatHeader";
import { isMobile } from "react-device-detect";
import ChatBox from "./ChatBox";
import { useEffect, useState } from "react";
import { RenderedMessage } from "@/types/chat.type";
import { useSearch } from "@tanstack/react-router";
import { getMessages } from "@/hooks/messages";

export default function ChatWindow() {
  const [messages, setMessages] = useState<RenderedMessage[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const search = useSearch({ from: "/_layout/operator-support_/" });

  useEffect(() => {
    setIsLoading(true);
    if (!search.chatId || !search.status) {
      return;
    }

    const messages = getMessages(search.chatId);
    if (messages) {
      setMessages(messages);
    }
    setIsLoading(false);
  }, [search.chatId, search.status]);

  return (
    <div
      id="chat"
      className={`relative flex flex-col h-full overflow-hidden bg-slate-100 rounded-lg ${
        isMobile ? "" : " shadow-md"
      }`}
    >
      <div className="relative flex flex-col h-full">
        <ChatHeader />
        <ChatBox messages={messages} isLoading={isLoading} />
        <SendMessage setMessages={setMessages} />
      </div>
    </div>
  );
}
