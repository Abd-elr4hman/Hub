"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import qs from "query-string";
import { Button } from "./ui/button";

interface PageInputProps {
  maxPage: number;
}

const PageInput = ({ maxPage }: PageInputProps) => {
  const [value, setValue] = useState(1);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const url = qs.stringifyUrl(
      {
        url: pathname,
        query: {
          page: value,
        },
      },
      { skipEmptyString: true, skipNull: true }
    );
    router.push(url);
  }, [value, router, pathname]);
  return (
    <>
      {value === 1 || maxPage === value ? null : (
        <div className="flex items-center justify-center gap-2">
          <Button
            disabled={value === 1}
            className="py-2"
            type="button"
            onClick={(e) => setValue(value - 1)}
          >
            Back{" "}
          </Button>
          <Button
            disabled={maxPage === value}
            className="py-2"
            type="button"
            onClick={(e) => setValue(value + 1)}
          >
            Next{" "}
          </Button>
        </div>
      )}
    </>
  );
};

export default PageInput;
