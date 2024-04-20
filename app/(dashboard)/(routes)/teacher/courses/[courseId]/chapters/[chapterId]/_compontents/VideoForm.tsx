"use client";

import * as z from "zod";
import axios from "axios";

import MuxPlayer from "@mux/mux-player-react";

import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";

import { ImageIcon, PencilIcon, PlusCircle, VideoIcon } from "lucide-react";
import { useState } from "react";
import { Chapter, Course, MuxData } from "@prisma/client";
import Image from "next/image";
import FileUpload from "@/components/FileUpload";

interface VideoFormProps {
  initialData: Chapter & { muxData?: MuxData | null };
  courseId: string;
  chapterId: string;
}

// define form shcema with zod
const formSchema = z.object({
  videoUrl: z.string().min(1),
});

const VideoForm = ({ initialData, courseId, chapterId }: VideoFormProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const toggleEdit = () => setIsEditing((current) => !current);
  const router = useRouter();

  // useForm react hook and pass a resolver and a context
  /*
    Option	Description
    resolver	Integrates with your preferred schema validation library.
    context	A context object to supply for your schema validation.
    */

  // create a onSubmit func
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(
        `/api/courses/${courseId}/chapters/${chapterId}`,
        values
      );
      toast.success("Chapter Video Updated Successfully!");
      toggleEdit();
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };
  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Chapter Video
        <Button onClick={toggleEdit}>
          {isEditing && <>Cancel</>}
          {!isEditing && !initialData.videoUrl && (
            <>
              <PlusCircle className="h-4 w-4 mr-2" />
              Add an Video
            </>
          )}
          {!isEditing && initialData.videoUrl && (
            <>
              <PencilIcon className="h-4 w-4 mr-2"></PencilIcon>
              Edit Video
            </>
          )}
        </Button>
      </div>
      {!isEditing &&
        (!initialData.videoUrl ? (
          <div className="flex items-center justify-center h-60 bg-slate-200 rounded-md mt-2">
            <VideoIcon className=" h-10 w-10 text-slate-500" />
          </div>
        ) : (
          <div className="relative aspect-video mt-2">
            <MuxPlayer playbackId={initialData?.muxData?.playbackId || ""} />
          </div>
        ))}
      {isEditing && (
        <div>
          <FileUpload
            endpoint="chapterVideo"
            onChange={(url) => {
              if (url) {
                onSubmit({ videoUrl: url });
              }
            }}
          />
          <div className="text-xs text-muted-foreground mt-4">
            {"Upload this chapter's video"}
          </div>
        </div>
      )}
      {initialData.videoUrl && !isEditing && (
        <div className="text-sm text-slate-500">
          Video Can take a few minutes to process. Refresh the page if video
          does not appear
        </div>
      )}
    </div>
  );
};

export default VideoForm;
