import NavebarRoutes from "@/components/NavebarRoutes";
import MobileSidebar from "./MobileSidebar";
import TeacherModeSwitch from "@/components/TeacherModeSwitch";
import Image from "next/image";

const Navbar = () => {
  return (
    <div className="p-4 h-[60] flex items-center justify-between shadow-sm ">
      <MobileSidebar></MobileSidebar>
      <NavebarRoutes></NavebarRoutes>
      {/* <TeacherModeSwitch></TeacherModeSwitch> */}
    </div>
  );
};

export default Navbar;
