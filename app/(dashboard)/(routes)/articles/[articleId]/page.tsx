import Preview from "@/components/Preview";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import Image from "next/image";
import { redirect } from "next/navigation";
import Back from "./_components/Back";
import ArticleActions from "./_components/Actions";
import Chat from "@/components/Chat";
import { currentUser } from "@clerk/nextjs/server";
import Animate from "@/components/Animate";
import { GetRecommendations } from "@/actions/get-recommendations";
import { Article } from "@prisma/client";
import ArticleCard from "@/components/ArticleCard";
import ArticleList from "@/components/ArticleList";

const ArticleIdPage = async ({ params }: { params: { articleId: string } }) => {
  const { userId } = auth();
  if (!userId) {
    return redirect("/articles");
  }

  const user = await currentUser();
  if (!user) {
    return redirect("/articles");
  }

  const userInfo = {
    name: user.firstName,
    hasImage: user.hasImage,
    imageUrl: user.imageUrl,
  };

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

  const recommendations: Article[] = await GetRecommendations({
    articleId: params.articleId,
  });

  return (
    // <Animate>

    <div className="flex justify-between ">
      <div className="flex flex-col max-w-2xl mx-auto w-full ">
        <div className=" fixed top-30 left-30 z-40 w-[inherit] max-w-[inherit] bg-white">
          <div className="flex items-center justify-between">
            <Back link="/articles" text="Back to Articles" />
            <ArticleActions
              articleId={article.id}
              isSaved={articleSave ? true : false}
            />
          </div>
        </div>
        <div className="relative aspect-video mt-10">
          <Image fill src={article?.imageUrl!} alt={article?.title!} />
        </div>

        <div className="flex justify-center px-4">
          <h2 className="font-bold text-4xl">{article.title}</h2>
        </div>
        <div className="flex justify-center text-6xl">
          <Preview value={article.body!} style="" />
        </div>
        {recommendations.length !== 0 && (
          <div className="w-full mx-auto ">
            <div className="pt-2 overflow-x-auto overflow-y-auto">
              <h1 className="text-2xl font-bold ml-4">Recommended Articles</h1>
              <div className="p-6">
                <ArticleList
                  items={recommendations}
                  truncate={20}
                  gridStyle="grid grid-cols-2 gap-2"
                />
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="h-full hidden xl:block xl:relative w-2/5 mt-10 mx-5">
        {/* <ChatForm article={article} /> */}
        <Chat article={article} user={userInfo} />
      </div>
    </div>
  );
};

export default ArticleIdPage;
