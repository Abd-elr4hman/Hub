import ArticleList from "@/components/ArticleList";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { redirect, useSearchParams } from "next/navigation";
import SearchInput from "@/components/SearchInput";
import PageInput from "@/components/PageInput";
import { unstable_noStore } from "next/cache";
import { Suspense } from "react";
import Skeleton from "./_components/Skeleton";

interface ArticlePageProps {
  searchParams: {
    title: string;
    page?: number;
    pageSize?: number;
  };
}

type ArticleCardInfo = {
  id: string;
  userId: string;
  title: string;
  imageUrl: string | null;
  createdAt: Date;
};

const ArticleFetcher = async (
  searchParams: {
    title: string;
    page?: number;
    pageSize?: number;
  },
  userId: string
) => {
  unstable_noStore();

  const page = Number(searchParams["page"]);
  const pageSize = Number(searchParams["pageSize"]);

  // const pageSize = 8;
  const skipCount = page ? (page - 1) * pageSize : 0;
  const take = pageSize ? pageSize : 8;

  const articles: ArticleCardInfo[] = await db.article.findMany({
    skip: skipCount,
    take: take,
    where: {
      isPublished: true,
      title: {
        contains: searchParams.title,
      },
    },
    select: {
      id: true,
      userId: true,
      title: true,
      imageUrl: true,
      createdAt: true,
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
    <div>
      <div className="p-6">
        <ArticleList items={articles} />
      </div>
      <div className="">
        <PageInput itemCount={articleCount} />
      </div>
    </div>
  );
};

const ArticlesPage = async ({ searchParams }: ArticlePageProps) => {
  const { userId } = auth();
  if (!userId) {
    return redirect("/");
  }

  const keyString = `title=${searchParams?.title}&&page=${searchParams?.page}&&pageSize=${searchParams.pageSize}`; //  <-- Construct key from searchParams

  return (
    <div className="h-full  ">
      <div className="px-6 pt-6 md:hidden md:mb-0 block">
        <SearchInput placeholder="Search Articles" />
      </div>
      <div className="">
        <Suspense key={keyString} fallback={<Skeleton />}>
          <ArticleFetcher {...searchParams} />
        </Suspense>
      </div>
    </div>
  );
};

export default ArticlesPage;
