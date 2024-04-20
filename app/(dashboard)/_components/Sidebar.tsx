import { cn } from "@/lib/utils";
import Logo from "./Logo";
import SidebarRoutes from "./SidebarRoutes";
import { UserButton } from "@clerk/nextjs";

const Sidebar = () => {
  return (
    <div className="h-full overflow-y-auto bg-white md:rounded-3xl md:my-1 md:ml-1 flex flex-col justify-between ">
      <div className="flex flex-col ">
        {/* <div className="md:hidden flex justify-center p-6 ">
          <Logo></Logo>
        </div> */}

        <div className="flex flex-col w-full p-6">
          <SidebarRoutes
            routeNameStyle="md:items-center lg:items-stretch"
            mobile={false}
          ></SidebarRoutes>
        </div>
      </div>

      <div className="flex justify-center p-6 fixed  bottom-0 left-0">
        <div className=" sm:block md:hidden lg:block">
          <UserButton
            showName={true}
            appearance={{
              variables: {},
            }}
            afterSignOutUrl="/"
          ></UserButton>
        </div>
        <div className="sm:hidden md:block lg:hidden">
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
