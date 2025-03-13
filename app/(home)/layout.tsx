/* Using route group to opting specific segments into a layout and organize route without affecting URL path, in this case is for path / */

import {Footer} from '@/components/shared/footer';
import {Header} from '@/components/shared/header';

const HomeLayout = (props: Readonly<{children: React.ReactNode}>) => {
  const {children} = props;
  return (
    <div className="flex h-screen flex-col">
      <Header />
      <main className="flex-1 wrapper">{children}</main>
      <Footer />
    </div>
  );
};

export default HomeLayout;
