import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function PATCH(
  req: Request,
  { params }: { params: { articleId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const article = await db.article.findUnique({
      where: {
        id: params.articleId,
        userId,
      },
    });

    if (!article) {
      return new NextResponse("Not Found", { status: 404 });
    }

    const unpublishedArticle = await db.article.update({
      where: {
        id: params.articleId,
      },
      data: {
        isPublished: false,
      },
    });

    return NextResponse.json(unpublishedArticle);
  } catch (error) {
    console.log("[ARTICLE_UNPUBLISH]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
