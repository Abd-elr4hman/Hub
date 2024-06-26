"use client";

import { SearchIcon } from "lucide-react";
import { Input } from "./ui/input";
import { useEffect, useState } from "react";
import useDebounce from "@/hooks/use-debounce";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import qs from "query-string";

interface SearchInputProps {
  placeholder: string;
}

const SearchInput = ({ placeholder }: SearchInputProps) => {
  const [value, setValue] = useState("");
  const debouncedValue = useDebounce(value);

  const searchParams = useSearchParams();
  const currentCategoryId = searchParams.get("categoryId");

  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const url = qs.stringifyUrl(
      {
        url: pathname,
        query: {
          title: debouncedValue,
          categoryId: currentCategoryId,
        },
      },
      { skipEmptyString: true, skipNull: true }
    );
    router.push(url);
  }, [debouncedValue, router, pathname]);

  return (
    <div className="relative ">
      <SearchIcon className="h-4 w-4 absolute top-3 left-3 text-slate-600" />
      <Input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="w-full pl-9 rounded-full bg-slate-100 focus-visible:ring-slate-200"
        placeholder={placeholder}
      />
    </div>
  );
};

export default SearchInput;
