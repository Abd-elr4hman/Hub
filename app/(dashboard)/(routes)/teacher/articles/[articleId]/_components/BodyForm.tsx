"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import toast from "react-hot-toast";

import { PencilIcon } from "lucide-react";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Article, Chapter, Course } from "@prisma/client";
import Editor from "@/components/Editor";
import Preview from "@/components/Preview";

interface BodyFormProps {
  initialData: Article;
  articleId: string;
}

// define form shcema with zod
const formSchema = z.object({
  body: z.string().min(1),
});

const BodyForm = ({ initialData, articleId }: BodyFormProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const toggleEdit = () => setIsEditing((current) => !current);
  const router = useRouter();

  // useForm react hook and pass a resolver and a context
  /*
    Option	Body
    resolver	Integrates with your preferred schema validation library.
    context	A context object to supply for your schema validation.
    */
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      body: initialData?.body || "",
    },
  });

  // decontruct is submittung and isValid from form state
  const { isSubmitting, isValid } = form.formState;

  // create a onSubmit func
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(`/api/articles/${articleId}`, values);
      toast.success("Edited Body Successfully!");
      toggleEdit();
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };
  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Chapter Body
        <Button onClick={toggleEdit}>
          {isEditing ? (
            <>Cancel</>
          ) : (
            <>
              <PencilIcon className="h-4 w-4 mr-2"></PencilIcon>
              Edit Body
            </>
          )}
        </Button>
      </div>
      {!isEditing ? (
        <div
          className={cn(
            "text-sm mt-2",
            !initialData.body && "text-slate-500 italic"
          )}
        >
          {!initialData.body && "No body"}
          {initialData.body && <Preview value={initialData.body} />}
        </div>
      ) : (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 mt-4"
          >
            <FormField
              control={form.control}
              name="body"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Editor {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <div className="flex items-center gap-x-2">
              <Button disabled={!isValid || isSubmitting} type="submit">
                Save
              </Button>
            </div>
          </form>
        </Form>
      )}
    </div>
  );
};

export default BodyForm;
