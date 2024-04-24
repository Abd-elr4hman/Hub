import Preview from "@/components/Preview";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import Image from "next/image";
import { redirect } from "next/navigation";
import Back from "./_components/Back";

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

  return (
    <div className="flex flex-col max-w-3xl mx-auto">
      <Back link="/articles" text="Back to Articles" />
      <div className="relative aspect-video">
        <Image fill src={article?.imageUrl!} alt={article?.title!} />
      </div>
      <div className="flex justify-center p-4">
        <h2 className="font-bold text-4xl">{article.title}</h2>
      </div>
      <div className="flex justify-center">
        <Preview value={article.body!} />
      </div>
    </div>
  );
};

export default ArticleIdPage;
