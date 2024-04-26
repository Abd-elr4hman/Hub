import Preview from "@/components/Preview";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import Image from "next/image";
import { redirect } from "next/navigation";
import Back from "./_components/Back";
import ArticleActions from "./_components/Actions";

const ArticleIdPage = async ({ params }: { params: { articleId: string } }) => {
  const { userId } = auth();
  if (!userId) {
    return redirect("/articles");
  }

  const article = await db.article.findUnique({
    where: {
      id: params.articleId,
      isPublished: true,
    },
  });

  if (!article) {
    redirect("/articles");
  }

  const articleSave = await db.articleSave.findUnique({
    where: {
      userId_articleId: {
        userId,
        articleId: article.id,
      },
    },
  });

  return (
    <div className="">
      <div className="flex flex-col max-w-6xl mx-auto ">
        <div className="mx-auto fixed top-30 left-30 z-40 px-2 pt-4 w-full bg-white">
          <Back link="/articles" text="Back to Articles" />
        </div>
        <div className="relative aspect-video mt-10">
          <Image fill src={article?.imageUrl!} alt={article?.title!} />
        </div>
        <div>
          <ArticleActions
            articleId={article.id}
            isSaved={articleSave ? true : false}
          />
        </div>
        <div className="flex justify-center px-4">
          <h2 className="font-bold text-4xl">{article.title}</h2>
        </div>
        <div className="flex justify-center text-6xl">
          <Preview value={article.body!} style="" />
        </div>
      </div>
    </div>
  );
};

export default ArticleIdPage;
