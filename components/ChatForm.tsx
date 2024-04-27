"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";

const formSchema = z.object({
  query: z
    .string()
    .min(1, {
      message: "Enter a question.",
    })
    .max(255),
});

const ChatForm = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      query: "",
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await axios.post("/api/articles/chat", values);
      toast.success("chat message sent!");
      router.refresh();
    } catch {
      toast.error("Something went wrong!");
    }
  };
  return (
    <div className="p-4">
      <h1 className="text-2xl">Ask AI</h1>
      <p className="text-sm text-slate-600">
        {"Have a question about this article ? Ask AI..."}
      </p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2 mt-2">
          <FormField
            control={form.control}
            name="query"
            render={({ field }) => (
              <FormItem>
                {/* <FormLabel>Ask AI</FormLabel> */}
                <FormControl>
                  <Input
                    disabled={isSubmitting}
                    placeholder="e.g can you elaborate more on ...?"
                    {...field}
                  />
                </FormControl>
                {/* <FormDescription>
                  What question do you need answered?
                </FormDescription> */}
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex items-center gap-x-2">
            {/* <Link href="/">
              <Button type="button" variant="ghost">
                {" "}
                Cancel
              </Button>
            </Link> */}
            <Button type="submit" disabled={!isValid || isSubmitting}>
              Ask
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ChatForm;
