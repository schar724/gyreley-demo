import Icon from "@/components/Icon";
import { useAuth } from "@/context/AuthContext";
import { ChatData, ChatObject, PendingChatObject } from "@/types/chat.type";
import { cn, formatDate, generateProfilePhoto } from "@/utils";
import {
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { BOT } from "../../operator-support_/-Bot";
import { closeChat, deleteChat } from "@/hooks/chats";

type ChatListItemProps = {
  chat: ChatObject | PendingChatObject;
  chatId: string;
  panelType: string;
  handlePendingChatClick?: (chatId: string) => void;
  setChats: Dispatch<SetStateAction<ChatData>>;
};
export default function ChatListItem({
  chat,
  chatId,
  panelType,
  setChats,
  handlePendingChatClick,
}: ChatListItemProps) {
  const recipient = chat.user;
  const { user } = useAuth();
  const [isLastMessageRead, setIsLastMessageRead] = useState<boolean>(
    (chat?.lastMessage?.sender !== user?.uid && chat?.lastMessage?.read) ||
      true,
  );
  const search = useSearch({ strict: false });
  const navigate = useNavigate({ from: "/" });

  useEffect(() => {
    if (
      chat.lastMessage &&
      chat?.lastMessage?.sender !== user?.uid &&
      chat.lastMessage.sender != BOT.uid
    ) {
      setIsLastMessageRead(chat?.lastMessage?.read);
    }
  }, [chat]);

  function handleCloseChat(chatId: string): void {
    const updatedChats = closeChat(
      chatId,
      panelType == "pending" ? "pending" : "active",
    );
    setChats(updatedChats);
  }
  function handleDeleteChat(chatId: string): void {
    const updatedChats = deleteChat(chatId);
    setChats(updatedChats);
  }

  return (
    <div
      className={`relative flex items-center px-5 py-6 group max-w-96 overflow-hidden hover:bg-background-hover ${chatId === search.chatId ? "bg-background-hover" : ""} `}
    >
      <Button
        as="div"
        onClick={async (e) => {
          e.preventDefault(); // Prevent the default link navigation
          if (panelType === "pending" && handlePendingChatClick) {
            handlePendingChatClick(chatId); // Wait for data creation
          }
          navigate({
            to: "/operator-support",
            search: {
              chatId,
              status: `${panelType == "pending" ? "active" : chat.status}`,
            },
          }); // Navigate programmatically
        }}
        className="flex-1 block p-1 -m-1 w-full cursor-pointer"
      >
        <div className="flex items-center flex-1 min-w-0 ">
          <span
            className={`rounded-full bg-red-500 h-2 w-2 mr-2 ${isLastMessageRead ? "opacity-0" : "opacity-100"}`}
          ></span>
          <span className="relative flex-shrink-0 inline-block ">
            <img
              className="w-10 h-10 rounded-full"
              src={generateProfilePhoto(
                `${recipient?.firstName} ${recipient?.lastName}`,
              )}
              alt=""
            />
            <span
              className={cn(
                "bg-emerald-600",
                "absolute top-0 right-0 block h-2.5 w-2.5 rounded-full ring-2 ring-white",
              )}
              aria-hidden="true"
            />
          </span>
          <div className="ml-4 flex-1 min-w-0">
            <div
              className={`flex flex-col items-start ${isLastMessageRead ? "" : "font-bold"}`}
            >
              <div className="flex">
                <h3 className="text-sm font-medium text-foreground truncate">
                  {`${recipient.firstName} ${recipient.lastName}`}
                </h3>

                <p className="text-sm text-left text-foreground-hover truncate ml-2">
                  {chat.userClient.name}
                </p>
              </div>
              <p className="text-xs text-foreground-muted">
                {chat.lastMessage?.createdAt &&
                  formatDate(chat.lastMessage?.createdAt)}
              </p>
            </div>

            <div className="max-w-[50%] mt-2 flex justify-between">
              {chat && chat.lastMessage && (
                <p className="text-xs text-foreground-muted truncate overflow-hidden text-ellipsis whitespace-nowrap">
                  {chat.lastMessage.text}
                </p>
              )}
            </div>
          </div>
          <Menu as="div" className="">
            <MenuButton className="-m-1.5 flex items-center p-1.5">
              <Icon icon={EllipsisVerticalIcon} />
            </MenuButton>
            <MenuItems
              transition
              anchor="bottom end"
              className="absolute right-0 z-10 mt-2.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
            >
              <MenuItem
                as="div"
                className="group block px-3 py-1 text-sm leading-6 text-gray-900 cursor-pointer hover:bg-gray-100"
                onClick={() => {
                  handleCloseChat(chatId);
                }}
              >
                Close
              </MenuItem>
              <MenuItem
                as="div"
                className="group block px-3 py-1 text-sm leading-6 text-gray-900 cursor-pointer hover:bg-gray-100"
                onClick={() => {
                  handleDeleteChat(chatId);
                }}
              >
                Delete
              </MenuItem>
            </MenuItems>
          </Menu>
        </div>
      </Button>
    </div>
  );
}
