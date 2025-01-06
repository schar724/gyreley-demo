import { z } from "zod";
import { Client } from "./client.type";
import { User } from "./user.type";
import { messageSchema } from "@/schemas/chatSchemas";

export type ChatType = "active" | "pending" | "closed" | "cw";

export interface PendingChatObject {
  user: User;
  userId: string;
  status: ChatType;
  userClient: Client;
  lastMessage: Message | null;
}

export interface ChatObject extends PendingChatObject {
  csr: User;
  csrId: string;
}

export type cwObject = {
  user: User;
  status: "cw";
  lastMessage: Message;
  userId: string;
  userClient: Client;
};

export type cwMessage = {
  id: number;
  type: "bot" | "user";
  text: string;
};

export type Message = z.infer<typeof messageSchema>;
export type RenderedMessage = Message & {
  key: string;
  isCloseMessage: boolean;
};

export type Chats = {
  [key: string]: ChatObject;
};

export type PendingChats = {
  [key: string]: PendingChatObject;
};

export type ChatData = {
  active: Chats;
  pending: PendingChats;
  closed: Chats;
};

export type ChatListData = {
  chats: ChatData;
  userData: {
    [key: string]: User;
  };
};

export type ChatUpdates = {
  [key: string]: ChatObject | null;
};
