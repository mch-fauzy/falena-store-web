/*
  'use client' In order to use hooks or event hadnlers that going to be dynamic on client side, by default all components are rendered on server with Next JS
*/
'use client';

import {useTheme} from 'next-themes';
import {SunIcon, MoonIcon, SunMoon} from 'lucide-react';
import {useState, useEffect} from 'react';

import {Button} from '@/components/ui/button';

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
  const {theme, setTheme, resolvedTheme} = useTheme();

  /*
    To avoid hydration error (missmatch between client and server side), so make sure that the component is mounted in client before it uses the theme or before it changes the theme
  */
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  const currentTheme = theme === themeModes.system ? resolvedTheme : theme;

  const toggle = () => {
    const next =
      currentTheme === themeModes.dark ? themeModes.light : themeModes.dark;
    setTheme(next);
  };

  return (
    <Button
      aria-label="theme-toggle"
      className="focus-visible:ring-0 focus-visible:ring-offset-0"
      variant="ghost"
      onClick={toggle}
    >
      {getThemeIcon(theme)}
    </Button>
  );
};

export {ThemeToggle};
