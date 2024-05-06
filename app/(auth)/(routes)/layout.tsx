import React, { ReactNode } from "react";

interface AuthLayoutInterface {
  children: ReactNode;
}
const AuthLayout = ({ children }: AuthLayoutInterface) => {
  return (
    <div
      className="bg-gradient-to-r from-slate-500  ..."
      style={{
        backgroundImage: `url('/image.png')`,
      }}
    >
      <div className="h-screen flex items-center justify-center ">
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
