import { GetCourses } from "@/actions/get-courses";
import SearchInput from "@/components/SearchInput";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import CoursesList from "@/components/CoursesList";
import { db } from "@/lib/db";
import Categories from "./_components/Categories";
import PageInput from "@/components/PageInput";
import { Suspense } from "react";
import { title } from "process";
import page from "../teacher/analytics/page";
import { unstable_noStore } from "next/cache";
import Skeleton from "./_components/Skeleton";

interface SearchPageProps {
  searchParams: {
    title: string;
    categoryId?: string;
    page: number;
  };
}

const CoursesFetcher = async (
  searchParams: {
    title: string;
    categoryId?: string;
    page: number;
  },
  userId: string
) => {
  unstable_noStore();
  const pageSize = 8;

  const { coursesWithProgressWithCategory, coursesCount } = await GetCourses({
    userId,
    ...searchParams,
    pageSize,
  });

  return (
    <div>
      <CoursesList items={coursesWithProgressWithCategory} />
      <div className="mt-auto">
        <PageInput itemCount={coursesCount} />
      </div>
    </div>
  );
};

const SearchPage = async ({ searchParams }: SearchPageProps) => {
  const { userId } = auth();
  if (!userId) {
    return redirect("/");
  }

  const categories = await db.category.findMany({
    orderBy: {
      name: "asc",
    },
  });

  const pageSize = 8;
  const keyString = `title=${searchParams?.title}&&categoryId=${searchParams?.categoryId}&&page=${searchParams?.page}&&pageSize=${pageSize}`; //  <-- Construct key from searchParams
  return (
    <section className="h-full flex flex-col mb-12 ">
      <div className="px-6 pt-6 md:hidden md:mb-0 block">
        <SearchInput placeholder="Search Courses" />
      </div>
      <div className="p-6 space-y-4 ">
        <Categories items={categories} />
        <Suspense key={keyString} fallback={<Skeleton />}>
          <CoursesFetcher {...searchParams} />
        </Suspense>
      </div>
    </section>
  );
};

export default SearchPage;
