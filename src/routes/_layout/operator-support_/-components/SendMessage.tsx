import { Dispatch, FormEvent, SetStateAction, useRef, useState } from "react";
import { PaperAirplaneIcon, PaperClipIcon } from "@heroicons/react/24/outline";
import { Message, RenderedMessage } from "@/types/chat.type";
import { Textarea } from "@headlessui/react";
import { useAuth } from "@/context/AuthContext";
import { useLoaderData, useSearch } from "@tanstack/react-router";
import Spinner from "@/components/Spinner";
import { addMessage } from "@/hooks/messages";
import { BOT } from "../-Bot";

interface SendMessageProps {
  setMessages: Dispatch<SetStateAction<RenderedMessage[]>>;
}
export default function SendMessage({ setMessages }: SendMessageProps) {
  const { user } = useAuth();
  const search = useSearch({ from: "/_layout/operator-support_/" });
  const chatIsActive: boolean = search.status === "active";
  const chatData = useLoaderData({ from: "/_layout/operator-support_/" });
  const [isLoading] = useState<boolean>(false);

  if (!user) return;

  const sendMessage = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    event.currentTarget.reset();
    const message = formData.get("message")?.toString().trim() || "";
    if (message === "" || !search.chatId) {
      return;
    }

    if (!user) {
      console.error("No authenticated user");
      return;
    }

    const date = new Date().toISOString();
    const messageData: Message = {
      text: message,
      sender: user.uid,
      createdAt: date,
      name: `${user.firstName} ${user.lastName}` || "User",
      read: true,
    };

    const updatedMessages = addMessage(search.chatId, messageData);
    setMessages(updatedMessages);

    setTimeout(() => {
      if (!search.chatId) {
        return;
      }
      const date = new Date().toISOString();
      const messageData: Message = {
        text: "This is just a demo, so no one will chat back. But thank you so much for testing out my app! If you like my work please contact me at: ",
        link: `<a href="mailto:scott.charles.dev@gmail.com">scott.charles.dev@gmail.com</a>`,
        sender: BOT.uid,
        createdAt: date,
        name: "Scott Charles",
        read: true,
      };

      const updatedMessages = addMessage(search.chatId, messageData);
      setMessages(updatedMessages);
    }, 500);
  };

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const openFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    alert("If this wasn't a demo the file would be added to the chat");
    event.preventDefault();
    //setIsLoading(true);
    //const file = event.target.files?.[0];
    //if (file) {
    //  if (!user || !search.chatId || !search.status) {
    //    console.error("No authenticated user");
    //    throw new Error("Error loading file");
    //  }

    //  const form = event.target.form;
    //  let message: string | undefined = undefined;
    //  if (form) {
    //    const formData = new FormData(form);
    //    message = formData.get("message")?.toString().trim();
    //  }
    //}
    //setIsLoading(false);
  };

  type PlaceholderMap = {
    [key: string]: string;
  };

  const placeholderMap: PlaceholderMap = {
    active: "Type a message...",
    closed: `${chatData?.userId === user.uid ? "Start a new chat?" : "Chat closed"}`,

    pending: "Awaiting chat request",
    cw: "Please select an option...",
  };

  return (
    <div className="w-full h-16 rounded-lg">
      <form
        onSubmit={(event) => {
          sendMessage(event);
        }}
        className="flex flex-row items-center px-4 py-2 mx-2 bg-background rounded-full"
      >
        <button
          type="button"
          className="flex items-center justify-center text-foreground-muted hover:text-foreground-muted-hover"
          onClick={openFileInput}
          disabled={!chatIsActive}
        >
          <PaperClipIcon className="w-6 hy-6" />
          <input
            type="file"
            accept="image/*"
            capture="environment"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
        </button>

        <div className="flex-grow ml-1">
          <div className="relative w-full">
            <Textarea
              id="message"
              name="message"
              className="flex w-full h-10 text-foreground rounded-md border-none focus:border-none active:border-none focus:ring-0 focus:outline-none"
              placeholder={placeholderMap[search?.status || "active"]}
              disabled={!chatIsActive}
              autoComplete="off"
              onKeyDown={(event) => {
                if (event.key === "Enter" && !event.shiftKey) {
                  event.preventDefault();
                  const form = event.currentTarget.form;
                  if (form) {
                    form.requestSubmit();
                  }
                }
              }}
            />
          </div>
        </div>
        <div className="ml-4">
          {search.status !== "closed" && (
            <button
              type="submit"
              className="flex items-center justify-center text-foreground-muted hover:text-foreground-muted-hover"
              disabled={!chatIsActive || isLoading}
            >
              {isLoading ? (
                <Spinner className="text-gray-400" />
              ) : (
                <PaperAirplaneIcon className="w-6 h-6 text-gray-400" />
              )}
            </button>
          )}
          {/*
          {search.status === "closed" &&
            user &&
            chatData?.userId === user.uid && (
              <button
                type="button"
                className="flex items-center justify-center text-foreground-muted hover:text-foreground-muted-hover mr-2"
                onClick={() => {
                  startCwChat(user, navigate);
                }}
              >
                <PlusIcon className="w-6 h-6 text-secondary hover:text-secondary-hover" />
              </button>
            )}
                    */}
        </div>
      </form>
    </div>
  );
}
