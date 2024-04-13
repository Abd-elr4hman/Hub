import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { ArrowLeft, Eye, LayoutDashboard, Video } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import TitleForm from "./_compontents/TitleForm";
import DescriptionForm from "./_compontents/DescriptionForm";
import AccessForm from "./_compontents/AccessForm";
import VideoForm from "./_compontents/VideoForm";
import Banner from "@/components/banner";
import ChapterActions from "./_compontents/ChapterActions";

const ChapterIdPage = async ({
  params,
}: {
  params: {
    courseId: string;
    chapterId: string;
  };
}) => {
  const { userId } = await auth();

  if (!userId) {
    return redirect("/");
  }

  const course = await db.course.findUnique({
    where: {
      id: params.courseId,
      userId: userId,
    },
    include: {
      chapters: {
        orderBy: {
          position: "asc",
        },
      },
      attachments: {
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });

  if (!course) {
    return redirect("/");
  }

  const chapter = await db.chapter.findUnique({
    where: {
      id: params.chapterId,
      courseId: params.courseId,
    },
    include: {
      muxData: true,
    },
  });

  if (!chapter) {
    return redirect("/");
  }

  const requiredFields = [chapter.title, chapter.description, chapter.videoUrl];

  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;

  const completionText = `(${completedFields} / ${totalFields})`;

  const isComplete = requiredFields.every(Boolean);

  return (
    <>
      {!chapter.isPublished && (
        <Banner
          variant="warning"
          label="This chapter is unpublished, It will not be visible in the course."
        />
      )}
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div className="w-full">
            <Link
              href={`/teacher/courses/${params.courseId}`}
              className="flex items-center text-sm hover:opacity-75 transition mb-6"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to course setup
            </Link>
            <div className="flex items-center justify-between w-full">
              <div className="flex flex-col gap-y-2">
                <h1 className="text-2xl font-medim">Chapter Creation</h1>
                <span className="text-sm text-slate-700">
                  Complete All Fields {completionText}
                </span>
              </div>
              <ChapterActions
                disabled={!isComplete}
                courseId={params.courseId}
                chapterId={params.chapterId}
                isPublished={chapter.isPublished}
              ></ChapterActions>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mt-6">
          <div className="space-y-4">
            <div>
              <div className="flex items-center gap-x-2">
                <LayoutDashboard className="text-xl" />
                <h2>Customize your chapter</h2>
              </div>
              <TitleForm
                initialData={chapter}
                courseId={course.id}
                chapterId={chapter.id}
              ></TitleForm>
              <DescriptionForm
                initialData={chapter}
                courseId={course.id}
                chapterId={chapter.id}
              ></DescriptionForm>

              {/* <ImageForm initialData={course} courseId={course.id}></ImageForm> */}
            </div>
          </div>
          <div>
            <div className="flex items-center gap-x-2">
              <Eye />
              <h2 className="text-xl">Access Settings</h2>
            </div>
            <AccessForm
              initialData={chapter}
              courseId={course.id}
              chapterId={chapter.id}
            />
          </div>
          <div>
            <div className="flex items-center gap-x-2">
              <Video />
              <h2 className="text-xl">Video</h2>
            </div>
            <VideoForm
              initialData={chapter}
              courseId={course.id}
              chapterId={chapter.id}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ChapterIdPage;
