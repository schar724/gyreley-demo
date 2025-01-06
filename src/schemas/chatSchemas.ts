import { z } from "zod";

export const messageSchema = z.object({
  sender: z.string(),
  text: z.string(),
  name: z.string(),
  createdAt: z.string(),
  fileUrl: z.string().optional(),
  fileName: z.string().optional(),
  fileType: z.string().optional(),
  link: z.string().optional(),
  element: z.string().optional(),
  recipient: z.string().optional(),
  read: z.boolean(),
  isCloseMessage: z.boolean().optional(),
});
