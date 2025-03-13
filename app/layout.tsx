/* This is the layout that surrounds whatever page you're, you're viewing */

import type {Metadata} from 'next';
import {Inter} from 'next/font/google';
import {ThemeProvider} from 'next-themes';

import '@/assets/styles/globals.css';
import {CONFIG} from '@/configs/config';

const interFont = Inter({subsets: ['latin']});

const metadata: Metadata = {
  title: {
    template: '%s',
    default: CONFIG.APP.NAME,
  },
  description: CONFIG.APP.DESCRIPTION,
  metadataBase: new URL(CONFIG.APP.URL),
};

const RootLayout = (props: Readonly<{children: React.ReactNode}>) => {
  const {children} = props;
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${interFont.className} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
};

export {metadata};
export default RootLayout;
