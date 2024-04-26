"use client";

import Image from "next/image";
import React from "react";
import { MoveRight } from "lucide-react";
import { parseISO, format } from "date-fns";
import Link from "next/link";
import Preview from "./Preview";

interface ArticleCardProps {
  key: string;
  id: string;
  title: string;
  body: string;
  imageUrl: string;
  createdAt: Date;
  truncate?: number;
}

const ArticleCard = ({
  key,
  id,
  title,
  body,
  imageUrl,
  createdAt,
  truncate,
}: ArticleCardProps) => {
  const dateString = createdAt.toLocaleString();
  return (
    <>
      <Link href={`/articles/${id}`} className="hover:text-sky-800 ">
        <div className="w-full border h-full flex flex-col">
          <div className="relative w-full rounded-md aspect-video overflow-hidden">
            <Image fill className="object-cover " alt="bla" src={imageUrl} />
          </div>
          <div className="">
            <div className="px-4 py-2">
              <time className="text-xs text-gray-800/40">
                {format(dateString, "LLLL d, yyyy")}
              </time>
            </div>
            <div className="px-4">
              <h2 className="font-semibold">{title}</h2>
            </div>
            <div className="min-h-14">
              <Preview
                style="text-gray-800/40"
                value={body}
                truncate={truncate}
              />
            </div>
          </div>
          <div className="w-full mt-auto p-2 border-t border-black flex justify-between">
            <p>Read Article</p>
            <MoveRight />
          </div>
        </div>
      </Link>
    </>
  );
};

export default ArticleCard;
