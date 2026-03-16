import { generateText } from "ai";
import { NextRequest, NextResponse } from "next/server";
import { getModel, type AIProvider } from "@/lib/ai/provider";
import { authorizeAIRequest } from "@/lib/ai/middleware";
import { trackUsage } from "@/lib/ai/usage";
import { aiGenerateRequestSchema } from "@/lib/validations";

export async function POST(request: NextRequest) {
  const parsed = aiGenerateRequestSchema.safeParse(await request.json());
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Missing required field: prompt" },
      { status: 400 }
    );
  }
  const { prompt, system, provider } = parsed.data as {
    prompt: string;
    system?: string;
    provider?: AIProvider;
  };

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
