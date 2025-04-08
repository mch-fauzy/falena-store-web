'use server';

import {isRedirectError} from 'next/dist/client/components/redirect-error';

import {signIn, signOut} from '@/configs/next-auth';
import {signInSchema, signUpSchema} from '@/types/user';
import {CONSTANT} from '../constant';
import {prismaClient} from '@/configs/prisma-client';
import {hashPassword} from '../password';

/*
 * When we create the form we're going to use new react 19 hook called useActionState (previously useFormState)
 * And when you submit an action with that, The first argument is going to be the previous state
 * const [state, action] = useActionState(
    (prevState, payload) => { return new state }, --> signInWithCredentials
    initialState --> {success: false, formData: ''}
   );
 */

/* Sign in user with credentials */
const signInWithCredentials = async (
  prevState: unknown,
  formData: FormData,
) => {
  try {
    const user = signInSchema.parse({
      email: formData.get(CONSTANT.KEY.EMAIL),
      password: formData.get(CONSTANT.KEY.PASSWORD),
    });

    await signIn('credentials', user);
    return {
      success: true,
      message: 'Signed in successfully',
    };
  } catch (error) {
    if (isRedirectError(error)) throw error;

    return {
      success: false,
      message: 'Invalid email or password',
    };
  }
};

/* Sign out user */
const signOutUser = async () => {
  await signOut();
};

/* Sign up user */
const signUpUser = async (prevState: unknown, formData: FormData) => {
  try {
    const user = signUpSchema.parse({
      name: formData.get(CONSTANT.KEY.NAME),
      email: formData.get(CONSTANT.KEY.EMAIL),
      password: formData.get(CONSTANT.KEY.PASSWORD),
      confirmPassword: formData.get(CONSTANT.KEY.CONFIRM_PASSWORD),
    });
    const plainPassword = user.password;

    /* Create user */
    const hashedPassword = await hashPassword({password: user.password});
    await prismaClient.falenaUser.create({
      data: {
        name: user.name,
        email: user.email,
        password: hashedPassword,
        createdBy: user.email,
      },
    });

    /* Sign in user after register*/
    await signIn('credentials', {
      email: user.email,
      password: plainPassword,
    });

    return {
      success: true,
      message: 'User registered successfully',
    };
  } catch (error) {
    if (isRedirectError(error)) throw error;

    return {
      success: false,
      message: 'User was not registered',
    };
  }
};

export {signInWithCredentials, signOutUser, signUpUser};
