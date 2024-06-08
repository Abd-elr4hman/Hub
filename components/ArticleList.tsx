import React from "react";
import ArticleCard from "./ArticleCard";
import { Article } from "@prisma/client";

type ArticleCardInfo = {
  id: string;
  userId: string;
  title: string;
  imageUrl: string | null;
  createdAt: Date;
};

interface ArticleListProps {
  items: ArticleCardInfo[];
  gridStyle?: string;
  truncate?: number;
}

const ArticleList = ({ items, gridStyle, truncate }: ArticleListProps) => {
  return (
    <div>
      <div
        className={
          gridStyle
            ? gridStyle
            : "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 "
        }
      >
        {items.map((item) => (
          <ArticleCard
            key={item.id}
            id={item.id}
            title={item.title}
            imageUrl={item.imageUrl!}
            createdAt={item.createdAt}
            truncate={truncate ? truncate : 100}
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
