const getAuthenticatedUserMock = vi.fn();
const updateProfileForUserMock = vi.fn();

vi.mock("@/lib/data/auth", () => ({
  getAuthenticatedUser: getAuthenticatedUserMock,
}));

vi.mock("@/lib/data/profiles", () => ({
  updateProfileForUser: updateProfileForUserMock,
}));

describe("app/api/profile/route", () => {
  beforeEach(() => {
    getAuthenticatedUserMock.mockReset();
    updateProfileForUserMock.mockReset();
  });

  it("requires an authenticated user", async () => {
    getAuthenticatedUserMock.mockResolvedValue(null);

    const { POST } = await import("@/app/api/profile/route");
    const response = await POST(
      new Request("http://localhost/api/profile", {
        body: JSON.stringify({ full_name: "Galih" }),
        method: "POST",
      })
    );

    expect(response.status).toBe(401);
  });

  it("updates the current user profile", async () => {
    getAuthenticatedUserMock.mockResolvedValue({
      email: "member@example.com",
      id: "user-1",
    });
    updateProfileForUserMock.mockResolvedValue({
      error: null,
    });

    const { POST } = await import("@/app/api/profile/route");
    const response = await POST(
      new Request("http://localhost/api/profile", {
        body: JSON.stringify({
          avatar_url: "https://example.com/avatar.png",
          full_name: "Galih Pratama",
        }),
        method: "POST",
      })
    );

    expect(updateProfileForUserMock).toHaveBeenCalledWith("user-1", {
      avatar_url: "https://example.com/avatar.png",
      full_name: "Galih Pratama",
    });
    expect(response.status).toBe(200);
  });
});
