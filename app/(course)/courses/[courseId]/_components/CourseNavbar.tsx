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
    <div className="p-4 border-b h-full flex items-center bg-white shadow-sm">
      <CourseMobileSidebar course={course} progressCount={progressCount} />
      <h1 className="text-xl font-bold">{course.title}</h1>
      <NavebarRoutes />
    </div>
  );
};

export default CourseNavbar;
