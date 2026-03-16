import fs from "fs";
import path from "path";
import matter from "gray-matter";

const BLOG_DIR = path.join(process.cwd(), "content/blog");

export type PostFrontmatter = {
  title: string;
  description: string;
  date: string;
  slug: string;
  author?: string;
  tags?: string[];
  published?: boolean;
};

export type PostMeta = PostFrontmatter & {
  readingTime: number;
};

function estimateReadingTime(content: string): number {
  const words = content.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
}

export function getAllPosts(): PostMeta[] {
  if (!fs.existsSync(BLOG_DIR)) return [];

  const files = fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith(".mdx") || f.endsWith(".md"));

  return files
    .map((filename) => {
      const filePath = path.join(BLOG_DIR, filename);
      const raw = fs.readFileSync(filePath, "utf-8");
      const { data, content } = matter(raw);
      const frontmatter = data as PostFrontmatter;

      if (frontmatter.published === false) return null;

      return {
        ...frontmatter,
        slug: frontmatter.slug || filename.replace(/\.(mdx|md)$/, ""),
        readingTime: estimateReadingTime(content),
      };
    })
    .filter(Boolean)
    .sort(
      (a, b) => new Date(b!.date).getTime() - new Date(a!.date).getTime()
    ) as PostMeta[];
}

export function getPostBySlug(slug: string): {
  frontmatter: PostMeta;
  source: string;
} | null {
  if (!fs.existsSync(BLOG_DIR)) return null;

  const files = fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith(".mdx") || f.endsWith(".md"));

  for (const filename of files) {
    const filePath = path.join(BLOG_DIR, filename);
    const raw = fs.readFileSync(filePath, "utf-8");
    const { data, content } = matter(raw);
    const frontmatter = data as PostFrontmatter;
    const fileSlug =
      frontmatter.slug || filename.replace(/\.(mdx|md)$/, "");

    if (fileSlug === slug) {
      return {
        frontmatter: {
          ...frontmatter,
          slug: fileSlug,
          readingTime: estimateReadingTime(content),
        },
        source: content,
      };
    }
  }

  return null;
}
