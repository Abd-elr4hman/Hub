import { Course } from "@prisma/client";
import CourseCard from "./CourseCard";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";

type CourseWithProgress = Course & {
  chapters: { id: string }[];
  // progress: number | null;
  progress: number | null;
};

interface CoursesListProps {
  items: CourseWithProgress[];
  gridStyle?: string;
}

const CoursesList = ({ items, gridStyle }: CoursesListProps) => {
  return (
    <div className="">
      <div
        className={
          gridStyle
            ? gridStyle
            : "grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5 gap-4"
        }
      >
        {items.map((item) => (
          <CourseCard
            key={item.id}
            id={item.id}
            title={item.title}
            imageUrl={item.imageUrl!}
            chaptersLength={item.chapters.length}
            price={item.price!}
            // progress={item.progress}
            progress={item.progress!}
          />
        ))}
      </div>
      {items.length === 0 && (
        <div className="text-center text-sm text-muted-foreground mt-10">
          No Courses Found
        </div>
      )}
    </div>
  );
};

export default CoursesList;
