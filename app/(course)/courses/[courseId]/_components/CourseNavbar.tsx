import NavebarRoutes from "@/components/NavebarRoutes";
import { Course, Chapter, UserProgress } from "@prisma/client";
import CourseMobileSidebar from "./CourseMobileSidebar";

interface CourseNavbarProps {
  course: Course & {
    chapters: (Chapter & {
      userPogress: UserProgress[] | null;
    })[];
  };
  progressCount: number;
}

const CourseNavbar = ({ course, progressCount }: CourseNavbarProps) => {
  return (
    <div className="p-4 h-full flex items-center justify-between bg-white shadow-sm">
      <CourseMobileSidebar course={course} progressCount={progressCount} />
      <NavebarRoutes />
    </div>
  );
};

export default CourseNavbar;
