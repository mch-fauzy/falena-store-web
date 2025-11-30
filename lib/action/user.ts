'use server';

import {signIn, signOut} from '@/configs/next-auth';
import {signInSchema, signUpSchema} from '@/types/user';
import {prismaClient} from '@/configs/prisma-client';
import {hashPassword} from '@/lib/password';
import {actionClient} from '@/lib/safe-action/safe-action';
import {SUCCESS_MESSAGE} from '@/lib/message';

/**
 * Sign up a new user
 * - Validates input with Zod (automatic error formatting)
 * - Creates user in database (Prisma errors handled automatically)
 * - Auto-signs in the user
 */
export const signUpUser = actionClient
  .inputSchema(signUpSchema)
  .action(async ({parsedInput}) => {
    const {name, email, password} = parsedInput;

    // Hash password
    const hashedPassword = await hashPassword({password});

    // Create user - Prisma P2002 error auto-handled
    await prismaClient.falenaUser.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    // Sign in after registration - redirect is preserved
    await signIn('credentials', {email, password});

    // Return success message
    return {
      message: SUCCESS_MESSAGE.action('Registered'),
    };
  });

/**
 * Sign in user with credentials
 */
export const signInWithCredentials = actionClient
  .inputSchema(signInSchema)
  .action(async ({parsedInput}) => {
    const {email, password} = parsedInput;

    await signIn('credentials', {email, password});

    return {
      message: SUCCESS_MESSAGE.action('Signed in'),
    };
  });

/**
 * Sign out current user
 */
export const signOutUser = async () => {
  await signOut();
};
