"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Button } from "./ui/button";

interface PageInputProps {
  itemCount: number;
}

const PageInput = ({ itemCount }: PageInputProps) => {
  const router = useRouter();
  const pathname = usePathname();

  const searchParams = useSearchParams();

  const title = searchParams.get("title");
  const page = searchParams.get("page") ? searchParams.get("page") : 1;
  const pageSize = searchParams.get("pageSize")
    ? searchParams.get("pageSize")
    : 8;

  const noPages = Math.ceil(itemCount / Number(pageSize));

  return (
    <>
      <div className="flex items-center justify-center gap-2 p-4">
        <Button
          disabled={Number(page) <= 1 || page === null}
          className="py-2"
          type="button"
          onClick={() => {
            !title
              ? router.push(
                  `${pathname}?page=${Number(page) - 1}&pageSize=${pageSize}`
                )
              : router.push(
                  `${pathname}?page=${
                    Number(page) - 1
                  }&pageSize=${pageSize}&title=${title}`
                );
          }}
        >
          Back{" "}
        </Button>
        <Button
          disabled={Number(page) >= Number(noPages)}
          className="py-2"
          type="button"
          onClick={() => {
            !title
              ? router.push(
                  `${pathname}?page=${Number(page) + 1}&pageSize=${pageSize}`
                )
              : router.push(
                  `${pathname}?page=${
                    Number(page) + 1
                  }&pageSize=${pageSize}&title=${title}`
                );
          }}
        >
          Next{" "}
        </Button>
      </div>
    </>
  );
};

export default PageInput;
