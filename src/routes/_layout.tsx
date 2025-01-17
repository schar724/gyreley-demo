import { createFileRoute, redirect } from "@tanstack/react-router";
import { Outlet, useLocation } from "@tanstack/react-router";
import { useNavItems } from "./_layout/-naviagtion";
import { useAuth } from "@/context/AuthContext";
import ChatListContainer from "./_layout/-components/chatlist/ChatListContainer";
import { useState } from "react";
import Header from "./_layout/-components/Header";
import BottomNav from "./_layout/-components/BottomNav";
import SidebarNav from "./_layout/-components/SidebarNav";
import { useMobileContext } from "@/context/MobileContext";

export const Route = createFileRoute("/_layout")({
  beforeLoad: async ({ location }) => {
    if (location.pathname == "/") {
      throw redirect({
        to: "/dashboard",
      });
    }
  },
  component: Layout,
});

export default function Layout() {
  const location = useLocation();
  const isSelectedChat: boolean = !!location.search.chatId;
  const isOnOperatorSupport: boolean =
    location.pathname.includes("/operator-support");
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const { roles } = useAuth();
  const [userStatus] = useState<"online" | "offline">("online");
  const nav = roles ? useNavItems(roles) : undefined;
  const { mobile } = useMobileContext();

  return (
    <div
      className={`flex flex-col ${mobile ? "h-[calc(100dvh-4rem)] w-dvw" : "h-dvh w-[calc(100dvw)] lg:w-[calc(100dvw-4rem)]"} `}
    >
      <div className={`${mobile && isSelectedChat ? "hidden" : "block"}`}>
        <Header
          userStatus={userStatus}
          setSidebarOpen={setSidebarOpen}
          nav={nav}
        />
      </div>
      {!mobile && (
        <SidebarNav
          nav={nav}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />
      )}

      {mobile && <BottomNav nav={nav} />}

      <main
        className={`flex h-full w-full overflow-hidden lg:ml-16  ${mobile && isSelectedChat ? "mt-0" : "mt-16"}`}
      >
        {roles && roles.has("csr") ? (
          <div className="flex h-full w-full">
            <aside
              className={`${
                isOnOperatorSupport
                  ? isSelectedChat
                    ? "hidden sm:block" // Hide on mobile when chat is selected
                    : "block" // Show on mobile when no chat is selected
                  : "hidden sm:block" // Hide when not on operator support page, show on larger screens
              } px-4 py-6 overflow-y-auto border-r border-gray-200 shadow-md min-w-full sm:min-w-96 h-full sm:w-96 z-10`}
            >
              {/* Render Chat List */}
              <ChatListContainer />
            </aside>

            <div
              id="csrView"
              className={`flex-1 h-full flex flex-col ${
                isOnOperatorSupport
                  ? isSelectedChat
                    ? ""
                    : "hidden sm:block" // Show on mobile when no chat is selected
                  : "block" // Hide when not on operator support page, show on larger screens
              }`}
            >
              <Outlet />
            </div>
          </div>
        ) : (
          <div className="flex h-full w-full">
            <div id="othersView" className="flex-1 h-full flex flex-col">
              <Outlet />
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
