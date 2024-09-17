import { z } from "zod";

export const createUserSchema = z.object({
  body: z.object({
    username: z.string(),
    email: z.string(),
    password: z.string(),
  }),
});

export const updateUserSchema = z.object({
  params: z.object({ id: z.string() }),
  body: z
    .object({
      username: z.string(),
      email: z.string(),
      password: z.string(),
    })
    .partial(),
});
