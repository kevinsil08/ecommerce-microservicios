import { z } from "zod";

export const createPaymentSchema = z.object({
  body: z.object({
    user_id: z.number(),
    product_id: z.number(),
    amount: z.number(),
  }),
});

export const updatePaymentSchema = z.object({
  params: z.object({ id: z.string() }),
  body: z
    .object({
      user_id: z.number(),
      product_id: z.number(),
      amount: z.number(),
    })
    .partial(),
});
