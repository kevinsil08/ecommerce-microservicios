import { z } from "zod";

export const createProductSchema = z.object({
  body: z.object({
    name: z.string(),
    description: z.string(),
    price: z.number(),
    stock_quantity: z.number(),
  }),
});

export const updateProductSchema = z.object({
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
