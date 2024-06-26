import { BookOpen } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import CourseProgress from "./CourseProgress";
import { db } from "@/lib/db";
import { getPlaiceholder } from "plaiceholder";

interface CourseCardProps {
  key: string;
  id: string;
  title: string;
  imageUrl: string;
  chaptersLength: number;
  price: number;
  // progress: number | null;
  progress: number;
}

const CourseCard = async ({
  key,
  id,
  title,
  imageUrl,
  chaptersLength,
  price,
  progress,
}: CourseCardProps) => {
  const buffer = await fetch(imageUrl).then(async (res) =>
    Buffer.from(await res.arrayBuffer())
  );
  const { base64 } = await getPlaiceholder(buffer);

  return (
    <Link href={`/courses/${id}`}>
      <div
        className="group-hover:shadow-sm transition overflow-hidden border rounded-lg p-3 h-full
      "
      >
        <div className="relative w-full aspect-video rounded-md overflow-hidden">
          <Image
            fill
            placeholder="blur"
            blurDataURL={base64}
            className="object-cover"
            alt={title}
            src={imageUrl}
          />
        </div>
        <div className="w-full flex flex-col justify-between pt-2  ">
          <div className="text-lg md:text-base font-medium hover:text-sky-700 transition line-clamp-2">
            {title}
          </div>
          <div className=" ">
            <div className="my-3 flex items-center gap-x-2 text-sm md:text-xs">
              <div className="flex items-center gap-x-1 text-slate-500">
                <BookOpen />
                <span>
                  {chaptersLength}{" "}
                  {chaptersLength === 1 ? "Chapter" : "Chapters"}
                </span>
              </div>
            </div>

            {progress === 0 ? null : (
              <CourseProgress
                size="sm"
                value={progress}
                variant={progress === 100 ? "success" : "default"}
              />
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CourseCard;
