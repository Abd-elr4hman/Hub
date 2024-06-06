import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server"; 
import { getEmbedding } from "@/lib/utils";

export async function PATCH(
  req: Request,
  { params }: { params: { articleId: string } }
) {
  try {
    const { userId } = auth();
    const supabase = createClient()
    const { articleId } = params;
    const values = await req.json();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const article = await db.article.update({
      where: {
        id: articleId,
      },
      data: {
        ...values,
      },
    });
    
    // TODO:
    // if values contain "body" do the following:
    if (values.body){
      try {
        // Create an openai embedding
        const embedding = await getEmbedding(values.body)

        // Check if the article already has an embedding for its body
        // patch/create the embedding in supabase
        const { data, error } = await supabase.from("article")
        .upsert({
          embedding: embedding,
          prisma_id: articleId
        }, { onConflict: 'prisma_id' })
        .select()

        if (error) {
          console.log("[ARTICLE_ID_PATCH]", error)
          return new NextResponse("Internal Error", { status: 500 });
        }

      } catch (err){
        console.log("[ARTICLE_ID_PATCH]", err)
        return new NextResponse("Internal Error", { status: 500 });
      }
    }

    return NextResponse.json(article);
  } catch (error) {
    console.log("[ARTICLE_ID_PATCH]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { articleId: string } }
) {
  try {
    // check if user exists
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // check course owner
    const article = await db.article.findUnique({
      where: {
        id: params.articleId,
        userId,
      },
    });

    if (!article) {
      return new NextResponse("Not found", { status: 404 });
    }
    // now delete the course in the db
    const deletedArticle = await db.article.delete({
      where: {
        id: params.articleId,
      },
    });

    return NextResponse.json(deletedArticle);
  } catch (error) {
    console.log("[ARTICLE_ID_DELETE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
