import {z} from 'zod';

import {formatToIdr} from '@/lib/format-currency';
import {FalenaProduct} from '@prisma/client';

/*
    ^ → Start of the string.
    \d+ → One or more digits (ensures at least one digit before any decimal point).
    (\.\d{2})? → An optional (?) group:
      \. → A literal dot (decimal point).
      \d{2} → Exactly two digits after the decimal point.
    $ → End of the string.
  */
const currencySchemaRule = z
  .string()
  .refine(
    value => /^\d+(\.\d{2})?$/.test(formatToIdr(Number(value))),
    'Price must have exactly two decimal places',
  );

/*
  Schema for inserting products
  price and rating are decimal type in prisma.schema, so the zod schema should be string
*/
const createProductSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  slug: z.string().min(1, 'Slug is required'),
  sku: z.string(),
  category: z.string().min(1, 'Category is required'),
  brand: z.string().min(1, 'Brand is required'),
  description: z.string().min(1, 'Description is required'),
  size: z.string().min(1, 'Size is required'),
  color: z.string().min(1, 'Color is required'),
  stock: z.number(),
  price: currencySchemaRule,
  images: z.array(z.string()).min(1, 'Product must have at least one image'),
  isFeatured: z.boolean(),
  banner: z.string().nullable(),
});

type Product = FalenaProduct;

export {createProductSchema, type Product};
