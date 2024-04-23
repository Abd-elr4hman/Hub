import { ReactNode } from "react";
import Sidebar from "./_components/Sidebar";
import Navbar from "./_components/Navbar";

interface DashboardLayoutInterface {
  children: ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutInterface) => {
  return (
    <div className="h-full">
      <div className="  h-[80px] fixed bg-white inset-y-0 w-full z-50">
        <Navbar></Navbar>
      </div>
      <div className="hidden md:flex mt-[80px]  h-full md:w-20 lg:w-60 flex-col fixed inset-y-0 z-50">
        <Sidebar />
      </div>
      <main className="md:pl-20 lg:pl-56 h-full pt-[80px]">{children}</main>
    </div>
  );
};

export default DashboardLayout;
