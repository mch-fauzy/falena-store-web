import Link from 'next/link';

import {auth} from '@/configs/next-auth';
import {signOutUser} from '@/lib/action/user';
import {Button} from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {CONSTANT} from '@/lib/constant';
import {UserIcon} from 'lucide-react';

/* User sign in and sign out button*/
const UserButton = async () => {
  /* If not logged in then return the sign in button */
  const session = await auth();
  if (!session) {
    return (
      <Button asChild>
        <Link href={CONSTANT.PATH_ROUTE.SIGN_IN}>
          <UserIcon />
          Sign In
        </Link>
      </Button>
    );
  }

  const firstInitial = session.user?.name?.charAt(0).toUpperCase() ?? '';
  return (
    <div className="flex gap-2 items-center">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="flex items-center">
            <Button
              variant={'ghost'}
              className="relative w-8 h-8 rounded-full ml-2 flex-center bg-primary text-primary-foreground"
            >
              {firstInitial}
            </Button>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="w-56 bg-sidebar-accent"
          align="end"
          forceMount
        >
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <div className="text-sm font-medium leading-none">
                {session.user?.name}
              </div>
              <div className="text-sm text-muted-foreground leading-none">
                {session.user?.email}
              </div>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuItem asChild>
            {/* <form action={signOutUser} className="w-full"> */}
            <Button
              className="w-full py-2 px-2 justify-start default-hover"
              variant={'ghost'}
              onClick={signOutUser}
            >
              Sign Out
            </Button>
            {/* </form> */}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export {UserButton};
