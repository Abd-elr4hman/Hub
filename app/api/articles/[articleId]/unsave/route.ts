import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
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
        isPublished: true,
      },
    });

    if (!article) {
      return new NextResponse("Not Found", { status: 404 });
    }

    const deletedArticleSave = await db.articleSave.delete({
      where: {
        userId_articleId: {
          userId: userId,
          articleId: article.id,
        },
      },
    });

    if (!deletedArticleSave) {
      return new NextResponse("Could Not Delete Save", { status: 404 });
    }

    return NextResponse.json(deletedArticleSave);
  } catch (error) {
    console.log("[ARTICLE_UNSAVE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
