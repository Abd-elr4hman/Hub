import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import OpenAI from "openai";
import { NextResponse } from "next/server";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export async function getEmbedding(body:string) {
  try {
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY
    });
  
    if (!openai) {
      return new NextResponse("Failed To Create Embedding", { status: 401 });
    }
  
    const response = await openai.embeddings.create({
      model: "text-embedding-ada-002",
      input: body
    })
    
    if (!response) {
      return new NextResponse("Failed To Create Embedding", { status: 401 });
    }
  
    return response.data[0].embedding
  } catch (error) {
    console.log("[UTILS_GET_EMBEDDING]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
  
}