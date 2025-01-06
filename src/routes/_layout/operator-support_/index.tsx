import {
  createFileRoute,
  redirect,
  useLoaderData,
} from "@tanstack/react-router";
import ChatWindow from "./-components/ChatWindow";
import { useAuth } from "@/context/AuthContext";
import { ChatObject, PendingChatObject } from "@/types/chat.type";
import LogoCard from "../../../components/cards/LogoCard";
import { z } from "zod";
import { getChatData } from "@/hooks/chats";

export const Route = createFileRoute("/_layout/operator-support_/")({
  validateSearch: z.object({
    chatId: z.string().optional().catch(undefined),
    status: z.enum(["active", "closed", "pending"]).optional().catch(undefined),
  }),
  beforeLoad: async ({ context: { auth }, search }) => {
    if (auth.user && auth.roles) {
      if (search.chatId && search.status) {
        const chatData = getChatData(search.chatId, search.status);

        if (!chatData) {
          throw redirect({
            to: "/operator-support",
            search: {
              chatId: undefined,
            },
          });
        }
      }
    }
  },
  loaderDeps: ({ search }) => search,
  loader: async ({
    deps: { chatId, status },
  }): Promise<ChatObject | PendingChatObject | undefined> => {
    if (chatId && status) {
      const chatData: ChatObject | PendingChatObject | null = getChatData(
        chatId,
        status,
      );

      if (chatData) {
        return chatData;
      }
    }
  },

  component: OperatorSupport,
});

export default function OperatorSupport() {
  const { roles } = useAuth();
  const chatData = useLoaderData({ from: Route.id });

  if (chatData) {
    return <ChatWindow />;
  }

  if (roles && roles.has("csr")) {
    return (
      <div className="flex flex-col pt-[15vh] justify-center items-center">
        <LogoCard
          headerText="Gyreley Operator Support"
          className="shadow-none justify-center"
        ></LogoCard>
      </div>
    );
  }

  //if (roles && roles.has("user")) {
  //  return <UserHelpScreen />;
  //}
}
