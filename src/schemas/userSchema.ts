import { z } from "zod";
import { roleArraySchema } from "./roleSchema";

export const userSchema = z.object({
  firstName: z.string().min(1, "User must have a first name"),
  lastName: z.string().min(1, "User must have a last name"),
  email: z.string().email("Invalid email address"),
  phoneNumber: z
    .string()
    .refine(
      (value) => {
        // Regular expression to validate either 10 digits or +1 followed by 10 digits
        const phoneRegex = /^(\+1)?\d{10}$/;
        return phoneRegex.test(value);
      },
      {
        message: "Phone number must be 10 digits, optionally prefixed by +1",
        path: ["phoneNumber"],
      },
    ),
  clientId: z.string().min(1, "User must have a clientId"),
  roles: roleArraySchema,
  authStatus: z.enum(["active", "pending", "locked"]),
  uid: z.string(),
  imageUrl: z.string().optional(),
  lastActive: z.string().optional(),
  status: z.enum(["online", "offline"]).optional(),
});
