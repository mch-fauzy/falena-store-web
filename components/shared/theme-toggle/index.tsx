/*
  'use client' In order to use hooks or event hadnlers that going to be dynamic on client side, by default all components are rendered on server with Next JS
*/
'use client';

import {useTheme} from 'next-themes';
import {SunIcon, MoonIcon, SunMoon} from 'lucide-react';
import {useState, useEffect} from 'react';
import {capitalize} from 'lodash';

import {Button} from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';

const themeModes = {
  system: 'system',
  light: 'light',
  dark: 'dark',
} as const;

const getThemeIcon = (theme: string | undefined) => {
  switch (theme?.toLowerCase()) {
    case themeModes.dark:
      return <MoonIcon />;
    case themeModes.light:
      return <SunIcon />;
    default:
      return <SunMoon />;
  }
};

const ThemeToggle = () => {
  const [isMounted, setIsMounted] = useState(false);
  const {theme, setTheme} = useTheme();

  /*
    To avoid hydration error (missmatch between client and server side), so make sure that the component is mounted in client before it uses the theme or before it changes the theme
  */
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          className="focus-visible:ring-0 focus-visible:ring-offset-0"
          variant="ghost"
        >
          {getThemeIcon(theme)}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {Object.values(themeModes).map(themeMode => (
          <DropdownMenuItem
            className="default-hover"
            key={themeMode}
            onClick={() => setTheme(themeMode)}
          >
            {capitalize(themeMode)}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export {ThemeToggle};
