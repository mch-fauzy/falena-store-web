'use client';

import Link from 'next/link';
import {useAction} from 'next-safe-action/hooks';
import {useSearchParams} from 'next/navigation';

import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';
import {CONSTANT} from '@/lib/constant';
import {signInWithCredentials} from '@/lib/action/user';
import {Button} from '@/components/ui/button';

const SignInFormCredentials = () => {
  const {execute, status, result, isPending} = useAction(signInWithCredentials);

  /* Set callback url */
  const searchParams = useSearchParams();
  const callbackUrl =
    searchParams.get(CONSTANT.key.callbackUrl) || CONSTANT.pathRoute.home;

  return (
    <form
      onSubmit={async e => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const input = Object.fromEntries(formData) as {
          email: string;
          password: string;
        };
        execute(input);
      }}
    >
      {/* A hidden field lets web developers include data that cannot be seen or modified by users when a form is submitted (e.g, query parameters). Do not use hidden inputs as a form of security, it is still visible with dev tools */}
      <input
        type="hidden"
        name={CONSTANT.key.callbackUrl}
        value={callbackUrl}
      />
      <div className="space-y-6">
        <div>
          <Label className="mb-2" htmlFor={CONSTANT.key.email}>
            Email
          </Label>
          <Input
            id={CONSTANT.key.email}
            name={CONSTANT.key.email}
            type="email"
            autoComplete={CONSTANT.key.email}
            defaultValue={CONSTANT.signIn.placeholderEmail}
            required
          />
        </div>
        <div>
          <Label className="mb-2" htmlFor={CONSTANT.key.password}>
            Password
          </Label>
          <Input
            id={CONSTANT.key.password}
            name={CONSTANT.key.password}
            type="password"
            autoComplete={CONSTANT.key.password}
            defaultValue={CONSTANT.signIn.placeholderPassword}
            required
          />
        </div>
        <div>
          <Button
            disabled={isPending || status === 'hasNavigated'}
            className="w-full"
          >
            {status === 'hasNavigated'
              ? 'Redirecting...'
              : isPending
                ? 'Signing In...'
                : 'Sign In'}
          </Button>
        </div>
        {/* Server error (Prisma, business logic, authentication) */}
        {result?.serverError && (
          <div className="text-center text-destructive">
            {result.serverError}
          </div>
        )}
        {/* Field-level validation errors */}
        {result?.validationErrors && (
          <div className="space-y-1">
            {Object.entries(result.validationErrors).map(([field, error]) => (
              <div key={field} className="text-sm text-destructive">
                {Array.isArray(error)
                  ? error.join(', ')
                  : error?._errors?.join(', ') || 'Invalid value'}
              </div>
            ))}
          </div>
        )}
        <div className="text-sm text-center text-muted-foreground">
          {/* Below is equal to "Don't have an account? " */}
          Don&apos;t have an account?{' '}
          <Link href={CONSTANT.pathRoute.signUp}>Sign Up</Link>
        </div>
      </div>
    </form>
  );
};

export {SignInFormCredentials};
