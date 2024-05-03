import Image from "next/image";
import React, { Suspense } from "react";
import { MoveRight } from "lucide-react";
import { format } from "date-fns";
import Link from "next/link";
import Preview from "./Preview";
import { getPlaiceholder } from "plaiceholder";

interface ArticleCardProps {
  key: string;
  id: string;
  title: string;
  body: string;
  imageUrl: string;
  createdAt: Date;
  truncate?: number;
}

const ArticleCard = async ({
  key,
  id,
  title,
  body,
  imageUrl,
  createdAt,
  truncate,
}: ArticleCardProps) => {
  const dateString = createdAt.toLocaleString();
  const buffer = await fetch(imageUrl).then(async (res) =>
    Buffer.from(await res.arrayBuffer())
  );
  const { base64 } = await getPlaiceholder(buffer);
  return (
    <>
      <Link href={`/articles/${id}`} className="hover:text-sky-800 ">
        <div className="w-full border h-full flex flex-col">
          <div className="relative w-full rounded-md aspect-video overflow-hidden">
            <Image
              fill
              placeholder="blur"
              blurDataURL={base64}
              className="object-cover"
              alt="bla"
              src={imageUrl}
            />
          </div>
          <div className="">
            <div className="px-4 py-2">
              <time className="text-xs text-gray-800/40">
                {format(dateString, "LLLL d, yyyy")}
              </time>
            </div>
            <div className="p-4">
              <h2 className="font-semibold">{title}</h2>
            </div>
            {/* <div className="min-h-30">
              <Suspense fallback={<Loader2 />}>
                <Preview
                  style="text-gray-800/40"
                  value={body}
                  truncate={truncate}
                />
              </Suspense>
            </div> */}
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
