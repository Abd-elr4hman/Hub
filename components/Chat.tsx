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
        content: `Your goal is to assist the user in asnwering questions regarding the following text article ${article.title} ${article.body}`,
      },
    ],
  };
  const { messages, input, handleInputChange, handleSubmit } = useChat(options);
  return (
    <div className="flex flex-col w-full max-w-md mx-auto stretch fixed border shadow-lg rounded-lg max-h-[500px] overflow-x-auto overflow-y-auto bg-slate-200">
      <div className="fixed backdrop-blur-xl z-50  w-[inherit] max-w-[inherit] pt-2 px-4">
        <h1 className="text-2xl ">Ask Our AI Companion</h1>
        <p className="text-sm text-slate-600 ">
          {"Have a question about this article ?"}
        </p>
        <form onSubmit={handleSubmit} className="py-4">
          <input
            //   className="fixed bottom-0 w-full max-w-md p-2 mb-8 border border-gray-300 rounded shadow-xl"
            className="w-full  p-2 mb-8 border border-gray-300 rounded "
            value={input}
            placeholder="Ask ..."
            onChange={handleInputChange}
          />
        </form>
      </div>
      <div className="mt-40 px-4">
        {messages.slice(2).map((m) => (
          <div key={m.id} className="my-2">
            <ChatMessage
              name={m.role === "user" ? `${user.name}` : "AI"}
              imageUrl={m.role === "user" ? `${user.imageUrl}` : "/profile.jpg"}
              message={m.content}
              role={m.role}
            />
            {/* <div key={m.id} className="whitespace-pre-wrap">
            {m.role === "user" ? `${user.name}:  ` : "AI: "}
            {m.content}
          </div> */}
          </div>
        ))}
      </div>
    </div>
  );
}
