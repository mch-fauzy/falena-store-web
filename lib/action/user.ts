'use server';

import {isRedirectError} from 'next/dist/client/components/redirect-error';

import {signIn, signOut} from '@/configs/next-auth';
import {signInSchema} from '@/types/user';
import {CONSTANT} from '../constant';

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
  prevState: {success: boolean; message: string},
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

const signOutUser = async () => {
  await signOut();
};

export {signInWithCredentials, signOutUser};
