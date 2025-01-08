import ChatList from "./ChatList";
import { useEffect, useState } from "react";
import { getChats, pickupChat } from "@/hooks/chats";
import { ChatData } from "@/types/chat.type";

export default function ChatListContainer() {
  const [activeChats, setActiveChats] = useState({});
  const [pendingChats, setPendingChats] = useState({});
  const [closedChats, setClosedChats] = useState({});
  const [chats, setChats] = useState<ChatData>({
    active: {},
    pending: {},
    closed: {},
  });

  function handlePendingChatClick(chatId: string) {
    const updatedChats = pickupChat(chatId);
    setChats(updatedChats);
  }

  // Fetch and listen to chats
  useEffect(() => {
    const data = getChats();

    setActiveChats(data.active);
    setPendingChats(data.pending);
    setClosedChats(data.closed);
  }, []);

  useEffect(() => {
    const data = getChats();
    setActiveChats(data.active);
    setPendingChats(data.pending);
    setClosedChats(data.closed);
  }, [chats]);

  return (
    <ChatList
      setChats={setChats}
      activeChats={activeChats}
      pendingChats={pendingChats}
      closedChats={closedChats}
      handlePendingChatClick={handlePendingChatClick}
    />
  );
}
