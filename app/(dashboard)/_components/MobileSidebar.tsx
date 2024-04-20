import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Sidebar from "./Sidebar";
import Logo from "./Logo";
import SidebarRoutes from "./SidebarRoutes";
import { UserButton } from "@clerk/nextjs";

const MobileSidebar = () => {
  return (
    <Sheet>
      <SheetTrigger className="md:hidden pr-4 hover:opacity-75 transition">
        <Menu></Menu>
      </SheetTrigger>
      <SheetContent side="left" className="p-1 w-72">
        <div className="h-full overflow-y-auto bg-white md:rounded-3xl md:my-1 md:ml-1 flex flex-col justify-between ">
          <div className="flex flex-col ">
            <div className=" flex justify-center p-6 ">
              <Logo></Logo>
            </div>

            <div className="flex flex-col w-full p-6">
              <SidebarRoutes
                routeNameStyle="lg:items-stretch"
                mobile={true}
              ></SidebarRoutes>
            </div>
          </div>

          <div className="flex justify-center p-6">
            <div className="">
              <UserButton
                showName={true}
                appearance={{
                  variables: {},
                }}
                afterSignOutUrl="/"
              ></UserButton>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileSidebar;
