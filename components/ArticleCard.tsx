import Image from "next/image";
import React from "react";
import {MoveRight} from "lucide-react"

interface ArticleCardProps {
  title: string
  body: string
  imageUrl: string
  createdAt: Date
}

const ArticleCard = ({title, body, imageUrl, createdAt}:ArticleCardProps) => {
  return (
    <div className="w-full">
      <div className="relative w-full rounded-md aspect-video overflow-hidden">
        <Image
          fill
          className="object-cover "
          alt="bla"
          src="/coursedummy.webp"
        />
      </div>
      <div className="p-4">
        <div >
            <p className="text-xs text-gray-800/40">POSTED 22 DEC 2014</p>
        </div>
        <div>
            <h2 className="font-semibold">How to climb the matchmaking ladder and achieve your potential</h2>
        </div>
        <div className="pt-2"><p className="text-gray-800/40 truncate">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Reprehenderit fugiat quis ad dicta. Laborum, delectus fugiat alias repudiandae porro eligendi nulla, consequatur reprehenderit ullam incidunt, vero molestias maiores quisquam adipisci.</p></div>
      </div>
      <div className="p-2 border-t border-black flex justify-between">
        <p>Read Article</p>
        <MoveRight />
      </div>
    </div>
  );
};

export default ArticleCard;
