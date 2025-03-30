'use client';

import Link from 'next/link';
import {useActionState} from 'react'; // useFormState in React <= 18
import {useSearchParams} from 'next/navigation';
import {useFormStatus} from 'react-dom';

import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';
import {CONSTANT} from '@/lib/constant';
import {signUpUser} from '@/lib/action/user';
import {Button} from '@/components/ui/button';

const SignUpButton = () => {
  const {pending} = useFormStatus();

  return (
    <Button disabled={pending} className="w-full">
      {pending ? 'Submitting...' : 'Sign Up'}
    </Button>
  );
};

const SignUpForm = () => {
  const [data, action] = useActionState(signUpUser, {
    success: false,
    message: '',
  });

  /* Set callback url */
  const searchParams = useSearchParams();
  const callbackUrl =
    searchParams.get(CONSTANT.KEY.CALLBACK_URL) || CONSTANT.PATH_ROUTE.HOME;

  return (
    <form action={action}>
      {/* A hidden field lets web developers include data that cannot be seen or modified by users when a form is submitted (e.g, query parameters). Do not use hidden inputs as a form of security, it is still visible with dev tools */}
      <input
        type="hidden"
        name={CONSTANT.KEY.CALLBACK_URL}
        value={callbackUrl}
      />
      <div className="space-y-6">
        <div>
          <Label className="mb-2" htmlFor="name">
            Name
          </Label>
          <Input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            defaultValue={CONSTANT.SIGN_UP.DEFAULT_NAME}
            required
          />
        </div>
        <div>
          <Label className="mb-2" htmlFor="email">
            Email
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            defaultValue={CONSTANT.SIGN_UP.DEFAULT_EMAIL}
            required
          />
        </div>
        <div>
          <Label className="mb-2" htmlFor="password">
            Password
          </Label>
          <Input
            id="password"
            name="password"
            type="password"
            autoComplete="password"
            defaultValue={CONSTANT.SIGN_UP.DEFAULT_PASSWORD}
            required
          />
        </div>
        <div>
          <Label className="mb-2" htmlFor="confirmPassword">
            Confirm Password
          </Label>
          <Input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            autoComplete="confirmPassword"
            defaultValue={CONSTANT.SIGN_UP.DEFAULT_CONFIRM_PASSWORD}
            required
          />
        </div>
        <div>
          <SignUpButton />
        </div>
        {!data.success && (
          <div className="text-center text-destructive">{data.message}</div>
        )}
        <div className="text-sm text-center text-muted-foreground">
          {/* Below is equal to "Don't have an account? " */}
          Already have an account?{' '}
          <Link href={CONSTANT.PATH_ROUTE.SIGN_IN}>Sign In</Link>
        </div>
      </div>
    </form>
  );
};

export {SignUpForm};
