import {ShoppingCart, UserIcon} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import {Button} from '@/components/ui/button';
import {CONFIG} from '@/configs/config';
import {ThemeToggle} from '@/components/shared/theme-toggle';

const Header = () => {
  return (
    <header className="w-full border-b">
      <div className="wrapper flex-between">
        <div>
          <Link href="/" className="flex-start">
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

        {/*  When asChild is set to true, it will not render a default DOM element, instead cloning the part's child and passing it the props and behavior required to make it functional

        For instance we are using it to make a Link look like a Button, when it's rendered to the DOM there will only be a <a /> without a <button /> but it will look like a styled <button />
        */}
        <div className="space-x-0">
          <ThemeToggle />
          <Button asChild variant="ghost">
            <Link href="/cart">
              <ShoppingCart />
              Cart
            </Link>
          </Button>
          <Button className="highlight-btn ml-2" asChild variant="ghost">
            <Link href="/sign-in">
              <UserIcon />
              Sign In
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
};

export {Header};
