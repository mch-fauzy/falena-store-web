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
import {SignUpForm} from '@/components/shared/sign-up/sign-up-form';

interface SignUpPageProps {
  /* query params */
  searchParams: Promise<{
    callbackUrl: string;
  }>;
}

export const metadata: Metadata = {
  title: 'Sign Up',
};

const SignUpPage = async (props: SignUpPageProps) => {
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
          <CardTitle className="text-center">Sign Up</CardTitle>
          <CardDescription className="text-center">
            Enter your information below to sign up
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <SignUpForm />
        </CardContent>
      </Card>
    </div>
  );
};

export default SignUpPage;
