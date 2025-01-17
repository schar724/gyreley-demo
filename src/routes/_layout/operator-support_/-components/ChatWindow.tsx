import SendMessage from "./SendMessage";
import ChatHeader from "./ChatHeader";
import ChatBox from "./ChatBox";
import { useEffect, useState } from "react";
import { RenderedMessage } from "@/types/chat.type";
import { useSearch } from "@tanstack/react-router";
import { getMessages } from "@/hooks/messages";
import { Route } from "../index";
import { useMobileContext } from "@/context/MobileContext";

export default function ChatWindow() {
  const [messages, setMessages] = useState<RenderedMessage[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const search = useSearch({ from: Route.id });
  const { mobile } = useMobileContext();

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
        mobile ? "" : " shadow-md"
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
