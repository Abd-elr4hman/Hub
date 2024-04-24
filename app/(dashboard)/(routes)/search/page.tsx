import { GetCourses } from "@/actions/get-courses";
import SearchInput from "@/components/SearchInput";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import CoursesList from "@/components/CoursesList";
import { db } from "@/lib/db";
import Categories from "./_components/Categories";
import PageInput from "@/components/PageInput";

interface SearchPageProps {
  searchParams: {
    title: string;
    categoryId?: string;
    page: number;
  };
}

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

  const { coursesWithProgressWithCategory, coursesCount } = await GetCourses({
    userId,
    ...searchParams,
  });

  const maxPage = Math.ceil(coursesCount / 10);

  return (
    <>
      <div className="px-6 pt-6 md:hidden md:mb-0 block">
        <SearchInput placeholder="Search Courses" />
      </div>
      <div className="p-6 space-y-4">
        <Categories items={categories} />
        <CoursesList items={coursesWithProgressWithCategory} />
      </div>
      <div>
        <PageInput maxPage={maxPage} />
      </div>
    </>
  );
};

export default SearchPage;
