"use client";

import ConfirmModal from "@/components/modals/ConfirmModal";
import { Button } from "@/components/ui/button";
import { useConfettiStore } from "@/hooks/use-confetti-tore";
import axios from "axios";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

interface ActionsProps {
  disabled: boolean;
  articleId: string;
  isPublished: boolean;
}

const Actions = ({ disabled, articleId, isPublished }: ActionsProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const confetti = useConfettiStore();

  const onDelete = async () => {
    try {
      setIsLoading(true);
      await axios.delete(`/api/articles/${articleId}`);

      toast.success("Article deleted");

      router.push(`/teacher/articles`);
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const onClick = async () => {
    try {
      setIsLoading(true);
      if (isPublished) {
        await axios.patch(`/api/articles/${articleId}/unpublish`);

        toast.success("Article unpublished");
        router.refresh();
      } else {
        await axios.patch(`/api/articles/${articleId}/publish`);
        toast.success("Article published");
        confetti.onOpen();
        router.refresh();
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center gap-x-2 ">
      <Button
        onClick={onClick}
        disabled={disabled || isLoading}
        size="sm"
        variant="link"
      >
        {isPublished ? "Unpublish" : "Publish"}
      </Button>
      <ConfirmModal onConfirm={onDelete}>
        <Button size="sm" variant="destructive" disabled={isLoading}>
          <Trash className="h-4 w-4" />
        </Button>
      </ConfirmModal>
    </div>
  );
};

export default Actions;
