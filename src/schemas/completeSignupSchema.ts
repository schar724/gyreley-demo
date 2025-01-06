import { z } from "zod";

// Define Zod schema for form validation
export const completeSignupSchema = z
  .object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
    confirmPassword: z
      .string()
      .min(6, "Password must be at least 6 characters long"),
  })
  .refine((data) => data.password == data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
