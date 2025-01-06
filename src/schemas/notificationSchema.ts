import { z } from "zod";

export const chatNotificationSchema = z.object({
  senderName: z.string(),
  body: z.string(),
  href: z.string(),
  messageKey: z.string().optional(),
  chatId: z.string().optional(),
});

export const pendingChatNotificationSchema = z.object({
  title: z.string(),
  body: z.string(),
  href: z.string(),
});

export const fcmTokenEntry = z.object({
  device: z.string(),
  fcmToken: z.string(),
  timeStamp: z.string(),
});
