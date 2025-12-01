import {z} from 'zod';

import {ERROR_MESSAGE} from '@/lib/message';
import {REGEX} from '@/lib/regex';

/*
  Schema for inserting products
  price and rating are decimal type in prisma.schema, so the zod schema should be string
*/
const createProductSchema = z.object({
  name: z.string().min(1, ERROR_MESSAGE.fieldRequiredWithName('Name')),
  slug: z.string().min(1, ERROR_MESSAGE.fieldRequiredWithName('Slug')),
  sku: z.string(),
  category: z.string().min(1, ERROR_MESSAGE.fieldRequiredWithName('Category')),
  brand: z.string().min(1, ERROR_MESSAGE.fieldRequiredWithName('Brand')),
  description: z
    .string()
    .min(1, ERROR_MESSAGE.fieldRequiredWithName('Description')),
  size: z.string().min(1, ERROR_MESSAGE.fieldRequiredWithName('Size')),
  color: z.string().min(1, ERROR_MESSAGE.fieldRequiredWithName('Color')),
  stock: z.number(),
  price: z
    .string()
    .regex(REGEX.digitsOnly, ERROR_MESSAGE.fieldMustBePositive('Price')),
  images: z
    .array(z.string())
    .min(1, ERROR_MESSAGE.fieldArrayMinLength('Product images', 1)),
  isFeatured: z.boolean(),
  banner: z.string().nullable(),
});

export {createProductSchema};
