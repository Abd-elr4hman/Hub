import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import Image from "next/image";
import { redirect } from "next/navigation";

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
    <div className="p-6 flex justify-center">
      <div className=" w-full absolute max-w-3xl aspect-video flex justify-center items-center">
        <Image fill src={article?.imageUrl!} alt={article?.title!} />
        <h2 className="font-bold">{article.title}</h2>
      </div>
    </div>
  );
};

export default ArticleIdPage;
