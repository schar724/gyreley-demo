import { ChatData, ChatObject, PendingChatObject } from "@/types/chat.type";
import { sessionStorageUtil } from "./sessionStorageUtil";
import mockChats from "../mockdb/chats.json";

const CHATS_KEY = "chats";

sessionStorageUtil.initialize(CHATS_KEY, mockChats);

function _readChats(): ChatData {
  return sessionStorageUtil.read<ChatData>(CHATS_KEY);
}

function _writeChats(chats: ChatData): void {
  sessionStorageUtil.write(CHATS_KEY, chats);
}

export const getChats = (): ChatData => {
  return _readChats();
};

export const getChatData = (chatId: string, status: "active" | "pending" | "closed"): ChatObject | PendingChatObject | null => {
  const chats = _readChats();
  const query = chats[status];
  const chatData = query[chatId];
  return chatData ?? null;
};

export const useUpdateChat = (chatId: string, updatedChat: ChatObject | PendingChatObject, status: "active" | "pending" | "closed"): ChatData => {
  const chats = _readChats();
  if (chats[status][chatId]) {
    chats[status][chatId] = updatedChat;
    _writeChats(chats);
  }
  return chats;
};

export const useDeleteChat = (chatId: string, status: "active" | "pending" | "closed"): ChatData => {
  const chats = _readChats();
  if (chats[status][chatId]) {
    delete chats[status][chatId];
    _writeChats(chats);
  }
  return chats;
};

export const pickupChat = (chatId: string): ChatData => {
  const chats = _readChats();
  const pendingChat = chats.pending[chatId];
  const activeChat: ChatObject = {
    ...pendingChat, "csr": {
      "authStatus": "active",
      "clientId": "-O63N4MHBb-QPjEa9Ehg",
      "email": "",
      "firstName": "Chat Wizard",
      "lastName": "",
      "phoneNumber": "",
      "roles": [
        "csr"
      ],
      "uid": "1"
    },
    "csrId": "1",
    "status": 'active'
  }

  if (pendingChat) {
    chats.active[chatId] = activeChat; // Move chat to active
    delete chats.pending[chatId]; // Remove chat from pending
    _writeChats(chats);
  }

  return chats;
};

export const closeChat = (chatId: string, status: "active" | "pending"): ChatData => {
  const chats = _readChats();
  const chat = chats[status][chatId];
  const newChat: ChatObject = {
    ...chat,
    "csr": {
      "authStatus": "active",
      "clientId": "-O63N4MHBb-QPjEa9Ehg",
      "email": "",
      "firstName": "Chat Wizard",
      "lastName": "",
      "phoneNumber": "",
      "roles": [
        "csr"
      ],
      "uid": "1"
    },
    csrId: '123',
    status: 'closed'
  }

  if (chat) {
    chats.closed[chatId] = newChat; // Move chat to closed
    delete chats[status][chatId]; // Remove chat from active or pending
    _writeChats(chats);
  }

  return chats;
};

export const deleteChat = (chatId: string): ChatData => {
  const chats = _readChats();
  if (chats.closed[chatId]) {
    delete chats.closed[chatId]; // Remove chat from closed
    _writeChats(chats);
  }
  return chats;
};


