import { z } from "zod";
import { CategorySchema } from "./CategorySchema";

export const TransactionSchema = z.object({
  id: z.string(),
  userId: z.string(),
  title: z.string(),
  category: CategorySchema,
  Type: z.enum(["expense", "income"]),
  amount: z.number(),
  date: z.date(),
});

export type Transaction = z.infer<typeof TransactionSchema>;
