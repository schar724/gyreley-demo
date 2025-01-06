import { z, ZodSchema } from "zod";

export const clientSchema: ZodSchema = z.object({
  name: z.string().min(1, "Client must have a name"),
  location: z.object({
    formattedAddress: z.string(),
    placeId: z.string(),
    url: z.string(),
    lat: z.number(),
    lng: z.number(),
  }),
  clientId: z.string(),
});
