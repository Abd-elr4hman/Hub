import { Category, Course } from "@prisma/client";

import getProgress from "./get-progress";
import { db } from "@/lib/db";

type CourseWithProgressWithCategory = Course & {
  category: Category | null;
  chapters: { id: string }[];
  progress: number | null;
};

type CoursesWithProgressWithCategoryWithCount = {
  coursesWithProgressWithCategory: CourseWithProgressWithCategory[];
  coursesCount: number;
};

type GetCourses = {
  userId: string;
  title?: string;
  categoryId?: string;
  page: number;
  pageSize: number;
};

export const GetCourses = async ({
  userId,
  title,
  categoryId,
  page,
  pageSize,
}: GetCourses): Promise<CoursesWithProgressWithCategoryWithCount> => {
  try {
    const skipCount = page && page > 0 ? (page - 1) * pageSize : 0;

    const courses = await db.course.findMany({
      skip: skipCount,
      take: pageSize,
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

    const coursesCount = await db.course.count({
      where: {
        isPublished: true,
        title: {
          contains: title,
        },
        categoryId,
      },
    });

    const coursesWithProgressWithCategory: CourseWithProgressWithCategory[] =
      await Promise.all(
        courses.map(async (course) => {
          const progressPercentag = await getProgress(userId, course.id);

          return {
            ...course,
            progress: progressPercentag,
          };
        })
      );

    const courseWithProgressWithCategoryWithCount: CoursesWithProgressWithCategoryWithCount =
      {
        coursesWithProgressWithCategory,
        coursesCount,
      };

    return courseWithProgressWithCategoryWithCount;
  } catch (error) {
    console.log("[GET_COURSES]", error);
    return <CoursesWithProgressWithCategoryWithCount>{};
  }
};
