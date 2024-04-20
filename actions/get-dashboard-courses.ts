import { db } from "@/lib/db";
import { Chapter, Course } from "@prisma/client";
import getProgress from "./get-progress";

type CourseWithProgress = Course & {
  chapters: { id: string }[];
  progress: number | null;
};

type DashboardCourses = {
  completedCourses: CourseWithProgress[];
  coursesInProgress: CourseWithProgress[];
};

export const getDashboardCourses = async (
  userId: string
): Promise<DashboardCourses> => {
  try {
    const courses = await db.course.findMany({
      where: {
        isPublished: true,
      },
      include: {
        chapters: {
          where: {
            isPublished: true,
          },
          select: {
            id: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const coursesWithProgress: CourseWithProgress[] = await Promise.all(
      courses.map(async (course) => {
        const progressPercentag = await getProgress(userId, course.id);

        return {
          ...course,
          progress: progressPercentag,
        };
      })
    );

    const completedCourses = coursesWithProgress.filter(
      (courseWithProgress) => courseWithProgress.progress === 100
    );

    const coursesInProgress = coursesWithProgress.filter(
      (courseWithProgress) =>
        courseWithProgress.progress! > 0 && courseWithProgress.progress! !== 100
    );

    return {
      completedCourses,
      coursesInProgress,
    };
  } catch (error) {
    console.log("[GET_DASHBOARD_COURSES]", error);
    return {
      completedCourses: [],
      coursesInProgress: [],
    };
  }
};
