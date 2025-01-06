//import { Chats } from "@/lib/firebase/services/chats";
//import { ChatType, Message } from "@/types/chat.type";
//import { RefObject, useMemo, useRef, useState } from "react";
//import { BOT } from "../-Bot";
//import Button from "@/components/Button";
//import { useNavigate, useSearch } from "@tanstack/react-router";
//import { Route } from "../index";
//import { useAuth } from "@/context/AuthContext";
//import { steps } from "./-steps.ts";
//import { handleAsyncServerAction } from "@/lib/firebase/services/util.ts";
//import { CWID } from "@/constants/localStorageKeys.ts";
//import { startCwChat } from "./UserHelpScreen.tsx";
//import { PendingChatExistsError } from "@/errors/PendingChatExistsError.ts";
//import { crawlDesc, crawlSetup } from "./crawlers.tsx";
//import { onValue } from "firebase/database";
//import { getChatRef } from "@/lib/firebase/services/refs.ts";
//
//type ChatWizardProps = {
//  optionsRef: RefObject<HTMLDivElement>;
//};
//
//export default function ChatWizard({ optionsRef }: ChatWizardProps) {
//  const { user } = useAuth();
//  const [currentStepId, setCurrentStepId] = useState<number>(() =>
//    parseInt(localStorage.getItem(CWID) || "0", 10),
//  );
//  const isFirstRender = useRef(true);
//  const search = useSearch({ from: Route.id });
//  const currentStep = steps[currentStepId];
//  const navigate = useNavigate({ from: "/operator-support" });
//
//  async function sendBotMessage({
//    message,
//    link = null,
//    status = "cw",
//    element = null,
//    isCloseMessage = false,
//    read = true,
//    notifiable = false,
//  }: {
//    message: string | undefined;
//    link?: string | null;
//    status?: ChatType;
//    element?: string | null;
//    isCloseMessage?: boolean;
//    read?: boolean;
//    notifiable?: boolean;
//  }) {
//    if (search.chatId && message) {
//      const messageData: Message = {
//        text: message,
//        sender: BOT.uid,
//        createdAt: new Date().toISOString(),
//        name: `${BOT.firstName}` || "BOT",
//        read: read,
//      };
//
//      if (!!link) {
//        messageData.link = link;
//      }
//
//      if (element) {
//        messageData.element = element;
//      }
//
//      if (isCloseMessage) {
//        messageData.isCloseMessage = isCloseMessage;
//      }
//
//      await Chats.sendMessage(messageData, search.chatId, status, notifiable);
//    }
//  }
//
//  const handleUserInput = async (
//    label: string,
//    nextStepId?: number,
//    link?: string,
//    onSelect?: string,
//    onCrawl?: string,
//  ) => {
//    if (search.chatId && link !== "#noSend") {
//      const userMessage: Message = {
//        createdAt: new Date().toISOString(),
//        name: `${user?.firstName} ${user?.lastName}`,
//        sender: user?.uid || "213",
//        text: label,
//        read: true,
//      };
//
//      await Chats.sendMessage(userMessage, search.chatId, "cw", false);
//    }
//
//    if (nextStepId !== undefined) {
//      setCurrentStepId(nextStepId);
//    }
//
//    if (onCrawl && link) {
//      onCrawlMap[onCrawl](link);
//    }
//
//    if (link && link !== "#noSend") {
//      await sendBotMessage({
//        message: "You can find more information here: ",
//        link: `<a href="${location.protocol}//${location.host}/help/pfmanual/${link}">${label}</a>`,
//      });
//    }
//
//    if (onSelect) {
//      onSelectMap[onSelect]();
//    }
//  };
//
//  type fnMap = {
//    [key: string]: () => void;
//  };
//
//  type crawlMap = {
//    [key: string]: (link: string) => Promise<void>;
//  };
//
//  const onCrawlMap: crawlMap = {
//    desc: async (link: string) => {
//      const info = crawlDesc(link);
//      if (info) {
//        await sendBotMessage({
//          message: "This is what I found: ",
//          element: info.el,
//        });
//      }
//    },
//    setup: async (link: string) => {
//      const info = crawlSetup(link);
//
//      if (info) {
//        await sendBotMessage({
//          message: "This is what I found: ",
//          element: info.instructions,
//        });
//      }
//    },
//  };
//
//  const onSelectMap: fnMap = {
//    sendRequest: async () => {
//      if (search.chatId) {
//        await handleAsyncServerAction(
//          "Sending chat request",
//          () => Chats.sendChatRequest(search?.chatId, user?.uid),
//          {
//            onSuccessAsync: async () => {
//              await sendBotMessage({
//                message:
//                  "I have sent a chat request to the first available CSR, you will receive a notification when the chat is available",
//                status: "pending",
//              });
//
//              if (search.chatId) {
//                navigate({
//                  search: { chatId: search.chatId, status: "pending" },
//                });
//                const chatId = search.chatId;
//
//                // Set up a 5-minute timer (300000 ms)
//                const timeoutId = setTimeout(async () => {
//                  unsubscribe();
//                  await sendBotMessage({
//                    message:
//                      "Our customer service agents are currently busy, we will have an agent contact you shortly",
//                    status: "pending",
//                    read: false,
//                    notifiable: true,
//                  });
//                  // await sendPendingChatTimeoutEmail({
//                  //   requestor: `${user?.firstName} ${user?.lastName}`,
//                  // });
//                  // console.log(
//                  //   "Unsubscribed and email sent after 5 minutes of inactivity.",
//                  // );
//                }, 300000);
//
//                const unsubscribe = onValue(
//                  getChatRef(chatId, "pending"),
//                  (snapshot) => {
//                    if (!snapshot.exists()) {
//                      clearTimeout(timeoutId);
//                      localStorage.removeItem(CWID);
//                      if (window.location.search.includes(chatId)) {
//                        navigate({
//                          search: { chatId: search.chatId, status: "active" },
//                        });
//                      }
//
//                      // Unsubscribe from the listener after it has executed
//                      unsubscribe();
//                    }
//                  },
//                );
//              }
//            },
//            onErrorAsync: async (error) => {
//              if (error instanceof PendingChatExistsError) {
//                await sendBotMessage({
//                  message:
//                    "A chat request is already in progress. Please wait for the first available CSR",
//                });
//              }
//            },
//          },
//        );
//      }
//    },
//    closeChat: async () => {
//      if (search.chatId && search.status && user) {
//        await sendBotMessage({
//          message:
//            "Thank you for using Soinas Chat Wizard, this chat is now closed",
//          isCloseMessage: true,
//        });
//
//        await handleAsyncServerAction(
//          "Closing chat",
//          () => Chats.closeChat(search?.chatId, user, search?.status),
//          {
//            onSuccess: () => {
//              localStorage.removeItem(CWID);
//              navigate({
//                search: { chatId: search.chatId, status: "closed" },
//              });
//            },
//          },
//        );
//      }
//    },
//    startChat: async () => {
//      if (user) {
//        localStorage.removeItem(CWID);
//        await startCwChat(user, navigate);
//      }
//    },
//    back: () => {
//      localStorage.removeItem(CWID);
//      navigate({
//        to: "/operator-support",
//        search: { chatId: undefined, status: undefined },
//      });
//    },
//    crawlDesc: () => {},
//  };
//
//  async function handleStepChange(currentStepId: number) {
//    if (isFirstRender.current) {
//      if (!localStorage.getItem(CWID)) {
//        localStorage.setItem(CWID, currentStepId.toString());
//        sendBotMessage({ message: currentStep.question });
//      }
//      if (localStorage.getItem(CWID) === "7") {
//        setCurrentStepId(0);
//      }
//      isFirstRender.current = false;
//      return;
//    }
//
//    localStorage.setItem(CWID, currentStepId.toString());
//    if (currentStepId !== null && currentStep) {
//      await sendBotMessage({ message: currentStep.question });
//    }
//  }
//
//  useMemo(() => {
//    handleStepChange(currentStepId);
//  }, [currentStepId]);
//
//  return (
//    <div className="flex">
//      <div
//        id="chat-wizard"
//        ref={optionsRef}
//        className={`fixed right-2 bottom-32 z-10 ml-auto bg-slate-100 rounded-xl p-3 shadow my-2 ${currentStep.options.length > 4 ? "" : "max-w-[60%] md:max-w-[40%]"}`}
//      >
//        {currentStep && (
//          <div
//            className={`options right-0 ${
//              currentStep.options.length > 4
//                ? "grid grid-cols-2 gap-2"
//                : "flex flex-col"
//            }`}
//          >
//            {currentStep.options.map((option) => (
//              <Button
//                className="m-0.5"
//                type="button"
//                key={option.label}
//                label={option.label}
//                onClick={() =>
//                  handleUserInput(
//                    option.label,
//                    option.nextStepId,
//                    option.link,
//                    option.onSelect,
//                    option.onCrawl,
//                  )
//                }
//              />
//            ))}
//          </div>
//        )}
//      </div>
//    </div>
//  );
//}
