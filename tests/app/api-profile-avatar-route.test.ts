const getAuthenticatedUserMock = vi.fn();
const createSignedUploadUrlMock = vi.fn();
const createClientMock = vi.fn();

vi.mock("@/lib/data/auth", () => ({
  getAuthenticatedUser: getAuthenticatedUserMock,
}));

vi.mock("@/lib/supabase/server", () => ({
  createClient: createClientMock,
}));

describe("app/api/profile/avatar/route", () => {
  beforeEach(() => {
    getAuthenticatedUserMock.mockReset();
    createSignedUploadUrlMock.mockReset();
    createClientMock.mockReset();
  });

  it("requires an authenticated user", async () => {
    getAuthenticatedUserMock.mockResolvedValue(null);

    const { POST } = await import("@/app/api/profile/avatar/route");
    const response = await POST(
      new Request("http://localhost/api/profile/avatar", {
        body: JSON.stringify({
          fileSize: 1000,
          fileType: "image/png",
        }),
        method: "POST",
      })
    );

    expect(response.status).toBe(401);
  });

  it("validates file size", async () => {
    getAuthenticatedUserMock.mockResolvedValue({
      email: "member@example.com",
      id: "user-1",
    });

    const { POST } = await import("@/app/api/profile/avatar/route");
    const response = await POST(
      new Request("http://localhost/api/profile/avatar", {
        body: JSON.stringify({
          fileSize: 3 * 1024 * 1024,
          fileType: "image/png",
        }),
        method: "POST",
      })
    );

    expect(response.status).toBe(400);
    await expect(response.json()).resolves.toEqual({
      error: "Ukuran avatar maksimal 2MB.",
    });
  });

  it("creates a signed upload token for supported image types", async () => {
    getAuthenticatedUserMock.mockResolvedValue({
      email: "member@example.com",
      id: "user-1",
    });
    createSignedUploadUrlMock.mockResolvedValue({
      data: {
        path: "user-1/avatar",
        token: "signed-token",
      },
      error: null,
    });
    createClientMock.mockResolvedValue({
      storage: {
        from: vi.fn(() => ({
          createSignedUploadUrl: createSignedUploadUrlMock,
        })),
      },
    });

    const { POST } = await import("@/app/api/profile/avatar/route");
    const response = await POST(
      new Request("http://localhost/api/profile/avatar", {
        body: JSON.stringify({
          fileSize: 150_000,
          fileType: "image/webp",
        }),
        method: "POST",
      })
    );

    expect(createSignedUploadUrlMock).toHaveBeenCalledWith("user-1/avatar", {
      upsert: true,
    });
    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toEqual({
      bucket: "avatars",
      path: "user-1/avatar",
      token: "signed-token",
    });
  });
});
