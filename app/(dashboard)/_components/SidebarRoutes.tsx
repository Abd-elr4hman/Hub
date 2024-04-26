"use client";

import {
  Layout,
  Newspaper,
  Presentation,
  NotebookPen,
  GraduationCap,
} from "lucide-react";
import SidebarItem from "./SidebarItem";
import { useParams, usePathname } from "next/navigation";

const guestRoutes = [
  {
    icon: GraduationCap,
    label: "MyLearning",
    href: "/dashboard",
  },
  {
    icon: Presentation,
    label: "Courses",
    href: "/search",
  },
  {
    icon: Newspaper,
    label: "Articles",
    href: "/articles",
  },
];

const teacherRoutes = [
  {
    icon: Presentation,
    label: "Courses",
    href: "/teacher/courses",
  },
  {
    icon: NotebookPen,
    label: "articles",
    href: "/teacher/articles",
  },
  // {
  //   icon: BarChart,
  //   label: "Analytics",
  //   href: "/teacher/analytics",
  // },
];

interface SidebarRoutesProps {
  routeNameStyle: string;
  mobile: boolean;
}

const SidebarRoutes = ({ routeNameStyle, mobile }: SidebarRoutesProps) => {
  const pathname = usePathname();
  const isTeacherPage = pathname?.includes("/teacher");

  const routes = isTeacherPage ? teacherRoutes : guestRoutes;

  return (
    <div className={`flex flex-col w-full ${routeNameStyle}`}>
      {routes.map((route) => (
        <SidebarItem
          key={route.href}
          icon={route.icon}
          label={route.label}
          href={route.href}
          labelStyle={mobile ? "block" : "md:hidden lg:block"}
        />
      ))}
    </div>
  );
};

export default SidebarRoutes;
