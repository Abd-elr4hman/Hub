"use client";

import { Button } from "@/components/ui/button";
import axios from "axios";
import { useRouter } from "next/navigation";

import toast from "react-hot-toast";

import {
  BookmarkMinus,
  BookmarkPlus,
  Heart,
  MessageSquareMore,
} from "lucide-react";

interface ArticleActionsProps {
  articleId: string;
  isSaved: boolean;
}

const ArticleActions = ({ articleId, isSaved }: ArticleActionsProps) => {
  const router = useRouter();
  const saveArticle = async () => {
    try {
      const response = await axios.post(`/api/articles/${articleId}/save`);

      toast.success("Article Saved!");
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  const unsaveArticle = async () => {
    try {
      const response = await axios.delete(`/api/articles/${articleId}/unsave`);

      toast.success("Article Unsaved!");
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  return (
    <div className="flex justify-center pt-2 ">
      <Button variant="ghost" className="hover:text-red-300">
        <Heart size={20} />
      </Button>
      <Button variant="ghost" className="hover:text-sky-800">
        <MessageSquareMore size={20} />
      </Button>
      {isSaved ? (
        <Button
          disabled={!isSaved}
          type="button"
          onClick={unsaveArticle}
          variant="ghost"
          className=" hover:bg-red-200"
        >
          <BookmarkMinus size={20} />
        </Button>
      ) : (
        <Button
          disabled={isSaved}
          type="button"
          onClick={saveArticle}
          variant="ghost"
          className="hover:text-sky-800"
        >
          <BookmarkPlus size={20} />
        </Button>
      )}
    </div>
  );
};

export default ArticleActions;
