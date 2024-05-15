import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
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
        isPublished: true,
      },
    });

    if (!article) {
      return new NextResponse("Not Found", { status: 404 });
    }

    const articleSave = await db.articleSave.create({
      data: {
        userId: userId,
        articleId: article.id,
      },
    });

    return NextResponse.json(articleSave);
  } catch (error) {
    console.log("[ARTICLE_SAVE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
