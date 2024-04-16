import { cn } from "@/lib/utils";
import Logo from "./Logo";
import SidebarRoutes from "./SidebarRoutes";
import { UserButton } from "@clerk/nextjs";

const Sidebar = () => {
  return (
    <div className="h-full overflow-y-auto bg-slate-200 md:rounded-3xl md:my-1 md:ml-1 shadow-sm flex flex-col justify-between">
      <div className="flex flex-col ">
        <div className="flex justify-center p-6 ">
          <Logo></Logo>
        </div>

        <div className="flex flex-col w-full px-6">
          <SidebarRoutes></SidebarRoutes>
        </div>
      </div>

      <div className="flex justify-center p-6">
        <div className="md:hidden lg:block">
          <UserButton
            showName={true}
            appearance={{
              variables: {},
            }}
            afterSignOutUrl="/"
          ></UserButton>
        </div>
        <div className="md:block lg:hidden">
          <UserButton
            appearance={{
              variables: {},
            }}
            afterSignOutUrl="/"
          ></UserButton>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
