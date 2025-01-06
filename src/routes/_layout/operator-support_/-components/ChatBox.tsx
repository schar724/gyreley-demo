import { useEffect, useRef } from "react";
import { LoadingPage } from "@/components/LoadingPage";
import Message from "./Message";
import { RenderedMessage } from "@/types/chat.type";

export default function ChatBox({
  messages,
  isLoading,
}: {
  messages: RenderedMessage[];
  isLoading: boolean;
}) {
  const scrollRef = useRef<HTMLSpanElement>(null);
  const cwOptionsRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const updateCwOptionsHeight = () => {
    if (cwOptionsRef.current && containerRef.current) {
      const height = cwOptionsRef.current.offsetHeight;
      containerRef.current.style.marginBottom = `${height}px`;
    }
  };

  // Scroll and apply bottom margin to chatbox
  useEffect(() => {
    updateCwOptionsHeight();

    scrollRef?.current?.scrollIntoView({
      block: "nearest",
      inline: "center",
      behavior: "smooth",
    });

    window.addEventListener("resize", updateCwOptionsHeight);

    return () => window.removeEventListener("resize", updateCwOptionsHeight);
  }, [messages]);

  if (isLoading) return <LoadingPage />;

  return (
    <div className={`relative flex-1 h-full overflow-auto bg-slate-100`}>
      <div
        id="container-ref"
        ref={containerRef}
        className="relative flex-1 flex-row p-4 mx-2 overflow-x-hidden"
      >
        {messages &&
          messages.map((message, index) => {
            return (
              <Message
                key={`message-${index}`}
                message={message}
                isLastMessage={index === messages.length - 1}
              />
            );
          })}
      </div>
      <span id="scroll-ref" ref={scrollRef}></span>
    </div>
  );
}
