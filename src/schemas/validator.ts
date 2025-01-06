import { ZodError, ZodSchema } from "zod";
import { userSchema } from "./userSchema";
import { placeSchema } from "./placeSchema";
import { clientSchema } from "./clientSchema";
import { roleEnumSchema } from "./roleSchema";

/**
 * Validates data against a Zod schema and provides detailed error information.
 *
 * @param data - The data to validate.
 * @param schema - The Zod schema to validate the data against.
 * @param typeName - A string representing the name of the type for error logging context.
 * @param logErrors - Optionally log errors to the console (default: true).
 * @returns ValidationResult - Object containing success flag and optional error details.
 */
export function validator(
  data: unknown,
  schema: ZodSchema,
  typeName: string,
  logErrors: boolean = true,
): boolean {
  try {
    schema.parse(data);
    return true; // Data is valid
  } catch (e) {
    const errorMessages: string[] = [];

    if (e instanceof ZodError) {
      errorMessages.push(
        ...e.errors.map((err) => `${err.path.join(".")} - ${err.message}`),
      );
    } else {
      errorMessages.push(String(e));
    }

    if (logErrors) {
      console.error(
        `${typeName} validation failed:`,
        errorMessages,
        `data:`,
        data,
      );
    }

    return false;
  }
}

export function isUser(data: unknown): boolean {
  return validator(data, userSchema, "User");
}

export function isPlace(data: unknown): boolean {
  return validator(data, placeSchema, "Place");
}

export function isClient(data: unknown): boolean {
  return validator(data, clientSchema, "Client");
}

export function isRole(data: unknown): boolean {
  return validator(data, roleEnumSchema, "Role");
}
