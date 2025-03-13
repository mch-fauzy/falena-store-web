import Image from 'next/image';
import Link from 'next/link';

import {CONFIG} from '@/configs/config';
import {Button} from '@/components/ui/button';

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Image
        src="/images/logo.svg"
        width={48}
        height={48}
        alt={`${CONFIG.APP.NAME} Logo`}
        priority
      />
      <div className="p-6 text-center">
        <h1 className="text-3xl font-bold mb-4">Not Found</h1>
        <p className="text-ellipsis">Could not find requested page</p>
        <Button
          asChild
          variant="outline"
          className="mt-4 hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          <Link href="/">Back to Home</Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFoundPage;
