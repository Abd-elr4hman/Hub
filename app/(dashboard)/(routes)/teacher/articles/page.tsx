import { Button } from "@/components/ui/button";
import Link from "next/link";
import { DataTable } from "./_components/DataTable";
import { columns } from "./_components/columns";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";

const ArticlesPage = async () => {
  const { userId } = auth();

  if (!userId) {
    return redirect("/");
  }

  const articles = await db.article.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="p-6">
      <DataTable columns={columns} data={articles} />
    </div>
  );
};

export default ArticlesPage;
