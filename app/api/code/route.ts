import { checkSubscription } from "@/components/subscription";
import { checkApiLimit, increaseApiLimit } from "@/lib/api-limit";
import { auth } from "@clerk/nextjs";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const apiKey = process.env.GEMINI_API_KEY || "";
const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});
const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

const instructionMessage: any = {
  role: "user",
  parts: [
    {
      text: "You are a code generator. You must answer only in markdown code snippets. Use code comments for explanations. If asked for something else, please respond with 'Sorry, I only generate code snippets.' and if asked about your purpose, respond with 'I am a code generator.'",
    },
  ],
};

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { messages } = body;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!messages) {
      return new NextResponse("Messages are required", { status: 400 });
    }

    const freeTrial = await checkApiLimit();
    const isPro = await checkSubscription();

    if (!freeTrial && !isPro) {
      return new NextResponse("Free trial has expired", { status: 403 });
    }

    const chatSession = model.startChat({
      generationConfig,
      history: [instructionMessage].concat(messages.slice(0, -1)),
    });

    const res = await chatSession.sendMessage(
      messages[messages.length - 1].parts[0].text
    );

    if (!isPro) {
      await increaseApiLimit();
    }

    const responseObj = {
      role: "model",
      parts: [{ text: res.response.text() }],
    };
    return NextResponse.json(responseObj);
  } catch (error) {
    console.log("[CODE_ERROR]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
