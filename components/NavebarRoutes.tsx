"use client";

import { usePathname, useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { LogOut } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";

const NavebarRoutes = () => {
  const pathname = usePathname();
  const router = useRouter();

  const isPlayerPage = pathname?.startsWith("/chapter");
  const isTeacherPage = pathname?.startsWith("/teacher");

  const user = useUser();
  const isTeacher = user.user?.publicMetadata.role === "admin";

  return (
    <div className="flex gap-x-2 ml-auto">
      {isTeacherPage || isPlayerPage ? (
        <Link href="/">
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
  );
};

export default NavebarRoutes;
