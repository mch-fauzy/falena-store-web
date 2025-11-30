import {Metadata} from 'next';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Link from 'next/link';
import Image from 'next/image';
import {redirect} from 'next/navigation';

import {CONSTANT} from '@/lib/constant';
import {CONFIG} from '@/configs/config';

import {auth} from '@/configs/next-auth';
import {SignInFormCredentials} from '@/components/shared/sign-in/sign-in-form-credentials';

interface SignInPageProps {
  /* query params */
  searchParams: Promise<{
    callbackUrl: string;
  }>;
}

export const metadata: Metadata = {
  title: 'Sign In',
};

const SignInPage = async (props: SignInPageProps) => {
  const {callbackUrl} = await props.searchParams;

  /* If user is logged in and have session, click auth related feature will redirect to callback url (e.g, product detail, cart, etc) or home page */
  const session = await auth();
  if (session) return redirect(callbackUrl || CONSTANT.pathRoute.home);

  return (
    <div className="w-full max-w-md mx-auto">
      <Card>
        <CardHeader className="space-y-4">
          <Link href={CONSTANT.pathRoute.home} className="flex-center">
            <Image
              src="/images/logo.svg"
              width={100}
              height={100}
              alt={`${CONFIG.app.name} Logo`}
              priority
            />
          </Link>
          <CardTitle className="text-center">Sign In</CardTitle>
          <CardDescription className="text-center">
            Sign in to your account
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <SignInFormCredentials />
        </CardContent>
      </Card>
    </div>
  );
};

export default SignInPage;
