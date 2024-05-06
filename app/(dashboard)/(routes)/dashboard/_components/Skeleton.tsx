import InfoCard from "./InfoCard";
import { CheckCircle, Clock, Bookmark } from "lucide-react";

export default function Skeleton() {
  return (
    <div className="p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <InfoCard
          icon={Clock}
          label="Courses In Progress"
          numberOfItems={0}
          entity={["Course", "Courses"]}
        />
        <InfoCard
          icon={Clock}
          label="Courses In Progress"
          numberOfItems={0}
          entity={["Course", "Courses"]}
        />
      </div>
      <div>
        <ul className="grid xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 2xl:grid-cols-6 gap-4 p-6">
          {[...Array(5)].map((movie, index) => (
            <li key={index} className="relative animate-pulse">
              <div className="relative w-full aspect-video rounded-md overflow-hidden bg-gray-200"></div>
              <p className="mt-2 h-4 w-1/2 rounded-lg bg-gray-200"></p>
              <p className="mt-2 block h-4 rounded-lg bg-gray-200 text-sm font-medium"></p>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <InfoCard
          icon={Bookmark}
          label="SavedArticles"
          numberOfItems={0}
          entity={["Article", "Articles"]}
        />
        <ul className="grid xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 2xl:grid-cols-6 gap-4 p-6">
          {[...Array(5)].map((movie, index) => (
            <li key={index} className="relative animate-pulse">
              <div className="relative w-full aspect-video rounded-md overflow-hidden bg-gray-200"></div>
              <p className="mt-2 h-4 w-1/2 rounded-lg bg-gray-200"></p>
              <p className="mt-2 block h-4 rounded-lg bg-gray-200 text-sm font-medium"></p>
              <p className="mt-2 block h-4 rounded-lg bg-gray-200 text-sm font-medium"></p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
