import { z } from "zod";

export const RegisterSchema = z.object({
  name: z.string().nonempty("Nama tidak boleh kosong"),
  email: z.string().email("Email tidak valid"),
  password: z.string().nonempty("Password tidak boleh kosong"),
});

export type RegisterSchema = z.infer<typeof RegisterSchema>;
