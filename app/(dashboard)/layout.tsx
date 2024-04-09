import { ReactNode } from "react";
import Sidebar from "./_components/Sidebar";
import Navbar from "./_components/Navbar";

interface DashboardLayoutInterface {
  children: ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutInterface) => {
  return (
    <div className="h-full">
      <div className="md:pl-56 h-[80px] fixed inset-y-0 w-full z-50">
        <Navbar></Navbar>
      </div>
      <div className="hidden md:flex h-full w-56 flex-col fixed inset-y-0 z-50">
        <Sidebar />
      </div>
      <main className="md:pl-56 h-full pt-[80px]">{children}</main>
    </div>
  );
};

export default DashboardLayout;
