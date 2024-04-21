"use client";

import { Category } from "@prisma/client";
import { FaRobot } from "react-icons/fa";
import { RiSecurePaymentFill } from "react-icons/ri";
import { PiComputerTowerFill } from "react-icons/pi";
import { MdOutlineComputer } from "react-icons/md";
import { IconType } from "react-icons/lib";
import CategoryItem from "./CategoryItem";

interface CategoriesProps {
  items: Category[];
}

const iconMap: Record<Category["name"], IconType> = {
  "Machine Learning": FaRobot,
  "Information Security": RiSecurePaymentFill,
  "Backend Development": PiComputerTowerFill,
  "Frontend Development": MdOutlineComputer,
};

const Categories = ({ items }: CategoriesProps) => {
  return (
    <div className="flex items-center gap-x-2 overflow-x-auto pb-2">
      {items.map((item) => (
        <CategoryItem
          key={item.id}
          label={item.name}
          icon={iconMap[item.name]}
          value={item.id}
        />
      ))}
    </div>
  );
};

export default Categories;
