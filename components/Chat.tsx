"use client";

import { Article } from "@prisma/client";
import { useChat, Message } from "ai/react";

interface ChatProps {
  article: Article;
}

export default function Chat({ article }: ChatProps) {
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
    <div className="flex flex-col w-full max-w-md p-10 mx-auto stretch fixed border shadow-lg rounded-lg max-h-[500px] overflow-x-auto overflow-y-auto bg-slate-200">
      <h1 className="text-2xl">Ask Our AI Companion</h1>
      <p className="text-sm text-slate-600">
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
      {messages.slice(2).map((m) => (
        <div key={m.id} className="whitespace-pre-wrap">
          {m.role === "user" ? "User: " : "AI: "}
          {m.content}
        </div>
      ))}
    </div>
  );
}
