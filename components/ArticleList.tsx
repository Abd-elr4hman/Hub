import React from "react";
import ArticleCard from "./ArticleCard";
import { Article } from "@prisma/client";

interface ArticleListProps {
  items: Article[];
}

const ArticleList = ({ items }: ArticleListProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4">
      {items.map((item) => (
        <ArticleCard
          key={item.id}
          title={item.title}
          body={item.body!}
          imageUrl={item.imageUrl!}
          createdAt={item.createdAt}
        />
      ))}
    </div>
  );
};

export default ArticleList;
