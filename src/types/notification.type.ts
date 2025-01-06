import {
  chatNotificationSchema,
  fcmTokenEntry,
  pendingChatNotificationSchema,
} from "@/schemas/notificationSchema";
import { z } from "zod";

export type ChatNotification = z.infer<typeof chatNotificationSchema>;
export type PendingChatNotification = z.infer<
  typeof pendingChatNotificationSchema
>;

export type fcmTokenEntry = z.infer<typeof fcmTokenEntry>;
