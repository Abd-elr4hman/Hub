import { db } from "@/lib/db";

async function getProgress(userId: string, courseId: string) {
  try {
    const publishedChapters = await db.chapter.findMany({
      where: {
        courseId: courseId,
        isPublished: true,
      },
      select: {
        id: true,
      },
    });
    // console.log("published chapter", publishedChapters);

    const publishedChapterIds = publishedChapters.map((chapter) => chapter.id);
    // console.log("publishedChapterIds", publishedChapterIds);
    const validCompletedChapter = await db.userProgress.count({
      where: {
        userId: userId,
        chapterId: {
          in: publishedChapterIds,
        },
        isCompeted: true,
      },
    });
    // console.log("validCompletedChapter", validCompletedChapter);

    const progressPercentage =
      (validCompletedChapter / publishedChapterIds.length) * 100;

    // console.log("progressPercentage", progressPercentage);
    return progressPercentage;
  } catch (error) {
    console.log("[GET_PROGRESS]", error);
    return 0;
  }
}

export default getProgress;
