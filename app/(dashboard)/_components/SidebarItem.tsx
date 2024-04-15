"use client";

import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

interface SidebarItemProps {
  icon: LucideIcon;
  label: string;
  href: string;
}

const SidebarItem = ({ icon: Icon, label, href }: SidebarItemProps) => {
  const pathname = usePathname();
  const router = useRouter();

  const isActive =
    (pathname === "/" && href === "/") ||
    pathname === href ||
    pathname?.startsWith(`${href}/`);

  const onClick = () => {
    router.push(href);
  };

  return (
    <Button
      variant={isActive ? "default" : "ghost"}
      className="flex justify-start"
      onClick={onClick}
    >
      <div className="flex items-center gap-x-2 py-4">
        <Icon></Icon>
        <p className="md:hidden lg:block">{label}</p>
      </div>
    </Button>
  );
};

export default SidebarItem;
