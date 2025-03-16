import { z } from 'zod';

export const LoginSchema = z.object({
    email: z.string().email('Email tidak valid'),
    password: z.string(),
});

export type LoginSchema = z.infer<typeof LoginSchema>;
