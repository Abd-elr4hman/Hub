// app/api/chat/route.ts
import { OpenAIStream, StreamingTextResponse } from "ai";
import OpenAI from "openai";
import { NextResponse } from "next/server";

const perplexity = new OpenAI({
  apiKey: process.env.PERPLEXITY_API_KEY || "",
  baseURL: "https://api.perplexity.ai",
});

export async function POST(req: Request) {
  try {
    // Extract the `messages` from the body of the request
    const { messages } = await req.json();

    // Request the OpenAI-compatible API for the response based on the prompt
    const response = await perplexity.chat.completions.create({
      model: "llama-3.1-sonar-huge-128k-online",
      stream: true,
      messages: messages,
    });

    // Convert the response into a friendly text-stream
    const stream = OpenAIStream(response);
    console.log(stream);

    // Respond with the stream
    return new StreamingTextResponse(stream);
  } catch (error) {
    console.log("[CHAT_API]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
