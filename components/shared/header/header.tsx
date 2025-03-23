import Image from 'next/image';
import Link from 'next/link';

import {CONFIG} from '@/configs/config';
import {Menu} from './menu';
import {CONSTANT} from '@/lib/constant';

const Header = () => {
  return (
    <header className="w-full border-b">
      <div className="wrapper flex-between">
        <div>
          <Link
            href={CONSTANT.PATH_ROUTE.HOME}
            className="flex-start focus-visible:ring-0 focus-visible:ring-offset-0"
          >
            <Image
              src="/images/logo.svg"
              alt={`${CONFIG.APP.NAME} Logo`}
              height={48}
              width={48}
              priority
            />
            <span className="hidden lg:block font-bold text-2xl ml-3">
              {CONFIG.APP.NAME}
            </span>
          </Link>
        </div>
        <Menu />
      </div>
    </header>
  );
};

export {Header};
