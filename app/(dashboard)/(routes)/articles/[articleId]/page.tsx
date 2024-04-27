import Preview from "@/components/Preview";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import Image from "next/image";
import { redirect } from "next/navigation";
import Back from "./_components/Back";
import ArticleActions from "./_components/Actions";
import ChatForm from "@/components/ChatForm";

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
      </div>
      <div className=" h-full hidden xl:block w-2/5 mt-10 mx-5 border shadow-lg rounded-lg">
        <ChatForm />
      </div>
    </div>
  );
};

export default ArticleIdPage;
