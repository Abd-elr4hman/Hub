"use client";

import { Article } from "@prisma/client";
import { useChat, Message } from "ai/react";
import ChatMessage from "./ChatMessage";

type UserInfo = {
  name: string | null;
  hasImage: boolean;
  imageUrl: string;
};

interface ChatProps {
  article: Article;
  user: UserInfo;
}

export default function Chat({ article, user }: ChatProps) {
  const options = {
    api: `/api/articles/${article.id}/chat`,
    initialMessages: [
      {
        id: Date.now().toString(),
        role: "system" as const,
        content: `You are an AI Learning companion developed by ai hub, ai hub is a learning hub that aims to provide a comunity to students and learners across the globe.`,
      },
      {
        id: Date.now().toString(),
        role: "system" as const,
        content: `Your goal is to assist the user in asnwering questions regarding the following text article, answer in short sentences and respond with questions to test the student knowledge as you move on, try to break down ideas in an easy manner and respond with short answers or questions. Article: ${article.title} ${article.body}`,
      },
    ],
  };
  const { messages, input, handleInputChange, handleSubmit } = useChat(options);
  return (
    <div className="w-full max-w-md mx-auto ">
      <div className="fixed backdrop-blur-xl z-50  w-[inherit] max-w-[inherit] pt-2 px-4  right-120 ">
        <h1 className="text-2xl ">Ask Our AI Companion</h1>
        <p className="text-sm text-slate-600 ">
          {"Have a question about this article ?"}
        </p>
      </div>
      <div className=" w-full max-w-md stretch fixed mx-auto border shadow-lg rounded-lg max-h-[70vh] min-h-[70vh]  right-120  bg-slate-200 ">
        <div className="flex flex-col-reverse max-h-[60vh] overflow-y-auto">
          <div className="mt-20 px-4">
            {messages.slice(2).map((m) => (
              <div key={m.id} className="my-2">
                <ChatMessage
                  name={m.role === "user" ? `${user.name}` : "AI"}
                  imageUrl={
                    m.role === "user" ? `${user.imageUrl}` : "/profile.jpg"
                  }
                  message={m.content}
                  role={m.role}
                />
              </div>
            ))}
          </div>
        </div>
        <div className="sticky top-[90vh] w-full max-w-md ">
          <form onSubmit={handleSubmit} className="pt-4 px-4">
            <input
              //   className="fixed bottom-0 w-full max-w-md p-2 mb-8 border border-gray-300 rounded shadow-xl"
              className="w-full  p-2 mb-8 border border-gray-300 rounded "
              value={input}
              placeholder="Ask ..."
              onChange={handleInputChange}
            />
          </form>
        </div>
      </div>
    </div>
  );
}
