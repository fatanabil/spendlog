import { z } from "zod";

export const ApiResponseSchema = z.object({
  data: z
    .object({ accessToken: z.string().optional() })
    .passthrough()
    .nullable(),
  success: z.boolean(),
  error: z.boolean(),
  message: z.string(),
  errors: z.object({}).passthrough().nullable().optional(),
});

export interface ApiResponse<T> {
  data: T | null;
  success: boolean;
  error: boolean;
  message: string;
  errors?: Record<string, unknown> | null;
}
