//import { generateProfilePhoto } from "@/utils";
//import toast from "react-hot-toast";
//import { LOGO } from "@/constants/logo";
//import {
//  ChatNotification,
//  PendingChatNotification,
//} from "@/types/notification.type";
//import { auth } from "@/lib/firebase/config";
//import { Notifications } from "@/lib/firebase/services/notifications";
//
//type ShowNotification =
//  | {
//      notification: ChatNotification;
//      type: "chat" | "pendingChatAccepted" | undefined;
//    }
//  | {
//      notification: PendingChatNotification;
//      type: "pendingChat";
//    };
//
//export const showNotification = ({ notification, type }: ShowNotification) => {
//  const user = auth.currentUser;
//  switch (type) {
//    case "chat":
//      handleShowChatNotification(notification);
//      if (user) {
//        Notifications.addUserNotification(user.uid, notification, type);
//      }
//      break;
//    case "pendingChat":
//      handleShowPendingChatNotification(notification);
//      break;
//    case "pendingChatAccepted":
//      handleShowChatNotification(notification);
//      if (user) {
//        Notifications.addUserNotification(user.uid, notification, type);
//      }
//      break;
//    default:
//      break;
//  }
//};
//
//const handleShowChatNotification = ({
//  body,
//  senderName,
//  href,
//}: ChatNotification) => {
//  let element = (
//    <a
//      style={{
//        display: "inline-block", // Necessary for width and truncation
//        textOverflow: "ellipsis",
//        whiteSpace: "nowrap",
//        overflow: "hidden", // Hides overflow content
//        maxWidth: "200px",
//      }}
//      href={href}
//    >
//      {body}
//    </a>
//  );
//
//  const src = senderName ? generateProfilePhoto(senderName) : LOGO;
//
//  toast(element, {
//    icon: <img className="w-10 h-10 rounded-full" src={src} />,
//  });
//};
//
//const handleShowPendingChatNotification = ({
//  body,
//}: PendingChatNotification) => {
//  toast.success(body);
//};
