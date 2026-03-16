import robots from "@/app/robots";

describe("app/robots", () => {
  it("returns the public crawl rules and sitemap location", () => {
    expect(robots()).toEqual({
      rules: [
        {
          allow: "/",
          disallow: ["/api/", "/admin/"],
          userAgent: "*",
        },
      ],
      sitemap: "http://localhost:3000/sitemap.xml",
    });
  });
});
