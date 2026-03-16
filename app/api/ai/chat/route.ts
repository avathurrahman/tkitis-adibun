import { streamText, convertToModelMessages, type UIMessage } from "ai";
import { NextRequest } from "next/server";
import { getModel, type AIProvider } from "@/lib/ai/provider";
import { authorizeAIRequest } from "@/lib/ai/middleware";
import { trackUsage } from "@/lib/ai/usage";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { messages, provider } = body as {
    messages: UIMessage[];
    provider?: AIProvider;
  };

  const selectedProvider = provider ?? "openai";
  const auth = await authorizeAIRequest(selectedProvider);
  if (auth instanceof Response) return auth;

  const model = getModel(selectedProvider);

  const result = streamText({
    model,
    messages: await convertToModelMessages(messages),
    onFinish: async ({ usage }) => {
      await trackUsage(
        auth.userId,
        selectedProvider,
        model.modelId,
        usage.inputTokens ?? 0,
        usage.outputTokens ?? 0
      );
    },
  });

  return result.toUIMessageStreamResponse();
}
