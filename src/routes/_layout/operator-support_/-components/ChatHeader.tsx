import { cn, generateProfilePhoto } from "@/utils";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { Link, useLoaderData } from "@tanstack/react-router";
import { useState } from "react";
import { Route } from "../index";
import { useAuth } from "@/context/AuthContext";
import { ChatObject } from "@/types/chat.type";

export default function ChatHeader() {
  const chatData: ChatObject = useLoaderData({ from: Route.id });
  const [recipientStatus] = useState<"online" | "offline">("online");
  const { user } = useAuth();

  let recipient;
  let recipientType: "user" | "csr";
  if (chatData && chatData.user.uid === user?.uid) {
    recipient = chatData.csr;
    recipientType = "csr";
  } else {
    recipient = chatData.user;
    recipientType = "user";
  }

  return (
    <div
      className="flex items-center w-full px-6 py-8 shadow-md h-15 bg-background"
      style={{ height: "50px" }}
    >
      <div className="flex items-center w-full">
        <div className={"justify-center align-middle mr-4"}>
          <Link
            to="/operator-support"
            search={{ chatId: undefined }}
            className="mb-4 text-foreground-muted sm:hidden"
          >
            <ArrowLeftIcon className="h-6 w-6" />
          </Link>
        </div>

        <span className="relative flex-shrink-0 inline-block">
          <img
            className="w-10 h-10 rounded-full"
            src={generateProfilePhoto(`${recipient.firstName}`)}
            alt=""
          />
          <span
            className={cn(
              recipientStatus === "online" ? "bg-emerald-600" : "bg-gray-300",
              "absolute top-0 right-0 block h-2.5 w-2.5 rounded-full ring-2 ring-white",
            )}
            aria-hidden="true"
          />
        </span>
        <div className="ml-4 truncate">
          <h3 className="text-sm font-medium text-foreground truncate">
            {`${recipient.firstName} ${recipient.lastName}`}
          </h3>
          <p className="text-sm text-foreground-muted truncate">
            {recipientType === "csr" ? "Gyreley" : chatData.userClient.name}
          </p>
        </div>
      </div>
    </div>
  );
}
