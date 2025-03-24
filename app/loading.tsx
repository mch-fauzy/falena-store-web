import Image from 'next/image';

import loader from '@/assets/loader.gif';

const LoadingPage = () => {
  return (
    /* flex-center defined in /assets/styles/globals.css */
    <div className="flex-center h-screen w-screen">
      <Image
        src={loader}
        height={158}
        width={158}
        alt="Loading..."
        unoptimized
      />
    </div>
  );
};

export default LoadingPage;
