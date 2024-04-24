"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

interface BackProps {
  link: string;
  text: string;
}

const Back = ({ link, text }: BackProps) => {
  //   const router = useRouter();

  return (
    <div>
      <Link
        href={link}
        // onClick={() => router.refresh()}
        className="flex items-center text-sm hover:opacity-75 transition mb-6"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        {text}
      </Link>
    </div>
  );
};

export default Back;
