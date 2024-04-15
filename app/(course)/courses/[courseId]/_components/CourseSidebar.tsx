import { auth } from "@clerk/nextjs";
import { Chapter, Course, UserProgress } from "@prisma/client";
import { redirect } from "next/navigation";
import CourseSidebarItem from "./CourseSidebarItem";
import { UserButton } from "@clerk/nextjs";

interface CourseSidebarProps {
  course: Course & {
    chapters: (Chapter & {
      userPogress: UserProgress[] | null;
    })[];
  };
  progressCount: number;
}

const CourseSidebar = ({ course, progressCount }: CourseSidebarProps) => {
  const { userId } = auth();
  if (!userId) {
    return redirect("/");
  }

  return (
    <div className="h-full  bg-slate-200  rounded-3xl my-1 ml-1 flex flex-col justify-between overflow-y-auto shadow-sm">
      <div>
        <div className="p-4 flex flex-col border-b border-slate-300">
          <h1 className="text-md font-semibold">Progress</h1>
          <p>progress goes here</p>
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

export default CourseSidebar;
