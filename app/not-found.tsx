import Image from 'next/image';
import Link from 'next/link';

import {CONFIG} from '@/configs/config';
import {Button} from '@/components/ui/button';
import {CONSTANT} from '@/lib/constant';

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Image
        src="/images/logo.svg"
        width={48}
        height={48}
        alt={`${CONFIG.app.name} Logo`}
        priority
      />
      <div className="p-4 text-center">
        <h1 className="text-3xl font-bold">404</h1>
        <p className="text-ellipsis">This page could not be found</p>
        <Button asChild variant="outline" className="mt-4 default-hover">
          <Link href={CONSTANT.pathRoute.home}>Back to Home</Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFoundPage;
