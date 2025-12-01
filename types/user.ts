import {z} from 'zod';
import {ERROR_MESSAGE} from '@/lib/message';

const signInSchema = z.object({
  email: z.string().email(ERROR_MESSAGE.invalidEmailFormat),
  password: z.string(),
});

const signUpSchema = z
  .object({
    name: z.string().min(3, ERROR_MESSAGE.fieldMinLength('Name', 3)),
    email: z.string().email(ERROR_MESSAGE.invalidEmailFormat),
    password: z.string().min(6, ERROR_MESSAGE.passwordTooShort(6)),
    confirmPassword: z.string(),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: ERROR_MESSAGE.passwordNotMatch,
    path: ['confirmPassword'],
  });

export {signInSchema, signUpSchema};
