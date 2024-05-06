import { UserButton, auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { getDashboardCourses } from "@/actions/get-dashboard-courses";
import CoursesList from "@/components/CoursesList";
import { CheckCircle, Clock, Bookmark } from "lucide-react";
import InfoCard from "./_components/InfoCard";
import { db } from "@/lib/db";
import ArticleList from "@/components/ArticleList";
import { Suspense } from "react";
import Skeleton from "./_components/Skeleton";

const DashboardFetcher = async ({ userId }: { userId: string }) => {
  const { completedCourses, coursesInProgress } = await getDashboardCourses(
    userId
  );

  const savedArticles = await db.articleSave.findMany({
    where: {
      userId: userId,
    },
  });

  const savedChapterIds = savedArticles.map(
    (savedArticle) => savedArticle.articleId
  );
  const articles = await db.article.findMany({
    where: {
      id: {
        in: savedChapterIds,
      },
    },
  });

  return (
    <div>
      <div className="p-6 space-y-4">
        {/* <div className="">
          <h2 className=" font-semibold text-3xl">My Learning</h2>
        </div> */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <InfoCard
            icon={Clock}
            label="Courses In Progress"
            numberOfItems={coursesInProgress.length}
            entity={["Course", "Courses"]}
          />
          <InfoCard
            icon={CheckCircle}
            label="Courses Completed"
            numberOfItems={completedCourses.length}
            entity={["Course", "Courses"]}
          />
        </div>
        <CoursesList
          items={[...coursesInProgress, ...completedCourses]}
          gridStyle="grid xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 2xl:grid-cols-6 gap-4"
        />
      </div>
      <div className="p-6 space-y-4">
        <div className="">
          <InfoCard
            icon={Bookmark}
            label="SavedArticles"
            numberOfItems={savedArticles.length}
            entity={["Article", "Articles"]}
          />
        </div>
        <ArticleList
          items={articles}
          truncate={50}
          gridStyle="grid xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 2xl:grid-cols-6 gap-4"
        />
      </div>
    </div>
  );
};

export default async function Dashboard() {
  const { userId } = auth();
  if (!userId) {
    return redirect("/");
  }

  return (
    <div>
      <Suspense fallback={<Skeleton />}>
        <DashboardFetcher userId={userId} />
      </Suspense>
    </div>
  );
}
