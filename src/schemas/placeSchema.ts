import { z, ZodSchema } from "zod";

export const placeSchema: ZodSchema = z.object({
  foramttedAddress: z.string(),
  placeId: z.string(),
  url: z.string(),
  lat: z.number(),
  lng: z.number(),
});
