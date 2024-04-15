import { Course, Chapter, UserProgress } from "@prisma/client";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import CourseSidebar from "./CourseSidebar";

interface CourseMobileSidebarProps {
  course: Course & {
    chapters: (Chapter & {
      userPogress: UserProgress[] | null;
    })[];
  };
  progressCount: number;
}

const CourseMobileSidebar = ({
  course,
  progressCount,
}: CourseMobileSidebarProps) => {
  return (
    <Sheet>
      <SheetTrigger className="md:hidden pr-4 hover:opacity-75 transition">
        <Menu></Menu>
      </SheetTrigger>
      <SheetContent side="left" className="p-0 w-72">
        <CourseSidebar
          course={course}
          progressCount={progressCount}
        ></CourseSidebar>
      </SheetContent>
    </Sheet>
  );
};

export default CourseMobileSidebar;
