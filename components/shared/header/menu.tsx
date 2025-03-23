import {EllipsisVertical, ShoppingCart, UserIcon} from 'lucide-react';
import Link from 'next/link';

import {Button} from '../../ui/button';
import {ThemeToggle} from './theme-toggle';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from '../../ui/sheet';
import {CONSTANT} from '@/lib/constant';

const Menu = () => {
  return (
    <div className="flex justify-end gap-3">
      <nav className="hidden md:flex w-full max-w-xs gap-1">
        {/*  When asChild is set to true, it will not render a default DOM element, instead cloning the part's child and passing it the props and behavior required to make it functional

        For instance we are using it to make a Link look like a Button, when it's rendered to the DOM there will only be a <a /> without a <button /> but it will look like a styled <button />
        */}
        <ThemeToggle />
        <Button asChild variant="ghost">
          <Link href={CONSTANT.PATH_ROUTE.CART}>
            <ShoppingCart />
            Cart
          </Link>
        </Button>
        <Button className="ml-2" asChild>
          <Link href={CONSTANT.PATH_ROUTE.SIGN_IN}>
            <UserIcon />
            Sign In
          </Link>
        </Button>
      </nav>
      {/* Menu for size lower than 768px */}
      <nav className="md:hidden">
        <Sheet>
          <SheetTrigger className="align-middle">
            <EllipsisVertical />
          </SheetTrigger>
          <SheetContent className="flex flex-col items-start p-5 bg-sidebar">
            <SheetTitle>Menu</SheetTitle>
            <ThemeToggle />
            <Button asChild variant="ghost">
              <Link href={CONSTANT.PATH_ROUTE.CART}>
                <ShoppingCart />
                Cart
              </Link>
            </Button>
            <Button asChild>
              <Link href={CONSTANT.PATH_ROUTE.SIGN_IN}>
                <UserIcon />
                Sign In
              </Link>
            </Button>
            {/* Put SheetDescription to surpress warning in ui console */}
            <SheetDescription />
          </SheetContent>
        </Sheet>
      </nav>
    </div>
  );
};

export {Menu};
