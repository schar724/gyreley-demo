import { useAuth } from "@/context/AuthContext";
import { RenderedMessage } from "@/types/chat.type";
import { cn, formatDate } from "@/utils";
import { useState } from "react";
import Icon from "@/components/Icon";
import { CheckIcon } from "@heroicons/react/24/outline";
import { BOT } from "../-Bot";

type MessageProps = {
  message: RenderedMessage;
  isLastMessage: boolean;
};

export default function Message({ message, isLastMessage }: MessageProps) {
  const { user } = useAuth();
  const [read] = useState<boolean>(message.read);

  //useEffect(() => {
  //  const isCurrentUserSender = user?.uid === message.sender;
  //  const isMessageAlreadyRead = message.read || read;
  //  const hasRequiredParams = status && message.key && chatId;
  //  const isRecipient = user?.uid === message.recipient;

  //  if (isCurrentUserSender || isMessageAlreadyRead || !hasRequiredParams)
  //    return;

  //  const markAsRead = () => {
  //    if (isRecipient && !read && message.key) {
  //      const isBotCloseMessage =
  //        message.sender === BOT.uid && message.isCloseMessage;

  //      if (isBotCloseMessage) return;

  //      Chats.readLastMessage(chatId, message.key, status);
  //      setRead(true);

  //      if (message.isCloseMessage) {
  //        navigate({ search: { chatId, status: "closed" } });
  //      }
  //    }
  //  };

  //  if (document.hasFocus()) {
  //    markAsRead();
  //  }

  //  const handleFocus = () => {
  //    console.log("handle focus");
  //    markAsRead();
  //  };

  //  window.addEventListener("focus", handleFocus);

  //  return () => {
  //    setRead(false);
  //    window.removeEventListener("focus", handleFocus);
  //  };
  //}, [user, message, read]);

  //useEffect(() => {
  //  try {
  //    if (!chatId) return;
  //    if (isLastMessage && user?.uid === message.sender) {
  //      const unsubscribe = onValue(
  //        ref(db, `messages/${chatId}/${message.key}`),
  //        (snapshot) => {
  //          const lastMessage = snapshot.val();
  //          if (lastMessage?.read) {
  //            setRead(true);
  //          }
  //        },
  //      );

  //      return () => {
  //        unsubscribe();
  //      };
  //    }
  //  } catch (error) {
  //    console.error(error);
  //  }
  //}, []);

  //function renderFile(filePath: string, fileType: string, fileName: string) {
  //  const [fileUrl, setFileUrl] = useState<string | null>(null);
  //  const [isLoading, setIsLoading] = useState<boolean>(true);

  //  const handleLoad = () => setIsLoading(false);
  //  const handleError = () => setIsLoading(false);

  //   Fetch the file URL from Firebase Storage if necessary
  //  useEffect(() => {
  //    const fetchFileUrl = async () => {
  //      try {
  //        const storage = getStorage();
  //        const fileRef = sRef(storage, filePath);
  //        const url = await getDownloadURL(fileRef); // Fetch the download URL
  //        setFileUrl(url); // Set the fetched URL to state
  //      } catch (error) {
  //        console.error(
  //          "Failed to fetch file URL from Firebase Storage",
  //          error,
  //        );
  //        setFileUrl(null); // Handle error
  //      }
  //    };
  //    fetchFileUrl();
  //  }, [filePath]);

  //  if (!fileUrl) {
  //    return <p className="text-red-500">Error loading file</p>; // Handle error state
  //  }

  //  if (fileType.startsWith("image/")) {
  //    return (
  //      <div className="relative mt-2">
  //        {isLoading && <Spinner className="w-5 h-5 text-slate-300" />}
  //        <img
  //          src={fileUrl}
  //          alt="Attachment"
  //          className={`h-auto max-w-full rounded ${isLoading ? "hidden" : "block"}`}
  //          onLoad={handleLoad}
  //          onError={handleError}
  //        />
  //      </div>
  //    );
  //  } else if (fileType === "application/pdf") {
  //    return (
  //      <div className="relative mt-2">
  //        {isLoading && <Spinner className="w-5 h-5 text-slate-300" />}
  //        <iframe
  //          src={fileUrl}
  //          className={`w-full h-64 border-0 ${isLoading ? "hidden" : "block"}`}
  //          title="PDF Attachment"
  //          onLoad={handleLoad}
  //          onError={handleError}
  //        ></iframe>
  //      </div>
  //    );
  //  } else {
  //    return (
  //      <a
  //        href={fileUrl}
  //        download={fileName}
  //        target="_blank"
  //        rel="noopener noreferrer"
  //        className="mt-2 text-blue-500 underline"
  //      >
  //        Download attachment
  //      </a>
  //    );
  //  }
  //}

  const messageContent = (
    <div
      className={cn(
        `relative max-w-[85%] sm:max-w-[70%] md:max-w-[60%] lg:max-w-[45%] xl:max-w-[40%] rounded-xl p-3 shadow break-words`,
        user && user.uid === message.sender
          ? "bg-tertiary text-tertiary-foreground justify-end"
          : "bg-gray-300 text-black justify-start",
        message.sender === BOT.uid ? "bg-gray-200" : "",
      )}
      style={{ wordBreak: "break-word" }}
    >
      {user?.uid !== message.sender && (
        <p className="font-semibold text-sm">{message.name}</p>
      )}
      {/*
      {message.fileUrl &&
        message.fileType &&
        message.fileName &&
        renderFile(message.fileUrl, message.fileType, message.fileName)}
            */}

      <p className="mt-2">{message.text}</p>
      {message.element && (
        <div
          className="mt-2"
          dangerouslySetInnerHTML={{ __html: message.element }}
        />
      )}
      {message.link && (
        <p
          className="text-secondary hover:text-secondary-hover"
          dangerouslySetInnerHTML={{
            __html: message.link,
          }}
        ></p>
      )}
      <div className="flex items-center justify-between mt-2">
        <p className="text-xs font-thin">{formatDate(message.createdAt)}</p>
        {message.sender === user?.uid && isLastMessage && (
          <Icon
            icon={CheckIcon}
            className={`ml-3 w-4 h-4 ${read ? "text-red" : "text-black"}`}
          />
        )}
      </div>
    </div>
  );

  const messageWrapperClass = cn(
    "relative flex items-end my-2",
    user && user.uid === message.sender ? "justify-end" : "justify-start",
  );

  return message.fileUrl && message.fileType && message.fileName ? (
    <a
      id="message"
      href={message.fileUrl}
      download={message.fileName}
      target="_blank"
      rel="noopener noreferrer"
      className={messageWrapperClass}
    >
      {messageContent}
    </a>
  ) : (
    <div id="message" className={messageWrapperClass}>
      {messageContent}
    </div>
  );
}
