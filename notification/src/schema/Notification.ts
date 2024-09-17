import { z } from "zod";

export const createNotificationSchema = z.object({
  body: z.object({
    name: z.string(),
    description: z.string(),
    price: z.number(),
    stock_quantity: z.number(),
  }),
});

export const updateNotificationSchema = z.object({
  params: z.object({ id: z.string() }),
  body: z
    .object({
        name: z.string(),
        description: z.string(),
        price: z.number(),
        stock_quantity: z.number(),
    })
    .partial(),
});
