import { Tab, TabGroup, TabList, TabPanels } from "@headlessui/react";
import { cn } from "@/utils";
import { ChatData, Chats, PendingChats } from "@/types/chat.type";
import ChatListTabPanel from "./ChatListTabPanel";
import { useSearch } from "@tanstack/react-router";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useMobileContext } from "@/context/MobileContext";

type ChatListPresentationProps = {
  activeChats: Chats;
  pendingChats: PendingChats;
  closedChats: Chats;
  setChats: Dispatch<SetStateAction<ChatData>>;
  handlePendingChatClick: (chatId: string) => void;
};

export default function ChatListPresentation({
  activeChats,
  pendingChats,
  closedChats,
  setChats,
  handlePendingChatClick,
}: ChatListPresentationProps) {
  const tabIndex = ["active", "pending", "closed"];
  const { mobile } = useMobileContext();
  const search = useSearch({ strict: false });
  const [selectedTab, setSelectedTab] = useState<number>(
    tabIndex.indexOf(search.status || "active"),
  );

  useEffect(() => {
    if (search.status) {
      setSelectedTab(tabIndex.indexOf(search.status));
    }
  }, [search.status]);

  function handleTabChange(tab: string) {
    setSelectedTab(tabIndex.indexOf(tab));
  }

  return (
    <div className="flex flex-col grow">
      <div className="w-full h-full">
        <div className="h-auto px-2">
          {mobile ? null : (
            <div className="flex items-start justify-between">
              <h1 className="text-base font-semibold leading-6">Chats</h1>
            </div>
          )}
          <TabGroup selectedIndex={selectedTab}>
            <TabList
              className={`flex justify-between w-full ${mobile ? "" : "py-6"}`}
            >
              <Tab
                key="active"
                onClick={() => {
                  handleTabChange("active");
                }}
                className={({ selected }) =>
                  cn(
                    selected
                      ? "border-indigo-500 text-secondary"
                      : "border-transparent text-foreground-muted hover:text-foreground-muted-hover",
                    "whitespace-nowrap  text-sm font-medium",
                    "focus:outline-none",
                  )
                }
              >
                <div className="flex items-center">
                  Active - {Object.keys(activeChats).length}
                </div>
              </Tab>

              <Tab
                key="pending"
                onClick={() => {
                  handleTabChange("pending");
                }}
                className={({ selected }) =>
                  cn(
                    selected
                      ? "border-indigo-500 text-secondary"
                      : "border-transparent text-foreground-muted hover:text-foreground-muted-hover",
                    "whitespace-nowrap  text-sm font-medium",
                    "focus:outline-none",
                  )
                }
              >
                <div className="flex items-center">
                  Pending - {Object.keys(pendingChats).length}
                </div>
              </Tab>

              <Tab
                key="closed"
                onClick={() => {
                  handleTabChange("closed");
                }}
                className={({ selected }) =>
                  cn(
                    selected
                      ? "border-indigo-500 text-secondary"
                      : "border-transparent text-foreground-muted hover:text-foreground-muted-hover",
                    "whitespace-nowrap  text-sm font-medium",
                    "focus:outline-none",
                  )
                }
              >
                <div className="flex items-center">
                  Closed - {Object.keys(closedChats).length}
                </div>
              </Tab>
            </TabList>
            <hr className="mt-4" />
            <TabPanels className={"-mx-2"}>
              <ChatListTabPanel
                chats={activeChats}
                panelType="active"
                setChats={setChats}
              />
              <ChatListTabPanel
                setChats={setChats}
                chats={pendingChats}
                handlePendingChatClick={handlePendingChatClick}
                panelType="pending"
              />
              <ChatListTabPanel
                chats={closedChats}
                panelType="closed"
                setChats={setChats}
              />
            </TabPanels>
          </TabGroup>
        </div>
      </div>
    </div>
  );
}
