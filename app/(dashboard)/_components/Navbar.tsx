import NavebarRoutes from "@/components/NavebarRoutes";
import MobileSidebar from "./MobileSidebar";
import TeacherModeSwitch from "@/components/TeacherModeSwitch";

const Navbar = () => {
  return (
    <div className="p-4 h-full border-none flex items-center shadow-sm">
      <MobileSidebar></MobileSidebar>
      <NavebarRoutes></NavebarRoutes>
      {/* <TeacherModeSwitch></TeacherModeSwitch> */}
    </div>
  );
};

export default Navbar;
