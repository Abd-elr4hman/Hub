import ArticleList from "@/components/ArticleList";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { redirect, useSearchParams } from "next/navigation";
import SearchInput from "@/components/SearchInput";
import PageInput from "@/components/PageInput";

interface ArticlePageProps {
  searchParams: {
    title: string;
    page: number;
  };
}

const ArticlesPage = async ({ searchParams }: ArticlePageProps) => {
  const { userId } = auth();
  if (!userId) {
    return redirect("/");
  }

  const pageSize = 8;
  const skipCount =
    searchParams.page && searchParams.page > 0
      ? (searchParams.page - 1) * pageSize
      : 0;

  const articles = await db.article.findMany({
    skip: skipCount,
    take: pageSize,
    where: {
      isPublished: true,
      title: {
        contains: searchParams.title,
      },
    },
  });

  const articleCount = await db.article.count({
    where: {
      isPublished: true,
      title: {
        contains: searchParams.title,
      },
    },
  });
  const maxPage = Math.ceil(articleCount / pageSize);
  return (
    <div className="h-full static ">
      <div className="absolute bottom-12 right-12">
        <PageInput maxPage={maxPage} />
      </div>
      <div className="px-6 pt-6 md:hidden md:mb-0 block">
        <SearchInput placeholder="Search Articles" />
      </div>
      <div className="p-6">
        <ArticleList items={articles} />
      </div>
    </div>
  );
};

export default ArticlesPage;
