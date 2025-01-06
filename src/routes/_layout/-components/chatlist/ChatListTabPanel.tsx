import { ChatData, Chats, PendingChats } from "@/types/chat.type";
import { TabPanel } from "@headlessui/react";
import ChatListItem from "./ChatListItem";
import { Dispatch, SetStateAction } from "react";

//TODO: create a drop down menu for chat list operations

type ChatListTabPanelProps = {
  chats: Chats | PendingChats | null;
  handlePendingChatClick?: (chatId: string) => void;
  panelType: string;
  setChats: Dispatch<SetStateAction<ChatData>>;
};

export default function ChatListTabPanel({
  chats,
  panelType,
  handlePendingChatClick,
  setChats,
}: ChatListTabPanelProps) {
  return (
    <TabPanel>
      <ul>
        {chats &&
          Object.keys(chats).map((chatId, index) => (
            <li key={`${panelType}-${index}`} id={chats[chatId].user.uid}>
              <ChatListItem
                chat={chats[chatId]}
                chatId={chatId}
                panelType={panelType}
                handlePendingChatClick={handlePendingChatClick}
                setChats={setChats}
              />
            </li>
          ))}
      </ul>
    </TabPanel>
  );
}
