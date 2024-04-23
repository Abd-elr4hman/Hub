import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const { title } = await req.json();
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const article = await db.article.create({
      data: {
        userId,
        title,
      },
    });

    return NextResponse.json(article);
  } catch (error) {
    // console.log("[courses]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
