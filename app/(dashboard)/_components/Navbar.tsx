import NavebarRoutes from "@/components/NavebarRoutes";
import MobileSidebar from "./MobileSidebar";
import TeacherModeSwitch from "@/components/TeacherModeSwitch";

const Navbar = () => {
  return (
    <div className="p-4 h-[60] border-b flex items-center shadow-sm">
      <MobileSidebar></MobileSidebar>
      <NavebarRoutes></NavebarRoutes>
      {/* <TeacherModeSwitch></TeacherModeSwitch> */}
    </div>
  );
};

export default Navbar;
