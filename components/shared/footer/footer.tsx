import {CONFIG} from '@/configs/config';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="border-t">
      <div className="p-5 flex-center">
        {currentYear} {CONFIG.APP.NAME}. All Rights Reserved
      </div>
    </footer>
  );
};

export {Footer};
