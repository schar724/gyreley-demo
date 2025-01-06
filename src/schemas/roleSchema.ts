import { z } from "zod";

// Define a schema for a single role using z.enum
export const roleEnumSchema = z.enum([
  "sysAdmin",
  "clientAdmin",
  "csr",
  "user",
]);

// Define a schema for an array of roles
export const roleArraySchema = z.array(roleEnumSchema);
