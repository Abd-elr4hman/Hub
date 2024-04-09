import React, { ReactNode } from "react";

interface AuthLayoutInterface {
  children: ReactNode;
}
const AuthLayout = ({ children }: AuthLayoutInterface) => {
  return (
    <div className="h-screen flex items-center justify-center">{children}</div>
  );
};

export default AuthLayout;
