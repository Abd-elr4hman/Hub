import { createClient } from "@/lib/supabase/server";
import { db } from "@/lib/db";
import { Article } from "@prisma/client";

interface GetRecommendationsProps {
  articleId: string;
}

type SimilarVectors = {
  id: string;
  prisma_id: string;
  similarity: Number;
};

export const GetRecommendations = async ({
  articleId,
}: GetRecommendationsProps) => {
  try {
    const supabase = createClient();

    // retrieve vector
    const { data, error } = await supabase
      .from("article")
      .select()
      .eq("prisma_id", articleId);

    if (error) {
      console.log("[GET_RECOMMENDATIONS]", error);
      return [];
    }

    if (data.length === 0) {
      return [];
    }

    // destructure the embedding
    const { embedding } = data[0];
    // get similar results with vector search
    const { data: vectorSearchData, error: vectorSearchError } =
      await supabase.rpc("vector_search", {
        query_embedding: embedding,
        similarity_threshold: 0.8,
        match_count: 3,
      });

    if (vectorSearchError) {
      console.log(vectorSearchError);
    }

    const recommendations: Article[] = await Promise.all(
      vectorSearchData.map(async (recommendation: SimilarVectors) => {
        return await db.article.findUnique({
          where: {
            id: recommendation.prisma_id,
            isPublished: true,
          },
        });
      })
    );

    return recommendations.slice(1);
  } catch (error) {
    console.log("[GET_RECOMMENDATIONS]", error);
    return [];
  }
};
