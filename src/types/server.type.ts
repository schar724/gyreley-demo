import {
  chatNotificationRequestSchema,
  chatNotificationResponseSchema,
  pendingChatReponseSchema,
} from "@/schemas/serverSchemas";
import { z } from "zod";

export type ChatNotificationRequest = z.infer<
  typeof chatNotificationRequestSchema
>;

export type ChatNotificationResponse = z.infer<
  typeof chatNotificationResponseSchema
>;

export type PendingChatNotificationResponse = z.infer<
  typeof pendingChatReponseSchema
>;
