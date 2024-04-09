import NavebarRoutes from "@/components/NavebarRoutes";
import MobileSidebar from "./MobileSidebar";
import TeacherModeSwitch from "@/components/TeacherModeSwitch";

const Navbar = () => {
  return (
    <div className="p-4 border-b h-full flex items-center bg-white shadow-sm">
      <MobileSidebar></MobileSidebar>
      <NavebarRoutes></NavebarRoutes>
      {/* <TeacherModeSwitch></TeacherModeSwitch> */}
    </div>
  );
};

export default Navbar;
