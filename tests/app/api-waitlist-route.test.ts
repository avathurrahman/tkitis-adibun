const createClientMock = vi.fn();

vi.mock("@/lib/supabase/server", () => ({
  createClient: createClientMock,
}));

describe("app/api/waitlist/route", () => {
  beforeEach(() => {
    createClientMock.mockReset();
  });

  it("validates email addresses", async () => {
    const { POST } = await import("@/app/api/waitlist/route");
    const response = await POST(
      new Request("http://localhost/api/waitlist", {
        body: JSON.stringify({
          email: "invalid-email",
        }),
        method: "POST",
      })
    );

    expect(response.status).toBe(400);
    await expect(response.json()).resolves.toEqual({
      error: "Email tidak valid.",
    });
  });

  it("inserts waitlist entries and normalizes empty names", async () => {
    const insertMock = vi.fn().mockResolvedValue({ error: null });

    createClientMock.mockResolvedValue({
      from: vi.fn(() => ({
        insert: insertMock,
      })),
    });

    const { POST } = await import("@/app/api/waitlist/route");
    const response = await POST(
      new Request("http://localhost/api/waitlist", {
        body: JSON.stringify({
          email: "member@example.com",
        }),
        method: "POST",
      })
    );

    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toEqual({ success: true });
    expect(insertMock).toHaveBeenCalledWith({
      email: "member@example.com",
      name: null,
    });
  });

  it("returns 409 for duplicate emails", async () => {
    const insertMock = vi.fn().mockResolvedValue({
      error: {
        code: "23505",
      },
    });

    createClientMock.mockResolvedValue({
      from: vi.fn(() => ({
        insert: insertMock,
      })),
    });

    const { POST } = await import("@/app/api/waitlist/route");
    const response = await POST(
      new Request("http://localhost/api/waitlist", {
        body: JSON.stringify({
          email: "member@example.com",
          name: "Member",
        }),
        method: "POST",
      })
    );

    expect(response.status).toBe(409);
    await expect(response.json()).resolves.toEqual({
      error: "Email sudah terdaftar.",
    });
  });

  it("returns 500 for unexpected insert errors", async () => {
    const insertMock = vi.fn().mockResolvedValue({
      error: {
        code: "XX000",
      },
    });

    createClientMock.mockResolvedValue({
      from: vi.fn(() => ({
        insert: insertMock,
      })),
    });

    const { POST } = await import("@/app/api/waitlist/route");
    const response = await POST(
      new Request("http://localhost/api/waitlist", {
        body: JSON.stringify({
          email: "member@example.com",
          name: "Member",
        }),
        method: "POST",
      })
    );

    expect(response.status).toBe(500);
    await expect(response.json()).resolves.toEqual({
      error: "Gagal mendaftar. Coba lagi.",
    });
  });
});
