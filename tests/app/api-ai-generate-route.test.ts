const authorizeAIRequestMock = vi.fn();
const getModelMock = vi.fn();
const trackUsageMock = vi.fn();
const generateTextMock = vi.fn();

vi.mock("@/lib/ai/middleware", () => ({
  authorizeAIRequest: authorizeAIRequestMock,
}));

vi.mock("@/lib/ai/provider", () => ({
  getModel: getModelMock,
}));

vi.mock("@/lib/ai/usage", () => ({
  trackUsage: trackUsageMock,
}));

vi.mock("ai", () => ({
  generateText: generateTextMock,
}));

describe("app/api/ai/generate/route", () => {
  beforeEach(() => {
    authorizeAIRequestMock.mockReset();
    getModelMock.mockReset();
    trackUsageMock.mockReset();
    generateTextMock.mockReset();
  });

  it("requires a prompt", async () => {
    const { POST } = await import("@/app/api/ai/generate/route");
    const response = await POST(
      new Request("http://localhost/api/ai/generate", {
        body: JSON.stringify({}),
        method: "POST",
      }) as never
    );

    expect(response.status).toBe(400);
    await expect(response.json()).resolves.toEqual({
      error: "Missing required field: prompt",
    });
  });

  it("returns the authorization response when access is denied", async () => {
    authorizeAIRequestMock.mockResolvedValue(
      new Response(JSON.stringify({ error: "Unauthorized" }), {
        headers: {
          "content-type": "application/json",
        },
        status: 401,
      })
    );

    const { POST } = await import("@/app/api/ai/generate/route");
    const response = await POST(
      new Request("http://localhost/api/ai/generate", {
        body: JSON.stringify({
          prompt: "Halo",
        }),
        method: "POST",
      }) as never
    );

    expect(response.status).toBe(401);
    await expect(response.json()).resolves.toEqual({
      error: "Unauthorized",
    });
  });

  it("generates text and tracks usage", async () => {
    authorizeAIRequestMock.mockResolvedValue({
      plan: "PRO",
      userId: "user-1",
    });
    getModelMock.mockReturnValue({
      modelId: "gpt-4o",
    });
    generateTextMock.mockResolvedValue({
      text: "Halo dari AI",
      usage: {
        inputTokens: 12,
        outputTokens: 34,
      },
    });

    const { POST } = await import("@/app/api/ai/generate/route");
    const response = await POST(
      new Request("http://localhost/api/ai/generate", {
        body: JSON.stringify({
          prompt: "Tulis headline landing page",
          provider: "openai",
          system: "Jawab singkat",
        }),
        method: "POST",
      }) as never
    );

    expect(generateTextMock).toHaveBeenCalledWith({
      model: {
        modelId: "gpt-4o",
      },
      prompt: "Tulis headline landing page",
      system: "Jawab singkat",
    });
    expect(trackUsageMock).toHaveBeenCalledWith(
      "user-1",
      "openai",
      "gpt-4o",
      12,
      34
    );
    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toEqual({
      text: "Halo dari AI",
      usage: {
        inputTokens: 12,
        outputTokens: 34,
      },
    });
  });
});
