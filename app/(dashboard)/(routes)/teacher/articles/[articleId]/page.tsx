import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import Banner from "@/components/banner";
import Back from "./_components/Back";
import Actions from "./_components/Actions";
import { LayoutDashboard } from "lucide-react";
import TitleForm from "./_components/TitleForm";
import DescriptionForm from "./_components/BodyForm";
import ImageForm from "./_components/ImageForm";
import BodyForm from "./_components/BodyForm";

interface ArticleIdPageInterface {
  params: {
    articleId: string;
  };
}

const ArticleEditPage = async ({ params }: ArticleIdPageInterface) => {
  const { userId } = auth();

  if (!userId) {
    return redirect("/");
  }

  const article = await db.article.findUnique({
    where: {
      id: params.articleId,
      userId: userId,
    },
  });

  if (!article) {
    return redirect("/");
  }

  const requiredFields = [article.title, article.body, article.imageUrl];
  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;

  const completionText = `(${completedFields} / ${totalFields})`;
  const isComplete = requiredFields.every(Boolean);

  return (
    <>
      {!article.isPublished && (
        <Banner label="This article is unpublished, it will not be visible."></Banner>
      )}
      <div className="p-6">
        <Back link="/teacher/articles" text="Back to Articles" />
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-y-2">
            <h1 className="text-2xl font-medium">
              Complete Creating Your Article!
            </h1>
            <span className="text-sm text-slate-700">
              Complete all fields {completionText}
            </span>
          </div>
          <Actions
            disabled={!isComplete}
            articleId={params.articleId}
            isPublished={article.isPublished}
          ></Actions>
        </div>
      </div>
      <div className="p-6">
        <div className="flex items-center gap-x-2">
          <LayoutDashboard></LayoutDashboard>
          <h2 className="text-xl">Customize your article</h2>
        </div>
        <TitleForm initialData={article} articleId={article.id}></TitleForm>
        <BodyForm initialData={article} articleId={article.id}></BodyForm>
        <ImageForm initialData={article} articleId={article.id}></ImageForm>
      </div>
    </>
  );
};

export default ArticleEditPage;
