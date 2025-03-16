import { z } from "zod";

export const LoginSchema = z.object({
  email: z
    .string()
    .nonempty("Email tidak boleh kosong")
    .email("Email tidak valid"),
  password: z.string().nonempty("Password tidak boleh kosong"),
});

export type LoginSchema = z.infer<typeof LoginSchema>;
