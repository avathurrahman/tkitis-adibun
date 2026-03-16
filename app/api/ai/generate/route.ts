import { generateText } from "ai";
import { NextRequest, NextResponse } from "next/server";
import { getModel, type AIProvider } from "@/lib/ai/provider";
import { authorizeAIRequest } from "@/lib/ai/middleware";
import { trackUsage } from "@/lib/ai/usage";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { prompt, system, provider } = body as {
    prompt: string;
    system?: string;
    provider?: AIProvider;
  };

  if (!prompt) {
    return NextResponse.json(
      { error: "Missing required field: prompt" },
      { status: 400 }
    );
  }

  const selectedProvider = provider ?? "openai";
  const auth = await authorizeAIRequest(selectedProvider);
  if (auth instanceof Response) return auth;

  const model = getModel(selectedProvider);

  const { text, usage } = await generateText({
    model,
    prompt,
    ...(system && { system }),
  });

  await trackUsage(
    auth.userId,
    selectedProvider,
    model.modelId,
    usage.inputTokens ?? 0,
    usage.outputTokens ?? 0
  );

  return NextResponse.json({ text, usage });
}
