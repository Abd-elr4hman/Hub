import Logo from "./Logo";
import SidebarRoutes from "./SidebarRoutes";
import { UserButton } from "@clerk/nextjs";

const Sidebar = () => {
  return (
    <div className="h-full border-r overflow-y-auto bg-white shadow-sm flex flex-col justify-between">
      <div className="flex flex-col ">
        <div className="flex justify-center p-6 ">
          <Logo></Logo>
        </div>

        <div className="flex flex-col w-full px-6">
          <SidebarRoutes></SidebarRoutes>
        </div>
      </div>

      <div className="flex justify-center p-6">
        <UserButton
          showName={true}
          appearance={{
            variables: {},
          }}
          afterSignOutUrl="/"
        ></UserButton>
      </div>
    </div>
  );
};

export default Sidebar;
