import { LucideIcon } from "lucide-react";
import { Icon } from "next/dist/lib/metadata/types/metadata-types";

interface InfoCard {
  icon: LucideIcon;
  label: string;
  entity: string[];
  numberOfItems: number;
}

const InfoCard = ({ icon: Icon, label, numberOfItems, entity }: InfoCard) => {
  return (
    <div className="border rounded-md flex items-center gap-x-2 p-3">
      <Icon />
      <div>
        <p className="font-medium">{label}</p>
        <p className="text-gray-255 text-sm">
          {numberOfItems} {numberOfItems === 1 ? entity[0] : entity[1]}
        </p>
      </div>
    </div>
  );
};

export default InfoCard;
