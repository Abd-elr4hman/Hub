import { Category, Course } from "@prisma/client";

import getProgress from "./get-progress";
import { db } from "@/lib/db";

type CourseWithProgressWithCategory = Course & {
  category: Category | null;
  chapters: { id: string }[];
  progress: number | null;
};

type GetCourses = {
  userId: string;
  title?: string;
  categoryId?: string;
};

export const GetCourses = async ({
  userId,
  title,
  categoryId,
}: GetCourses): Promise<CourseWithProgressWithCategory[]> => {
  try {
    const courses = await db.course.findMany({
      where: {
        isPublished: true,
        title: {
          contains: title,
        },
        categoryId,
      },
      include: {
        category: true,
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

    const coursesWithProgressWithcategory: CourseWithProgressWithCategory[] =
      await Promise.all(
        courses.map(async (course) => {
          const progressPercentag = await getProgress(userId, course.id);

          return {
            ...course,
            progress: progressPercentag,
          };
        })
      );

    return coursesWithProgressWithcategory;
  } catch (error) {
    console.log("[GET_COURSES]", error);
    return [];
  }
};
