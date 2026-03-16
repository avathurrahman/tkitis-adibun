import { getAllPosts, getPostBySlug } from "@/lib/mdx";

describe("lib/mdx", () => {
  it("returns published posts sorted by date with reading time", () => {
    const posts = getAllPosts();

    expect(posts.length).toBeGreaterThan(0);
    expect(posts.every((post) => post.slug && post.readingTime > 0)).toBe(true);

    for (let index = 0; index < posts.length - 1; index += 1) {
      expect(new Date(posts[index].date).getTime()).toBeGreaterThanOrEqual(
        new Date(posts[index + 1].date).getTime()
      );
    }
  });

  it("returns a post by slug with source content", () => {
    const [post] = getAllPosts();
    const result = getPostBySlug(post.slug);

    expect(result).not.toBeNull();
    expect(result?.frontmatter.slug).toBe(post.slug);
    expect(result?.frontmatter.readingTime).toBeGreaterThan(0);
    expect(result?.source.length).toBeGreaterThan(0);
  });

  it("returns null for an unknown slug", () => {
    expect(getPostBySlug("missing-post")).toBeNull();
  });
});
