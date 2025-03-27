/* Using route group to opting specific segments into a layout and organize route without affecting URL path, in this case is for path /sign-in */

const AuthLayout = (props: Readonly<{children: React.ReactNode}>) => {
  const {children} = props;
  return (
    <div className="flex-center h-screen max-w-[1440px] mx-auto">
      {children}
    </div>
  );
};

export default AuthLayout;
