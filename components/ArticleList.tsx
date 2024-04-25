import React from "react";
import ArticleCard from "./ArticleCard";
import { Article } from "@prisma/client";

interface ArticleListProps {
  items: Article[];
}

const ArticleList = ({ items }: ArticleListProps) => {
  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 ">
        {items.map((item) => (
          <ArticleCard
            key={item.id}
            id={item.id}
            title={item.title}
            body={item.body!}
            imageUrl={item.imageUrl!}
            createdAt={item.createdAt}
          />
        ))}
      </div>
      {items.length === 0 && (
        <div className="text-center text-sm text-muted-foreground mt-10">
          No Articles Found
        </div>
      )}
    </div>
  );
};

export default ArticleList;
