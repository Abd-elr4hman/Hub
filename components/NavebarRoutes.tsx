"use client";

import { usePathname, useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { LogOut } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import SearchInput from "./SearchInput";
import Image from "next/image";

const NavebarRoutes = () => {
  const pathname = usePathname();
  const router = useRouter();

  const isCoursePage = pathname?.startsWith("/courses");
  const isArticlePage = pathname === "/articles";
  const isTeacherPage = pathname?.startsWith("/teacher");
  const isSearchPage = pathname === "/search";

  const user = useUser();
  const isTeacher = user.user?.publicMetadata.role === "admin";

  return (
    <>
      <div className="ml-6 ">
        <Image height={30} width={90} alt="logo" src="/bwhub.png"></Image>
      </div>
      {isSearchPage && (
        <div className="hidden md:block w-96">
          <SearchInput placeholder="Search Coures" />
        </div>
      )}
      {isArticlePage && (
        <div className="hidden md:block w-96">
          <SearchInput placeholder="Search Articles" />
        </div>
      )}
      <div className="flex gap-x-2">
        {isTeacherPage || isCoursePage ? (
          <Link href="/dashboard">
            <Button size="sm" variant="ghost">
              <LogOut className="h-4 w-4 mr-2"></LogOut>
              Exit
            </Button>
          </Link>
        ) : isTeacher ? (
          <Link href="/teacher/courses">
            <Button size="sm" variant="ghost">
              Teacher Mode
            </Button>
          </Link>
        ) : null}
      </div>
    </>
  );
};

export default NavebarRoutes;
