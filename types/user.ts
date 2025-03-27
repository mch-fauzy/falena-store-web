import {FalenaUser} from '@prisma/client';
import {z} from 'zod';

const signInSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must at least 6 characters'),
});

type User = FalenaUser;

export {signInSchema, type User};
