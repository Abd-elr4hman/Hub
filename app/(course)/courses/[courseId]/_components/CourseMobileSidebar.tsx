import { Course, Chapter, UserProgress } from "@prisma/client";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import CourseSidebar from "./CourseSidebar";
import CourseSidebarItem from "./CourseSidebarItem";
import { UserButton } from "@clerk/nextjs";
import CourseProgress from "@/components/CourseProgress";
import Image from "next/image";

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
      <SheetTrigger className="lg:hidden pr-4 hover:opacity-75 transition">
        <Menu></Menu>
      </SheetTrigger>
      <SheetContent side="left" className="p-0 w-72">
        <div className=" h-full rounded-3xl my-1 ml-1 flex flex-col justify-between overflow-y-auto shadow-sm">
          <div>
            <div className="flex justify-center">
              <Image
                height={90}
                width={90}
                alt="logo"
                src="/lmslogocut.png"
              ></Image>
            </div>
            <div className="p-4 flex flex-col">
              <h1 className="text-md font-semibold">{course.title}</h1>
              <div className="">
                <CourseProgress variant="success" value={progressCount} />
              </div>
            </div>

            <div className="flex flex-col w-full">
              {course.chapters.map((chapter) => (
                <CourseSidebarItem
                  key={chapter.id}
                  id={chapter.id}
                  label={chapter.title}
                  isCompleted={!!chapter.userPogress?.[0]?.isCompeted}
                  courseId={course.id}
                  islocked={!chapter.isFree}
                />
              ))}
            </div>
          </div>

          <div className="fixed  bottom-0 left-0 p-6">
            <UserButton
              showName={true}
              appearance={{
                variables: {},
              }}
              afterSignOutUrl="/"
            ></UserButton>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default CourseMobileSidebar;
