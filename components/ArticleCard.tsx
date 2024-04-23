"use client";

import Image from "next/image";
import React from "react";
import { MoveRight } from "lucide-react";
import { parseISO, format } from "date-fns";
import Link from "next/link";

interface ArticleCardProps {
  key: string;
  title: string;
  body: string;
  imageUrl: string;
  createdAt: Date;
}

const ArticleCard = ({
  key,
  title,
  body,
  imageUrl,
  createdAt,
}: ArticleCardProps) => {
  const dateString = createdAt.toLocaleString();
  return (
    <Link href={`/articles/${key}`} className="hover:text-sky-800">
      <div className="w-full border">
        <div className="relative w-full rounded-md aspect-video overflow-hidden">
          <Image
            fill
            className="object-cover "
            alt="bla"
            src="/coursedummy.webp"
          />
        </div>
        <div className="p-4">
          <div>
            <time className="text-xs text-gray-800/40">
              {format(dateString, "LLLL d, yyyy")}
            </time>
          </div>
          <div>
            <h2 className="font-semibold">{title}</h2>
          </div>
          <div className="pt-2">
            <p className="text-gray-800/40 line-clamp-2">{body}...</p>
          </div>
        </div>
        <div className="p-2 border-t border-black flex justify-between">
          <p>Read Article</p>
          <MoveRight />
        </div>
      </div>
    </Link>
  );
};

export default ArticleCard;
