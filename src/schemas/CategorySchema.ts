import { z } from "zod";

export const CategorySchema = z.object({
  id: z.string(),
  name: z.string(),
  color: z.string(),
  type: z.string(),
});

export type Category = z.infer<typeof CategorySchema>;
