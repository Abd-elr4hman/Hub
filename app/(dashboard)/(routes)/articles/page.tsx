import ArticleList from "@/components/ArticleList";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import SearchInput from "@/components/SearchInput";

interface ArticlePageProps {
  searchParams: {
    title: string;
  };
}

const ArticlesPage = async ({ searchParams }: ArticlePageProps) => {
  const { userId } = auth();
  if (!userId) {
    return redirect("/");
  }
  const articles = await db.article.findMany({
    where: {
      isPublished: true,
      title: {
        contains: searchParams.title,
      },
    },
  });
  return (
    <>
      <div className="px-6 pt-6 md:hidden md:mb-0 block">
        <SearchInput placeholder="Search Articles"/>
      </div>
      <div className="p-6">
        <ArticleList items={articles} />
      </div>
    </>
  );
};

export default ArticlesPage;
