import { z } from "zod";

export const chatNotificationResponseSchema = z.object({
  fcmOptions: z.object({
    link: z.string(),
  }),
  notification: z.object({
    body: z.string(),
    icon: z.string(),
    image: z.string(),
    title: z.string(),
  }),
  data: z
    .object({
      senderName: z.string(),
      messageKey: z.string().optional(),
      chatId: z.string(),
    })
    .optional(),
});

export const chatNotificationRequestSchema = z.object({
  recipient: z.string(),
  body: z.string(),
  chatId: z.string(),
  senderName: z.string(),
  status: z.enum(["active", "pending", "closed", "cw"]),
  url: z.string(),
  messageKey: z.string().optional(),
});

export const pendingChatReponseSchema = z.object({
  title: z.string(),
  body: z.string(),
  url: z.string(),
});
