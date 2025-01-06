import { Message, RenderedMessage } from "@/types/chat.type";
import { sessionStorageUtil } from "./sessionStorageUtil";
import mockMessages from "../mockdb/messages.json";

const MESSAGES_KEY = "messages";

sessionStorageUtil.initialize(MESSAGES_KEY, mockMessages);

function _readMessages(): Record<string, Record<string, Message>> {
  return sessionStorageUtil.read<Record<string, Record<string, Message>>>(MESSAGES_KEY);
}

function _writeMessages(messages: Record<string, Record<string, Message>>): void {
  sessionStorageUtil.write(MESSAGES_KEY, messages);
}

export const getMessages = (chatId: string): RenderedMessage[] | null => {
  const messages = _readMessages();
  const foundMessages = messages[chatId];
  const messagesList: RenderedMessage[] = [];

  if (foundMessages) {
    Object.keys(foundMessages).forEach((key) => {
      messagesList.push({ ...foundMessages[key], key: key, isCloseMessage: false });
    });
    return messagesList;
  } else {
    console.log("No messages found");
    return null;
  }
};

export const addMessage = (chatId: string, newMessage: Message): RenderedMessage[] => {
  const messages = _readMessages();

  if (!messages[chatId]) {
    messages[chatId] = {};
  }

  const messageKey = `msg-${Date.now()}`;
  messages[chatId][messageKey] = newMessage;

  _writeMessages(messages);

  return getMessages(chatId) ?? [];
};

