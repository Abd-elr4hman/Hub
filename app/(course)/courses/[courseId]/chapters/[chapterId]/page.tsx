import { GetChapter } from "@/actions/get-chapter";
import Banner from "@/components/banner";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import VideoPlayer from "./_components/VideoPlayer";
import CourseProgress from "@/components/CourseProgress";
import CourseProgressButton from "./_components/CourseProgressButton";
import Preview from "@/components/Preview";
import Animate from "@/components/Animate";

const ChapterIdPage = async ({
  params,
}: {
  params: { courseId: string; chapterId: string };
}) => {
  const { userId } = auth();
  if (!userId) {
    return redirect("/");
  }

  const { chapter, course, muxData, attachments, nextChapter, userProgress } =
    await GetChapter({
      userId,
      chapterId: params.chapterId,
      courseId: params.courseId,
    });

  if (!chapter || !course) {
    return redirect("/");
  }
  const isLocked = !chapter.isFree;
  const completeOnEnd = userProgress?.isCompeted;

  return (
    <Animate>
      <div className=" ">
        {userProgress?.isCompeted && (
          <Banner
            variant="success"
            label="You already completed this chapter"
          />
        )}
        {isLocked && <Banner variant="warning" label="This part is locked" />}

        <div className="flex flex-col pb-10 max-w-7xl mx-auto">
          <div className="p-4">
            <VideoPlayer
              chapterId={params.chapterId}
              title={chapter.title}
              courseId={params.courseId}
              nextChapterId={nextChapter?.id}
              playbackId={muxData?.playbackId!}
              isLocked={isLocked}
              completeOnEnd={completeOnEnd!}
            />
          </div>
          <div className="bg-slate-200 rounded-xl mx-6">
            <div className="pt-2 px-4 flex flex-col lg:flex-row items-center justify-between">
              <h2 className="text-2xl font-semibold mb-2">{chapter.title}</h2>
              <CourseProgressButton
                chapterId={params.chapterId}
                courseId={params.courseId}
                nextChapterId={nextChapter?.id}
                isCompeted={!!userProgress?.isCompeted}
              />
            </div>
            <div className="pb-2 px-4">
              <Preview value={chapter.description!} />
            </div>
          </div>
        </div>
      </div>
    </Animate>
  );
};

export default ChapterIdPage;
