import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { LayoutDashboard } from "lucide-react";
import TitleForm from "./_components/TitleForm";
import DescriptionForm from "./_components/DescriptionForm";
import ImageForm from "./_components/ImageForm";
// import CategoryForm from "./_components/CategoryForm";
import { ListChecks, CircleDollarSign, File } from "lucide-react";
import PriceForm from "./_components/PriceForm";
import AttachmentForm from "./_components/AttahmentForm";

interface CourseIdPageInterface {
  params: {
    courseId: string;
  };
}

const CourseIdPage = async ({ params }: CourseIdPageInterface) => {
  const { userId } = auth();
  if (!userId) {
    return redirect("/");
  }

  const course = await db.course.findUnique({
    where: {
      id: params.courseId,
    },
    include: {
      attachments: {
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });

  const categories = await db.category.findMany({
    orderBy: {
      name: "asc",
    },
  });

  if (!course) {
    return redirect("/");
  }

  const requiredFields = [
    course.title,
    course.description,
    course.imageUrl,
    course.price,
    course.categoryId,
  ];

  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;

  const completionText = `(${completedFields} / ${totalFields})`;

  return (
    <div className="p-6 ">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-y-2">
          <h1 className="text-2xl font-medium">
            Complete Creating Your Course!
          </h1>
          <span className="text-sm text-slate-700">
            Complete all fields {completionText}
          </span>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6  mt-6 ">
        <div className="">
          <div className="flex items-center gap-x-2">
            <LayoutDashboard></LayoutDashboard>
            <h2 className="text-xl">Customize your course</h2>
          </div>
          <TitleForm initialData={course} courseId={course.id}></TitleForm>
          <DescriptionForm
            initialData={course}
            courseId={course.id}
          ></DescriptionForm>
          <ImageForm initialData={course} courseId={course.id}></ImageForm>
        </div>
        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-x-2">
              <ListChecks />
              <h2 className="text-xl">Course chapters</h2>
            </div>
            <div>Todo: Chapters</div>
          </div>
          <div className="flex items-center gap-x-2">
            <CircleDollarSign />
            <h2 className="text-xl">Sell Your Course</h2>
          </div>
          <div>
            <PriceForm initialData={course} courseId={course.id} />
          </div>
          <div>
            <div className="flex items-center gap-x-2">
              <File />
              <h2 className="text-xl">Resources</h2>
            </div>
            <AttachmentForm
              initialData={course}
              courseId={course.id}
            ></AttachmentForm>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseIdPage;
