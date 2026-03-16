import sitemap from "@/app/sitemap";
import { getAllPosts } from "@/lib/mdx";

describe("app/sitemap", () => {
  it("includes the static routes and published blog posts", () => {
    const entries = sitemap();
    const posts = getAllPosts();

    expect(entries).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          priority: 1,
          url: "http://localhost:3000",
        }),
        expect.objectContaining({
          priority: 0.8,
          url: "http://localhost:3000/blog",
        }),
      ])
    );

    posts.forEach((post) => {
      expect(entries).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            url: `http://localhost:3000/blog/${post.slug}`,
          }),
        ])
      );
    });
  });
});
