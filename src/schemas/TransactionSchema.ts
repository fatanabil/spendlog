import { z } from "zod";
import { CategorySchema } from "./CategorySchema";

export const TransactionSchema = z.object({
  id: z.string(),
  userId: z.string(),
  title: z.string(),
  category: CategorySchema,
  type: z.enum(["expense", "income"]),
  amount: z.number(),
  date: z.date(),
});

export const AddTransactionSchema = z.object({
  title: z.string().nonempty("Nama transaksi masih kosong"),
  category: z.object({
    id: z.string(),
    name: z.string().nonempty("Pilih satu kategori"),
    color: z.string(),
  }),
  amount: z.number().min(1, "Jumlah transaksi masih kosong"),
});

export type Transaction = z.infer<typeof TransactionSchema>;
export type AddTransaction = z.infer<typeof AddTransactionSchema>;
