//import {
//  ChatBubbleBottomCenterIcon,
//  QuestionMarkCircleIcon,
//} from "@heroicons/react/24/outline";
//import Button from "@/components/Button";
//import { push } from "firebase/database";
//import { useAuth } from "@/context/AuthContext";
//import { ComponentType, SVGAttributes, useEffect, useState } from "react";
//import { useNavigate } from "@tanstack/react-router";
//import { cwChatsRef } from "@/lib/firebase/services/refs";
//import LogoCard from "@/components/cards/LogoCard";
//import { Chats } from "@/lib/firebase/services/chats";
//import { Clients } from "@/lib/firebase/services/clients";
//import { BOT } from "../-Bot";
//import { ChatObject, ChatType } from "@/types/chat.type";
//import Icon from "@/components/Icon";
//import { User } from "@/types/user.type";
//
//export async function startCwChat(user: User, navigate: any) {
//  const userClient = await Clients.getClient(user.clientId);
//
//  if (userClient) {
//    const chatData: ChatObject = {
//      user: user,
//      userId: user.uid,
//      status: "cw",
//      userClient,
//      csr: BOT,
//      csrId: BOT.uid,
//      lastMessage: null,
//    };
//
//    const newChatRef = await push(cwChatsRef, chatData);
//
//    if (newChatRef.key) {
//      navigate({
//        to: "/operator-support",
//        search: { chatId: newChatRef.key, status: "cw" },
//      });
//    }
//  }
//}
//
//export default function UserHelpScreen() {
//  const navigate = useNavigate({ from: "/operator-support" });
//  const { user } = useAuth();
//  const [chatIsLoading, setChatIsLoading] = useState(false);
//  const [chat, setChat] = useState<{ chatId: string; status: ChatType } | null>(
//    null,
//  );
//
//  useEffect(() => {
//    async function setActiveChatStatus() {
//      if (user) {
//        const activeChat = await Chats.getUsersChat(user.uid, "active");
//        if (activeChat) {
//          setChat({ chatId: activeChat, status: "active" });
//          return;
//        }
//        const pendingChat = await Chats.getUsersChat(user.uid, "pending");
//        if (pendingChat) {
//          setChat({ chatId: pendingChat, status: "pending" });
//          return;
//        }
//        const cwChat = await Chats.getUsersChat(user.uid, "cw");
//        if (cwChat) {
//          setChat({ chatId: cwChat, status: "cw" });
//          return;
//        }
//      }
//    }
//    setActiveChatStatus();
//  }, []);
//
//  async function startChat() {
//    try {
//      setChatIsLoading(true);
//
//      if (!user || !user.uid) {
//        throw new Error("No authenticated user");
//      }
//
//      if (!chat) {
//        await startCwChat(user, navigate);
//      } else {
//        navigate({
//          to: "/operator-support",
//          search: {
//            chatId: chat.chatId,
//            status: chat.status,
//          },
//        });
//      }
//    } catch (error) {
//      setChatIsLoading(false);
//      throw new Error(`${error}`);
//    }
//  }
//
//  const chatButtonTextMap: { [key: string]: string } = {
//    active: "Resume Chat",
//    cw: "Resume Chat Wizard",
//    pending: "Review Pending Chat",
//  };
//
//  const helpItems = [
//    {
//      icon: ChatBubbleBottomCenterIcon,
//      text: "Start a chat and you will be connected with a member of our support team.",
//      buttonText: chat ? chatButtonTextMap[chat.status] : "Start a Chat",
//      onClick: startChat,
//    },
//    {
//      icon: QuestionMarkCircleIcon,
//      text: "Have a look at our reference guide",
//      buttonText: "Help Site",
//      onClick: () => {
//        navigate({ to: "/help" });
//      },
//    },
//  ];
//
//  type HelpItemProps = {
//    icon: ComponentType<SVGAttributes<SVGElement>>;
//    text: string;
//    buttonText: string;
//    onClick: () => void;
//  };
//  const HelpItem = ({ icon, text, buttonText, onClick }: HelpItemProps) => {
//    return (
//      <div className="flex flex-col items-center justify-center w-full py-8 px-5 border border-slate-200 rounded-md space-y-5">
//        <Icon icon={icon} className="w-[30%] h-[30%] text-foreground-muted" />
//        <p className="text-center">{text}</p>
//        <Button
//          type="button"
//          label={buttonText}
//          className="max-w-48"
//          onClick={onClick}
//          isLoading={chatIsLoading}
//        />
//      </div>
//    );
//  };
//
//  return (
//    <div className="flex flex-col justify-center items-center h-full">
//      <LogoCard
//        headerText="How can we help you?"
//        className="justify-center items-center"
//        headerClassName="border-b border-b-slate-200 pb-4"
//      >
//        <div className="flex flex-col w-full h-full pt-6 space-y-5 overflow-y-auto">
//          {helpItems.map((item, index) => (
//            <div key={`hi-${index}`}>
//              <HelpItem
//                icon={item.icon}
//                text={item.text}
//                buttonText={item.buttonText}
//                onClick={item.onClick}
//              />
//            </div>
//          ))}
//        </div>
//      </LogoCard>
//    </div>
//  );
//}
