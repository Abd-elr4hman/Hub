import ArticleList from "@/components/ArticleList";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { redirect, useSearchParams } from "next/navigation";
import SearchInput from "@/components/SearchInput";
import PageInput from "@/components/PageInput";

interface ArticlePageProps {
  searchParams: {
    title: string;
    page?: number;
    pageSize?: number;
  };
}

const ArticlesPage = async ({ searchParams }: ArticlePageProps) => {
  const { userId } = auth();
  if (!userId) {
    return redirect("/");
  }

  const page = Number(searchParams["page"]);
  const pageSize = Number(searchParams["pageSize"]);

  // const pageSize = 8;
  const skipCount = page ? (page - 1) * pageSize : 0;
  const take = pageSize ? pageSize : 8;

  const articles = await db.article.findMany({
    skip: skipCount,
    take: take,
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

  return (
    <div className="h-full  ">
      <div className="px-6 pt-6 md:hidden md:mb-0 block">
        <SearchInput placeholder="Search Articles" />
      </div>
      <div className="p-6">
        <ArticleList items={articles} />
      </div>
      <div className="">
        <PageInput itemCount={articleCount} />
      </div>
    </div>
  );
};

export default ArticlesPage;
